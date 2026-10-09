# Batching and serving systems

Course: **inference** — chapter `batching-serving`. Continuous batching, paged attention, prefill and decode phases, and serving frameworks.

::: definition throughput
Tokens or requests processed per second. Batched serving trades latency for throughput.
:::

::: definition continuous batching
Packing requests into dynamic micro-batches so GPU stays saturated.
:::

::: definition latency
Time from request to completion. Interactive applications bound this tightly.
:::

::: proposition
`batching-serving` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `batching-serving` without re-deriving every detail.
:::

::: example throughput
Consider a concrete `batching-serving` scenario in which **throughput** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **throughput**.
:::
::: solution
**throughput** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example continuous batching
Consider a concrete `batching-serving` scenario in which **continuous batching** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **continuous batching**.
:::
::: solution
**continuous batching** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example latency
Consider a concrete `batching-serving` scenario in which **latency** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **latency**.
:::
::: solution
**latency** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example throughput
Consider a concrete `batching-serving` scenario in which **throughput** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **throughput**.
:::
::: solution
**throughput** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `batching-serving` is conflating it with a nearby but distinct concept. Check the definition of **throughput** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **throughput** as used in this chapter?
- [x] Tokens or requests processed per second
- [ ] Packing requests into dynamic micro-batches so GPU stays saturated
- [ ] Time from request to completion
:::

::: summary
- **throughput**: Tokens or requests processed per second.
- **continuous batching**: Packing requests into dynamic micro-batches so GPU stays saturated.
- **latency**: Time from request to completion.
:::

::: history
The vocabulary of `batching-serving` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **throughput** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **continuous batching** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **latency** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **throughput** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **continuous batching** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **latency** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **throughput** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **continuous batching** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the batching-serving mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::