# Human evaluation and arenas

Course: **evaluation** — chapter `human-evaluation`. Pairwise comparisons, Elo and Bradley–Terry ratings, and their biases.

::: definition human evaluation
Asking people to judge outputs. Gold standard for open-ended tasks but expensive and noisy.
:::

::: definition inter-annotator agreement
How much human judgments agree; low agreement signals ambiguous criteria.
:::

::: definition arena
A platform where humans blind-compare outputs from different systems (e.g., Chatbot Arena).
:::

::: proposition
`human-evaluation` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `human-evaluation` without re-deriving every detail.
:::

::: example human evaluation
Consider a concrete `human-evaluation` scenario in which **human evaluation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **human evaluation**.
:::
::: solution
**human evaluation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example inter-annotator agreement
Consider a concrete `human-evaluation` scenario in which **inter-annotator agreement** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **inter-annotator agreement**.
:::
::: solution
**inter-annotator agreement** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example arena
Consider a concrete `human-evaluation` scenario in which **arena** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **arena**.
:::
::: solution
**arena** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example human evaluation
Consider a concrete `human-evaluation` scenario in which **human evaluation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **human evaluation**.
:::
::: solution
**human evaluation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `human-evaluation` is conflating it with a nearby but distinct concept. Check the definition of **human evaluation** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **human evaluation** as used in this chapter?
- [x] Asking people to judge outputs
- [ ] How much human judgments agree; low agreement signals ambiguous criteria
- [ ] A platform where humans blind-compare outputs from different systems (e
:::

::: summary
- **human evaluation**: Asking people to judge outputs.
- **inter-annotator agreement**: How much human judgments agree; low agreement signals ambiguous criteria.
- **arena**: A platform where humans blind-compare outputs from different systems (e.
:::

::: history
The vocabulary of `human-evaluation` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **human evaluation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **inter-annotator agreement** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **arena** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **human evaluation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **inter-annotator agreement** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **arena** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **human evaluation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **inter-annotator agreement** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the human-evaluation mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::