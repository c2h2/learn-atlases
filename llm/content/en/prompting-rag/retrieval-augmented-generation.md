# Retrieval-augmented generation

Course: **prompting-rag** — chapter `retrieval-augmented-generation`. Chunking, retrieval, reranking and grounding answers in sources.

::: definition RAG
Grounding LLM output in retrieved documents.
:::

::: definition retriever
Component that finds candidate documents (BM25, dense encoder, hybrid).
:::

::: definition reranker
Second-stage model that re-orders candidates by relevance.
:::

::: proposition
`retrieval-augmented-generation` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `retrieval-augmented-generation` without re-deriving every detail.
:::

::: example RAG
Consider a concrete `retrieval-augmented-generation` scenario in which **RAG** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RAG**.
:::
::: solution
**RAG** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example retriever
Consider a concrete `retrieval-augmented-generation` scenario in which **retriever** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **retriever**.
:::
::: solution
**retriever** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example reranker
Consider a concrete `retrieval-augmented-generation` scenario in which **reranker** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **reranker**.
:::
::: solution
**reranker** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example RAG
Consider a concrete `retrieval-augmented-generation` scenario in which **RAG** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **RAG**.
:::
::: solution
**RAG** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `retrieval-augmented-generation` is conflating it with a nearby but distinct concept. Check the definition of **RAG** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **RAG** as used in this chapter?
- [x] Grounding LLM output in retrieved documents
- [ ] Component that finds candidate documents (BM25, dense encoder, hybrid)
- [ ] Second-stage model that re-orders candidates by relevance
:::

::: summary
- **RAG**: Grounding LLM output in retrieved documents.
- **retriever**: Component that finds candidate documents (BM25, dense encoder, hybrid).
- **reranker**: Second-stage model that re-orders candidates by relevance.
:::

::: history
The vocabulary of `retrieval-augmented-generation` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **RAG** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **retriever** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **reranker** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **RAG** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **retriever** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **reranker** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **RAG** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **retriever** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the retrieval-augmented-generation mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::