# Reinforcement learning for language models

Course: **post-training** — chapter `rl-for-language-models`. Policies, rewards, policy gradients and the KL-regularised objective.

::: definition RL
Reinforcement learning: optimize an expected reward by adjusting the policy.
:::

::: definition policy
The LLM itself: maps state (prompt + history) to distribution over next tokens.
:::

::: definition reward
Scalar signal measuring outcome quality.
:::

::: proposition
`rl-for-language-models` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `rl-for-language-models` without re-deriving every detail.
:::

::: example RL
Consider a concrete `rl-for-language-models` scenario in which **RL** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RL**.
:::
::: solution
**RL** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example policy
Consider a concrete `rl-for-language-models` scenario in which **policy** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **policy**.
:::
::: solution
**policy** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example reward
Consider a concrete `rl-for-language-models` scenario in which **reward** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **reward**.
:::
::: solution
**reward** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example RL
Consider a concrete `rl-for-language-models` scenario in which **RL** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RL**.
:::
::: solution
**RL** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `rl-for-language-models` is conflating it with a nearby but distinct concept. Check the definition of **RL** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **RL** as used in this chapter?
- [x] Reinforcement learning: optimize an expected reward by adjusting the policy
- [ ] The LLM itself: maps state (prompt + history) to distribution over next tokens
- [ ] Scalar signal measuring outcome quality
:::

::: summary
- **RL**: Reinforcement learning: optimize an expected reward by adjusting the policy.
- **policy**: The LLM itself: maps state (prompt + history) to distribution over next tokens.
- **reward**: Scalar signal measuring outcome quality.
:::

::: history
The vocabulary of `rl-for-language-models` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **RL** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **policy** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **reward** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **RL** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **policy** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **reward** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **RL** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **policy** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the rl-for-language-models mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::