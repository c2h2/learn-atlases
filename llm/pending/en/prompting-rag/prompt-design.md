# Prompt design

Course: **prompting-rag** — chapter `prompt-design`. Instructions, examples, roles and formatting, and systematic prompt engineering.

::: definition system prompt
Instruction that sets role and rules.
:::

::: definition user prompt
The task or question.
:::

::: definition chain-of-thought
Prompt that elicits step-by-step reasoning before the answer.
:::

::: proposition
`prompt-design` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `prompt-design` without re-deriving every detail.
:::

::: example system prompt
Consider a concrete `prompt-design` scenario in which **system prompt** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **system prompt**.
:::
::: solution
**system prompt** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example user prompt
Consider a concrete `prompt-design` scenario in which **user prompt** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **user prompt**.
:::
::: solution
**user prompt** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example chain-of-thought
Consider a concrete `prompt-design` scenario in which **chain-of-thought** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **chain-of-thought**.
:::
::: solution
**chain-of-thought** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example system prompt
Consider a concrete `prompt-design` scenario in which **system prompt** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **system prompt**.
:::
::: solution
**system prompt** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `prompt-design` is conflating it with a nearby but distinct concept. Check the definition of **system prompt** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **system prompt** as used in this chapter?
- [x] Instruction that sets role and rules
- [ ] The task or question
- [ ] Prompt that elicits step-by-step reasoning before the answer
:::

::: summary
- **system prompt**: Instruction that sets role and rules.
- **user prompt**: The task or question.
- **chain-of-thought**: Prompt that elicits step-by-step reasoning before the answer.
:::

::: history
The vocabulary of `prompt-design` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **system prompt** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **user prompt** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **chain-of-thought** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **system prompt** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **user prompt** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **chain-of-thought** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **system prompt** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **user prompt** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the prompt-design mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::