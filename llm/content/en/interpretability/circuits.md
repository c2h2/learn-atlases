# Circuits

Course: **interpretability** — chapter `circuits`. Induction heads, indirect-object identification and reverse-engineering small mechanisms.

::: definition circuit
A subgraph of neurons/heads implementing a specific computation.
:::

::: definition induction head
A head that copies the previous occurrence of the current token's context.
:::

::: definition copy head
A head that attends to a previous token and copies it forward.
:::

::: proposition
`circuits` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `circuits` without re-deriving every detail.
:::

::: example circuit
Consider a concrete `circuits` scenario in which **circuit** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **circuit**.
:::
::: solution
**circuit** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example induction head
Consider a concrete `circuits` scenario in which **induction head** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **induction head**.
:::
::: solution
**induction head** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example copy head
Consider a concrete `circuits` scenario in which **copy head** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **copy head**.
:::
::: solution
**copy head** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example circuit
Consider a concrete `circuits` scenario in which **circuit** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **circuit**.
:::
::: solution
**circuit** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `circuits` is conflating it with a nearby but distinct concept. Check the definition of **circuit** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **circuit** as used in this chapter?
- [x] A subgraph of neurons/heads implementing a specific computation
- [ ] A head that copies the previous occurrence of the current token's context
- [ ] A head that attends to a previous token and copies it forward
:::

::: summary
- **circuit**: A subgraph of neurons/heads implementing a specific computation.
- **induction head**: A head that copies the previous occurrence of the current token's context.
- **copy head**: A head that attends to a previous token and copies it forward.
:::

::: history
The vocabulary of `circuits` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **circuit** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **induction head** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **copy head** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **circuit** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **induction head** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **copy head** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **circuit** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **induction head** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the circuits mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::