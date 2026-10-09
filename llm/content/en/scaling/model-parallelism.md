# Tensor, pipeline and expert parallelism

Course: **scaling** — chapter `model-parallelism`. Splitting layers and models across devices, pipeline schedules and expert parallelism.

::: definition tensor parallelism
Split each tensor op across devices (e.g., attention heads).
:::

::: definition pipeline parallelism
Split layers into stages, each stage on its own device.
:::

::: definition expert parallelism
MoE experts distributed across devices; router routes tokens to experts.
:::

::: proposition
`model-parallelism` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `model-parallelism` without re-deriving every detail.
:::

::: example tensor parallelism
Consider a concrete `model-parallelism` scenario in which **tensor parallelism** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **tensor parallelism**.
:::
::: solution
**tensor parallelism** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example pipeline parallelism
Consider a concrete `model-parallelism` scenario in which **pipeline parallelism** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **pipeline parallelism**.
:::
::: solution
**pipeline parallelism** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example expert parallelism
Consider a concrete `model-parallelism` scenario in which **expert parallelism** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **expert parallelism**.
:::
::: solution
**expert parallelism** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example tensor parallelism
Consider a concrete `model-parallelism` scenario in which **tensor parallelism** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **tensor parallelism**.
:::
::: solution
**tensor parallelism** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `model-parallelism` is conflating it with a nearby but distinct concept. Check the definition of **tensor parallelism** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **tensor parallelism** as used in this chapter?
- [x] Split each tensor op across devices (e
- [ ] Split layers into stages, each stage on its own device
- [ ] MoE experts distributed across devices; router routes tokens to experts
:::

::: summary
- **tensor parallelism**: Split each tensor op across devices (e.
- **pipeline parallelism**: Split layers into stages, each stage on its own device.
- **expert parallelism**: MoE experts distributed across devices; router routes tokens to experts.
:::

::: history
The vocabulary of `model-parallelism` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **tensor parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **pipeline parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **expert parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **tensor parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **pipeline parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **expert parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **tensor parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **pipeline parallelism** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the model-parallelism mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::