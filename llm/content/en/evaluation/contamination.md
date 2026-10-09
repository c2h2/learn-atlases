# Contamination and saturation

Course: **evaluation** — chapter `contamination`. Test-set leakage, how to detect it, and the life cycle of benchmarks.

::: definition leakage
Any path by which test information reaches training, including through web crawls.
:::

::: definition deduplication
Removing exact and near-duplicate items so the model cannot memorize test items.
:::

::: definition contamination check
Detecting overlap between training corpora and benchmark items via n-gram overlap or model perplexity probes.
:::

::: proposition
`contamination` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `contamination` without re-deriving every detail.
:::

::: example leakage
Consider a concrete `contamination` scenario in which **leakage** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **leakage**.
:::
::: solution
**leakage** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example deduplication
Consider a concrete `contamination` scenario in which **deduplication** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **deduplication**.
:::
::: solution
**deduplication** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example contamination check
Consider a concrete `contamination` scenario in which **contamination check** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **contamination check**.
:::
::: solution
**contamination check** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example leakage
Consider a concrete `contamination` scenario in which **leakage** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **leakage**.
:::
::: solution
**leakage** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `contamination` is conflating it with a nearby but distinct concept. Check the definition of **leakage** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **leakage** as used in this chapter?
- [x] Any path by which test information reaches training, including through web crawls
- [ ] Removing exact and near-duplicate items so the model cannot memorize test items
- [ ] Detecting overlap between training corpora and benchmark items via n-gram overlap or model perplexity probes
:::

::: summary
- **leakage**: Any path by which test information reaches training, including through web crawls.
- **deduplication**: Removing exact and near-duplicate items so the model cannot memorize test items.
- **contamination check**: Detecting overlap between training corpora and benchmark items via n-gram overlap or model perplexity probes.
:::

::: history
The vocabulary of `contamination` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **leakage** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **deduplication** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **contamination check** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **leakage** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **deduplication** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **contamination check** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **leakage** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **deduplication** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the contamination mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::