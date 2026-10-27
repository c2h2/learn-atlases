A web shop's order service calls the payment service: `charge(card, 20.00)`. In the source code this looks like any other function call. But the call travels as bytes over a network to another machine, and one day it neither returns nor fails — it times out after two seconds. Was the customer charged? If the order service gives up, it may lose a sale that was in fact paid for. If it retries, it may charge the customer twice. If it asks the payment service "did you charge?", that question may time out too.

This chapter is about how processes on different machines talk to each other, and about the gap between how remote communication *looks* — a function call, a message sent — and what it *is*: a request that may be lost, delayed, duplicated or executed without its reply ever arriving. We study **remote procedure calls** and how arguments are turned into bytes (**serialisation**), including how formats evolve while old and new versions of a program run side by side. We then make the failure question precise: we prove that a client cannot always know whether its request was executed, define the **at-most-once**, **at-least-once** and **exactly-once** semantics, and show how **idempotence** and request identifiers give the effect of exactly-once execution. Finally we look at timeouts, retries and the surprising ways in which they can make a system less reliable. We work in the models of [[distributed-systems/system-models]]: fair-loss links, crash or crash-recovery processes, and partial synchrony; the byte streams and datagrams underneath come from [[networks/sockets]].

## Messages and requests

At the bottom, processes communicate by sending **messages**: a sender hands a sequence of bytes to the network, addressed to a receiver. Several patterns are built on top of this.

- **One-way messages** ("fire and forget"): the sender expects no reply. Logging and metrics often use them, typically over UDP.
- **Request–response**: a client sends a request and waits for a response. Almost all service-to-service communication — HTTP, database protocols, RPC — has this shape.
- **Publish–subscribe**: senders publish messages on a named **topic**; every subscriber to the topic receives them. Neither side knows the other.
- **Message queues**: senders put messages into a queue held by a **broker**, and consumers take them out later. The queue stores messages persistently, so sender and receiver need not be running at the same time.

Van Steen and Tanenbaum classify communication along two axes that explain these differences. Communication is **persistent** if the communication system stores a message until it is delivered, even if the sender and receiver are not both running (a mail system, a message queue), and **transient** if it is discarded when it cannot be delivered at once (a TCP connection, an RPC). It is **synchronous** if the sender blocks — until the message is accepted by the system, delivered to the receiver, or processed and answered — and **asynchronous** if the sender continues immediately. An RPC is transient and synchronous in the strongest sense: the caller waits for the result.

