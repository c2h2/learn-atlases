# Browsing and computer use

Course: **agents** — chapter `computer-use`. Web agents, control of graphical interfaces and perception of screens.

::: definition browser automation
Driving a browser programmatically: navigate, click, type, extract. LLMs can plan and execute these actions from a natural-language goal.
:::

::: definition accessibility tree
A structured representation of a page that an LLM can reason over without vision.
:::

::: definition DOM
The document object model the browser exposes; agents often interact via DOM queries and event dispatch.
:::

::: definition screenshot
A rendered image of the page. Vision models read it to identify clickable regions and verify state changes.
:::

::: proposition
`computer-use` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `computer-use` without re-deriving every detail.
:::

::: example browser automation
Consider a concrete `computer-use` scenario in which **browser automation** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **browser automation**.
:::
::: solution
**browser automation** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example accessibility tree
Consider a concrete `computer-use` scenario in which **accessibility tree** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **accessibility tree**.
:::
::: solution
**accessibility tree** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example DOM
Consider a concrete `computer-use` scenario in which **DOM** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **DOM**.
:::
::: solution
**DOM** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example screenshot
Consider a concrete `computer-use` scenario in which **screenshot** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **screenshot**.
:::
::: solution
**screenshot** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `computer-use` is conflating it with a nearby but distinct concept. Check the definition of **browser automation** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **browser automation** as used in this chapter?
- [x] Driving a browser programmatically: navigate, click, type, extract
- [ ] A structured representation of a page that an LLM can reason over without vision
- [ ] The document object model the browser exposes; agents often interact via DOM queries and event dispatch
- [ ] A rendered image of the page
:::

::: summary
- **browser automation**: Driving a browser programmatically: navigate, click, type, extract.
- **accessibility tree**: A structured representation of a page that an LLM can reason over without vision.
- **DOM**: The document object model the browser exposes; agents often interact via DOM queries and event dispatch.
- **screenshot**: A rendered image of the page.
:::

::: history
The vocabulary of `computer-use` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **browser automation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **accessibility tree** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **DOM** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **screenshot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **browser automation** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **accessibility tree** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **DOM** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **screenshot** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the computer-use mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::