# Probing and attribution

Course: **interpretability** — chapter `probing-attribution`. Linear probes, saliency, attention analysis and their pitfalls.

::: definition probing
Training a classifier on internal activations to ask whether a concept is linearly encoded.
:::

::: definition attribution
Estimating which components contributed most to a particular output.
:::

::: definition integrated gradients
Attribution method integrating gradients along a path from baseline to actual input.
:::

::: proposition
`probing-attribution` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `probing-attribution` without re-deriving every detail.
:::

::: example probing
Consider a concrete `probing-attribution` scenario in which **probing** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **probing**.
:::
::: solution
**probing** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example attribution
Consider a concrete `probing-attribution` scenario in which **attribution** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **attribution**.
:::
::: solution
**attribution** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example integrated gradients
Consider a concrete `probing-attribution` scenario in which **integrated gradients** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **integrated gradients**.
:::
::: solution
**integrated gradients** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example probing
Consider a concrete `probing-attribution` scenario in which **probing** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **probing**.
:::
::: solution
**probing** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `probing-attribution` is conflating it with a nearby but distinct concept. Check the definition of **probing** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **probing** as used in this chapter?
- [x] Training a classifier on internal activations to ask whether a concept is linearly encoded
- [ ] Estimating which components contributed most to a particular output
- [ ] Attribution method integrating gradients along a path from baseline to actual input
:::

::: summary
- **probing**: Training a classifier on internal activations to ask whether a concept is linearly encoded.
- **attribution**: Estimating which components contributed most to a particular output.
- **integrated gradients**: Attribution method integrating gradients along a path from baseline to actual input.
:::

::: history
The vocabulary of `probing-attribution` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **probing** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **attribution** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **integrated gradients** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **probing** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **attribution** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **integrated gradients** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **probing** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **attribution** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the probing-attribution mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::