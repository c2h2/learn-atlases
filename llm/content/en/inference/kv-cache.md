# The key–value cache

Course: **inference** — chapter `kv-cache`. Incremental decoding, the memory of the cache, and multi-query and grouped-query attention at inference time.

::: definition KV cache
Per-layer store of past keys and values so the model need not recompute them at each generation step.
:::

::: definition prefill
The first forward pass that processes the entire prompt and populates the KV cache.
:::

::: definition decode step
Each subsequent forward pass that produces one new token using the cache.
:::

::: definition cache size
Roughly 2 × layers × hidden_dim × context_length × batch × bytes_per_element.
:::

::: proposition
`kv-cache` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `kv-cache` without re-deriving every detail.
:::

::: example KV cache
Consider a concrete `kv-cache` scenario in which **KV cache** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **KV cache**.
:::
::: solution
**KV cache** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example prefill
Consider a concrete `kv-cache` scenario in which **prefill** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **prefill**.
:::
::: solution
**prefill** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example decode step
Consider a concrete `kv-cache` scenario in which **decode step** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **decode step**.
:::
::: solution
**decode step** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example cache size
Consider a concrete `kv-cache` scenario in which **cache size** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **cache size**.
:::
::: solution
**cache size** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `kv-cache` is conflating it with a nearby but distinct concept. Check the definition of **KV cache** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **KV cache** as used in this chapter?
- [x] Per-layer store of past keys and values so the model need not recompute them at each generation step
- [ ] The first forward pass that processes the entire prompt and populates the KV cache
- [ ] Each subsequent forward pass that produces one new token using the cache
- [ ] Roughly 2 × layers × hidden_dim × context_length × batch × bytes_per_element
:::

::: summary
- **KV cache**: Per-layer store of past keys and values so the model need not recompute them at each generation step.
- **prefill**: The first forward pass that processes the entire prompt and populates the KV cache.
- **decode step**: Each subsequent forward pass that produces one new token using the cache.
- **cache size**: Roughly 2 × layers × hidden_dim × context_length × batch × bytes_per_element.
:::

::: history
The vocabulary of `kv-cache` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **KV cache** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **prefill** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **decode step** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **cache size** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **KV cache** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **prefill** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **decode step** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **cache size** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the kv-cache mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::