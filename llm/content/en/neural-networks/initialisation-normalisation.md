# Initialisation and normalisation

Course: **neural-networks** — chapter `initialisation-normalisation`. Vanishing and exploding gradients, Xavier and He initialisation, batch and layer normalisation, and residual connections.

::: definition Xavier
Initialize weights with variance 2/(fan_in + fan_out) to preserve signal variance.
:::

::: definition batch norm
Normalize activations across the batch; reduces covariate shift.
:::

::: definition layer norm
Normalize activations per token across features; standard in transformers.
:::

::: proposition
`initialisation-normalisation` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `initialisation-normalisation` without re-deriving every detail.
:::

::: example Xavier
Consider a concrete `initialisation-normalisation` scenario in which **Xavier** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **Xavier**.
:::
::: solution
**Xavier** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example batch norm
Consider a concrete `initialisation-normalisation` scenario in which **batch norm** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **batch norm**.
:::
::: solution
**batch norm** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example layer norm
Consider a concrete `initialisation-normalisation` scenario in which **layer norm** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **layer norm**.
:::
::: solution
**layer norm** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example Xavier
Consider a concrete `initialisation-normalisation` scenario in which **Xavier** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **Xavier**.
:::
::: solution
**Xavier** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `initialisation-normalisation` is conflating it with a nearby but distinct concept. Check the definition of **Xavier** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **Xavier** as used in this chapter?
- [x] Initialize weights with variance 2/(fan_in + fan_out) to preserve signal variance
- [ ] Normalize activations across the batch; reduces covariate shift
- [ ] Normalize activations per token across features; standard in transformers
:::

::: summary
- **Xavier**: Initialize weights with variance 2/(fan_in + fan_out) to preserve signal variance.
- **batch norm**: Normalize activations across the batch; reduces covariate shift.
- **layer norm**: Normalize activations per token across features; standard in transformers.
:::

::: history
The vocabulary of `initialisation-normalisation` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **Xavier** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **batch norm** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **layer norm** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **Xavier** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **batch norm** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **layer norm** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **Xavier** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **batch norm** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the initialisation-normalisation mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::