# Memory and context management

Course: **agents** — chapter `memory-context`. Short- and long-term memory, summarisation and context engineering.

::: definition short-term memory
The conversation window itself. Everything the model attends to in the current forward pass.
:::

::: definition long-term memory
External stores the agent retrieves from across sessions: vector databases, knowledge graphs, or structured records.
:::

::: definition context management
Summarization, pruning, and retrieval strategies that keep the window within token limits while preserving task-relevant state.
:::

::: definition scratchpad
A private reasoning channel (CoT, ReAct trace) the agent uses to plan before acting. Usually excluded from the user-visible response.
:::

::: proposition
`memory-context` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `memory-context` without re-deriving every detail.
:::

::: example short-term memory
Consider a concrete `memory-context` scenario in which **short-term memory** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **short-term memory**.
:::
::: solution
**short-term memory** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example long-term memory
Consider a concrete `memory-context` scenario in which **long-term memory** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **long-term memory**.
:::
::: solution
**long-term memory** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example context management
Consider a concrete `memory-context` scenario in which **context management** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **context management**.
:::
::: solution
**context management** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example scratchpad
Consider a concrete `memory-context` scenario in which **scratchpad** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **scratchpad**.
:::
::: solution
**scratchpad** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `memory-context` is conflating it with a nearby but distinct concept. Check the definition of **short-term memory** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **short-term memory** as used in this chapter?
- [x] The conversation window itself
- [ ] External stores the agent retrieves from across sessions: vector databases, knowledge graphs, or structured records
- [ ] Summarization, pruning, and retrieval strategies that keep the window within token limits while preserving task-relevant state
- [ ] A private reasoning channel (CoT, ReAct trace) the agent uses to plan before acting
:::

::: summary
- **short-term memory**: The conversation window itself.
- **long-term memory**: External stores the agent retrieves from across sessions: vector databases, knowledge graphs, or structured records.
- **context management**: Summarization, pruning, and retrieval strategies that keep the window within token limits while preserving task-relevant state.
- **scratchpad**: A private reasoning channel (CoT, ReAct trace) the agent uses to plan before acting.
:::

::: history
The vocabulary of `memory-context` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **short-term memory** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **long-term memory** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **context management** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **scratchpad** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **short-term memory** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **long-term memory** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **context management** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **scratchpad** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the memory-context mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::