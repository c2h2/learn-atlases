# Quantisation

Course: **inference** — chapter `quantisation`. Integer and low-bit formats, post-training quantisation methods such as GPTQ and AWQ, and quantised caches.

::: definition int8
8-bit integers. Halves memory and speeds arithmetic with modest accuracy loss.
:::

::: definition int4
4-bit weights. Aggressive compression; may need group-wise or double-quantization schemes.
:::

::: definition GPTQ
Post-training quantization using approximate Hessian information to allocate rounding errors.
:::

::: definition AWQ
Activation-aware weight quantization; protects channels with large activations.
:::

::: proposition
`quantisation` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `quantisation` without re-deriving every detail.
:::

::: example int8
Consider a concrete `quantisation` scenario in which **int8** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **int8**.
:::
::: solution
**int8** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example int4
Consider a concrete `quantisation` scenario in which **int4** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **int4**.
:::
::: solution
**int4** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example GPTQ
Consider a concrete `quantisation` scenario in which **GPTQ** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **GPTQ**.
:::
::: solution
**GPTQ** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example AWQ
Consider a concrete `quantisation` scenario in which **AWQ** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **AWQ**.
:::
::: solution
**AWQ** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `quantisation` is conflating it with a nearby but distinct concept. Check the definition of **int8** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **int8** as used in this chapter?
- [x] 8-bit integers
- [ ] 4-bit weights
- [ ] Post-training quantization using approximate Hessian information to allocate rounding errors
- [ ] Activation-aware weight quantization; protects channels with large activations
:::

::: summary
- **int8**: 8-bit integers.
- **int4**: 4-bit weights.
- **GPTQ**: Post-training quantization using approximate Hessian information to allocate rounding errors.
- **AWQ**: Activation-aware weight quantization; protects channels with large activations.
:::

::: history
The vocabulary of `quantisation` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **int8** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **int4** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **GPTQ** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **AWQ** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **int8** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **int4** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **GPTQ** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **AWQ** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the quantisation mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::