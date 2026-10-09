# Benchmarks

Course: **evaluation** — chapter `benchmarks`. Knowledge, reasoning, coding and multilingual benchmarks and how they are scored.

::: definition training set
Examples used to fit model parameters.
:::

::: definition validation set
Held-out examples used to tune hyperparameters and select checkpoints.
:::

::: definition test set
Examples never used during training; the only fair basis for final comparison.
:::

::: definition held-out
Data excluded from training to estimate generalization.
:::

::: definition split
A partition of data into train/validation/test. Splits must be random and contamination-free.
:::

::: proposition
`benchmarks` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `benchmarks` without re-deriving every detail.
:::

::: example training set
Consider a concrete `benchmarks` scenario in which **training set** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **training set**.
:::
::: solution
**training set** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example validation set
Consider a concrete `benchmarks` scenario in which **validation set** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **validation set**.
:::
::: solution
**validation set** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example test set
Consider a concrete `benchmarks` scenario in which **test set** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **test set**.
:::
::: solution
**test set** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example held-out
Consider a concrete `benchmarks` scenario in which **held-out** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **held-out**.
:::
::: solution
**held-out** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `benchmarks` is conflating it with a nearby but distinct concept. Check the definition of **training set** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **training set** as used in this chapter?
- [x] Examples used to fit model parameters
- [ ] Held-out examples used to tune hyperparameters and select checkpoints
- [ ] Examples never used during training; the only fair basis for final comparison
- [ ] Data excluded from training to estimate generalization
:::

::: summary
- **training set**: Examples used to fit model parameters.
- **validation set**: Held-out examples used to tune hyperparameters and select checkpoints.
- **test set**: Examples never used during training; the only fair basis for final comparison.
- **held-out**: Data excluded from training to estimate generalization.
- **split**: A partition of data into train/validation/test.
:::

::: history
The vocabulary of `benchmarks` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **training set** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **validation set** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **test set** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **held-out** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **split** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **training set** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **validation set** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **test set** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the benchmarks mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::