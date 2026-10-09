# Backpropagation

Course: **neural-networks** — chapter `backpropagation`. Computation graphs, the backward pass and the cost of computing gradients.

::: definition chain rule
Differentiating composed functions by multiplying local derivatives.
:::

::: definition forward pass
Computing activations from input to output.
:::

::: definition backward pass
Computing gradients from output back to input by reverse-mode differentiation.
:::

::: proposition
`backpropagation` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `backpropagation` without re-deriving every detail.
:::

::: example chain rule
Consider a concrete `backpropagation` scenario in which **chain rule** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **chain rule**.
:::
::: solution
**chain rule** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example forward pass
Consider a concrete `backpropagation` scenario in which **forward pass** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **forward pass**.
:::
::: solution
**forward pass** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example backward pass
Consider a concrete `backpropagation` scenario in which **backward pass** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **backward pass**.
:::
::: solution
**backward pass** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example chain rule
Consider a concrete `backpropagation` scenario in which **chain rule** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **chain rule**.
:::
::: solution
**chain rule** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `backpropagation` is conflating it with a nearby but distinct concept. Check the definition of **chain rule** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **chain rule** as used in this chapter?
- [x] Differentiating composed functions by multiplying local derivatives
- [ ] Computing activations from input to output
- [ ] Computing gradients from output back to input by reverse-mode differentiation
:::

::: summary
- **chain rule**: Differentiating composed functions by multiplying local derivatives.
- **forward pass**: Computing activations from input to output.
- **backward pass**: Computing gradients from output back to input by reverse-mode differentiation.
:::

::: history
The vocabulary of `backpropagation` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **chain rule** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **forward pass** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **backward pass** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **chain rule** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **forward pass** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **backward pass** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **chain rule** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **forward pass** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the backpropagation mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::