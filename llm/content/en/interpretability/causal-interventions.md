# Causal interventions and steering

Course: **interpretability** — chapter `causal-interventions`. Activation patching, ablations and steering vectors.

::: definition causal intervention
Actively setting an internal activation to a value to test its effect on output.
:::

::: definition ablation
Zeroing out a component to see what behavior disappears.
:::

::: definition steering
Adding a direction vector to activations to bias behavior toward a desired concept.
:::

::: proposition
`causal-interventions` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `causal-interventions` without re-deriving every detail.
:::

::: example causal intervention
Consider a concrete `causal-interventions` scenario in which **causal intervention** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **causal intervention**.
:::
::: solution
**causal intervention** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example ablation
Consider a concrete `causal-interventions` scenario in which **ablation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **ablation**.
:::
::: solution
**ablation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example steering
Consider a concrete `causal-interventions` scenario in which **steering** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **steering**.
:::
::: solution
**steering** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example causal intervention
Consider a concrete `causal-interventions` scenario in which **causal intervention** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **causal intervention**.
:::
::: solution
**causal intervention** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `causal-interventions` is conflating it with a nearby but distinct concept. Check the definition of **causal intervention** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **causal intervention** as used in this chapter?
- [x] Actively setting an internal activation to a value to test its effect on output
- [ ] Zeroing out a component to see what behavior disappears
- [ ] Adding a direction vector to activations to bias behavior toward a desired concept
:::

::: summary
- **causal intervention**: Actively setting an internal activation to a value to test its effect on output.
- **ablation**: Zeroing out a component to see what behavior disappears.
- **steering**: Adding a direction vector to activations to bias behavior toward a desired concept.
:::

::: history
The vocabulary of `causal-interventions` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **causal intervention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **ablation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **steering** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **causal intervention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **ablation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **steering** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **causal intervention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **ablation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the causal-interventions mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::