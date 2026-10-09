# Positional information

Course: **transformers** — chapter `positional-encoding`. Sinusoidal and learned position embeddings, relative positions, RoPE and ALiBi.

::: definition sinusoidal
Fixed sin/cos position embeddings with geometric frequencies.
:::

::: definition learned
Per-position embeddings learned during training.
:::

::: definition RoPE
Rotary embeddings that encode relative position by rotating query and key vectors.
:::

::: proposition
`positional-encoding` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `positional-encoding` without re-deriving every detail.
:::

::: example sinusoidal
Consider a concrete `positional-encoding` scenario in which **sinusoidal** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **sinusoidal**.
:::
::: solution
**sinusoidal** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example learned
Consider a concrete `positional-encoding` scenario in which **learned** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **learned**.
:::
::: solution
**learned** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example RoPE
Consider a concrete `positional-encoding` scenario in which **RoPE** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RoPE**.
:::
::: solution
**RoPE** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example sinusoidal
Consider a concrete `positional-encoding` scenario in which **sinusoidal** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **sinusoidal**.
:::
::: solution
**sinusoidal** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `positional-encoding` is conflating it with a nearby but distinct concept. Check the definition of **sinusoidal** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **sinusoidal** as used in this chapter?
- [x] Fixed sin/cos position embeddings with geometric frequencies
- [ ] Per-position embeddings learned during training
- [ ] Rotary embeddings that encode relative position by rotating query and key vectors
:::

::: summary
- **sinusoidal**: Fixed sin/cos position embeddings with geometric frequencies.
- **learned**: Per-position embeddings learned during training.
- **RoPE**: Rotary embeddings that encode relative position by rotating query and key vectors.
:::

::: history
The vocabulary of `positional-encoding` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **sinusoidal** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **learned** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **RoPE** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **sinusoidal** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **learned** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **RoPE** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **sinusoidal** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **learned** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the positional-encoding mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::