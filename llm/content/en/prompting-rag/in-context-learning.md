# In-context learning

Course: **prompting-rag** — chapter `in-context-learning`. Zero- and few-shot prompting, and theories of why in-context learning works.

::: definition ICL
The model learns a task from examples in the prompt without gradient updates.
:::

::: definition few-shot
A prompt containing 1-100 examples.
:::

::: definition zero-shot
Task described only via instructions, no examples.
:::

::: proposition
`in-context-learning` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `in-context-learning` without re-deriving every detail.
:::

::: example ICL
Consider a concrete `in-context-learning` scenario in which **ICL** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **ICL**.
:::
::: solution
**ICL** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example few-shot
Consider a concrete `in-context-learning` scenario in which **few-shot** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **few-shot**.
:::
::: solution
**few-shot** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example zero-shot
Consider a concrete `in-context-learning` scenario in which **zero-shot** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **zero-shot**.
:::
::: solution
**zero-shot** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example ICL
Consider a concrete `in-context-learning` scenario in which **ICL** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **ICL**.
:::
::: solution
**ICL** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `in-context-learning` is conflating it with a nearby but distinct concept. Check the definition of **ICL** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **ICL** as used in this chapter?
- [x] The model learns a task from examples in the prompt without gradient updates
- [ ] A prompt containing 1-100 examples
- [ ] Task described only via instructions, no examples
:::

::: summary
- **ICL**: The model learns a task from examples in the prompt without gradient updates.
- **few-shot**: A prompt containing 1-100 examples.
- **zero-shot**: Task described only via instructions, no examples.
:::

::: history
The vocabulary of `in-context-learning` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **ICL** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **few-shot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **zero-shot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **ICL** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **few-shot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **zero-shot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **ICL** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **few-shot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the in-context-learning mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::