::: definition Request–response protocol {#def-request-response}
In a **request–response protocol**, a client sends a request message $\langle \mathit{id}, \mathit{op}, \mathit{args}\rangle$ to a server, where $\mathit{id}$ identifies the request. The server executes $\mathit{op}(\mathit{args})$ on its state and sends a response $\langle \mathit{id}, \mathit{result}\rangle$. The client matches responses to outstanding requests by $\mathit{id}$. If no response arrives within a **timeout**, the client may resend the request or report failure to its caller.
:::

The request identifier does two jobs. It lets a client with several outstanding requests match each response to its request (responses may come back in a different order). And, as we shall see, it lets the server recognise a resent request as a duplicate.

## Remote procedure call

A request–response protocol written by hand needs code to build each request, send it, wait, parse the response and handle errors. Andrew Birrell and Bruce Nelson's **remote procedure call** (1984) generates that code, so that calling a remote procedure looks like calling a local one.

::: definition Remote procedure call {#def-rpc}
A **remote procedure call** (RPC) system takes an **interface definition** — the names, argument types and result types of a server's procedures — and generates two **stubs** for each procedure. The **client stub** has the same signature as the procedure; when called, it **marshals** (serialises) the arguments into a request message, sends it, waits for the response, unmarshals the result and returns it, or raises an error. The **server stub** (skeleton) receives requests, unmarshals the arguments, calls the real procedure, and marshals and sends the result. A **binding** mechanism tells the client where the server is (a name service, DNS or a configuration file).
:::

::: algorithm A remote call, step by step {#alg-rpc}
1. The caller calls the client stub `charge(card, 20.00)` as a local procedure.
2. The client stub marshals the procedure identifier and arguments into bytes, attaches a fresh request id, and passes the message to the RPC runtime.
3. The runtime sends the message to the bound server address and starts a timer.
4. The server's runtime receives the message and hands it to the server stub, which unmarshals the arguments and calls the real `charge`.
5. The server stub marshals the result (or the exception) into a response with the same request id; the runtime sends it.
6. The client runtime receives the response, cancels the timer and wakes the client stub, which unmarshals the result and returns it to the caller.
7. If the timer expires first, the runtime either resends the request (step 3) or returns a timeout error to the caller, according to the call's failure semantics.
:::

The idea was influential — Sun RPC (later specified in RFC 1057, 1988) underlies the NFS file system, and Java RMI, CORBA, Thrift and gRPC are its descendants — but the promise that a remote call is "just like" a local one is false in four ways, set out in Jim Waldo and colleagues' "A note on distributed computing" (1994).

- **Latency.** A local call costs nanoseconds; a remote call within one data centre costs tens to hundreds of microseconds, and across continents tens to hundreds of milliseconds — five to eight orders of magnitude more. An interface designed for local use, with many small calls, becomes unusably slow when made remote.
- **Memory.** A remote procedure cannot follow a pointer into the caller's memory. Arguments are copied, so calls are by value; passing a large data structure means copying all of it, and changes the server makes to it are not seen by the client.
- **Partial failure.** A local call either returns or the whole program crashes. A remote call can fail while both sides keep running, and the caller may not know whether the call took effect. This is the subject of most of this chapter.
- **Concurrency.** The server serves many clients at once, so its procedures run concurrently and must be synchronised ([[operating-systems/threads-locks]]).

::: example The cost of a chatty interface {#ex-chatty}
A client displays an order of $100$ lines. The interface offers `getLine(order, i)`, returning one line. Each call costs $0.5$ ms in the data centre (a round trip plus processing), or $80$ ms when the client is in Europe and the server in the United States. Compare with a single call `getLines(order)` that returns all $100$ lines in a $20$ KB response over a $100$ Mb/s path.
::: solution
In the data centre the chatty interface costs $100 \times 0.5 = 50$ ms; across the Atlantic, $100 \times 80 = 8$ s. The batched call costs one round trip plus the transfer time $20{,}000 \times 8 / 10^8 = 1.6$ ms: about $2$ ms in the data centre and $82$ ms across the Atlantic. The difference has nothing to do with the amount of data and everything to do with the number of sequential round trips. This is the second fallacy of [[distributed-systems/system-models]] ("latency is zero") in action, and it is why remote interfaces are designed around coarse-grained operations, batching and pagination. (The per-call costs are representative figures of the kind measured in practice, not properties of any particular system.)
:::
:::

## Serialisation

To send a value over a network we must turn it into a sequence of bytes, and the receiver must turn the bytes back into an equal value — on a machine that may use a different processor, operating system and programming language, and may be running a different version of the program.

::: definition Serialisation {#def-serialisation}
A **serialisation** (encoding, marshalling) of a set of values $V$ is a pair of functions $\mathit{enc}\colon V \to \set{0,1}^*$ and $\mathit{dec}\colon \set{0,1}^* \to V \cup \set{\bot}$ with $\mathit{dec}(\mathit{enc}(v)) = v$ for every $v \in V$. Here $\bot$ signals malformed input. A format is **self-delimiting** if no encoding is a proper prefix of another, so that the receiver can tell where a value ends.
:::

Pointers cannot be sent, because addresses mean nothing on another machine; data structures must be flattened. Byte order and integer sizes must be fixed by the format, not by the machine ([[networks/sockets]] discusses network byte order). And text formats such as **JSON** and binary formats such as **Protocol Buffers** make very different trade-offs: JSON is readable and needs no schema, but repeats field names in every message, writes numbers as decimal text and cannot represent binary data without an extra encoding; Protocol Buffers needs a schema and is unreadable without it, but is compact and fast to parse.

### Variable-length integers

Most integers in real messages are small — counts, lengths, enumeration values, field numbers. Protocol Buffers therefore encodes integers in a variable number of bytes.

::: definition Base-128 varint {#def-varint}
The **varint** encoding of a non-negative integer $n$ splits its binary representation into groups of $7$ bits, starting from the least significant. Each group becomes one byte: the low $7$ bits hold the group, and the high bit (the **continuation bit**) is $1$ in every byte except the last.
:::

::: proposition Length of a varint {#prop-varint-length}
For $n \ge 1$, the varint encoding of $n$ has $\lceil b/7 \rceil$ bytes, where $b = \lfloor \log_2 n \rfloor + 1$ is the number of bits of $n$; the encoding of $0$ is one byte. The encoding is self-delimiting and decodable.
:::

::: proof
The encoder emits one byte per $7$-bit group and stops after the group that leaves no non-zero bits above it. An integer with $b$ significant bits needs exactly $\lceil b/7\rceil$ groups to cover them, and the last group is non-zero (it contains the leading $1$ bit), so the encoder emits exactly that many bytes. Decoding reads bytes until it meets one whose high bit is $0$, which marks the end — so no encoding is a proper prefix of another, since a proper prefix would end in a byte with the continuation bit set. The value is $\sum_{i} g_i \, 128^i$ over the $7$-bit groups $g_i$ in order, which inverts the encoder.
:::

A Protocol Buffers message is a sequence of fields, each encoded as a **tag** — the varint of $(\text{field number} \ll 3) \mid \text{wire type}$ — followed by the value. Wire type $0$ is a varint; wire type $2$ is "length-delimited": a varint length followed by that many bytes (strings, byte arrays, nested messages). Field *names* never appear on the wire, only numbers.

::: example Encoding a message by hand {#ex-protobuf}
A schema declares `int32 id = 1;` and `string name = 2;`. Encode the message with `id = 150` and `name = "hi"`, and compare its size with the JSON text `{"id":150,"name":"hi"}`.
::: solution
*Field 1.* Tag: $(1 \ll 3) \mid 0 = 8$, one byte `08`. Value: $150 = 10010110_2$, eight bits, so two groups. The low seven bits are $0010110_2 = 22 = \texttt{0x16}$; with the continuation bit, $\texttt{0x96}$. The remaining bit gives the group $1$, byte `01`. So field 1 is `08 96 01`.

*Field 2.* Tag: $(2 \ll 3) \mid 2 = 18 = \texttt{0x12}$. Length $2$, byte `02`. Then the ASCII bytes of `hi`, `68 69`. So field 2 is `12 02 68 69`.

The message is `08 96 01 12 02 68 69`, $7$ bytes; the JSON text is $22$ bytes. A short program confirms the encoding:

```python
def varint(n):
    """Encode a non-negative integer as a base-128 varint, least significant group first."""
    out = bytearray()
    while True:
        low7 = n & 0x7F
        n >>= 7
        if n:
            out.append(low7 | 0x80)   # more bytes follow: set the continuation bit
        else:
            out.append(low7)
            return bytes(out)

def zigzag(n):
    """Map signed to unsigned: 0,-1,1,-2,2,... -> 0,1,2,3,4,... (64-bit version)."""
    return (n << 1) ^ (n >> 63)

def field(number, wire_type, payload):
    return varint(number << 3 | wire_type) + payload

for n in (1, 127, 128, 150, 300, 2**21):
    print(n, varint(n).hex(' '))
msg = field(1, 0, varint(150)) + field(2, 2, varint(2) + b"hi")
print("message:", msg.hex(' '), len(msg), "bytes")
print("zigzag:", [zigzag(n) for n in (0, -1, 1, -2, 2, -3, 3)])
print('JSON:', len('{"id":150,"name":"hi"}'), "bytes")
```

```console
$ python3 varint.py
1 01
127 7f
128 80 01
150 96 01
300 ac 02
2097152 80 80 80 01
message: 08 96 01 12 02 68 69 7 bytes
zigzag: [0, 1, 2, 3, 4, 5, 6]
JSON: 22 bytes
```

The output also shows the boundaries of [[#prop-varint-length]]: $127$ (seven bits) fits in one byte, $128$ needs two, and $2^{21}$ (twenty-two bits) needs four. Negative numbers are a problem for varints, because in two's complement $-1$ has all $64$ bits set and would take ten bytes; the `sint32`/`sint64` types first apply the **zigzag** map $n \mapsto 2n$ for $n \ge 0$ and $n \mapsto -2n - 1$ for $n < 0$, so that small negative numbers become small positive ones.
:::
:::

### Schema evolution

In a running system you cannot upgrade every machine at the same instant. During a **rolling upgrade**, new servers talk to old clients and old servers to new clients, and data written by one version is read by another — in a database, possibly years later.

::: definition Backward and forward compatibility {#def-compat}
A format change is **backward compatible** if new code can read data written by old code, and **forward compatible** if old code can read data written by new code.
:::

Protocol Buffers achieves both for the common changes through its field numbers. A decoder that meets a field number it does not know skips it — the wire type tells it how many bytes to skip — so old code reading new data ignores the new fields (forward compatibility). A field missing from old data takes its default value in new code (backward compatibility). The rules follow: you may add fields with new numbers and remove optional fields, but you must **never reuse a field number** for a different meaning, or old data will be misread silently; and changing a field's type is safe only between types with the same wire encoding. JSON-based APIs follow the same discipline by convention — readers ignore unknown keys and treat missing keys as defaults — and formats such as Avro resolve the writer's and reader's schemas against each other explicitly.

::: warning Never deserialise untrusted data with a language's native object format
Many languages can serialise arbitrary objects: Python's `pickle`, Java's built-in serialisation, PHP's `unserialize`. These formats encode *which class to instantiate* and can trigger code during decoding. Decoding bytes from an untrusted source can therefore make the receiver construct objects and run methods chosen by the sender — a well-known class of vulnerability. The defence is to use data-only formats (JSON, Protocol Buffers, CBOR) with a schema that says which types may appear, to validate every decoded value, and to treat a deserialiser as part of the attack surface ([[security/secure-development]]). Native formats are fine for data a program writes and reads itself, on storage nobody else can modify.
:::

## When things go wrong

Return to the payment call that timed out. We can now say precisely why its outcome is unknowable.

::: proposition The client cannot know whether a timed-out request was executed {#prop-unknowable}
Consider a request–response protocol over a link that may lose messages, with a server that does not crash. Suppose that at some point the client must report to its caller whether the request was executed, and has received no response for it. Then there are two executions, indistinguishable to the client up to that point, in one of which the request was executed and in the other not.
:::

::: proof
Let $E_1$ be an execution in which every copy of the request the client sends is lost; the server never receives it and never executes it. Let $E_2$ be identical, except that the first copy of the request is delivered; the server executes it and sends a response, and that response and every later message from the server to the client are lost. (If the client resends, the server in $E_2$ may receive later copies too and respond; those responses are also lost.) In both executions the client sends the same messages and receives none, so its local view is identical up to the moment it must report, and being deterministic it reports the same thing. In $E_1$ the request was not executed, in $E_2$ it was; whatever it reports is wrong in one of them.
:::

Since the client cannot know, RPC systems offer a choice of **failure semantics**, each a promise about how often a call is executed.

::: definition Call semantics {#def-call-semantics}
For one invocation of a remote procedure,
- **maybe** semantics: the request is sent once, with no retry; the procedure is executed at most once, and on a timeout the caller does not know whether it was;
- **at-least-once** semantics: the client resends until it receives a response; if the call returns normally, the procedure was executed one or more times;
- **at-most-once** semantics: the server detects duplicates, so the procedure is never executed more than once, whether or not the call returns;
- **exactly-once** semantics: the procedure is executed exactly once and the caller learns the result.
:::

By [[#prop-unknowable]], exactly-once with a result in *bounded* time is impossible when messages can be lost indefinitely. But over a fair-loss link with a server that is eventually available, combining at-least-once retries with at-most-once duplicate detection gives exactly-once in the only sense that is achievable: the client keeps retrying until it learns the result, and the procedure takes effect once. To make this precise we need two ideas: idempotence and deduplication.

::: definition Idempotent operation {#def-idempotent}
An operation $\mathit{op}$ on a server with state $s$ is **idempotent** if executing it twice in succession has the same effect as executing it once: for every state $s$, if executing $\mathit{op}$ from $s$ leads to state $s'$ with response $r$, then executing $\mathit{op}$ from $s'$ leads to state $s'$ with response $r$.
:::

"Set the shipping address to X", "delete file F" and "read the balance" are idempotent. "Add $£20$ to the balance", "append a line to the log" and "create a new order" are not. In HTTP, the `GET`, `PUT` and `DELETE` methods are defined to be idempotent and `POST` is not (RFC 9110), which is why browsers warn before resubmitting a form. Note that idempotence concerns *successive* repetition: "set $x$ to $5$" is idempotent, but if another client sets $x$ to $7$ in between, a delayed duplicate of "set $x$ to $5$" overwrites it. Retrying an idempotent operation is harmless only if duplicates cannot arrive arbitrarily late — another reason to attach request identifiers.

Any operation can be made safe to retry by deduplication at the server.

::: algorithm Deduplicating server {#alg-dedup}
The client attaches to each request a unique identifier $\mathit{id}$ — for example the pair (client identifier, client sequence number) — and resends the *same* identifier on every retry. The server keeps a table $\mathit{Done}$ mapping identifiers to responses.
1. Upon receiving $\langle \mathit{id}, \mathit{op}, \mathit{args}\rangle$: if $\mathit{id} \in \mathit{Done}$, send $\langle \mathit{id}, \mathit{Done}[\mathit{id}]\rangle$ and stop.
2. Otherwise execute $r \gets \mathit{op}(\mathit{args})$, set $\mathit{Done}[\mathit{id}] \gets r$ — **atomically** with the state change of $\mathit{op}$, and durably if the server can crash and recover — and send $\langle \mathit{id}, r \rangle$.
:::

::: theorem Retries with deduplication execute each request exactly once {#thm-dedup}
Suppose the links are fair-loss, the server eventually stays up, and the server's state together with $\mathit{Done}$ survive crashes and are updated atomically by step 2. If the client resends a request with identifier $\mathit{id}$ until it receives a response, then (a) the operation is executed exactly once, and (b) the client eventually receives the response of that execution.
:::

::: proof
*At most once.* The operation for $\mathit{id}$ is executed only in step 2, which is reached only if $\mathit{id} \notin \mathit{Done}$, and it adds $\mathit{id}$ to $\mathit{Done}$ in the same atomic, durable update. So after the first execution $\mathit{id} \in \mathit{Done}$ forever — a crash either happens before the update (and then neither the execution's effect nor the entry survives, as if the request had never arrived) or after it (and both survive). Every later copy of the request takes step 1.

*At least once, and the client learns the result.* Suppose the client never receives a response. Then it resends infinitely often, so by fair loss the server, which is eventually up, receives the request infinitely often. The first such receipt after the server is up for good executes the operation (if it has not already been executed) or finds the entry, and in either case every receipt sends $\langle \mathit{id}, \mathit{Done}[\mathit{id}]\rangle$. Infinitely many responses are sent, so by fair loss one is delivered — a contradiction. So the client receives a response, and every response for $\mathit{id}$ carries $\mathit{Done}[\mathit{id}]$, the result of the single execution.
:::

The theorem's assumptions are where real systems succeed or fail. The table must be updated **atomically with the effect**: if a server charges the card, crashes, and restarts without the table entry, the retry charges again. The identifier must be **chosen by the client** and reused on every retry: an identifier generated by the server cannot recognise a request it has never seen. And the table cannot grow for ever. If each client has at most one outstanding request and numbers its requests in sequence, the server need only keep, for each client, the highest sequence number and its response (Exercise 7); otherwise entries are expired after a period longer than any client will keep retrying. Payment APIs expose exactly this mechanism as an **idempotency key**: the client sends a unique key with each request, and the server returns the stored result for a repeated key.

::: example Retries with and without deduplication {#ex-dedup}
A client deposits $£10$ a thousand times over a link that loses each request and each reply with probability $0.2$, retrying each deposit until it gets a reply. Simulate the server with and without [[#alg-dedup]], and explain the size of the error.
::: solution
```python
import random

class Server:
    def __init__(self, dedup):
        self.balance, self.dedup, self.done = 0, dedup, {}   # done: request id -> saved reply
    def handle(self, req_id, amount):
        if self.dedup and req_id in self.done:
            return self.done[req_id]            # duplicate: resend the saved reply, do not re-execute
        self.balance += amount                  # the non-idempotent operation
        reply = ("ok", self.balance)
        self.done[req_id] = reply               # in a real server: persisted atomically with balance
        return reply

def call(server, rng, req_id, amount, loss, max_tries=20):
    """At-least-once client: resend the same request id until a reply arrives."""
    for attempt in range(max_tries):
        if rng.random() < loss:                 # request lost
            continue
        reply = server.handle(req_id, amount)
        if rng.random() < loss:                 # reply lost
            continue
        return reply
    raise TimeoutError(req_id)

for dedup in (False, True):
    rng, s = random.Random(7), Server(dedup)
    for i in range(1000):
        call(s, rng, req_id=("client-1", i), amount=10, loss=0.2)
    print(f"dedup={dedup!s:5}  expected balance=10000  actual balance={s.balance}")
```

```console
$ python3 rpc.py
dedup=False  expected balance=10000  actual balance=12540
dedup=True   expected balance=10000  actual balance=10000
```

Without deduplication the customer has been credited $£2540$ too much. The size is predictable: each time the server executes a request, the reply is lost with probability $0.2$, causing a retry that (once it gets through) executes the deposit again. The number of executions per deposit is geometric with success probability $0.8$, so its mean is $1/0.8 = 1.25$, predicting $£12{,}500$. With deduplication, every retry after the first execution receives the saved reply, and the balance is exact.
:::
:::

::: quiz
Which operations can a client safely retry *without* a request identifier, assuming no other client touches the same data?
- [x] `PUT /users/7/email` with body `ada@example.org`
- [ ] `POST /orders` creating a new order
- [x] `DELETE /files/report.pdf`
- [ ] "Increment the page-view counter"
::: solution
Setting a value and deleting an object are idempotent: doing either twice leaves the same state as doing it once. (The second `DELETE` may return "not found" instead of "deleted", which a careful client must accept; the *state* is the same.) Creating an order and incrementing a counter are not — each repetition changes the state again — so retrying them needs deduplication by request identifier.
:::
:::

## Timeouts, retries and backoff

Every remote call needs a **timeout**: without one, a call to a crashed server blocks for ever, and the threads or connections it holds are never released. By [[distributed-systems/system-models#thm-indistinguishable]], every timeout is a guess. Too short, and the client gives up on calls that would have succeeded, and its retries add load; too long, and a crashed server holds up callers for the whole timeout. A common choice is a small multiple of a high percentile of the observed latency, for example twice the 99th percentile.

Retries turn a transient failure into a success, but they also multiply load. How much?

::: proposition Load amplification by retries {#prop-amplification}
A client makes up to $r$ retries after the first attempt, and each attempt fails independently with probability $q < 1$. The expected number of attempts per call is
$$
1 + q + q^2 + \dots + q^r = \frac{1 - q^{r+1}}{1 - q}.
$$ {#eq-amplification}
:::

::: proof
The $(i+1)$-st attempt ($i = 0, \dots, r$) is made exactly when the first $i$ attempts have all failed, which happens with probability $q^i$. By linearity of expectation, the expected number of attempts is $\sum_{i=0}^{r} q^i$, a geometric series with the stated sum.
:::

When failures are rare, retries cost little: with $q = 0.01$ and $r = 3$, the factor is $1.0101$. But failures are rarely independent. When a server is overloaded, *most* attempts time out, $q$ approaches $1$, and the factor approaches $r + 1$: each client's load quadruples at the moment the server can least bear it. The extra load keeps the server overloaded, which keeps $q$ high, and the system can stay in this **metastable** overloaded state long after the event that triggered it is over (Exercise 9). Retries at several layers multiply: three layers that each retry three times can turn one user request into $4^3 = 64$ attempts on the bottom service.

Three practices limit the damage.

- **Exponential backoff**: wait $b, 2b, 4b, \dots$ before successive retries, giving an overloaded server time to recover.
- **Jitter**: randomise each wait, for example uniformly in $[0, b \cdot 2^i]$ ("full jitter"), so that clients that failed together do not retry together in synchronised waves.
- **Retry budgets and circuit breakers**: cap retries at a fraction (say $10\%$) of all requests, and stop calling a service that is failing for a while, returning errors immediately instead.

### Latency in the tail

A request that fans out to many servers waits for the slowest. Jeffrey Dean and Luiz André Barroso described the consequence in "The tail at scale" (2013).

::: example Fan-out and the tail {#ex-tail}
A page is built from the responses of $100$ servers, queried in parallel. Each server answers within $10$ ms $99\%$ of the time and is slow (say $1$ s) otherwise, independently. What fraction of pages are slow?
::: solution
A page is fast only if all $100$ responses are fast, with probability $0.99^{100} \approx 0.366$. So about $63\%$ of pages wait for at least one slow response: the 99th-percentile latency of one server has become the *median* latency of the page. Making each server faster on average does not help; only cutting the tail does. One technique is the **hedged request**: if a response has not arrived within, say, the 95th-percentile latency, send a second copy of the request to another replica and use whichever answer comes first. This costs a few per cent of extra load and removes most of the tail — and it is safe only for idempotent (typically read-only) requests.
:::
:::

::: widget plot
f: 1 - (1 - p)^x
x: 1, 200
y: 0, 1
sliders: p=0.01:0.001:0.1:0.001
labels: \text{fraction of requests waiting for a slow server}
points: 100,0.634; 10,0.0956
caption: The probability that a request fanning out to $n$ servers meets at least one slow one, when each is slow with probability $p$ independently. With $p = 0.01$, the dots show $10$ servers ($9.6\%$ of requests slow) and $100$ servers ($63\%$). Halve $p$ and notice that the curve rises only half as fast: at large fan-out, the tail of each component, not its average, sets the latency users see.
:::

Timeouts also need to be coordinated across a chain of calls. If a user's request has a $1$ s budget and passes through three services, a callee that keeps working after its caller has given up wastes resources on an answer nobody will read. RPC frameworks such as gRPC therefore propagate a **deadline** with each call; every callee knows how much time remains and can fail fast.

## Beyond request–response

Request–response couples the client to the server in time: both must be running and reachable at the moment of the call. **Message brokers** remove that coupling. A producer writes a message to a queue or topic held durably by the broker and continues; consumers read messages when they are ready, and the broker redelivers a message until a consumer acknowledges it. The delivery semantics are the ones defined above, one level up: brokers typically offer at-least-once delivery, and consumers must be idempotent or deduplicate by message identifier, exactly as in [[#thm-dedup]]. A **log-based broker** such as Apache Kafka keeps each topic as an append-only, partitioned log; consumers record how far they have read (their **offset**), and "exactly-once processing" is achieved by storing the consumer's offset atomically with the results it produces — the same atomicity requirement as in [[#alg-dedup]]. Stream processors built on such logs are the subject of [[distributed-systems/data-processing]].

As of 2026, most service-to-service communication uses either JSON over HTTP, in the resource-oriented style called **REST** (Roy Fielding, 2000), or an RPC framework with a binary format, of which gRPC (Protocol Buffers over HTTP/2) is the most widely used; GraphQL is common between browsers and back ends. They differ in style and tooling, but every one of them faces the problems of this chapter: latency, versioning, and the unknowable outcome of a call that timed out.

::: history
Bruce Jay Nelson's 1981 Carnegie Mellon PhD thesis introduced the term *remote procedure call*, and Andrew Birrell and Nelson's "Implementing remote procedure calls" (*ACM Transactions on Computer Systems*, 1984), describing the Cedar RPC system at Xerox PARC, set out stubs, binding and at-most-once semantics in the form still used. Sun's ONC RPC (RFC 1057, 1988) and its External Data Representation (XDR, RFC 1014, 1987) carried NFS; the Object Management Group's CORBA (1991) and Java RMI (1997) extended RPC to distributed objects. Jim Waldo, Geoff Wyant, Ann Wollrath and Sam Kendall's Sun technical report "A note on distributed computing" (1994) argued that hiding the difference between local and remote objects is a mistake. Roy Fielding's dissertation (2000) defined REST. Facebook released Thrift in 2007 and Google open-sourced Protocol Buffers in 2008; gRPC followed in 2015, reaching version 1.0 in 2016. Dean and Barroso's "The tail at scale" (*Communications of the ACM*, 2013) made tail latency a central design concern.
:::

## Where this leads

The request identifier and the deduplication table reappear throughout the course. In [[distributed-systems/replication-consistency]] and [[distributed-systems/consensus]], a replicated service must deduplicate client requests across *all* its replicas, so the table becomes part of the replicated state. [[distributed-systems/distributed-transactions]] makes several operations on several servers atomic, the generalisation of "update the table atomically with the effect". [[distributed-systems/data-processing]] meets exactly-once processing in stream processors. Timeouts become failure detectors in [[distributed-systems/fault-tolerance]].

::: summary
- Communication may be **persistent or transient** and **synchronous or asynchronous**; RPC is transient and synchronous, message queues are persistent and asynchronous.
- **RPC** generates stubs that marshal arguments and results, but remote calls differ from local ones in **latency, memory, partial failure and concurrency**; design coarse-grained interfaces.
- **Serialisation** must be language-neutral and evolvable; Protocol Buffers uses **varints** ([[#prop-varint-length]]) and **field numbers**, which give forward and backward compatibility if numbers are never reused.
- A client whose request timed out **cannot know** whether it was executed ([[#prop-unknowable]]).
- **Idempotent** operations can be retried freely; any operation becomes safe to retry with **client-chosen request identifiers** and a deduplication table updated **atomically** with the effect ([[#thm-dedup]]).
- Retries **amplify load** by up to a factor $r + 1$ ([[#prop-amplification]]); use exponential backoff, jitter, budgets and deadlines.
- In a fan-out to $n$ servers, the **tail** latency of each becomes the typical latency of the whole.
:::

## Exercises

::: exercise Varint length {level=1 check="3"}
How many bytes does the varint encoding of $100{,}000$ take? (Enter the number of bytes.)
::: solution
$2^{16} = 65{,}536 \le 100{,}000 < 2^{17}$, so $100{,}000$ has $17$ bits and needs $\lceil 17/7\rceil = 3$ bytes by [[#prop-varint-length]]. (Indeed $128^2 = 16{,}384 \le 100{,}000 < 128^3$.)
:::
:::

::: exercise Which operations are idempotent? {level=1}
Which of these are idempotent in the sense of [[#def-idempotent]]? (a) `x = max(x, 10)`; (b) `x = x * 2`; (c) "add item 42 to the set of items in cart 7"; (d) "add item 42 to the list of items in cart 7"; (e) "send an email to the customer".
::: solution
(a) Yes: after the first execution $x \ge 10$, so the second leaves it unchanged. (b) No. (c) Yes: a set already containing 42 is unchanged. (d) No: the list gains a second 42. (e) No: two emails are sent — an effect *outside* the server's state, which deduplication must also cover (record "email for order 7 sent" before or atomically with sending, accepting a small risk of zero or two sends on a crash between them). Note that (a) and (c) are also **commutative**, a property the CRDTs of [[distributed-systems/replication-consistency]] exploit.
:::
:::

::: exercise Fan-out {level=1 check="1 - 0.98^50"}
A request fans out to $50$ servers, each slow with probability $0.02$ independently. What is the probability that the request is slow? (Enter the probability.)
::: solution
$1 - 0.98^{50} \approx 0.636$. Nearly two thirds of requests wait for a slow server.
:::
:::

::: exercise Expected attempts {level=2 check="(1 - 0.2^5)/0.8"}
Using [[#eq-amplification]], what is the expected number of attempts per call with up to $4$ retries when each attempt fails with probability $0.2$? (Enter the number.)
::: solution
$r = 4$, $q = 0.2$: $(1 - 0.2^5)/(1 - 0.2) = 0.99968 / 0.8 = 1.2496$.
:::
:::

::: exercise Zigzag {level=2 check="199"}
Under the zigzag map, which unsigned integer represents $-100$? How many bytes does its varint take, compared with the ten bytes of the plain two's-complement varint? (Enter the unsigned integer.)
::: solution
For $n < 0$, zigzag gives $-2n - 1 = 200 - 1 = 199$. $199$ has $8$ bits, so its varint takes $2$ bytes. In 64-bit two's complement, $-100$ has its top bit set and would need $\lceil 64/7\rceil = 10$ bytes.
:::
:::

::: exercise Designing a retry-safe transfer {level=2}
A banking service offers `transfer(from, to, amount)`. Clients call it over a lossy network and retry on timeouts. The service stores accounts in a database. Describe what the client sends, what the server stores and in which transaction, and what happens on each of these events: (a) the request is lost; (b) the server crashes after updating the balances but before replying; (c) the reply is lost; (d) the client crashes and restarts.
::: solution
The client generates a unique identifier (a random 128-bit value, or client id plus sequence number) for each *logical* transfer, stores it locally before the first attempt, and sends it with every attempt. The server, in **one database transaction**, checks a table `done(id, result)`; if `id` is present it returns the stored result; otherwise it debits, credits and inserts `(id, result)`, then commits and replies.

(a) Lost request: nothing happens at the server; the retry executes the transfer. (b) Crash after commit: the transaction committed, so balances and the `done` row are durable; the retry finds the row and returns the stored result. If the crash came before commit, the transaction rolls back and the retry executes it — either way exactly once. (c) Lost reply: as (b). (d) The client must reuse the same identifier after restart, which is why it stored it before the first attempt; a fresh identifier would make the server treat the retry as a new transfer.
:::
:::

::: exercise Bounding the deduplication table {level=3}
Suppose each client has at most one outstanding request at a time and numbers its requests $1, 2, 3, \dots$, and that links are FIFO. Prove that the server only needs to store, per client, the highest sequence number it has executed and that request's response, and that a request with a lower number can be ignored. What goes wrong if links can reorder messages and the client may resend an old request after starting a new one?
::: solution
*Claim.* When the server receives request $k$ from client $c$, every request $j < k$ of $c$ has already been executed or will never need a response. Because $c$ sends request $k$ only after receiving the response to $k - 1$, request $k-1$ was executed (by at-most-once, exactly once) and its response delivered; inductively so were all $j < k$. So when the server sees $k$, it may discard the stored response of $k - 1$: the client will never again ask for it, because it already has it, and with FIFO links no copy of $k-1$ sent earlier can arrive after $k$. A received request with number $j$ is then handled as: $j$ equal to the stored highest number — return the stored response; $j$ greater — execute it and replace the entry; $j$ smaller — ignore it (it can only be a stale duplicate).

*Reordering.* If links reorder, a delayed copy of request $k - 1$ may arrive after $k$ has been executed. The rule above ignores it, which is correct — the client no longer waits for it. The danger is the opposite case: if the server stored only a counter and *no* response, a retry of $k$ after the response was lost could not be answered without re-executing. So the server must keep the last response per client. With several outstanding requests per client, it must keep a window of recent responses, which is how real systems (and TCP's sequence numbers) generalise the scheme.
:::
:::

::: exercise Full jitter {level=3 check="1550"}
A client uses full jitter: before retry $i$ ($i = 0, 1, 2, \dots$) it waits a time drawn uniformly from $[0, b \cdot 2^i]$. With $b = 100$ ms, what is the expected total waiting time before the fifth retry has been sent (that is, over retries $i = 0, \dots, 4$)? Compare with plain exponential backoff without jitter. (Enter the expected total in milliseconds.)
::: solution
The wait before retry $i$ has mean $b \cdot 2^i / 2$. Summing over $i = 0, \dots, 4$: $\frac{b}{2}(1 + 2 + 4 + 8 + 16) = 50 \times 31 = 1550$ ms. Plain exponential backoff waits $b \cdot 2^i$ exactly, $3100$ ms in total. Full jitter halves the mean wait and, more importantly, spreads clients that failed at the same moment uniformly over each interval, so their retries do not arrive in a synchronised burst.
:::
:::

::: exercise A metastable failure {level=3 check="3200"}
A server can handle $1000$ requests per second. Clients send $800$ new requests per second and retry up to $3$ times on a timeout. Normally almost no attempt fails. A brief network glitch makes every attempt time out for a few seconds. Using [[#prop-amplification]], what load in attempts per second do the clients offer while every attempt fails? Explain why the server may remain overloaded after the glitch ends, and how a retry budget breaks the loop. (Enter the attempts per second.)
::: solution
With $q = 1$ and $r = 3$, each request makes $r + 1 = 4$ attempts, so the offered load is $4 \times 800 = 3200$ attempts per second. After the glitch the network is fine, but the server faces $3200$ attempts per second, more than three times its capacity; its queues grow, responses exceed the clients' timeout, and so the attempts keep failing ($q$ stays near $1$), sustaining the overload — a stable state although the trigger is gone. A retry budget limiting retries to, say, $10\%$ of requests caps the offered load at $880$ per second, below capacity, so queues drain, $q$ falls and the system returns to its healthy state. Load shedding (rejecting excess requests quickly instead of queueing them) and backoff help in the same way.
:::
:::
