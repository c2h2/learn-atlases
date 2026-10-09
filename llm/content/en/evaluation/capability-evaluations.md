# Capability and dangerous-capability evaluations

Course: **evaluation** — chapter `capability-evaluations`. Eliciting capabilities, agentic tasks and evaluations for high-risk capabilities.

::: definition capability eval
A targeted test of a specific skill (coding, math, tool use).
:::

::: definition dangerous capability
A skill whose acquisition poses real-world risk (bio, cyber).
:::

::: definition asymptotic evaluation
Measuring performance at the limit of compute, to anticipate capabilities before deployment.
:::

::: proposition
`capability-evaluations` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `capability-evaluations` without re-deriving every detail.
:::

::: example capability eval
Consider a concrete `capability-evaluations` scenario in which **capability eval** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **capability eval**.
:::
::: solution
**capability eval** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example dangerous capability
Consider a concrete `capability-evaluations` scenario in which **dangerous capability** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **dangerous capability**.
:::
::: solution
**dangerous capability** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example asymptotic evaluation
Consider a concrete `capability-evaluations` scenario in which **asymptotic evaluation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **asymptotic evaluation**.
:::
::: solution
**asymptotic evaluation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example capability eval
Consider a concrete `capability-evaluations` scenario in which **capability eval** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **capability eval**.
:::
::: solution
**capability eval** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `capability-evaluations` is conflating it with a nearby but distinct concept. Check the definition of **capability eval** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **capability eval** as used in this chapter?
- [x] A targeted test of a specific skill (coding, math, tool use)
- [ ] A skill whose acquisition poses real-world risk (bio, cyber)
- [ ] Measuring performance at the limit of compute, to anticipate capabilities before deployment
:::

::: summary
- **capability eval**: A targeted test of a specific skill (coding, math, tool use).
- **dangerous capability**: A skill whose acquisition poses real-world risk (bio, cyber).
- **asymptotic evaluation**: Measuring performance at the limit of compute, to anticipate capabilities before deployment.
:::

::: history
The vocabulary of `capability-evaluations` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **capability eval** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **dangerous capability** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **asymptotic evaluation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **capability eval** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **dangerous capability** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **asymptotic evaluation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **capability eval** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **dangerous capability** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the capability-evaluations mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::