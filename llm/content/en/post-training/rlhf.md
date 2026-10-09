# Reinforcement learning from human feedback

Course: **post-training** — chapter `rlhf`. The RLHF pipeline with PPO, its practical difficulties and what it changes in a model.

::: definition RLHF
Reinforcement learning from human feedback: train a reward model from preferences, then optimize the policy against it.
:::

::: definition PPO
Proximal policy optimization; a clipped-update RL algorithm.
:::

::: definition KL penalty
Term that anchors the policy near the reference (pre-RLHF) model.
:::

::: proposition
`rlhf` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `rlhf` without re-deriving every detail.
:::

::: example RLHF
Consider a concrete `rlhf` scenario in which **RLHF** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RLHF**.
:::
::: solution
**RLHF** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example PPO
Consider a concrete `rlhf` scenario in which **PPO** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **PPO**.
:::
::: solution
**PPO** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example KL penalty
Consider a concrete `rlhf` scenario in which **KL penalty** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **KL penalty**.
:::
::: solution
**KL penalty** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example RLHF
Consider a concrete `rlhf` scenario in which **RLHF** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RLHF**.
:::
::: solution
**RLHF** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `rlhf` is conflating it with a nearby but distinct concept. Check the definition of **RLHF** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **RLHF** as used in this chapter?
- [x] Reinforcement learning from human feedback: train a reward model from preferences, then optimize the policy against it
- [ ] Proximal policy optimization; a clipped-update RL algorithm
- [ ] Term that anchors the policy near the reference (pre-RLHF) model
:::

::: summary
- **RLHF**: Reinforcement learning from human feedback: train a reward model from preferences, then optimize the policy against it.
- **PPO**: Proximal policy optimization; a clipped-update RL algorithm.
- **KL penalty**: Term that anchors the policy near the reference (pre-RLHF) model.
:::

::: history
The vocabulary of `rlhf` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **RLHF** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **PPO** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **KL penalty** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **RLHF** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **PPO** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **KL penalty** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **RLHF** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **PPO** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the rlhf mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::