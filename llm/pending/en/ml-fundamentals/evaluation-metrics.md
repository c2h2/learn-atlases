# Evaluation and metrics

Course: **ml-fundamentals** — chapter `evaluation-metrics`. Accuracy, precision and recall, calibration, confidence intervals and comparing models fairly.

::: definition accuracy
Fraction of correct predictions.
:::

::: definition precision / recall
Of predicted positives, fraction correct / of true positives, fraction predicted.
:::

::: definition AUC
Area under the ROC curve; ranking quality across thresholds.
:::

::: proposition
`evaluation-metrics` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `evaluation-metrics` without re-deriving every detail.
:::

::: example accuracy
Consider a concrete `evaluation-metrics` scenario in which **accuracy** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **accuracy**.
:::
::: solution
**accuracy** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example precision / recall
Consider a concrete `evaluation-metrics` scenario in which **precision / recall** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **precision / recall**.
:::
::: solution
**precision / recall** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example AUC
Consider a concrete `evaluation-metrics` scenario in which **AUC** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **AUC**.
:::
::: solution
**AUC** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example accuracy
Consider a concrete `evaluation-metrics` scenario in which **accuracy** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **accuracy**.
:::
::: solution
**accuracy** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `evaluation-metrics` is conflating it with a nearby but distinct concept. Check the definition of **accuracy** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **accuracy** as used in this chapter?
- [x] Fraction of correct predictions
- [ ] Of predicted positives, fraction correct / of true positives, fraction predicted
- [ ] Area under the ROC curve; ranking quality across thresholds
:::

::: summary
- **accuracy**: Fraction of correct predictions.
- **precision / recall**: Of predicted positives, fraction correct / of true positives, fraction predicted.
- **AUC**: Area under the ROC curve; ranking quality across thresholds.
:::

::: history
The vocabulary of `evaluation-metrics` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **accuracy** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **precision / recall** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **AUC** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **accuracy** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **precision / recall** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **AUC** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **accuracy** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **precision / recall** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the evaluation-metrics mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::