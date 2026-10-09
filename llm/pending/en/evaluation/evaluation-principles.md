# Principles of evaluation

Course: **evaluation** — chapter `evaluation-principles`. What to measure, validity, and the gap between benchmarks and real use.

::: definition benchmark
A dataset plus metric plus protocol used to compare systems. A benchmark is only as good as the validity of its measurement.
:::

::: definition metric
The scalar (accuracy, F1, BLEU, etc.) or rubric score computed from outputs. Choose metrics to reflect the task's true success criterion.
:::

::: definition variance
How much the metric moves across seeds, splits, and prompts. High variance means noisy comparisons.
:::

::: definition saturation
When top systems cluster near the maximum score, the benchmark no longer discriminates.
:::

::: definition contamination
Test items leaking into training data, inflating scores.
:::

::: proposition
`evaluation-principles` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `evaluation-principles` without re-deriving every detail.
:::

::: example benchmark
Consider a concrete `evaluation-principles` scenario in which **benchmark** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **benchmark**.
:::
::: solution
**benchmark** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example metric
Consider a concrete `evaluation-principles` scenario in which **metric** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **metric**.
:::
::: solution
**metric** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example variance
Consider a concrete `evaluation-principles` scenario in which **variance** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **variance**.
:::
::: solution
**variance** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example saturation
Consider a concrete `evaluation-principles` scenario in which **saturation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **saturation**.
:::
::: solution
**saturation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `evaluation-principles` is conflating it with a nearby but distinct concept. Check the definition of **benchmark** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **benchmark** as used in this chapter?
- [x] A dataset plus metric plus protocol used to compare systems
- [ ] The scalar (accuracy, F1, BLEU, etc
- [ ] How much the metric moves across seeds, splits, and prompts
- [ ] When top systems cluster near the maximum score, the benchmark no longer discriminates
:::

::: summary
- **benchmark**: A dataset plus metric plus protocol used to compare systems.
- **metric**: The scalar (accuracy, F1, BLEU, etc.
- **variance**: How much the metric moves across seeds, splits, and prompts.
- **saturation**: When top systems cluster near the maximum score, the benchmark no longer discriminates.
- **contamination**: Test items leaking into training data, inflating scores.
:::

::: history
The vocabulary of `evaluation-principles` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **benchmark** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **metric** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **variance** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **saturation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **contamination** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **benchmark** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **metric** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **variance** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the evaluation-principles mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::