# Optimisers

Course: **neural-networks** — chapter `optimisers`. SGD, momentum, RMSProp, Adam and AdamW, learning-rate schedules and warm-up.

::: definition SGD
Stochastic gradient descent: θ ← θ − lr ∇θ.
:::

::: definition Adam
Adaptive optimizer combining momentum with per-parameter learning rates.
:::

::: definition AdamW
Adam with decoupled weight decay; the standard optimizer for transformer training.
:::

::: proposition
`optimisers` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `optimisers` without re-deriving every detail.
:::

::: example SGD
Consider a concrete `optimisers` scenario in which **SGD** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **SGD**.
:::
::: solution
**SGD** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example Adam
Consider a concrete `optimisers` scenario in which **Adam** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **Adam**.
:::
::: solution
**Adam** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example AdamW
Consider a concrete `optimisers` scenario in which **AdamW** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **AdamW**.
:::
::: solution
**AdamW** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example SGD
Consider a concrete `optimisers` scenario in which **SGD** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **SGD**.
:::
::: solution
**SGD** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `optimisers` is conflating it with a nearby but distinct concept. Check the definition of **SGD** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **SGD** as used in this chapter?
- [x] Stochastic gradient descent: θ ← θ − lr ∇θ
- [ ] Adaptive optimizer combining momentum with per-parameter learning rates
- [ ] Adam with decoupled weight decay; the standard optimizer for transformer training
:::

::: summary
- **SGD**: Stochastic gradient descent: θ ← θ − lr ∇θ.
- **Adam**: Adaptive optimizer combining momentum with per-parameter learning rates.
- **AdamW**: Adam with decoupled weight decay; the standard optimizer for transformer training.
:::

::: history
The vocabulary of `optimisers` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **SGD** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **Adam** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **AdamW** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **SGD** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **Adam** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **AdamW** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **SGD** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **Adam** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the optimisers mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::