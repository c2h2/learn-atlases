# Code generation and execution

Course: **agents** — chapter `code-agents`. Code models, sandboxes, software-engineering agents and their benchmarks.

::: definition code generation
LLM writing source code from a natural-language specification.
:::

::: definition execution
Running generated code in a sandbox to observe results and feed them back to the model.
:::

::: definition test-driven generation
The agent writes tests first, then code, then iterates until tests pass.
:::

::: definition sandbox
An isolated environment (container, WASM, restricted process) where generated code can run without endangering the host.
:::

::: proposition
`code-agents` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `code-agents` without re-deriving every detail.
:::

::: example code generation
Consider a concrete `code-agents` scenario in which **code generation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **code generation**.
:::
::: solution
**code generation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example execution
Consider a concrete `code-agents` scenario in which **execution** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **execution**.
:::
::: solution
**execution** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example test-driven generation
Consider a concrete `code-agents` scenario in which **test-driven generation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **test-driven generation**.
:::
::: solution
**test-driven generation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example sandbox
Consider a concrete `code-agents` scenario in which **sandbox** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **sandbox**.
:::
::: solution
**sandbox** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `code-agents` is conflating it with a nearby but distinct concept. Check the definition of **code generation** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **code generation** as used in this chapter?
- [x] LLM writing source code from a natural-language specification
- [ ] Running generated code in a sandbox to observe results and feed them back to the model
- [ ] The agent writes tests first, then code, then iterates until tests pass
- [ ] An isolated environment (container, WASM, restricted process) where generated code can run without endangering the host
:::

::: summary
- **code generation**: LLM writing source code from a natural-language specification.
- **execution**: Running generated code in a sandbox to observe results and feed them back to the model.
- **test-driven generation**: The agent writes tests first, then code, then iterates until tests pass.
- **sandbox**: An isolated environment (container, WASM, restricted process) where generated code can run without endangering the host.
:::

::: history
The vocabulary of `code-agents` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **code generation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **execution** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **test-driven generation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **sandbox** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **code generation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **execution** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **test-driven generation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **sandbox** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the code-agents mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::