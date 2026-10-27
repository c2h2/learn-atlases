A language model produces text and nothing else. It cannot look up today's exchange rate, read a file, query a database or send a message. Yet assistants built on language models do all of these things, and the mechanism is almost embarrassingly simple: the model writes a short, structured request — *call the function `convert` with these arguments* — and an ordinary program reads that request, runs the function, and pastes the result back into the model's context. The model then continues, now with information it could not have produced itself. This is **function calling**, or **tool use**, and it is the foundation on which every agent in this course is built.

The idea has three parts, and this chapter takes them in turn. The first is the *interface*: how a tool is described to a model (a name, a description and a schema for its arguments), what a call and a result look like, and how several calls can be issued at once. The second is the *runtime*: the code around the model that validates arguments, executes calls, handles errors and decides which tools to offer — the part that makes tool use reliable, and the part most often neglected. The third is *training*: how models learn when to call a tool and how to fill in its arguments, from Toolformer's self-supervised filtering to fine-tuning on large collections of real interfaces, and how that skill is measured. A short plain-Python listing implements a tool registry, a schema validator and a dispatcher, so that every step is concrete. Function calling is structured output ([[prompting-rag/structured-output]]) whose schema describes a function's arguments; we rely on that chapter for schemas and constrained decoding and do not repeat it.

## Tools and calls {#sec-tools}

A **tool** is anything a program can do on the model's behalf: a pure function (arithmetic, unit conversion), a read-only lookup (search, a database query, reading a file), or an action with side effects (writing a file, sending an email, making a payment). To the model a tool is only a description; to the runtime it is code.

