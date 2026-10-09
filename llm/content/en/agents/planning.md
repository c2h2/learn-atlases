# Planning and task decomposition

Course: **agents** — chapter `planning`. Plans and subgoals, reflection, and recovering from errors.

::: definition task decomposition
Splitting a goal into sub-goals the agent can execute. Recursive decomposition turns a vague request into concrete tool calls.
:::

::: definition planning horizon
How many steps ahead the agent reasons. Longer horizons enable multi-step plans but increase the chance of compounding errors.
:::

::: definition re-planning
Discarding or amending the current plan when observations invalidate it.
:::

::: definition backtracking
Returning to an earlier state and trying an alternative branch when a plan fails.
:::

::: proposition
`planning` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `planning` without re-deriving every detail.
:::

::: example task decomposition
Consider a concrete `planning` scenario in which **task decomposition** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **task decomposition**.
:::
::: solution
**task decomposition** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example planning horizon
Consider a concrete `planning` scenario in which **planning horizon** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **planning horizon**.
:::
::: solution
**planning horizon** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example re-planning
Consider a concrete `planning` scenario in which **re-planning** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **re-planning**.
:::
::: solution
**re-planning** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example backtracking
Consider a concrete `planning` scenario in which **backtracking** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **backtracking**.
:::
::: solution
**backtracking** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `planning` is conflating it with a nearby but distinct concept. Check the definition of **task decomposition** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **task decomposition** as used in this chapter?
- [x] Splitting a goal into sub-goals the agent can execute
- [ ] How many steps ahead the agent reasons
- [ ] Discarding or amending the current plan when observations invalidate it
- [ ] Returning to an earlier state and trying an alternative branch when a plan fails
:::

::: summary
- **task decomposition**: Splitting a goal into sub-goals the agent can execute.
- **planning horizon**: How many steps ahead the agent reasons.
- **re-planning**: Discarding or amending the current plan when observations invalidate it.
- **backtracking**: Returning to an earlier state and trying an alternative branch when a plan fails.
:::

::: history
The vocabulary of `planning` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **task decomposition** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **planning horizon** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **re-planning** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **backtracking** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **task decomposition** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **planning horizon** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **re-planning** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **backtracking** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the planning mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::