# Statistics of evaluation

Course: **evaluation** — chapter `evaluation-statistics`. Confidence intervals and significance, variance across seeds and prompts, and calibration.

::: definition statistical significance
Whether a performance gap is larger than measurement noise.
:::

::: definition confidence interval
The range of values consistent with the data at a given confidence level.
:::

::: definition power
Probability of detecting a real difference. Low power leads to false 'ties'.
:::

::: proposition
`evaluation-statistics` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `evaluation-statistics` without re-deriving every detail.
:::

::: example statistical significance
Consider a concrete `evaluation-statistics` scenario in which **statistical significance** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **statistical significance**.
:::
::: solution
**statistical significance** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example confidence interval
Consider a concrete `evaluation-statistics` scenario in which **confidence interval** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **confidence interval**.
:::
::: solution
**confidence interval** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example power
Consider a concrete `evaluation-statistics` scenario in which **power** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **power**.
:::
::: solution
**power** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example statistical significance
Consider a concrete `evaluation-statistics` scenario in which **statistical significance** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **statistical significance**.
:::
::: solution
**statistical significance** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `evaluation-statistics` is conflating it with a nearby but distinct concept. Check the definition of **statistical significance** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **statistical significance** as used in this chapter?
- [x] Whether a performance gap is larger than measurement noise
- [ ] The range of values consistent with the data at a given confidence level
- [ ] Probability of detecting a real difference
:::

::: summary
- **statistical significance**: Whether a performance gap is larger than measurement noise.
- **confidence interval**: The range of values consistent with the data at a given confidence level.
- **power**: Probability of detecting a real difference.
:::

::: history
The vocabulary of `evaluation-statistics` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **statistical significance** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **confidence interval** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **power** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **statistical significance** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **confidence interval** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **power** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **statistical significance** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **confidence interval** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the evaluation-statistics mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::