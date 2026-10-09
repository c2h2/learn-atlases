# Multi-agent systems

Course: **agents** — chapter `multi-agent-systems`. Orchestrators and workers, and debate and cooperation between agents.

::: definition multi-agent system
Several agents with distinct roles (planner, executor, critic) cooperating on a task.
:::

::: definition role
An agent's assigned responsibility and voice, often set via system prompt.
:::

::: definition communication
Message passing between agents. Structured protocols (JSON, function calls) beat free-form prose for reliability.
:::

::: definition orchestration
A meta-agent that dispatches subtasks to specialists and aggregates results.
:::

::: proposition
`multi-agent-systems` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `multi-agent-systems` without re-deriving every detail.
:::

::: example multi-agent system
Consider a concrete `multi-agent-systems` scenario in which **multi-agent system** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **multi-agent system**.
:::
::: solution
**multi-agent system** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example role
Consider a concrete `multi-agent-systems` scenario in which **role** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **role**.
:::
::: solution
**role** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example communication
Consider a concrete `multi-agent-systems` scenario in which **communication** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **communication**.
:::
::: solution
**communication** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example orchestration
Consider a concrete `multi-agent-systems` scenario in which **orchestration** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **orchestration**.
:::
::: solution
**orchestration** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `multi-agent-systems` is conflating it with a nearby but distinct concept. Check the definition of **multi-agent system** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **multi-agent system** as used in this chapter?
- [x] Several agents with distinct roles (planner, executor, critic) cooperating on a task
- [ ] An agent's assigned responsibility and voice, often set via system prompt
- [ ] Message passing between agents
- [ ] A meta-agent that dispatches subtasks to specialists and aggregates results
:::

::: summary
- **multi-agent system**: Several agents with distinct roles (planner, executor, critic) cooperating on a task.
- **role**: An agent's assigned responsibility and voice, often set via system prompt.
- **communication**: Message passing between agents.
- **orchestration**: A meta-agent that dispatches subtasks to specialists and aggregates results.
:::

::: history
The vocabulary of `multi-agent-systems` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **multi-agent system** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **role** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **communication** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **orchestration** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **multi-agent system** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **role** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **communication** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **orchestration** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the multi-agent-systems mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::