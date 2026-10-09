# Agent loops

Course: **agents** — chapter `agent-loops`. ReAct, observation–action cycles and the design of agent scaffolds.

::: definition agent loop
The control structure that turns a single-shot LLM into an agent: plan, act, observe, reflect, repeat until the goal is met or budget is exhausted.
:::

::: definition plan
A short sequence of intended actions the model produces before executing them. Plans are revised as new observations arrive.
:::

::: definition observation
The result returned from the environment after each action; the agent conditions on it to decide the next step.
:::

::: definition reflection
A self-evaluation step where the agent critiques its own trajectory to detect dead ends and revise strategy.
:::

::: definition stopping criterion
The condition that ends the loop: success signal, budget exhaustion, loop detection, or a hard timeout.
:::

::: proposition
`agent-loops` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `agent-loops` without re-deriving every detail.
:::

::: example agent loop
Consider a concrete `agent-loops` scenario in which **agent loop** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **agent loop**.
:::
::: solution
**agent loop** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example plan
Consider a concrete `agent-loops` scenario in which **plan** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **plan**.
:::
::: solution
**plan** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example observation
Consider a concrete `agent-loops` scenario in which **observation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **observation**.
:::
::: solution
**observation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example reflection
Consider a concrete `agent-loops` scenario in which **reflection** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **reflection**.
:::
::: solution
**reflection** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `agent-loops` is conflating it with a nearby but distinct concept. Check the definition of **agent loop** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **agent loop** as used in this chapter?
- [x] The control structure that turns a single-shot LLM into an agent: plan, act, observe, reflect, repeat until the goal is met or budget is exhausted
- [ ] A short sequence of intended actions the model produces before executing them
- [ ] The result returned from the environment after each action; the agent conditions on it to decide the next step
- [ ] A self-evaluation step where the agent critiques its own trajectory to detect dead ends and revise strategy
:::

::: summary
- **agent loop**: The control structure that turns a single-shot LLM into an agent: plan, act, observe, reflect, repeat until the goal is met or budget is exhausted.
- **plan**: A short sequence of intended actions the model produces before executing them.
- **observation**: The result returned from the environment after each action; the agent conditions on it to decide the next step.
- **reflection**: A self-evaluation step where the agent critiques its own trajectory to detect dead ends and revise strategy.
- **stopping criterion**: The condition that ends the loop: success signal, budget exhaustion, loop detection, or a hard timeout.
:::

::: history
The vocabulary of `agent-loops` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **agent loop** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **plan** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **observation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **reflection** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **stopping criterion** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **agent loop** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **plan** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **observation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the agent-loops mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::