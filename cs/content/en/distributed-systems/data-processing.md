A search company wants to count how often each word occurs in a crawl of the web: $10$ TB of text. One machine reading from disk at $200$ MB/s needs $14$ hours just to read the data. A thousand machines could do it in under a minute — if someone writes the program that splits the input, starts the work on each machine, moves each word's partial counts to the machine responsible for that word, combines them, copes with the machines that crash (with a thousand machines, some machine fails every few hours) and with the ones that are inexplicably slow, and writes the results somewhere durable. Writing that program for every analysis — counting words, building an index, joining logs with user tables, training a model — would be ruinous.

**Large-scale data processing** systems write it once. The programmer supplies a few pure functions; the system parallelises them, moves the data, and tolerates failures by re-running work. This chapter studies the three generations of such systems. **MapReduce** (Dean and Ghemawat, 2004) introduced the model of map, shuffle and reduce, with fault tolerance by deterministic re-execution, which we prove correct and simulate. **Dataflow** systems such as Spark generalise MapReduce to graphs of operators over partitioned data sets, keeping data in memory and recovering lost partitions from their **lineage**. **Stream processors** handle unbounded data as it arrives, which forces a careful distinction between **event time** and **processing time** and brings in **windows** and **watermarks**; their exactly-once guarantees come from the consistent snapshots of [[distributed-systems/time-clocks]]. Throughout, the costs that matter are bytes moved across the network and the slowest task. The storage systems these jobs read and write are those of [[distributed-systems/distributed-storage]]; general laws of parallel speed-up, such as Amdahl's law, are in [[parallel-computing/performance-laws]].

## The MapReduce model

