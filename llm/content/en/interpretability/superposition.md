# Superposition and polysemanticity

Course: **interpretability** — chapter `superposition`. Why neurons mix many features, and toy models of superposition.

::: definition superposition
Encoding more features than there are dimensions by spreading each feature across a small subspace.
:::

::: definition polysemanticity
A single neuron responding to multiple unrelated features because it participates in several superposed features.
:::

::: definition sparse coding
Feature representation where only a few dimensions are active at a time, making superposition possible.
:::

::: proposition
`superposition` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `superposition` without re-deriving every detail.
:::

::: example superposition
Consider a concrete `superposition` scenario in which **superposition** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **superposition**.
:::
::: solution
**superposition** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example polysemanticity
Consider a concrete `superposition` scenario in which **polysemanticity** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **polysemanticity**.
:::
::: solution
**polysemanticity** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example sparse coding
Consider a concrete `superposition` scenario in which **sparse coding** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **sparse coding**.
:::
::: solution
**sparse coding** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example superposition
Consider a concrete `superposition` scenario in which **superposition** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **superposition**.
:::
::: solution
**superposition** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `superposition` is conflating it with a nearby but distinct concept. Check the definition of **superposition** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **superposition** as used in this chapter?
- [x] Encoding more features than there are dimensions by spreading each feature across a small subspace
- [ ] A single neuron responding to multiple unrelated features because it participates in several superposed features
- [ ] Feature representation where only a few dimensions are active at a time, making superposition possible
:::

::: summary
- **superposition**: Encoding more features than there are dimensions by spreading each feature across a small subspace.
- **polysemanticity**: A single neuron responding to multiple unrelated features because it participates in several superposed features.
- **sparse coding**: Feature representation where only a few dimensions are active at a time, making superposition possible.
:::

::: history
The vocabulary of `superposition` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **superposition** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **polysemanticity** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **sparse coding** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **superposition** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **polysemanticity** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **sparse coding** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **superposition** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **polysemanticity** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the superposition mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::