::: definition Tool, tool call and tool result {#def-tool}
A **tool** is a triple $(n, d, S)$ of a unique **name** $n$, a natural-language **description** $d$, and a **parameter schema** $S$ — a JSON Schema ([[prompting-rag/structured-output#def-schema]]) describing an object of arguments — together with an implementation $f$ that the runtime, not the model, executes. A **tool call** is a structured message $(\iota, n, a)$ emitted by the model, with a call identifier $\iota$, a tool name $n$ and an argument object $a$. The call is **well formed** if $n$ names an offered tool and $a$ validates against its schema $S$. The **tool result** is a message $(\iota, y)$ carrying the same identifier and either the output $y = f(a)$ or an error description.
:::

The identifier matters as soon as a model issues more than one call in a turn: results can return in any order, and the identifier tells the model which result answers which call.

A complete exchange is a short conversation with four kinds of message. The application sends a list of tools and the conversation so far; the model replies either with text (a final answer) or with one or more tool calls; the runtime executes the calls and appends a **tool message** for each; and the model is invoked again on the extended conversation. Written out in a provider-neutral form, one round looks like this:

```text
system:    You can call tools. Available: get_weather(city, unit?), convert(amount, from, to)
user:      I'm flying to Oslo with 200 euros. What's the weather and how many dollars is that?
assistant: [call c1] get_weather {"city": "Oslo"}
           [call c2] convert {"amount": 200, "from": "EUR", "to": "USD"}
tool c1:   {"temp": -3, "sky": "snow"}
tool c2:   {"result": 216.0}
assistant: It is −3 °C and snowing in Oslo; 200 euros is about 216 dollars.
```

The model is called twice. The first call produces the two tool calls, the second the answer. Nothing in the model "runs" `get_weather`: it predicted tokens that the runtime parsed as a call, exactly as it predicts any other tokens. Different providers wrap these messages in different JSON envelopes and special tokens, and chat templates for open-weight models encode them with reserved tokens that mark the start and end of a call, but the structure — tool list in, calls out, results in, answer out — is the same everywhere.

::: example What the model actually sees {#ex-serialised}
A model is offered two tools whose definitions, serialised into the prompt, take $120$ and $95$ tokens. The conversation above has a $40$-token user message; the two calls take $35$ tokens and the two results $25$. The final answer is $30$ tokens. How many input and output tokens do the two model invocations consume, assuming the system text other than tool definitions is $60$ tokens?
::: solution
First invocation: input is system text, tool definitions and user message, $60 + 120 + 95 + 40 = 315$ tokens; output is the two calls, $35$ tokens. Second invocation: the whole conversation again plus the calls and results, $315 + 35 + 25 = 375$ input tokens; output $30$ tokens. Total $690$ input and $65$ output tokens. Two lessons follow. Tool definitions are paid for on *every* invocation (prompt caching, [[inference/kv-cache]], reduces the cost of the repeated prefix but not the space it takes); and the input grows with every round, a theme of [[agents/memory-context]].
:::
:::

### Describing a tool well

The description and the schema are the model's only knowledge of the tool, so they are a prompt ([[prompting-rag/prompt-design]]) and deserve the same care. A good definition says what the tool does and when *not* to use it, names parameters unambiguously (`amount_in_cents`, not `amount`), uses enumerations instead of free strings wherever the set of values is closed, marks optional parameters with their defaults, and documents units and formats (`"date in YYYY-MM-DD"`). The schema should be as tight as the implementation requires — `additionalProperties: false`, minima and maxima, patterns — because the validator can then catch errors before they reach the implementation.

::: example A schema for a calendar tool {#ex-calendar}
Write a tool definition for `create_event`, which adds an event to the user's calendar. It needs a title, a start time, a duration in minutes between $5$ and $480$, and an optional list of at most $20$ attendee email addresses.
::: solution
```json
{
  "name": "create_event",
  "description": "Add an event to the user's own calendar. Use only after the user has agreed on the time. Does not send invitations.",
  "parameters": {
    "type": "object",
    "properties": {
      "title":            {"type": "string", "maxLength": 200},
      "start":            {"type": "string", "format": "date-time",
                           "description": "ISO 8601 with offset, e.g. 2026-03-02T14:00:00+01:00"},
      "duration_minutes": {"type": "integer", "minimum": 5, "maximum": 480},
      "attendees":        {"type": "array", "maxItems": 20,
                           "items": {"type": "string", "format": "email"}}
    },
    "required": ["title", "start", "duration_minutes"],
    "additionalProperties": false
  }
}
```

The description tells the model a precondition ("after the user has agreed") and a non-effect ("does not send invitations"), both of which change *when* it calls the tool. Using a duration rather than an end time removes a class of errors (an end before the start), and the explicit time-zone offset removes another. The schema cannot express that the start lies in the future; the implementation must check that and return an error message if it does not.
:::
:::

## Validation, execution and errors {#sec-runtime}

Between the model's output and the tool's implementation sits the **runtime** — the code that parses calls, checks them and runs them. A model's call is an untrusted request: it may name a tool that does not exist, pass a string where a number belongs, invent a field, or be perfectly well formed and still wrong. The runtime's job is to catch what it can, to turn every failure into information the model can use, and never to let a malformed request crash the application.

::: algorithm Executing a tool call {#alg-execute}
Given a call $(\iota, n, a)$ and the set of offered tools:
1. **Resolve.** If no offered tool is named $n$, return the error result $(\iota, \text{"no tool named } n\text{"})$.
2. **Validate.** Check $a$ against the schema $S_n$; if there are violations, return them all as an error result, each with the path of the offending field.
3. **Authorise.** If the tool has side effects that require confirmation or a permission the current context lacks, stop and ask (see [[agents/agent-security]]).
4. **Execute** $f_n(a)$ with a timeout. If it raises an exception or times out, return an error result describing the failure in words the model can act on.
5. **Return** $(\iota, f_n(a))$, truncated or summarised if it exceeds a size limit.
:::

Every branch returns a message to the model rather than raising an exception in the application. This is the central design choice: an error, returned as a tool result, is an observation like any other, and models are generally good at reading `"$.amount: expected number, got str"` and issuing a corrected call. The probability calculus of retrying is the one of [[prompting-rag/structured-output#prop-retries]]; the difference here is that the retry is informed by a specific error message, which usually makes the second attempt far more likely to succeed than the first — and which makes the independence assumption behind that proposition even less appropriate.

### A tool runtime in plain Python

The listing defines two tools, a validator for the subset of JSON Schema they use, deterministic stand-in implementations, and [[#alg-execute]] without the authorisation step. In place of a model, a fixed script issues the calls a model might issue: in the first turn two calls in parallel, one with the amount as a string; in the second turn a repaired call and a call for a city the tool does not know.

```python
import json

TOOLS = {
    "get_weather": {
        "description": "Current weather for a city.",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["city"],
            "additionalProperties": False,
        },
    },
    "convert": {
        "description": "Convert an amount between currencies.",
        "parameters": {
            "type": "object",
            "properties": {
                "amount": {"type": "number", "minimum": 0},
                "from": {"type": "string", "enum": ["EUR", "GBP", "USD"]},
                "to": {"type": "string", "enum": ["EUR", "GBP", "USD"]},
            },
            "required": ["amount", "from", "to"],
            "additionalProperties": False,
        },
    },
}

TYPES = {"string": str, "number": (int, float), "integer": int,
         "boolean": bool, "object": dict}

def validate(value, schema, path="$"):
    """Return a list of error messages (empty if the value validates)."""
    errs = []
    t = schema.get("type")
    if t and not (isinstance(value, TYPES[t]) and not
                  (t in ("number", "integer") and isinstance(value, bool))):
        return [f"{path}: expected {t}, got {type(value).__name__}"]
    if "enum" in schema and value not in schema["enum"]:
        errs.append(f"{path}: {value!r} not in {schema['enum']}")
    if "minimum" in schema and value < schema["minimum"]:
        errs.append(f"{path}: {value} < minimum {schema['minimum']}")
    if t == "object":
        props = schema.get("properties", {})
        for k in schema.get("required", []):
            if k not in value:
                errs.append(f"{path}: missing required field {k!r}")
        for k, v in value.items():
            if k in props:
                errs += validate(v, props[k], f"{path}.{k}")
            elif schema.get("additionalProperties") is False:
                errs.append(f"{path}: unexpected field {k!r}")
    return errs

# Deterministic implementations (a real system would call services).
WEATHER = {"Oslo": (-3, "snow"), "Lisbon": (17, "sun")}
RATES = {("EUR", "USD"): 1.08, ("GBP", "EUR"): 1.17}
def get_weather(city, unit="celsius"):
    if city not in WEATHER:
        raise KeyError(f"unknown city {city!r}")
    c, sky = WEATHER[city]
    return {"temp": c if unit == "celsius" else round(c * 9 / 5 + 32), "sky": sky}
def convert(amount, to, **kw):
    return {"result": round(amount * RATES[(kw["from"], to)], 2)}
IMPL = {"get_weather": get_weather, "convert": convert}

def execute(call):
    """Validate a model's tool call, run it, and return a tool-result message."""
    name, args = call["name"], call["arguments"]
    if name not in TOOLS:
        return {"id": call["id"], "error": f"no tool named {name!r}"}
    errs = validate(args, TOOLS[name]["parameters"])
    if errs:
        return {"id": call["id"], "error": "; ".join(errs)}
    try:
        return {"id": call["id"], "content": IMPL[name](**args)}
    except Exception as e:                       # tool failure -> message, not crash
        return {"id": call["id"], "error": f"{type(e).__name__}: {e}"}

# A scripted stand-in for the model: turn 1 issues two calls in parallel,
# one with a malformed argument; turn 2 repairs it after reading the error.
SCRIPT = [
    [{"id": "c1", "name": "get_weather", "arguments": {"city": "Oslo"}},
     {"id": "c2", "name": "convert",
      "arguments": {"amount": "200", "from": "EUR", "to": "USD"}}],
    [{"id": "c3", "name": "convert",
      "arguments": {"amount": 200, "from": "EUR", "to": "USD"}},
     {"id": "c4", "name": "get_weather", "arguments": {"city": "Bergen"}}],
]
for turn, calls in enumerate(SCRIPT, 1):
    for call in calls:
        print(turn, json.dumps(execute(call)))
print(validate({"city": "Oslo", "units": "C", "unit": "kelvin"},
               TOOLS["get_weather"]["parameters"]))
```

```text
1 {"id": "c1", "content": {"temp": -3, "sky": "snow"}}
1 {"id": "c2", "error": "$.amount: expected number, got str"}
2 {"id": "c3", "content": {"result": 216.0}}
2 {"id": "c4", "error": "KeyError: \"unknown city 'Bergen'\""}
["$: unexpected field 'units'", "$.unit: 'kelvin' not in ['celsius', 'fahrenheit']"]
```

Three kinds of failure appear and all three become messages: a schema violation caught before execution (`c2`), an implementation failure caught by the exception handler (`c4`), and, in the last line, two violations reported together so that one retry can fix both. Note the check in `validate` that excludes Booleans from `number`: in Python `True` is an instance of `int`, and a validator that forgets this accepts `{"amount": true}`. JSON Schema itself treats Booleans and numbers as distinct types.

The listing does not use constrained decoding. With a schema-constrained decoder ([[prompting-rag/structured-output#def-constrained]]) the `"200"` in `c2` could not have been generated, and many inference services offer such a "strict" mode for tool arguments. Validation is still needed — for the parts of JSON Schema a constrainer does not support, for calls from models or services without it, and because the *content* of a valid call can still be wrong.

::: warning A valid call is not a correct call
Schema validation checks shape, not intent. `convert {"amount": 200, "from": "USD", "to": "EUR"}` passes every check and answers the wrong question. Benchmarks that grade function calling separate these errors (wrong tool, wrong argument value, call where none was needed), and the semantic ones are the most common. Check what can be checked in the implementation — a date in the future, an account that belongs to the user — and for actions that matter, show the user the call before it runs.
:::

### Errors, retries and side effects

Tools that talk to networks fail transiently: timeouts, rate limits, temporary outages. The standard response, older than language models, is to retry with **exponential backoff** — wait $w_0$ seconds, then $2w_0$, then $4w_0$, up to a limit — with some random jitter so that many clients do not retry in lockstep. Whether the runtime retries silently or reports the failure to the model is a design choice: transient infrastructure errors are best retried by the runtime, which knows they are transient; errors the model caused, such as invalid arguments or a missing record, belong in the tool result, where the model can correct them.

Retrying is safe only for **idempotent** operations — those whose repeated execution has the same effect as a single one. Reading a file is idempotent; appending to it is not; "charge the card \$50" is emphatically not. If a payment request times out, the runtime cannot know whether the charge went through, and a blind retry may charge twice. The remedy, again standard in distributed systems, is an **idempotency key**: the runtime generates a unique key for each logical operation and sends it with every attempt, and the service performs the operation at most once per key. Since a model may also re-issue a call it believes failed, keys should be attached to the model's call identifier rather than to individual network attempts.

::: example Worst-case latency of a retry policy {#ex-backoff}
A search tool times out after $4$ s. The runtime retries up to $3$ times with backoff waits of $0.5$, $1$ and $2$ s. What is the longest a single tool call can take before the model sees an error? If each attempt independently fails with probability $0.1$, what is the probability that the call fails altogether?
::: solution
Four attempts of up to $4$ s each and three waits: $4\cdot4 + (0.5 + 1 + 2) = 16 + 3.5 = 19.5$ s. All four attempts fail with probability $0.1^4 = 10^{-4}$. The latency figure is the one that matters for an agent: a loop that makes thirty tool calls can, in the worst case, spend ten minutes waiting, so long-running agents need overall time budgets as well as per-call limits.
:::
:::

## Parallel calls {#sec-parallel}

When a request needs several independent pieces of information — the weather in three cities, the contents of four files — the model can emit several calls in one turn, and the runtime can execute them concurrently. This **parallel function calling** saves both model invocations (one round instead of several) and wall-clock time (calls overlap). Calls that depend on one another cannot be parallelised: to convert a price the model must first look it up. The structure is a directed acyclic graph.

::: definition Call graph and rounds {#def-call-graph}
The **call graph** of a task is a directed acyclic graph $G = (V, E)$ whose vertices are the tool calls the task requires and whose edge $u\to v$ means that the arguments of $v$ depend on the result of $u$. A **schedule in rounds** assigns each call $v$ a round $\rho(v)\in\{1, 2, \dots\}$ such that $\rho(u) < \rho(v)$ for every edge $u\to v$; all calls of one round are issued together in a single model turn.
:::

::: proposition The minimum number of rounds {#prop-rounds}
The minimum number of rounds over all schedules equals the number of vertices on a longest path of $G$. If call $v$ takes time $t_v$ and calls within a round run concurrently, the minimum total execution time, over all ways of executing the calls as soon as their inputs are available, is the largest total $\sum_{v\in P}t_v$ over directed paths $P$ — the length of the **critical path**.
:::

::: proof
*Lower bound.* Along a path $v_1\to v_2\to\dots\to v_m$ a schedule needs $\rho(v_1) < \rho(v_2) < \dots < \rho(v_m)$, so it uses at least $m$ distinct rounds. *Upper bound.* Define $\rho(v)$ as the number of vertices on a longest path ending at $v$. This is well defined because $G$ is acyclic, and for an edge $u\to v$ any longest path ending at $u$ extends to a path ending at $v$, so $\rho(v)\ge\rho(u) + 1$. The schedule is therefore valid, and its largest round is the number of vertices on a longest path. The time statement follows in the same way: a call cannot start before every predecessor has finished, so along a path the finishing times are at least the partial sums of the $t_v$; and starting each call as soon as its predecessors finish achieves, by induction along the topological order, a finishing time for $v$ equal to the largest path sum ending at $v$.
:::

::: widget graph
nodes: flights@0,2; hotel@0,0; weather@0,1; price@1,2; convert@2,2; budget@3,1
edges: flights>price; price>convert; convert>budget; hotel>budget; weather>budget
algorithm: topo
start: flights
caption: The call graph of a travel request: look up flights, a hotel and the weather (independent), fetch the price of the chosen flight, convert it, and finally compute a budget from everything. Step through the topological order. The longest path, flights → price → convert → budget, has four vertices, so by [[#prop-rounds]] four rounds are needed and suffice: {flights, hotel, weather}, {price}, {convert}, {budget}. Issuing one call per turn would take six.
:::

::: example Rounds and latency {#ex-rounds}
In the call graph of the figure, each lookup (flights, hotel, weather, price) takes $1.2$ s, `convert` takes $0.2$ s and `budget` $0.1$ s, and each model turn adds $2$ s of generation. Compare one call per turn with the round schedule.
::: solution
One call per turn: six turns, so $6\cdot2 = 12$ s of generation, plus $4\cdot1.2 + 0.2 + 0.1 = 5.1$ s of execution, $17.1$ s, plus a final turn for the answer ($2$ s), $19.1$ s. Rounds: four turns, $8$ s of generation; execution per round is the slowest call in it, $1.2 + 1.2 + 0.2 + 0.1 = 2.7$ s; with the final turn, $8 + 2.7 + 2 = 12.7$ s. The critical path dominates, so further gains require shortening it — for example by a tool that returns a flight's price with the search results.
:::
:::

Parallel calls have a reliability cost. A turn that must produce $m$ correct calls succeeds only if all of them are correct.

::: proposition All calls correct {#prop-all-correct}
If each of $m$ calls in a task is correct independently with probability $q$, all are correct with probability $q^m$, and the expected number of incorrect calls is $m(1 - q)$. For $q$ close to $1$, $q^m\approx 1 - m(1 - q)$.
:::

::: proof
Independence gives the product $q^m$; linearity of expectation gives $\E[\#\text{errors}] = \sum_{i=1}^{m}(1 - q)$. The approximation is the first two terms of the binomial expansion $(1 - \varepsilon)^m = 1 - m\varepsilon + \binom{m}{2}\varepsilon^2 - \dots$ with $\varepsilon = 1 - q$, accurate when $m\varepsilon\ll1$.
:::

::: widget plot
f: q^x; 1 - x*(1 - q)
x: 1, 30
y: 0, 1.02
sliders: q=0.97:0.8:0.999:0.001
labels: all $m$ calls correct, $q^m$; linear approximation $1 - m(1-q)$
points: 5,0.8587; 20,0.5438
caption: The probability that $m$ independent calls are all correct, against $m$. At $q = 0.97$ five calls succeed together $86\%$ of the time and twenty only $54\%$. The linear approximation is good while $m(1 - q)$ is small. The same arithmetic, applied to steps rather than parallel calls, governs agent loops ([[agents/agent-loops]]).
:::

## Choosing among many tools {#sec-selection}

A model offered two tools rarely picks the wrong one. A model offered two hundred — every endpoint of a company's internal services — faces a real retrieval problem, and the definitions alone can fill a large part of its context.

::: example The context cost of a tool catalogue {#ex-catalogue}
An application exposes $150$ tools whose definitions average $220$ tokens. The model's context window is $128{,}000$ tokens. What fraction of the window do the definitions occupy? If a retriever selects the $8$ most relevant tools per request, what is saved per invocation, and what new failure is introduced?
::: solution
$150\cdot220 = 33{,}000$ tokens, $33{,}000/128{,}000 = 25.8\%$ of the window, paid on every invocation. Eight tools take $8\cdot220 = 1{,}760$ tokens, saving $31{,}240$ tokens per invocation. The new failure is a retrieval miss: if the right tool is not among the eight, the model cannot call it and may call a near miss instead. The retriever's recall at $8$ ([[prompting-rag/rag-evaluation]]) now bounds the accuracy of the whole system.
:::
:::

Retrieving tools by embedding similarity between the request and the tool descriptions ([[prompting-rag/text-embeddings]]) is the most common remedy; others are hierarchical menus (the model first chooses a category, then a tool within it), tools that list or search other tools, and merging many narrow tools into fewer general ones with an enumerated `action` argument. Each trades context for an extra decision that can go wrong.

The decision not to call a tool is as important as the choice among tools. A model that calls `get_weather` when asked "what is the capital of Norway?" wastes a round; one that answers a question about today's exchange rate from memory, without calling `convert`, produces a stale or invented number. Evaluations therefore include **relevance detection**: requests for which no offered tool is appropriate, where the correct behaviour is to answer directly or to say that the task cannot be done.

## Training models to call tools {#sec-training}

The first language models that used tools were prompted with a few demonstrations of calls. Instruction-tuned models used tools more reliably once tool calls appeared in their fine-tuning data ([[post-training/instruction-tuning]]), and as of 2026 most chat models are fine-tuned, and often further trained with reinforcement learning ([[post-training/rl-for-language-models]]), on transcripts that contain tool definitions, calls and results in the model's chat template. Two papers from 2023 mark the main ideas.

### Toolformer: learning when a call helps

Schick et al. (2023) asked whether a model could teach *itself* to use tools, with only a handful of human-written demonstrations per tool. Their **Toolformer** used a calculator, a calendar, a question-answering system, a Wikipedia search engine and a machine-translation system. The key idea is a self-supervised filter: a call is worth keeping in the training data if knowing its result makes the following text more predictable.

::: definition The Toolformer filter {#def-toolformer}
Take a text $x = (x_1, \dots, x_T)$ and a candidate API call $c$, sampled by the model itself, inserted at position $i$ with result $r$. Let $L_i(z)$ be the model's weighted cross-entropy on the tokens $x_i, x_{i+1}, \dots$ when the prefix $z$ is inserted before position $i$, with weights that decrease with distance from $i$. Compare
$$
L_i^{+} = L_i\big(e(c, r)\big), \qquad L_i^{-} = \min\big(L_i(\varepsilon),\ L_i(e(c, \varepsilon))\big),
$$
where $e(c, r)$ is the call written together with its result, $e(c, \varepsilon)$ the call without a result, and $\varepsilon$ the empty sequence. The call is kept if $L_i^{-} - L_i^{+}\ge\tau_f$ for a threshold $\tau_f$. The model is then fine-tuned on the original texts with the kept calls and results inserted.
:::

The minimum in $L_i^{-}$ is what makes the filter honest. A call is credited only for its *result*: it must beat both no call at all and the bare call without a result (which might help merely by hinting at the answer).

::: example Applying the filter {#ex-toolformer}
In the text "Out of 1400 participants, 400 (or 29% of them) passed the test", a candidate call `Calculator(400 / 1400)` is inserted before "29%", with result `0.29`. The weighted losses on the continuation are: no call $L_i(\varepsilon) = 2.10$; call without result $L_i(e(c, \varepsilon)) = 1.95$; call with result $L_i(e(c, r)) = 0.40$. With $\tau_f = 1.0$, is the call kept? What if the result had been `0.2857142857` and the loss with result $1.20$?
::: solution
$L_i^{-} = \min(2.10, 1.95) = 1.95$ and $L_i^{+} = 0.40$, so the gain is $1.55\ge1.0$: kept. In the second case the gain is $1.95 - 1.20 = 0.75 < 1.0$: rejected, even though the call is arithmetically correct — its result, as formatted, does not make the text "29%" much more predictable. The filter selects calls that are *useful to the language model* at that position, which is not always the same as calls that are correct.
:::
:::

Schick et al. reported that a $6.7$-billion-parameter model fine-tuned this way improved substantially on zero-shot arithmetic, factual question answering and temporal questions, outperforming the much larger GPT-3 on several of them, without losing its language-modelling ability. The method's limits are instructive too: it inserted at most one call per position, could not chain calls (the output of one tool as input to another), and did not let the model act on a result interactively. Those are exactly the capabilities that agent loops ([[agents/agent-loops]]) add.

### Learning real interfaces

Calculators have one argument; real interfaces have dozens, with versions, required combinations and documentation that changes. Patil et al. (2023) built **Gorilla**, a LLaMA-based model fine-tuned to write calls to some $1{,}600$ machine-learning model APIs from three public model hubs (their benchmark, APIBench), with retrieved documentation in the prompt during training so that the model learnt to follow documentation rather than memorise it. They measured **hallucinated calls** — calls to APIs that do not exist — by matching the abstract syntax tree of the generated call against the database of real APIs, and found that retrieval-aware training reduced them. Qin et al. (2024, first circulated in 2023) collected more than $16{,}000$ real REST APIs from a public API marketplace into **ToolBench**, generated multi-step instructions that require several calls, and fine-tuned an open model (ToolLLaMA) on solution paths found by a depth-first search over call sequences; they evaluated with a model-graded pass rate. The same idea at larger scale — synthetic tasks over real or simulated interfaces, solutions filtered by execution — underlies much later tool-use training data.

### Measuring tool use

A tool call can be graded in two ways, and benchmarks use both.

- **Structural matching** compares the generated call with a reference: same tool, required arguments present, each value equal to (or among the acceptable values for) the reference. It needs no execution, so it can cover interfaces that cannot be called safely, but it cannot credit a different call that would have worked.
- **Executable evaluation** runs the call — against the real service, a recorded response, or a simulator — and checks the result. It credits any correct call but needs a working environment.

The Berkeley Function Calling Leaderboard, first released in 2024 by the group behind Gorilla, popularised a taxonomy that most later evaluations share: *simple* (one tool, one call), *multiple* (choose one of several tools), *parallel* (several calls to one tool in one turn), *parallel multiple* (several calls to several tools), and *relevance* (no tool applies), later extended to multi-turn conversations. As of 2026 the best models score highly on single, well-specified calls and markedly worse on multi-turn tasks with missing information or long tool lists. Specific scores change too fast to be worth quoting; the categories are the durable part.

::: quiz
A model with access to a `search_orders(customer_id)` tool is asked "Where is my order?" by a user whose customer identifier it does not know. What is the best behaviour?
- [ ] Call `search_orders` with a plausible-looking identifier so that the user gets an answer quickly.
- [ ] Call `search_orders` with an empty string, since the schema requires the field.
- [x] Ask the user for the identifier (or call a tool that retrieves it from the session), and only then call `search_orders`.
- [ ] Answer that the order is on its way, since most orders are.
::: solution
An invented argument produces a well-formed call that returns the wrong customer's orders or nothing — a semantic error no validator catches, and possibly a privacy breach. An empty string fails validation or the implementation. Answering without the tool is fabrication. Missing required information is a reason to ask, and multi-turn function-calling evaluations test exactly this.
:::
:::

## Protocols that connect models to tools {#sec-protocols}

Each application that gives a model tools must describe them, route calls to them and return results. When every application does this in its own way, every tool must be integrated anew for every application. Two developments standardised the interface, and both are best understood as techniques rather than products.

**Schema-described tools in model APIs.** From June 2023 hosted model APIs began to accept a list of functions described by JSON Schema and to return calls as structured objects rather than as text to be parsed; parallel calls followed later in 2023, and as of 2026 this calling convention, with minor differences between providers and in open-weight chat templates, is near universal. The convention fixes the message structure of [[#def-tool]], not what any tool does.

**Client–server tool protocols.** The **Model Context Protocol** (MCP), published by Anthropic in November 2024 as an open specification, separates the provider of a tool from the application that uses it. A *server* exposes capabilities — **tools** (functions with JSON-Schema inputs), **resources** (data the application can read into context) and **prompts** (templates) — and a *client* inside the host application discovers them at run time, lists them to the model and forwards calls. Messages are JSON-RPC 2.0, carried over standard input and output for local servers or over HTTP for remote ones. The benefit is the familiar one of any protocol: $a$ applications and $b$ tool providers need $a + b$ implementations instead of $a\cdot b$ integrations. MCP was widely adopted during 2025 by other model providers, development tools and open-source projects, and in December 2025 its stewardship moved to a foundation hosted by the Linux Foundation. It is one example of the pattern; other protocols address communication *between* agents ([[agents/multi-agent-systems]]).

A protocol that lets an application load tools at run time from third parties also loads their descriptions into the model's context, and those descriptions are text the model may follow. A tool description, like a tool result, is untrusted input — the root of indirect prompt injection ([[prompting-rag/prompt-design#def-injection]]), to which [[agents/agent-security]] returns.

::: example Integrations with and without a protocol {#ex-protocol}
An organisation uses $6$ applications that embed models (a chat assistant, two coding tools, a support bot, a document editor, a data notebook) and wants each to access the same $14$ internal systems. How many integrations are needed without a shared protocol, and how many components with one?
::: solution
Without a protocol, each application integrates each system: $6\cdot14 = 84$ integrations, each to be maintained. With a protocol, each application implements a client once and each system a server once: $6 + 14 = 20$ components. The saving grows with both numbers; the cost is that every server's descriptions and results now reach every application's model, so permissions must be managed per server and per application rather than per integration.
:::
:::

::: application Where tool calls go wrong in practice
The failure modes seen in deployed systems are mostly mundane: tools with overlapping descriptions that the model confuses; enumerations that do not cover a real case, so the model picks the nearest wrong value; results too large for the context (a database query returning ten thousand rows), which the runtime must page or summarise; time zones and units; and tools whose errors are opaque (`"500 Internal Server Error"`), so the model cannot correct its call. Most fixes are in the tool definitions and the runtime, not the model.
:::

::: history
The idea of a language model that delegates to external modules is older than function-calling APIs. Karpas et al. (2022) proposed the MRKL architecture, in which a language model routes queries to expert modules such as a calculator; Parisi et al. (2022) trained tool-augmented models (TALM) by iterated self-play; Gao et al. (2022) had models write Python for an interpreter to execute (PAL); and Nakano et al. (2021) trained WebGPT to issue search and browsing commands. Schick et al. (2023) showed with Toolformer that a model could select useful calls by a self-supervised filter. Function calling with JSON-Schema definitions appeared in hosted model APIs in June 2023, and parallel calls later that year. Patil et al. (2023, Gorilla) and Qin et al. (ToolLLM and ToolBench, 2023; ICLR 2024) scaled tool use to thousands of real APIs and introduced the benchmarks and the problem of hallucinated calls; the Berkeley Function Calling Leaderboard (2024) standardised the evaluation categories. Anthropic published the Model Context Protocol in November 2024; it was adopted widely in 2025 and moved to an open foundation in December 2025.
:::

::: summary
- A tool is a name, a description and a parameter schema seen by the model, plus an implementation run by the application; a call is a structured message naming a tool and its arguments, and the result is returned to the model under the same identifier.
- The model only predicts calls; a runtime resolves, validates, authorises and executes them, and turns every failure into a tool result the model can read rather than an exception.
- Validation checks shape, not meaning; semantic errors (wrong tool, wrong value, invented arguments) are the most common and need checks in the implementation or a person's confirmation.
- Retry transient failures with exponential backoff, but only idempotent operations — or use idempotency keys tied to the call.
- Independent calls can be issued in parallel; the minimum number of rounds is the number of vertices on the longest path of the call graph, and all $m$ calls are correct with probability $q^m$.
- Large tool catalogues cost context and invite confusion; tool retrieval trades that for retrieval misses.
- Toolformer kept self-generated calls whose results lowered the loss on the following text; later work trained on thousands of real APIs and measured hallucinated calls, and benchmarks grade calls by structure or by execution.
- Protocols such as JSON-Schema calling conventions (2023) and the Model Context Protocol (November 2024) standardise the interface; tool descriptions and results remain untrusted input.
:::

## Exercises

::: exercise Five calls in a turn {level=1 check="0.859"}
A model issues $5$ parallel calls, each correct independently with probability $0.97$. What is the probability that all five are correct? Give three decimal places.
::: solution
$0.97^5 = 0.8587$, so $0.859$ to three decimal places ([[#prop-all-correct]]). The linear approximation $1 - 5\cdot0.03 = 0.85$ is close.
:::
:::

::: exercise Definitions in the window {level=1 check="0.225"}
An assistant offers $40$ tools whose definitions average $180$ tokens, and its context window is $32{,}000$ tokens. What fraction of the window do the definitions take? Give three decimal places.
::: solution
$40\cdot180 = 7{,}200$ tokens; $7{,}200/32{,}000 = 0.225$, nearly a quarter of the window before the user has said anything.
:::
:::

::: exercise Backoff waits {level=1 check="15.5"}
A runtime retries a failed call up to $5$ times, waiting $0.5$ s before the first retry and doubling the wait each time. What is the total waiting time, in seconds, if all retries are used?
::: solution
$0.5 + 1 + 2 + 4 + 8 = 0.5\,(2^5 - 1) = 15.5$ s, by the geometric sum $\sum_{j=0}^{4}0.5\cdot2^j$.
:::
:::

::: exercise Rounds of a research task {level=2 check="4"}
A research request requires these calls: search the web (A) and search an internal wiki (B); fetch two pages found by A (C, D) and one found by B (E); extract figures from C and E (F); and write a summary from D and F (G). Draw the call graph and find the minimum number of rounds.
::: solution
Edges: $A\to C$, $A\to D$, $B\to E$, $C\to F$, $E\to F$, $D\to G$, $F\to G$. Longest paths: $A\to C\to F\to G$ and $B\to E\to F\to G$, each with $4$ vertices. By [[#prop-rounds]] the minimum is $4$ rounds: $\{A, B\}$, $\{C, D, E\}$, $\{F\}$, $\{G\}$.
:::
:::

::: exercise Applying the Toolformer filter {level=2}
For a candidate search call the weighted losses on the continuation are $L_i(\varepsilon) = 3.0$, $L_i(e(c, \varepsilon)) = 2.2$ and $L_i(e(c, r)) = 1.6$. With $\tau_f = 1.0$, is the call kept? Explain why it would have been kept if the filter compared only with the no-call loss, and why that would be a mistake.
::: solution
$L_i^{-} = \min(3.0, 2.2) = 2.2$ and the gain is $2.2 - 1.6 = 0.6 < 1.0$: rejected. Compared with no call, the gain would be $3.0 - 1.6 = 1.4$, and the call would be kept. But most of that gain ($3.0 - 2.2 = 0.8$) comes from the call text itself — the query words make the continuation more predictable, whatever the search returns. Training on such calls would teach the model to emit calls whose results do not matter. The minimum attributes to the call only the improvement due to its result.
:::
:::

::: exercise Expected latency with parallel calls {level=2 check="1.5"}
A turn issues $3$ parallel calls whose latencies are independent and uniformly distributed between $0$ and $2$ s. The turn waits for all of them. What is the expected waiting time in seconds? (Hint: the maximum of $m$ independent uniform variables on $[0, 1]$ has expectation $m/(m + 1)$.)
::: solution
The maximum of three uniforms on $[0, 2]$ is $2$ times the maximum of three uniforms on $[0, 1]$, so its expectation is $2\cdot\frac34 = 1.5$ s, against a mean latency of $1$ s per call. With $m$ calls it is $2m/(m + 1)$, which tends to the maximum $2$ s: waiting for the slowest of many calls is governed by the tail of the latency distribution, not its mean. (The hint follows from $\Prob(\max\le x) = x^m$, so the density is $mx^{m-1}$ and $\E\max = \int_0^1 x\cdot mx^{m-1}\,dx = m/(m+1)$.)
:::
:::

::: exercise Extending the validator {level=2}
Extend `validate` in the listing to support `integer` (rejecting `2.5` and Booleans), `array` with `items`, `minItems` and `maxItems`, and `maximum`. Test it on the schema of [[#ex-calendar]] (ignoring `format` and `maxLength`) with a duration of $500$ and $21$ attendees.
::: solution
```python
def validate(value, schema, path="$"):
    errs, t = [], schema.get("type")
    ok = {"string": lambda v: isinstance(v, str),
          "number": lambda v: isinstance(v, (int, float)) and not isinstance(v, bool),
          "integer": lambda v: isinstance(v, int) and not isinstance(v, bool),
          "boolean": lambda v: isinstance(v, bool),
          "array": lambda v: isinstance(v, list),
          "object": lambda v: isinstance(v, dict)}
    if t and not ok[t](value):
        return [f"{path}: expected {t}, got {type(value).__name__}"]
    if "enum" in schema and value not in schema["enum"]:
        errs.append(f"{path}: {value!r} not in {schema['enum']}")
    if "minimum" in schema and value < schema["minimum"]:
        errs.append(f"{path}: {value} < minimum {schema['minimum']}")
    if "maximum" in schema and value > schema["maximum"]:
        errs.append(f"{path}: {value} > maximum {schema['maximum']}")
    if t == "array":
        if len(value) < schema.get("minItems", 0):
            errs.append(f"{path}: fewer than {schema['minItems']} items")
        if "maxItems" in schema and len(value) > schema["maxItems"]:
            errs.append(f"{path}: more than {schema['maxItems']} items")
        for i, v in enumerate(value):
            errs += validate(v, schema.get("items", {}), f"{path}[{i}]")
    if t == "object":
        props = schema.get("properties", {})
        errs += [f"{path}: missing required field {k!r}"
                 for k in schema.get("required", []) if k not in value]
        for k, v in value.items():
            if k in props:
                errs += validate(v, props[k], f"{path}.{k}")
            elif schema.get("additionalProperties") is False:
                errs.append(f"{path}: unexpected field {k!r}")
    return errs

S = {"type": "object",
     "properties": {"title": {"type": "string"}, "start": {"type": "string"},
                    "duration_minutes": {"type": "integer", "minimum": 5, "maximum": 480},
                    "attendees": {"type": "array", "maxItems": 20, "items": {"type": "string"}}},
     "required": ["title", "start", "duration_minutes"], "additionalProperties": False}
print(validate({"title": "Review", "start": "2026-03-02T14:00:00+01:00",
                "duration_minutes": 500, "attendees": ["a@x.org"] * 21}, S))
print(validate({"title": "Review", "start": "x", "duration_minutes": 2.5}, S))
```

```text
['$.duration_minutes: 500 > maximum 480', '$.attendees: more than 20 items']
['$.duration_minutes: expected integer, got float']
```

Both violations of the first call are reported together, so one retry can fix both; $2.5$ is rejected as a non-integer.
:::
:::

::: exercise Idempotency {level=2}
A `send_payment(to, amount)` tool calls a bank's interface, which takes $30$ s to respond under load. The runtime's timeout is $10$ s and it retries twice. Describe what can happen, and design the tool interface and runtime behaviour so that a payment is made at most once even if the model re-issues the call in a later turn.
::: solution
Each attempt times out after $10$ s while the bank continues processing it, so up to three payments may be made, and the model, seeing an error, may then issue a fourth call. Remedies: (1) generate an idempotency key when the model's call is first received, derived from the conversation and call identifier, and send it with every attempt; the bank executes at most once per key. (2) Make the tool asynchronous: `send_payment` returns a pending payment identifier immediately, and a separate `payment_status(id)` tool reports its state, so the model never needs to retry the side effect itself. (3) Require user confirmation for each distinct payment, showing the amount and recipient; the confirmation is keyed to the payment, so a re-issued call for the same payment does not ask again but returns the existing status. (4) Never retry non-idempotent calls silently in the runtime.
:::
:::

::: exercise Critical path with durations {level=3}
Prove the time statement of [[#prop-rounds]] in detail: if each call $v$ starts as soon as all its predecessors have finished and takes time $t_v$, its finishing time is $F(v) = t_v + \max_{u\to v}F(u)$ (with the maximum over an empty set equal to $0$), and the overall completion time $\max_vF(v)$ equals the largest path sum. Then show that grouping calls into model turns (rounds) can make the total execution time strictly larger than the critical path, with an example.
::: solution
Order the vertices topologically and induct. For a source, $F(v) = t_v$, the sum along the one-vertex path. If the claim holds for all predecessors of $v$, then $F(v) = t_v + \max_{u\to v}\max_{P\text{ ending at }u}\sum_{w\in P}t_w$, which is the maximum over paths ending at $v$ of the path sum, since every such path of more than one vertex is a path ending at a predecessor followed by $v$. Taking the maximum over all $v$ gives the largest path sum overall; no schedule can do better, because along any path each call must wait for the previous one. With rounds, a call in round $k + 1$ waits for *all* calls of round $k$, not just its predecessors. Example: $A\to B$ with $t_A = 1$, $t_B = 1$, and an independent call $C$ with $t_C = 2$, with $C$ placed in round 1 together with $A$. The critical path is $\max(1 + 1, 2) = 2$, but rounds give $\max(t_A, t_C) + t_B = 2 + 1 = 3$. Putting $C$ in round 2 with $B$ instead gives $1 + \max(1, 2) = 3$ as well. Rounds are synchronisation points; an asynchronous runtime that feeds results to the model as they arrive can approach the critical path, at the price of more model invocations.
:::
:::

::: exercise A tool-selection error budget {level=3 check="0.812"}
A system first retrieves $8$ tools for each request, with recall $0.95$ (the right tool is among them $95\%$ of the time). Given the right tool among the candidates, the model chooses it with probability $0.90$ and fills its arguments correctly with probability $0.95$. What is the probability that a request produces a fully correct call? Give three decimal places. Which component would you improve first, and how would you find out?
::: solution
$0.95\cdot0.90\cdot0.95 = 0.81225$, so $0.812$. The decomposition is the point: of the $18.8\%$ of failing requests, $5$ percentage points are lost at retrieval, $0.95\cdot0.10 = 9.5$ at selection and $0.95\cdot0.90\cdot0.05 = 4.3$ at arguments. Selection is the largest, so improve tool descriptions or the candidate list first. To find out, log each stage separately on a labelled sample — was the right tool retrieved, chosen, called correctly — rather than measuring only end-to-end success, which cannot tell the stages apart.
:::
:::
