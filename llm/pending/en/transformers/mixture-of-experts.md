# Mixture of experts

Course: **transformers** — chapter `mixture-of-experts`. Sparse expert layers, routing, load balancing and the trade-offs of conditional computation.

::: definition expert
A feedforward block specialized for a subset of inputs.
:::

::: definition router
A small network that decides which experts handle each token.
:::

::: definition sparse activation
Only a subset of experts activate per token, giving large parameter counts at low per-token FLOPs.
:::

::: proposition
`mixture-of-experts` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `mixture-of-experts` without re-deriving every detail.
:::

::: example expert
Consider a concrete `mixture-of-experts` scenario in which **expert** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **expert**.
:::
::: solution
**expert** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example router
Consider a concrete `mixture-of-experts` scenario in which **router** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **router**.
:::
::: solution
**router** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example sparse activation
Consider a concrete `mixture-of-experts` scenario in which **sparse activation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **sparse activation**.
:::
::: solution
**sparse activation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example expert
Consider a concrete `mixture-of-experts` scenario in which **expert** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **expert**.
:::
::: solution
**expert** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `mixture-of-experts` is conflating it with a nearby but distinct concept. Check the definition of **expert** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **expert** as used in this chapter?
- [x] A feedforward block specialized for a subset of inputs
- [ ] A small network that decides which experts handle each token
- [ ] Only a subset of experts activate per token, giving large parameter counts at low per-token FLOPs
:::

::: summary
- **expert**: A feedforward block specialized for a subset of inputs.
- **router**: A small network that decides which experts handle each token.
- **sparse activation**: Only a subset of experts activate per token, giving large parameter counts at low per-token FLOPs.
:::

::: history
The vocabulary of `mixture-of-experts` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **expert** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **router** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **sparse activation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **expert** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **router** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **sparse activation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **expert** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **router** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the mixture-of-experts mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::