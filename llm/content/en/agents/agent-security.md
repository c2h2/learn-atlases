# Agent evaluation and security

Course: **agents** — chapter `agent-security`. Benchmarks for agents, reliability, prompt injection and permissions.

::: definition prompt injection
A user or retrieved document containing instructions that hijack the agent's behavior.
:::

::: definition privilege escalation
An agent tricked into using a more powerful tool than the task warrants.
:::

::: definition data exfiltration
An agent leaking private context to an attacker via tool arguments or final response.
:::

::: definition guardrails
Runtime filters and policies that validate inputs, constrain tool access, and log every action for review.
:::

::: proposition
`agent-security` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `agent-security` without re-deriving every detail.
:::

::: example prompt injection
Consider a concrete `agent-security` scenario in which **prompt injection** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **prompt injection**.
:::
::: solution
**prompt injection** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example privilege escalation
Consider a concrete `agent-security` scenario in which **privilege escalation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **privilege escalation**.
:::
::: solution
**privilege escalation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example data exfiltration
Consider a concrete `agent-security` scenario in which **data exfiltration** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **data exfiltration**.
:::
::: solution
**data exfiltration** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example guardrails
Consider a concrete `agent-security` scenario in which **guardrails** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **guardrails**.
:::
::: solution
**guardrails** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `agent-security` is conflating it with a nearby but distinct concept. Check the definition of **prompt injection** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **prompt injection** as used in this chapter?
- [x] A user or retrieved document containing instructions that hijack the agent's behavior
- [ ] An agent tricked into using a more powerful tool than the task warrants
- [ ] An agent leaking private context to an attacker via tool arguments or final response
- [ ] Runtime filters and policies that validate inputs, constrain tool access, and log every action for review
:::

::: summary
- **prompt injection**: A user or retrieved document containing instructions that hijack the agent's behavior.
- **privilege escalation**: An agent tricked into using a more powerful tool than the task warrants.
- **data exfiltration**: An agent leaking private context to an attacker via tool arguments or final response.
- **guardrails**: Runtime filters and policies that validate inputs, constrain tool access, and log every action for review.
:::

::: history
The vocabulary of `agent-security` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **prompt injection** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **privilege escalation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **data exfiltration** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **guardrails** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **prompt injection** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **privilege escalation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **data exfiltration** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **guardrails** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the agent-security mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::