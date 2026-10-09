# Low-precision training

Course: **scaling** — chapter `mixed-precision`. Floating-point formats, bf16 and fp8 training, loss scaling and numerical stability.

::: definition fp32
32-bit floats; baseline precision.
:::

::: definition bf16
Brain float 16: 8-bit exponent, 7-bit mantissa; keeps fp32 dynamic range.
:::

::: definition fp16
Half precision; 5-bit exponent, prone to underflow.
:::

::: proposition
`mixed-precision` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `mixed-precision` without re-deriving every detail.
:::

::: example fp32
Consider a concrete `mixed-precision` scenario in which **fp32** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **fp32**.
:::
::: solution
**fp32** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example bf16
Consider a concrete `mixed-precision` scenario in which **bf16** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **bf16**.
:::
::: solution
**bf16** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example fp16
Consider a concrete `mixed-precision` scenario in which **fp16** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **fp16**.
:::
::: solution
**fp16** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example fp32
Consider a concrete `mixed-precision` scenario in which **fp32** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **fp32**.
:::
::: solution
**fp32** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `mixed-precision` is conflating it with a nearby but distinct concept. Check the definition of **fp32** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **fp32** as used in this chapter?
- [x] 32-bit floats; baseline precision
- [ ] Brain float 16: 8-bit exponent, 7-bit mantissa; keeps fp32 dynamic range
- [ ] Half precision; 5-bit exponent, prone to underflow
:::

::: summary
- **fp32**: 32-bit floats; baseline precision.
- **bf16**: Brain float 16: 8-bit exponent, 7-bit mantissa; keeps fp32 dynamic range.
- **fp16**: Half precision; 5-bit exponent, prone to underflow.
:::

::: history
The vocabulary of `mixed-precision` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **fp32** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **bf16** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **fp16** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **fp32** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **bf16** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **fp16** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **fp32** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **bf16** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the mixed-precision mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::