::: definition MapReduce {#def-mapreduce}
A **MapReduce** job is specified by two functions:
- $\mathit{map}\colon (k_1, v_1) \to \text{list}(k_2, v_2)$, applied independently to every input record;
- $\mathit{reduce}\colon (k_2, \text{list}(v_2)) \to \text{list}(v_3)$, applied once to each distinct intermediate key $k_2$ together with **all** intermediate values that have that key.

The output of the job is the union of the outputs of all reduce calls. The system is responsible for grouping intermediate pairs by key — the **shuffle**.
:::

For word count, $\mathit{map}(\text{docId}, \text{text})$ emits $(w, 1)$ for every word $w$ in the text, and $\mathit{reduce}(w, [1, 1, \dots])$ emits $(w, \text{sum})$. An inverted index ([[information-retrieval/inverted-indexes]]) maps each document to pairs $(w, \text{docId})$ and reduces each word's list to a sorted posting list. A distributed sort maps each record to $(\text{key}, \text{record})$ and relies on the shuffle to deliver keys to reducers in sorted order, with a partition function that sends key ranges to reducers in order. Joins, histograms, graph algorithms one step at a time — a surprising range of computations fit.

The model's power comes from what it forbids: map and reduce see one record or one key at a time, share no state, and have no side effects. That makes every call independent, so the system may run them anywhere, in any order, and as many times as it likes.

::: algorithm MapReduce execution {#alg-mr-exec}
1. Split the input (in a distributed file system) into $M$ **splits**, typically $64$–$128$ MB each. Choose $R$, the number of reduce tasks, and a **partition function**, by default $\mathit{hash}(k_2) \bmod R$.
2. A **master** assigns map tasks to idle **workers**, preferring a worker on a machine that holds a replica of the task's split (**data locality**), so that input is read from local disk.
3. A map worker reads its split, applies $\mathit{map}$ to every record, and writes the intermediate pairs into $R$ partitions on its **local disk**, one per reduce task, optionally applying a **combiner** first. It reports the partition locations to the master.
4. A reduce worker fetches its partition from every map worker (the **shuffle**), merges and **sorts** the pairs by key, and calls $\mathit{reduce}$ on each key and its list of values, in key order, writing the output to a temporary file in the distributed file system.
5. When a reduce task finishes, it atomically **renames** its temporary file to the final output name. The job ends when all $R$ reduce tasks have finished.
:::

### Fault tolerance by re-execution

The master pings workers. If a worker fails, its in-progress tasks are reset to idle and rescheduled elsewhere. Its *completed map* tasks are also re-executed, because their output was on the failed machine's local disk; completed reduce tasks are not, because their output is in the replicated file system. Reducers that had not yet fetched a re-executed map task's output fetch it from the new worker. Why is the final result still correct?

::: theorem Deterministic re-execution is equivalent to a failure-free run {#thm-reexec}
Suppose $\mathit{map}$ and $\mathit{reduce}$ are deterministic functions of their inputs, each map task's output is used only after the task completes, and each reduce task's output is committed by an atomic rename that succeeds at most once. Then the output of any execution, with any pattern of worker failures and re-executions, equals the output of a failure-free execution.
:::

::: proof
Fix the input splits and the partition function. In a failure-free execution, the input of reduce task $r$ is the multiset $I_r$ of all intermediate pairs whose key is in partition $r$, gathered from the outputs $O_1, \dots, O_M$ of the $M$ map tasks, and its output is a function $F(I_r)$ (reduce applied to each key in sorted order), since $\mathit{reduce}$ is deterministic.

In an arbitrary execution, map task $j$ may run several times, but every run applies the deterministic $\mathit{map}$ to the same split and so produces the same output $O_j$; a reducer uses only the output of a *completed* run, whichever one it fetched from. So every reduce task that completes has received exactly the multiset $I_r$ and produces exactly $F(I_r)$, whichever attempt it is. The atomic rename makes exactly one completed attempt's output the final output of task $r$, and partial outputs of failed attempts remain in temporary files that are never renamed. Hence the final output of each reduce task, and so the job's output, equals the failure-free output.
:::

The proof shows exactly where correctness can be lost. If $\mathit{map}$ is non-deterministic — it samples randomly, reads the clock, or depends on the order of a hash table — two attempts of the same task can produce different outputs, and if different reducers fetched from different attempts, the job's output corresponds to *no* single execution (Exercise 8). And side effects in map or reduce, such as writing to an external database, happen once per attempt, not once per task. This is the at-least-once execution of [[distributed-systems/remote-communication]] again: re-execution is safe exactly when the operations are deterministic and their only effects are committed atomically.

The same reasoning tolerates the master's failure by restarting the job (the original system did that; later ones replicate the master's state). It does not tolerate deterministic bugs: a record that crashes $\mathit{map}$ crashes every attempt. MapReduce therefore had a mode that, after repeated failures on the same record, skipped it.

### Stragglers

A job finishes when its last task does, so one slow machine — a failing disk, a noisy neighbour, a misconfigured CPU — delays everything. Such **stragglers** are not rare at scale.

::: proposition Waiting for the slowest of $m$ tasks {#prop-straggler}
If $m$ tasks run in parallel and their durations are independent and exponentially distributed with mean $1$, the expected time until all have finished is the harmonic number
$$
H_m = 1 + \tfrac12 + \tfrac13 + \dots + \tfrac1m \approx \ln m + 0.5772.
$$
:::

::: proof
While $i$ tasks are still running, the time until the next one finishes is the minimum of $i$ independent exponentials with rate $1$ (by memorylessness, the remaining durations are again exponential with rate $1$), which is exponential with rate $i$ and mean $1/i$. The total time is the sum of these gaps for $i = m, m - 1, \dots, 1$, with expectation $\sum_{i=1}^m 1/i = H_m$. The approximation is the standard asymptotic $H_m = \ln m + \gamma + O(1/m)$ with Euler's constant $\gamma \approx 0.5772$.
:::

With a thousand tasks, the expected job time is about $7.5$ times the mean task time, almost all of it spent waiting for the last few. MapReduce's remedy is **backup tasks** (speculative execution): near the end of a phase, the master starts duplicate copies of the tasks still running, and takes whichever copy finishes first — safe precisely because of [[#thm-reexec]]. Dean and Ghemawat reported that their sort benchmark took $44\%$ longer with backup tasks disabled.

::: widget plot
f: sum(1/k, k, 1, x); ln(x) + 0.5772
x: 1, 1000
y: 0, 8
labels: H_m;\ \ln m + \gamma
points: 100,5.187; 1000,7.485
caption: Expected time for the slowest of $m$ parallel tasks to finish, in units of the mean task time, when task times are exponential ([[#prop-straggler]]): the step function is $H_m$ and the smooth curve its approximation $\ln m + \gamma$. The dots are $m = 100$ ($5.2$) and $m = 1000$ ($7.5$). Notice that the curve never flattens: each tenfold increase in parallelism adds about $2.3$ mean task times of waiting. Real task times often have heavier tails than the exponential, which makes stragglers worse and backup tasks more valuable.
:::

### Combiners and the cost of the shuffle

The shuffle moves every intermediate pair across the network, and it is usually the most expensive part of a job. For word count, every occurrence of "the" in every document becomes a pair $(\text{the}, 1)$ sent to one reducer. A **combiner** is a reduce function run on each map task's output before the shuffle, so that each map task sends $(\text{the}, 7972)$ once rather than $7972$ pairs. It is valid when reduction can be done in pieces.

::: proposition When a combiner is correct {#prop-combiner}
Suppose $\mathit{reduce}(k, [v_1, \dots, v_n])$ outputs $(k, v_1 \oplus v_2 \oplus \dots \oplus v_n)$ for an operation $\oplus$ that is associative and commutative. Then applying $\oplus$ to arbitrary disjoint subsets of a key's values (in any order) and then applying $\mathit{reduce}$ to the partial results gives the same output as applying $\mathit{reduce}$ to all the values.
:::

::: proof
Let the values of key $k$ be partitioned into groups $G_1, \dots, G_t$ (one per map task), and let $c_j = \bigoplus_{v \in G_j} v$ be the combiner's output for group $j$, computed in some order. Reduce then computes $c_1 \oplus \dots \oplus c_t$, in the order in which the partial results arrive. By associativity, this expression equals the $\oplus$ of all the values with the brackets removed, and by commutativity the order of the values does not matter. So it equals $v_1 \oplus \dots \oplus v_n$.
:::

Sum, count, maximum, minimum and set union qualify. Mean does not directly — the mean of means is wrong when groups have different sizes — but becomes combinable by carrying (sum, count) pairs, whose componentwise sum is associative and commutative (Exercise 9). Median has no small combinable summary at all.

::: example Word count, simulated {#ex-wordcount}
Simulate MapReduce in one Python process on $100$ synthetic documents of $200$ words each, with $R = 4$ reduce partitions. Count the intermediate pairs shuffled with and without a combiner, and check that re-executing failed map tasks (each attempt failing with probability $0.3$) does not change the result.
::: solution
```python
import random, re
from collections import defaultdict

def map_fn(doc_id, text):
    for word in re.findall(r"[a-z]+", text.lower()):
        yield word, 1

def reduce_fn(word, counts):
    yield word, sum(counts)

def mapreduce(inputs, R, combine=False, fail_prob=0.0, seed=0):
    rng = random.Random(seed)
    buckets = [defaultdict(list) for _ in range(R)]   # the shuffle: R partitions of intermediate data
    shuffled = attempts = 0
    for doc_id, text in inputs:                      # one map task per input split
        while True:                                  # re-execute the task until it succeeds
            attempts += 1
            out = defaultdict(list)
            for k, v in map_fn(doc_id, text):
                out[k].append(v)
            if rng.random() >= fail_prob:            # the worker survived: commit the task's output
                break
        if combine:                                  # combiner: local reduce before the shuffle
            out = {k: [v for _, v in reduce_fn(k, vs)] for k, vs in out.items()}
        for k, vs in out.items():
            buckets[hash(k) % R][k].extend(vs)
            shuffled += len(vs)
    result = {}
    for b in buckets:                                # one reduce task per partition, keys in sorted order
        for k in sorted(b):
            result.update(reduce_fn(k, b[k]))
    return result, shuffled, attempts

rng = random.Random(1)
vocab = ["the", "of", "and", "data", "node", "map", "reduce", "fault", "log", "zipf"]
docs = [(i, " ".join(rng.choices(vocab, weights=[50, 30, 25, 5, 4, 3, 3, 2, 2, 1], k=200)))
        for i in range(100)]
plain, s1, a1 = mapreduce(docs, R=4)
comb, s2, _ = mapreduce(docs, R=4, combine=True)
fail, _, a3 = mapreduce(docs, R=4, fail_prob=0.3, seed=5)
print("top words:", sorted(plain.items(), key=lambda kv: -kv[1])[:3])
print("pairs shuffled without combiner:", s1, " with combiner:", s2)
print("same result with combiner:", plain == comb,
      " with 30% task failures:", plain == fail, f"({a3} attempts for {len(docs)} tasks)")
```

```console
$ python3 mapreduce.py
top words: [('the', 7972), ('of', 4883), ('and', 3920)]
pairs shuffled without combiner: 20000  with combiner: 977
same result with combiner: True  with 30% task failures: True (145 attempts for 100 tasks)
```

Without a combiner, all $20{,}000$ word occurrences cross the shuffle; with it, each map task sends one pair per distinct word it saw — at most $10$ per document, $977$ in all — a $20$-fold saving, with the same result by [[#prop-combiner]]. With failures, $145$ attempts were needed for $100$ tasks (the expected number is $100/0.7 \approx 143$), and the result is identical, as [[#thm-reexec]] guarantees, because `map_fn` is deterministic and only the output of the successful attempt is committed. The word frequencies are skewed, as in real text: the reducer that receives "the" gets far more data than the others, a hot spot that only the combiner keeps in check.
:::
:::

::: quiz
Which reduce functions can safely be used, unchanged, as combiners?
- [x] Maximum of the values
- [ ] Mean of the values
- [x] Union of sets of values
- [ ] Median of the values
::: solution
Maximum and union are associative and commutative, so [[#prop-combiner]] applies. The mean of partial means is wrong unless every group has the same size; carry (sum, count) pairs instead and divide at the end. The median of medians is not the median, and no fixed-size partial summary gives an exact median.
:::
:::

### Joins

Joining two data sets on a key is the most common operation in data analysis, and the choice of algorithm is a choice of what to move across the network.

- A **repartition (shuffle) join** maps both inputs to (join key, tagged record) pairs; the shuffle brings records with the same key from both inputs to the same reducer, which pairs them up. Both inputs cross the network once.
- A **broadcast (map-side) join** applies when one input is small: copy it in full to every map task, load it into a hash table, and stream the large input through the map tasks, probing the table. Only the small input moves, once per machine.

::: example Choosing a join {#ex-join}
Join a $1$ TB log of page views with a $2$ GB table of users, on the user id, on a cluster of $100$ machines. Estimate the network traffic of each algorithm.
::: solution
The repartition join shuffles both inputs: about $1$ TB $+ 2$ GB $\approx 1.002$ TB, of which (with hash partitioning over $100$ machines) about $99\%$ crosses the network — roughly $1$ TB. The broadcast join sends the $2$ GB table to each of the $100$ machines: $200$ GB, and the $1$ TB log is read locally where it is stored. Broadcast wins by a factor of five here, and the gap grows with the size of the large side. With $1000$ machines, broadcasting would cost $2$ TB and lose. In general, broadcast beats repartitioning when (machines) $\times$ (small size) $<$ (large size) $+$ (small size), provided the small side fits in each machine's memory. Query optimisers in distributed SQL engines make exactly this choice, using size estimates ([[databases/query-optimisation]]). A third option, when both inputs are already partitioned and sorted by the join key in the same way, is a merge join with no shuffle at all.
:::
:::

## Dataflow systems

MapReduce's rigid two-stage shape is awkward for computations that need many stages, and its practice of writing every stage's output to a replicated file system is slow for **iterative** algorithms. PageRank ([[information-retrieval/web-search]]) repeats the same join-and-aggregate step dozens of times over the same graph, and as a chain of MapReduce jobs it rereads the graph from disk and rewrites the ranks to triple-replicated storage on every iteration.

Dataflow systems — Microsoft's Dryad (2007), Apache Spark (2010–12), Apache Flink and Google's Dataflow — generalise the model to a directed acyclic graph of operators (map, filter, join, group, aggregate, …) over partitioned collections, planned and optimised as a whole. Spark's central abstraction made fault tolerance cheap without replication.

::: definition Resilient distributed dataset and lineage {#def-rdd}
A **resilient distributed dataset** (RDD; Zaharia and colleagues, 2012) is an immutable collection of records split into **partitions**, defined either by data in stable storage or by a deterministic **transformation** (map, filter, join, groupByKey, …) of other RDDs. The graph of transformations that defines an RDD is its **lineage**. A partition of a child RDD has a **narrow dependency** on its parents if it depends on a bounded number of parent partitions (map, filter, union, a join of co-partitioned inputs), and a **wide dependency** if it may depend on all of them (groupByKey, a join requiring a shuffle).
:::

RDDs may be kept in memory. If a machine fails and some partitions are lost, Spark **recomputes** them from their lineage — rereading input and reapplying the deterministic transformations — instead of having replicated them in advance. This is [[#thm-reexec]] at the level of a whole graph, and it has the same requirement of determinism. Narrow dependencies are cheap to recompute (only the corresponding parent partitions are needed) and can be **pipelined** within one task; a wide dependency is a shuffle, which marks a **stage boundary**, and recomputing one lost partition after it may need data from every parent partition, which is why Spark writes shuffle outputs to local disk and lets programs **checkpoint** long lineages to stable storage. The result is that iterative jobs keep their working set in memory across iterations; the RDD paper reported speed-ups of up to $20\times$ over Hadoop on iterative machine-learning workloads.

::: example Recovering a lost partition of PageRank {#ex-lineage}
A Spark PageRank job keeps `links` (each page's outgoing links, hash-partitioned by page into $100$ partitions and cached in memory) and, in iteration $i$, computes `ranks_i` from `links.join(ranks_{i-1})`, followed by a `flatMap` that sends each page's rank share to its neighbours and a `reduceByKey` that sums the shares per page (with the same partitioner). After iteration $10$, the machine holding partition $37$ of `links` and of `ranks_10` fails. What must be recomputed?
::: solution
Because `links` and every `ranks_i` share the same hash partitioning, the `join` is narrow: partition $p$ of the joined data depends only on partition $p$ of `links` and of `ranks_{i-1}`. The `reduceByKey` after the `flatMap` is wide — shares travel to the partitions of their target pages — so each iteration is a shuffle stage.

Partition $37$ of `links` is recomputed from its lineage, by rereading the input file's corresponding blocks and reapplying the parsing and partitioning. Partition $37$ of `ranks_10` depends, through the wide `reduceByKey`, on the shuffle output of iteration $10$'s map side for *all* $100$ partitions. If those shuffle files survive on the other machines' local disks, Spark reruns only the reduce task for partition $37$. If they do not, it must rerun the map side of iteration $10$, which needs `ranks_9` in full — and so on back through the lineage, potentially to iteration $0$. This cascade is why long iterative jobs **checkpoint** an RDD to replicated storage every few iterations, truncating the lineage that a failure can force the system to replay.
:::
:::

::: warning A dataflow is not a database
Dataflow engines are often used through SQL, which makes them look like databases, but their failure semantics differ. They are designed for *deterministic* recomputation of whole data sets, not for concurrent transactional updates: a job that writes to an external store from inside a transformation will repeat those writes on every retry and speculative copy. Treat transformations as pure functions, write outputs through the engine's committed sinks (which use atomic renames or transactions), and make any external effect idempotent ([[distributed-systems/remote-communication#def-idempotent]]).
:::

## Stream processing

Batch jobs process a bounded data set that is complete before the job starts. Many sources never end: clicks, payments, sensor readings, log lines. A **stream processor** runs a dataflow graph continuously, updating results as records arrive — fraud scores within milliseconds of a payment, dashboards that are seconds behind rather than a day.

The difficulty is time. Each record has an **event time**, when it happened (a timestamp set by its source), and a **processing time**, when the system sees it. They differ by network delays, retries, buffering on phones that were offline, and failures — sometimes by seconds, sometimes by days. Results that depend on *when things happened* — "clicks per minute", "sessions per user" — must be computed in event time, yet the system can never be sure that it has seen all events up to a given event time.

::: definition Windows and watermarks {#def-watermark}
A **window** assigns each record to one or more finite groups by event time: **tumbling** windows are fixed, non-overlapping intervals ($[12{:}00, 12{:}01)$, $[12{:}01, 12{:}02)$, …); **sliding** windows have a fixed length and a smaller period, so they overlap; **session** windows group a key's records separated by gaps shorter than a timeout. A **watermark** is a timestamp $W$ that flows through the dataflow with the records and asserts that no more records with event time earlier than $W$ are expected. A window ending at $t$ is complete, and its result can be emitted, when the watermark passes $t$. Records that arrive with an event time earlier than the current watermark contradict its assertion and are **late**: a late record whose window has not yet been emitted is simply added to it, but one whose window has already been emitted needs a policy.
:::

Watermarks are usually heuristic — "the latest event time seen, minus five seconds" — because a source can rarely know that nothing older remains. A watermark that is too aggressive produces early, incomplete results and many late records; one that is too conservative produces correct results late. The Dataflow model of Akidau and colleagues (2015) made this trade-off explicit: **triggers** decide when to emit a window's result (at the watermark, early speculative results, again on late data), and an **allowed lateness** decides how long a window's state is kept for corrections.

::: example A tumbling-window count with a late record {#ex-window}
Count clicks per one-minute tumbling window in event time. The watermark is the largest event time seen so far minus $10$ s. Records arrive in this order, with event times: $12{:}00{:}05$, $12{:}00{:}40$, $12{:}01{:}02$, $12{:}00{:}55$, $12{:}01{:}15$, $12{:}00{:}30$. Which counts are emitted, and when?
::: solution
Track the watermark $W$ after each arrival:
1. $12{:}00{:}05$ → window $[12{:}00, 12{:}01)$ has $1$; $W = 11{:}59{:}55$.
2. $12{:}00{:}40$ → $2$; $W = 12{:}00{:}30$.
3. $12{:}01{:}02$ → window $[12{:}01, 12{:}02)$ has $1$; $W = 12{:}00{:}52$.
4. $12{:}00{:}55$ → it is after $W$, so not late: window $12{:}00$ has $3$; $W$ stays $12{:}00{:}52$ (the largest event time is still $12{:}01{:}02$).
5. $12{:}01{:}15$ → window $12{:}01$ has $2$; $W = 12{:}01{:}05 > 12{:}01{:}00$, so the window $[12{:}00, 12{:}01)$ is complete: **emit $3$**.
6. $12{:}00{:}30$ → its event time is before $W$: **late**. Its window has already been emitted. With allowed lateness, the system updates the count to $4$ and emits a correction; without it, the record is dropped (or sent to a side output).

Record 4 arrived after a record from the next minute but was still counted on time, because the watermark's $10$ s slack covered it; record 6 was $35$ s behind and was not covered. Processing-time windows would simply have counted records by arrival, mixing minutes together.
:::
:::

### Exactly-once state

A stream processor's operators keep state — counts, open windows, join buffers — and runs for months, so it must recover from failures without losing or double-counting input. The approach of Apache Flink (Carbone and colleagues, 2015) adapts the Chandy–Lamport snapshot ([[distributed-systems/time-clocks#alg-chandy-lamport]]) to dataflow graphs.

::: algorithm Asynchronous barrier snapshots {#alg-barrier}
Sources read from replayable logs (such as Kafka partitions) whose read positions (**offsets**) can be recorded and rewound. Channels are FIFO.
1. To start snapshot $n$, every source records its current offset and emits a **barrier** $n$ into each of its output channels.
2. An operator with several inputs, on receiving barrier $n$ on one input, stops processing that input (buffering its records) until it has received barrier $n$ on **all** inputs (**alignment**).
3. It then writes a copy of its state to durable storage (asynchronously, copy-on-write), emits barrier $n$ on all its outputs, and resumes processing, buffered records first.
4. When every operator has acknowledged barrier $n$, snapshot $n$ is complete. On failure, every operator restores its state from the latest complete snapshot and every source rewinds to its recorded offset.
:::

::: theorem Barrier snapshots give exactly-once state {#thm-barrier}
With FIFO channels, alignment, deterministic operators and replayable sources, the state recorded by snapshot $n$ is exactly the state the dataflow reaches after processing precisely the source records before the recorded offsets. Consequently, after recovery every source record affects the operator state exactly once.
:::

::: proof
For each channel, call the records sent before barrier $n$ *pre-barrier*. We show by induction along the (acyclic) graph, from sources downstream, that each operator's snapshot reflects exactly its pre-barrier input records, and that the records it sends before its own barrier $n$ are exactly those it produced from them. For a source this holds by construction: it emits the barrier right after the records before its recorded offset. For an operator, its inputs' pre-barrier records are, by the induction hypothesis, exactly the outputs of its upstream operators' pre-barrier processing. By FIFO, all of them arrive before barrier $n$ on their channel; by alignment, the operator processes no post-barrier record of any input before taking its snapshot (it buffers them), and it has processed every pre-barrier record, since it waits for the barrier on every input. So its snapshot reflects exactly its pre-barrier inputs, and since it emits barrier $n$ right after the snapshot, before processing any buffered record, the records it sends before the barrier are exactly those produced from pre-barrier inputs.

The snapshot is therefore a consistent cut ([[distributed-systems/time-clocks#def-cut]]) in which every channel is empty: alignment has absorbed the channel states of Chandy–Lamport into the operators. On recovery, operators restore exactly this state and sources replay from the recorded offsets the records *not* reflected in it; since operators are deterministic, reprocessing yields the same results as the first time. Each source record is thus reflected in the state once — either in the snapshot or by being replayed — and never twice.
:::

"Exactly once" here refers to the effect on the processor's *state*, not to how many times records are processed: after a failure, records after the snapshot are processed again. Outputs to external systems are another matter. To make them exactly-once too, the sink must be idempotent (writes keyed so that a repeat overwrites itself) or **transactional**: Flink's two-phase commit sink opens a transaction in the external system for each snapshot interval, pre-commits it when the barrier arrives, and commits it when the snapshot is complete — the atomic commitment protocol of [[distributed-systems/distributed-transactions]], with the snapshot completion as the commit point. Kafka's transactions similarly commit a consumer's input offsets atomically with its outputs. Alignment has a cost: a slow input channel holds back the others, and under back-pressure snapshots can take a long time, which motivated later **unaligned** checkpoints that store in-flight records with the snapshot, exactly as Chandy–Lamport records channel state.

::: history
Parallel databases such as Teradata (1980s), Gamma (DeWitt and colleagues, 1986–90) and Bubba had already partitioned data and run relational operators in parallel with hash-partitioned joins. Jeffrey Dean and Sanjay Ghemawat's "MapReduce: simplified data processing on large clusters" (OSDI 2004) made the model and its fault tolerance by re-execution famous; Doug Cutting and Mike Cafarella's open-source Hadoop followed in 2006, and David DeWitt and Michael Stonebraker's critique "MapReduce: a major step backwards" (2008) argued that it reinvented parallel databases badly. Michael Isard and colleagues described Dryad in 2007, Grzegorz Malewicz and colleagues Pregel for graph processing in 2010, and Matei Zaharia and colleagues Spark (2010) and resilient distributed datasets (NSDI 2012). For streams, Jay Kreps, Neha Narkhede and Jun Rao described Kafka in 2011; Twitter's Storm was open-sourced the same year; Google's MillWheel appeared in 2013, and Tyler Akidau and colleagues' "The dataflow model" (VLDB 2015) unified batch and streaming around event time, windows, watermarks and triggers. Paris Carbone and colleagues described Flink's asynchronous barrier snapshots in 2015.
:::

## Where this leads

The ideas of this chapter meet several other courses. Parallel speed-up and its limits — Amdahl's and Gustafson's laws, the cost of communication — are developed in [[parallel-computing/performance-laws]] and [[parallel-computing/message-passing]]. Building inverted indexes and computing PageRank at web scale, classic MapReduce applications, are covered in [[information-retrieval/inverted-indexes]] and [[information-retrieval/web-search]]. Query optimisation for distributed SQL engines extends [[databases/query-optimisation]]. And training large machine-learning models is itself a distributed dataflow, with its own partitioning of data and parameters, discussed in the LLM Atlas.

::: summary
- **MapReduce**: map each record to key–value pairs, **shuffle** by key, reduce each key's values; the system handles partitioning, scheduling, locality and failures.
- **Re-execution** of deterministic tasks with atomically committed outputs gives the same output as a failure-free run ([[#thm-reexec]]); non-determinism and side effects break this.
- A job waits for its slowest task — about $\ln m$ mean task times for $m$ exponential tasks ([[#prop-straggler]]) — so **backup tasks** matter.
- **Combiners** cut shuffle traffic when reduce is an associative, commutative fold ([[#prop-combiner]]); choose **broadcast** or **repartition** joins by what must move.
- **Dataflow** systems run DAGs of operators; Spark's **RDDs** recover lost partitions from **lineage**, with narrow dependencies pipelined and wide ones marking shuffles.
- Stream processing distinguishes **event time** from processing time; **windows** group by event time and **watermarks** decide when a window is complete; late data needs a policy.
- **Barrier snapshots** with alignment give exactly-once *state* ([[#thm-barrier]]); exactly-once *output* needs idempotent or transactional sinks.
:::

## Exercises

::: exercise Counting map tasks {level=1 check="8192"}
A $1$ TiB input is split into $128$ MiB splits, one map task each. How many map tasks are there? (Enter the number.)
::: solution
$2^{40}/2^{27} = 2^{13} = 8192$ map tasks.
:::
:::

::: exercise Intermediate pairs {level=1 check="8"}
Word count's map emits $(w, 1)$ per word. For the single document "to be or not to be that is the question" (no punctuation), how many intermediate pairs does map emit, and how many does a combiner reduce them to? (Enter the number after combining.)
::: solution
The document has $10$ words — to, be, or, not, to, be, that, is, the, question — so map emits $10$ pairs. The distinct words are to, be, or, not, that, is, the and question: $8$. The combiner sends $8$ pairs, with $(\text{to}, 2)$ and $(\text{be}, 2)$ replacing two pairs each.
:::
:::

::: exercise Stragglers {level=1 check="25/12"}
Using [[#prop-straggler]], what is the expected completion time of $4$ parallel tasks with exponential durations of mean $1$? (Enter the number.)
::: solution
$H_4 = 1 + 1/2 + 1/3 + 1/4 = 25/12 \approx 2.08$.
:::
:::

::: exercise Broadcast or shuffle? {level=2 check="400"}
A $500$ GB table is joined with a $4$ GB table on a cluster of $100$ machines. How many gigabytes does a broadcast join send over the network? Which algorithm is cheaper? (Enter the gigabytes sent by the broadcast join.)
::: solution
Broadcast sends $4$ GB to each of $100$ machines: $400$ GB. A repartition join sends about $504$ GB (a fraction $99/100$ of it crosses the network, about $499$ GB). Broadcast is somewhat cheaper here, provided $4$ GB fits comfortably in each machine's memory for the hash table; with $200$ machines it would cost $800$ GB and lose.
:::
:::

::: exercise Late or on time? {level=2}
In [[#ex-window]], change the watermark heuristic to "largest event time seen minus $40$ s". Which records are late now, and when is the window $[12{:}00, 12{:}01)$ emitted?
::: solution
The watermark after each arrival is $11{:}59{:}25$, $12{:}00{:}00$, $12{:}00{:}22$, $12{:}00{:}22$, $12{:}00{:}35$, $12{:}00{:}35$. Record 6 ($12{:}00{:}30$) arrives with an event time below the watermark $12{:}00{:}35$, so it is late by definition — but its window has not been emitted, because the watermark is still before $12{:}01{:}00$, so it is simply counted. The window $[12{:}00, 12{:}01)$ is emitted, with count $4$, when the watermark passes $12{:}01{:}00$, i.e. when a record with event time after $12{:}01{:}40$ arrives. More slack means fewer records missing from emitted results, but results that come later.
:::
:::

::: exercise Narrow or wide? {level=2}
Classify each Spark transformation's dependency as narrow or wide: (a) `map`; (b) `filter`; (c) `groupByKey`; (d) `union`; (e) `join` of two RDDs hash-partitioned the same way on the join key; (f) `join` of two RDDs with unrelated partitioning. Where are the stage boundaries in `textFile → flatMap → map → reduceByKey → filter`?
::: solution
(a), (b), (d) narrow: each output partition depends on one parent partition (for union, on one partition of one parent). (c) wide: an output partition gathers a key's values from every parent partition. (e) narrow: partition $i$ of the result depends only on partition $i$ of each input. (f) wide: both inputs must be shuffled. In the pipeline, `textFile`, `flatMap` and `map` are pipelined in one stage; `reduceByKey` needs a shuffle, so a new stage starts there, containing the reduce side and the `filter`.
:::
:::

::: exercise Combining is folding {level=3}
Prove that if $\oplus$ is associative and has an identity $e$ but is *not* commutative, a combiner can still be used correctly provided the system preserves the order of values: each map task's values for a key form a contiguous block in a fixed global order, and reduce receives the partial results in that order. Give an example of such an operation and say why real MapReduce systems do not offer this guarantee.
::: solution
Let the values in the fixed global order be $v_1, \dots, v_n$, and suppose map task $j$ holds a contiguous block $v_{a_j}, \dots, v_{b_j}$, with blocks in order. The combiner computes $c_j = v_{a_j} \oplus \dots \oplus v_{b_j}$ (any bracketing, by associativity), and reduce computes $c_1 \oplus \dots \oplus c_t$ in order. By associativity the whole expression equals $v_1 \oplus \dots \oplus v_n$ with any bracketing; no reordering was used, so commutativity is not needed. (Empty blocks contribute $e$.) Example: string concatenation, or composition of functions, or "take the last value" (for keeping the latest event when values are ordered by time). Real systems do not offer this because the shuffle delivers partial results in the order in which map tasks finish — which varies with scheduling, re-execution and backup tasks — and a key's values come from tasks over arbitrary splits; imposing an order would need sorting by an explicit sequence number, which is what "secondary sort" techniques do.
:::
:::

::: exercise Non-deterministic map {level=3}
A map function samples $1\%$ of its input records using an unseeded random number generator. Show that, with re-execution after failures, the job's output may correspond to no failure-free execution. How would you fix the job?
::: solution
Suppose map task $j$ completes, reducer $1$ fetches its output partition for $r = 1$, and then the worker fails before reducer $2$ fetches partition $2$. The master re-executes task $j$ on another worker; with a fresh random seed it samples a *different* $1\%$ of the records, and reducer $2$ fetches partition $2$ of the new attempt. Reducer $1$'s input now reflects sample $S$ and reducer $2$'s reflects sample $S' \ne S$. The final output combines parts of two different samples — for instance, the total number of sampled records over all keys need not equal the size of either sample — so it is the output of no single run. This is the failure of the first step of the proof of [[#thm-reexec]]: different attempts of the same task produce different outputs $O_j$. The fix is to make map deterministic: seed the generator from the split's identity, or better, sample by hashing — keep a record if $\mathit{hash}(\text{record id}) \bmod 100 = 0$ — which selects the same records on every attempt.
:::
:::

::: exercise A combinable mean {level=3}
Write `map_fn`, `reduce_fn` and a combiner for computing the mean of the values for each key, for use with the simulator of [[#ex-wordcount]], and explain why your combiner is correct by [[#prop-combiner]].
::: solution
Carry (sum, count) pairs; combine by componentwise addition; divide only at the very end.

```python
def map_fn(_, record):                 # record = (key, value)
    key, value = record
    yield key, (value, 1)

def combine_fn(key, pairs):            # partial aggregation: sum the sums and the counts
    yield key, (sum(s for s, _ in pairs), sum(c for _, c in pairs))

def reduce_fn(key, pairs):
    s = sum(s for s, _ in pairs)
    c = sum(c for _, c in pairs)
    yield key, s / c

parts = [list(combine_fn("a", [(1.0, 1), (3.0, 1)])), list(combine_fn("a", [(5.0, 1)]))]
print(list(reduce_fn("a", [p[0][1] for p in parts])))
```

```console
$ python3 mean.py
[('a', 3.0)]
```

The operation $(s_1, c_1) \oplus (s_2, c_2) = (s_1 + s_2, c_1 + c_2)$ is associative and commutative, and the reduce is "fold with $\oplus$, then divide", so by [[#prop-combiner]] the folded pair is the same however the values are grouped — it is always (total, count) — and the final division gives the exact mean, here $(1 + 3 + 5)/3 = 3$. The simulator's `combine` flag calls `reduce_fn` as the combiner, so for this job it would need a separate `combine_fn` as above: the reduce function itself (which divides) is *not* a valid combiner.
:::
:::
