# Long-context inference

Course: **inference** — chapter `long-context`. Extending the context window, position interpolation, retrieving distant information and attention sinks.

::: definition context window
The maximum number of tokens the model attends over in one pass.
:::

::: definition RoPE scaling
Adjusting rotary embedding frequencies to extend context beyond training length.
:::

::: definition sliding window attention
Each token attends only to the most recent W tokens, cutting attention cost.
:::

::: proposition
`long-context` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `long-context` without re-deriving every detail.
:::

::: example context window
Consider a concrete `long-context` scenario in which **context window** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **context window**.
:::
::: solution
**context window** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example RoPE scaling
Consider a concrete `long-context` scenario in which **RoPE scaling** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RoPE scaling**.
:::
::: solution
**RoPE scaling** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example sliding window attention
Consider a concrete `long-context` scenario in which **sliding window attention** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **sliding window attention**.
:::
::: solution
**sliding window attention** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example context window
Consider a concrete `long-context` scenario in which **context window** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **context window**.
:::
::: solution
**context window** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `long-context` is conflating it with a nearby but distinct concept. Check the definition of **context window** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **context window** as used in this chapter?
- [x] The maximum number of tokens the model attends over in one pass
- [ ] Adjusting rotary embedding frequencies to extend context beyond training length
- [ ] Each token attends only to the most recent W tokens, cutting attention cost
:::

::: summary
- **context window**: The maximum number of tokens the model attends over in one pass.
- **RoPE scaling**: Adjusting rotary embedding frequencies to extend context beyond training length.
- **sliding window attention**: Each token attends only to the most recent W tokens, cutting attention cost.
:::

::: history
The vocabulary of `long-context` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **context window** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **RoPE scaling** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **sliding window attention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **context window** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **RoPE scaling** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **sliding window attention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **context window** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **RoPE scaling** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the long-context mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::