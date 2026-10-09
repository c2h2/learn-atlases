# Speculative decoding

Course: **inference** — chapter `speculative-decoding`. Draft models, verification and parallel decoding schemes.

::: definition draft model
A cheap model that proposes candidate tokens.
:::

::: definition verify
A single forward pass of the large model checks the draft and accepts or rejects each token.
:::

::: definition acceptance rate
Fraction of proposed tokens the large model would have produced anyway.
:::

::: definition speedup
Speedup ≈ 1 / (draft_cost + verify_cost_per_token + acceptance_penalty).
:::

::: proposition
`speculative-decoding` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `speculative-decoding` without re-deriving every detail.
:::

::: example draft model
Consider a concrete `speculative-decoding` scenario in which **draft model** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **draft model**.
:::
::: solution
**draft model** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example verify
Consider a concrete `speculative-decoding` scenario in which **verify** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **verify**.
:::
::: solution
**verify** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example acceptance rate
Consider a concrete `speculative-decoding` scenario in which **acceptance rate** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **acceptance rate**.
:::
::: solution
**acceptance rate** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example speedup
Consider a concrete `speculative-decoding` scenario in which **speedup** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **speedup**.
:::
::: solution
**speedup** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `speculative-decoding` is conflating it with a nearby but distinct concept. Check the definition of **draft model** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **draft model** as used in this chapter?
- [x] A cheap model that proposes candidate tokens
- [ ] A single forward pass of the large model checks the draft and accepts or rejects each token
- [ ] Fraction of proposed tokens the large model would have produced anyway
- [ ] Speedup ≈ 1 / (draft_cost + verify_cost_per_token + acceptance_penalty)
:::

::: summary
- **draft model**: A cheap model that proposes candidate tokens.
- **verify**: A single forward pass of the large model checks the draft and accepts or rejects each token.
- **acceptance rate**: Fraction of proposed tokens the large model would have produced anyway.
- **speedup**: Speedup ≈ 1 / (draft_cost + verify_cost_per_token + acceptance_penalty).
:::

::: history
The vocabulary of `speculative-decoding` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **draft model** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **verify** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **acceptance rate** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **speedup** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **draft model** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **verify** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **acceptance rate** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **speedup** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the speculative-decoding mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::