# Function calling and tools

Course: **agents** — chapter `function-calling`. Tool schemas, calling conventions and training models to use tools.

::: definition function calling
The practice of exposing typed API signatures to an LLM so it can decide when to invoke them. The model emits a structured tool call (name, JSON arguments); the runtime executes it and returns a result the model can use.
:::

::: definition tool schema
The JSON schema describing a callable: its name, parameter types, required fields, and a natural-language description the model reads to decide applicability.
:::

::: definition arguments
The JSON object the model produces to fill the schema parameters. Validation errors fall back to retries or graceful refusals.
:::

::: definition result
The value the runtime returns after executing the call. Well-typed results let the model compose further calls or answer from them.
:::

::: definition parallel calls
When an LLM emits multiple independent tool calls in one turn. The runtime may execute them concurrently; dependent calls must be sequenced.
:::

::: definition tool choice
The policy for whether the model may, must, or must not call tools. 'auto' lets the model decide; 'required' forces a call; 'none' disables it.
:::

::: proposition
`function-calling` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `function-calling` without re-deriving every detail.
:::

::: example function calling
Consider a concrete `function-calling` scenario in which **function calling** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **function calling**.
:::
::: solution
**function calling** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example tool schema
Consider a concrete `function-calling` scenario in which **tool schema** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **tool schema**.
:::
::: solution
**tool schema** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example arguments
Consider a concrete `function-calling` scenario in which **arguments** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **arguments**.
:::
::: solution
**arguments** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example result
Consider a concrete `function-calling` scenario in which **result** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **result**.
:::
::: solution
**result** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `function-calling` is conflating it with a nearby but distinct concept. Check the definition of **function calling** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **function calling** as used in this chapter?
- [x] The practice of exposing typed API signatures to an LLM so it can decide when to invoke them
- [ ] The JSON schema describing a callable: its name, parameter types, required fields, and a natural-language description the model reads to decide applicability
- [ ] The JSON object the model produces to fill the schema parameters
- [ ] The value the runtime returns after executing the call
:::

::: summary
- **function calling**: The practice of exposing typed API signatures to an LLM so it can decide when to invoke them.
- **tool schema**: The JSON schema describing a callable: its name, parameter types, required fields, and a natural-language description the model reads to decide applicability.
- **arguments**: The JSON object the model produces to fill the schema parameters.
- **result**: The value the runtime returns after executing the call.
- **parallel calls**: When an LLM emits multiple independent tool calls in one turn.
- **tool choice**: The policy for whether the model may, must, or must not call tools.
:::

::: history
The vocabulary of `function-calling` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **function calling** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **tool schema** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **arguments** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **result** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **parallel calls** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **tool choice** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **function calling** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **tool schema** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the function-calling mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::