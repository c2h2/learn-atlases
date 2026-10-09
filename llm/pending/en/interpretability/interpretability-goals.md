# Goals and methods of interpretability

Course: **interpretability** — chapter `interpretability-goals`. Behavioural, attributional and mechanistic approaches, and what an explanation should achieve.

::: definition interpretability
The project of understanding what internal activations and circuits compute.
:::

::: definition mechanistic
Explanation in terms of components and their interactions (neurons, heads, layers).
:::

::: definition behavioral
Explanation from inputs to outputs without inspecting internals.
:::

::: proposition
`interpretability-goals` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `interpretability-goals` without re-deriving every detail.
:::

::: example interpretability
Consider a concrete `interpretability-goals` scenario in which **interpretability** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **interpretability**.
:::
::: solution
**interpretability** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example mechanistic
Consider a concrete `interpretability-goals` scenario in which **mechanistic** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **mechanistic**.
:::
::: solution
**mechanistic** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example behavioral
Consider a concrete `interpretability-goals` scenario in which **behavioral** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **behavioral**.
:::
::: solution
**behavioral** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example interpretability
Consider a concrete `interpretability-goals` scenario in which **interpretability** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **interpretability**.
:::
::: solution
**interpretability** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `interpretability-goals` is conflating it with a nearby but distinct concept. Check the definition of **interpretability** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **interpretability** as used in this chapter?
- [x] The project of understanding what internal activations and circuits compute
- [ ] Explanation in terms of components and their interactions (neurons, heads, layers)
- [ ] Explanation from inputs to outputs without inspecting internals
:::

::: summary
- **interpretability**: The project of understanding what internal activations and circuits compute.
- **mechanistic**: Explanation in terms of components and their interactions (neurons, heads, layers).
- **behavioral**: Explanation from inputs to outputs without inspecting internals.
:::

::: history
The vocabulary of `interpretability-goals` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **interpretability** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **mechanistic** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **behavioral** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **interpretability** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **mechanistic** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **behavioral** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **interpretability** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **mechanistic** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the interpretability-goals mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::