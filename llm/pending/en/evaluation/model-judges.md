# Models as judges

Course: **evaluation** — chapter `model-judges`. LLM-as-a-judge, rubrics, position and length bias, and agreement with humans.

::: definition LLM-as-judge
Using a strong model to grade outputs. Scalable but inherits the judge's biases.
:::

::: definition preference pair
Two outputs presented to a judge; the judge chooses the better one.
:::

::: definition position bias
Judges' tendency to favor one presentation order over the other.
:::

::: definition self-enhancement
Judges scoring outputs that resemble their own style higher.
:::

::: proposition
`model-judges` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `model-judges` without re-deriving every detail.
:::

::: example LLM-as-judge
Consider a concrete `model-judges` scenario in which **LLM-as-judge** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **LLM-as-judge**.
:::
::: solution
**LLM-as-judge** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example preference pair
Consider a concrete `model-judges` scenario in which **preference pair** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **preference pair**.
:::
::: solution
**preference pair** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example position bias
Consider a concrete `model-judges` scenario in which **position bias** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **position bias**.
:::
::: solution
**position bias** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example self-enhancement
Consider a concrete `model-judges` scenario in which **self-enhancement** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **self-enhancement**.
:::
::: solution
**self-enhancement** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `model-judges` is conflating it with a nearby but distinct concept. Check the definition of **LLM-as-judge** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **LLM-as-judge** as used in this chapter?
- [x] Using a strong model to grade outputs
- [ ] Two outputs presented to a judge; the judge chooses the better one
- [ ] Judges' tendency to favor one presentation order over the other
- [ ] Judges scoring outputs that resemble their own style higher
:::

::: summary
- **LLM-as-judge**: Using a strong model to grade outputs.
- **preference pair**: Two outputs presented to a judge; the judge chooses the better one.
- **position bias**: Judges' tendency to favor one presentation order over the other.
- **self-enhancement**: Judges scoring outputs that resemble their own style higher.
:::

::: history
The vocabulary of `model-judges` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **LLM-as-judge** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **preference pair** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **position bias** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **self-enhancement** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **LLM-as-judge** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **preference pair** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **position bias** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **self-enhancement** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the model-judges mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::