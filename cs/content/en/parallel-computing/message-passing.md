Here are two ways for $p$ processes, each holding a vector of $2^{20}$ numbers ($8$ MiB), to compute the elementwise sum of all their vectors and leave a copy of it with every process — the **allreduce** operation, which every step of distributed machine-learning training and many scientific codes perform. In the first, every process sends its vector to process $0$, which adds them up and sends the result back to everyone. In the second, the processes are arranged in a ring and pass pieces of their vectors to their neighbours in $2(p - 1)$ steps. Both are written in Python with `multiprocessing`, the processes communicating only through pipes:

```console
$ python3 naive_allreduce.py
p=2: sum 3, uniform True, slowest 0.172 s
p=4: sum 10, uniform True, slowest 0.530 s
p=8: sum 36, uniform True, slowest 1.111 s
$ python3 allreduce.py
p=2: sum 3 (expected 3), uniform True, slowest 0.095 s
p=4: sum 10 (expected 10), uniform True, slowest 0.144 s
p=8: sum 36 (expected 36), uniform True, slowest 0.192 s
```

(Observations on the $36$-core machine of this course, as of 2026.) The centralised version slows down in proportion to $p$: process $0$ must receive and send $p - 1$ full vectors and do $p - 1$ vector additions. The ring version grows much more slowly, and would hardly grow at all for very large vectors: we shall prove that each of its processes sends and receives less than *twice* the size of one vector, whatever $p$ is.

This chapter is about programming machines with **distributed memory**, where processes share nothing and communicate only by sending messages. The standard interface is **MPI**, the Message Passing Interface. We introduce its programming model and point-to-point communication, including the deadlocks that buffering hides; the **α–β cost model** of a message, measured on this machine; the **collective operations** — broadcast, reduce, allreduce, gather, scatter, all-to-all — with algorithms and proofs of their costs; and **domain decomposition**, the way most scientific programs divide their data. MPI is not installed on this machine, so MPI listings in this chapter are illustrative (they use only standard MPI-3 calls and are written to be correct, but were not compiled here); every program whose output is shown is a C or Python program that was run here, using pipes and sockets between processes to play the role of the network.

## The message-passing model

Message passing makes communication explicit. Each process has a private address space; to move data from process $A$ to process $B$, $A$ executes a **send** and $B$ a matching **receive**. Nothing is shared, so there are no data races, no cache-coherence traffic and no memory model to reason about — only messages, which are slow, and the order in which they arrive. The model fits clusters, where the processes really are on different machines, and it works on shared-memory machines too, where MPI implementations pass messages through shared memory.

::: definition The MPI programming model {#def-mpi}
An MPI program is started as $p$ copies of the same executable (SPMD), for example with `mpirun -n 64 ./prog`. Each process calls `MPI_Init` first and `MPI_Finalize` last. The processes are members of a **communicator** — `MPI_COMM_WORLD` contains all of them — in which each has a **rank** $0, \dots, p - 1$. A message is sent with

`MPI_Send(buf, count, datatype, dest, tag, comm)`

and received with

`MPI_Recv(buf, count, datatype, source, tag, comm, &status)`,

where `datatype` describes the elements (`MPI_DOUBLE`, …), and a receive matches a message with the same communicator, from the given source (or `MPI_ANY_SOURCE`) and with the given tag (or `MPI_ANY_TAG`). Messages between one pair of processes with the same communicator and tag arrive in the order they were sent. **Collective** operations, such as `MPI_Bcast` and `MPI_Allreduce`, are called by every process of a communicator.
:::

```c
/* Illustrative MPI program (not compiled on this machine): pass a token around a ring. */
#include <mpi.h>
#include <stdio.h>

int main(int argc, char **argv) {
    MPI_Init(&argc, &argv);
    int rank, p, token;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &p);
    if (rank == 0) {
        token = 42;
        MPI_Send(&token, 1, MPI_INT, 1 % p, 0, MPI_COMM_WORLD);
        MPI_Recv(&token, 1, MPI_INT, p - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("token back at rank 0 after visiting %d processes: %d\n", p, token);
    } else {
        MPI_Recv(&token, 1, MPI_INT, rank - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        token += 1;                                  /* each process adds one */
        MPI_Send(&token, 1, MPI_INT, (rank + 1) % p, 0, MPI_COMM_WORLD);
    }
    MPI_Finalize();
    return 0;
}
```

(Run with at least two processes; rank $0$ would print $42 + p - 1$.)

### Blocking, buffering and deadlock

`MPI_Send` is **blocking**: it returns when the send buffer may be reused. It may do so as soon as the message has been copied into a system buffer, or only once the matching receive has started — the standard leaves the choice to the implementation, which typically buffers small messages and waits for the receiver for large ones. A program that is correct only if sends are buffered is called **unsafe**.

::: example A deadlock that depends on the message size {#ex-deadlock}
Two processes exchange messages of $n$ bytes, each first sending and then receiving. Run it for $n = 1000$ and $n = 10^7$.

```python
import sys
from multiprocessing import Pipe, Process

def swap(conn, nbytes):
    conn.send_bytes(bytes(nbytes))        # both processes send first ...
    conn.recv_bytes()                     # ... then receive
    print(f"{nbytes} bytes: exchanged", flush=True)

if __name__ == "__main__":
    nbytes = int(sys.argv[1])
    a, b = Pipe()                          # a two-way connection
    other = Process(target=swap, args=(b, nbytes))
    other.start()
    swap(a, nbytes)
    other.join()
```
::: solution
```console
$ timeout 10 python3 deadlock.py 1000; echo "status $?"
1000 bytes: exchanged
1000 bytes: exchanged
status 0
$ timeout 10 python3 deadlock.py 10000000; echo "status $?"
status 124
```

With $1000$ bytes, each `send_bytes` completes at once because the message fits in the kernel's socket buffer, and both processes proceed to their receives. With $10^7$ bytes, the buffer fills; each sender blocks until the other side reads, but the other side is also blocked sending: a deadlock — a cycle of processes each waiting for the next ([[operating-systems/synchronisation]]) — ended by `timeout` after $10$ seconds (status $124$). The same code with `MPI_Send` and `MPI_Recv` behaves the same way, with the threshold set by the MPI implementation's "eager" limit. The cures: order the operations so that one side receives first (even ranks send first, odd ranks receive first); use `MPI_Sendrecv`, which performs a send and a receive together without deadlock; or use **non-blocking** operations, `MPI_Isend` and `MPI_Irecv`, which return immediately with a request handle, followed by `MPI_Waitall` on both requests.
:::
:::

Non-blocking operations also let a program **overlap** communication with computation: post the receives and sends for the boundary data, compute on the interior, and wait only when the boundary data is needed. Whether the overlap really happens depends on the network hardware and on whether the MPI library makes progress in the background.

## The cost of a message

::: definition The α–β model {#def-alpha-beta}
In the **α–β model** (Hockney's model), sending a message of $m$ bytes between two processes takes time

$$
T(m) = \alpha + \beta m,
$$ {#eq-alpha-beta}

where the **latency** $\alpha$ is a fixed cost per message (software overhead, network traversal) and $\beta$ is the transfer time per byte, the reciprocal of the bandwidth. Each process can send one message and receive one message at the same time, and messages between disjoint pairs of processes do not interfere.
:::

Typical values (as of 2026): within one node, through shared memory, $\alpha$ is a fraction of a microsecond to a few microseconds and $1/\beta$ is tens of GB/s; across a high-performance network $\alpha$ is one to a few microseconds and $1/\beta$ is $25$–$50$ GB/s per link; across Ethernet with TCP, $\alpha$ is tens of microseconds. The **half-bandwidth message size** $\alpha/\beta$, at which latency and transfer cost the same, is tens of kilobytes. Messages much smaller than this are latency-bound, and should be aggregated; much larger ones are bandwidth-bound. More refined models such as **LogP** (Culler and others, 1993) separate the latency of the network from the processor overheads of sending and receiving and the minimum gap between messages, but α–β is accurate enough to design algorithms with.

::: example Measuring α and β {#ex-alpha-beta}
Measure the one-way time for messages of $1$ byte to $16$ MiB between two processes on this machine connected by a Unix-domain socket, by timing $100$ round trips per size, and fit [[#eq-alpha-beta]].
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <time.h>
#include <unistd.h>

static void xfer(int fd, char *buf, size_t n, int sending) {   /* all n bytes */
    for (size_t done = 0; done < n; ) {
        ssize_t r = sending ? write(fd, buf + done, n - done) : read(fd, buf + done, n - done);
        if (r <= 0) { perror("xfer"); exit(1); }
        done += r;
    }
}

int main(void) {
    int sv[2];
    socketpair(AF_UNIX, SOCK_STREAM, 0, sv);          /* a two-way channel */
    size_t max = 1 << 24;
    char *buf = calloc(max, 1);
    if (fork() == 0) {                                 /* process 1: echo everything */
        for (size_t m = 1; m <= max; m *= 16)
            for (int r = 0; r < 100; r++) { xfer(sv[1], buf, m, 0); xfer(sv[1], buf, m, 1); }
        return 0;
    }
    for (size_t m = 1; m <= max; m *= 16) {            /* process 0: send, wait for echo */
        struct timespec t0, t1;
        clock_gettime(CLOCK_MONOTONIC, &t0);
        for (int r = 0; r < 100; r++) { xfer(sv[0], buf, m, 1); xfer(sv[0], buf, m, 0); }
        clock_gettime(CLOCK_MONOTONIC, &t1);
        double us = ((t1.tv_sec - t0.tv_sec) * 1e6 + (t1.tv_nsec - t0.tv_nsec) / 1e3) / 200;
        printf("%9zu bytes: %9.2f us one way  %6.2f GB/s\n", m, us, m / (us * 1e3));
    }
    wait(NULL);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o pingpong_proc pingpong_proc.c && ./pingpong_proc
        1 bytes:      4.51 us one way    0.00 GB/s
       16 bytes:      4.35 us one way    0.00 GB/s
      256 bytes:      3.95 us one way    0.06 GB/s
     4096 bytes:      6.97 us one way    0.59 GB/s
    65536 bytes:     22.60 us one way    2.90 GB/s
  1048576 bytes:    234.97 us one way    4.46 GB/s
 16777216 bytes:   4167.39 us one way    4.03 GB/s
```

Small messages cost $\alpha \approx 4.4$ µs — two system calls and a wake-up of the receiving process. The largest gives $1/\beta \approx 16.8 \text{ MB} / 4.17 \text{ ms} \approx 4.0$ GB/s, so $\beta \approx 0.25$ ns/byte; the model $4.4 \ \mu\text{s} + m/(4.0 \text{ GB/s})$ predicts $20.8$ µs at $64$ KiB, close to the measured $22.6$ µs. The $1$ MiB point is a little faster than the model (it fits in the caches). The half-bandwidth size is $\alpha/\beta \approx 18$ KB. A real MPI library on the same machine would do better — it copies through shared memory without system calls — and a cluster network has a larger $\alpha$; but the shape of the curve is the same everywhere.
:::
:::

## Collective operations

Many communication patterns involve all processes at once. MPI provides them as **collectives**, which implementations optimise for each machine; knowing their costs is essential for predicting how a program scales.

::: definition Collective operations {#def-collectives}
For $p$ processes, with process $r$ holding data $x_r$:

- **broadcast**: the root's message of $m$ bytes is copied to every process;
- **reduce**: the root obtains $x_0 \oplus x_1 \oplus \dots \oplus x_{p-1}$ (elementwise, for an associative operator $\oplus$), each $x_r$ having $m$ bytes;
- **allreduce**: every process obtains that combination;
- **scatter**: the root holds $p$ blocks of $m/p$ bytes and sends block $r$ to process $r$; **gather** is the reverse;
- **allgather**: each process contributes a block of $m/p$ bytes and every process obtains all $p$ blocks;
- **reduce-scatter**: process $r$ obtains block $r$ of the combination;
- **all-to-all**: each process sends a distinct block to every other process (a distributed transpose);
- **barrier**: no process leaves until all have entered.
:::

The simplest algorithms are sequential: for a broadcast the root sends $p - 1$ messages one after another, in time $(p - 1)(\alpha + \beta m)$. Trees do much better.

::: theorem Binomial-tree broadcast {#thm-bcast}
A broadcast of $m$ bytes among $p$ processes can be done in $\lceil \log p \rceil$ rounds, in time $\lceil \log p \rceil(\alpha + \beta m)$; and no algorithm in the α–β model that sends the message whole can use fewer rounds.
:::

::: proof
*Algorithm.* Number the processes relative to the root. In round $k = 0, 1, \dots$, every process $r < 2^k$ that has the message sends it to process $r + 2^k$, if that exists. By induction, after round $k$ the processes $0, \dots, 2^{k+1} - 1$ (those that exist) have the message, so after $\lceil \log p \rceil$ rounds all $p$ have it. In each round every process sends or receives at most one message, so the rounds take $\alpha + \beta m$ each.

*Lower bound.* In one round, each process that has the message can send it to at most one other, so the number of processes holding it at most doubles. Starting from $1$, after $k$ rounds at most $2^k$ hold it, so $p$ processes need at least $\lceil \log p \rceil$ rounds.
:::

The communication pattern is a **binomial tree**: on a hypercube ([[parallel-computing/parallel-architectures#thm-hypercube]]) round $k$ uses the links of dimension $k$. A reduce is the same tree traversed upwards, combining as it goes, in time $\lceil \log p \rceil(\alpha + \beta m + \gamma m)$ with $\gamma$ the computation time per byte; an allreduce can be a reduce followed by a broadcast, or **recursive doubling** — in round $k$ each process exchanges its current partial result with the partner whose rank differs in bit $k$, and combines — in $\log p (\alpha + \beta m)$ ([[#ex-recursive-doubling]]).

For long messages the tree algorithms waste bandwidth: the whole message crosses $\log p$ links in sequence, and in each round half the processes are idle. Splitting the message and pipelining the pieces does better.

::: algorithm Ring allreduce (reduce-scatter then allgather) {#alg-ring-allreduce}
Arrange the processes in a ring, process $r$ sending to $r + 1$ and receiving from $r - 1$ (mod $p$), and split each vector into $p$ chunks numbered $0, \dots, p - 1$.

1. **Reduce-scatter**: for steps $s = 0, \dots, p - 2$, every process $r$ sends its chunk $(r - s) \bmod p$ to the right and adds the chunk it receives from the left into its own chunk $(r - s - 1) \bmod p$.
2. **Allgather**: for steps $s = 0, \dots, p - 2$, every process $r$ sends its chunk $(r + 1 - s) \bmod p$ to the right and overwrites its chunk $(r - s) \bmod p$ with the chunk it receives.
:::

::: theorem Cost of the ring allreduce {#thm-ring}
[[#alg-ring-allreduce]] computes the allreduce of vectors of $m$ bytes in time

$$
T_{\text{ring}} = 2(p - 1)\alpha + 2\,\frac{p - 1}{p}\,m\beta
$$ {#eq-ring}

(plus $\frac{p-1}{p}m\gamma$ for the additions). Each process sends and receives $2\frac{p-1}{p}m < 2m$ bytes.
:::

::: proof
*Reduce-scatter.* Write $x_q[c]$ for chunk $c$ of process $q$'s input. Claim: after step $s$, process $r$'s chunk $(r - s - 1) \bmod p$ holds $x_{r-s-1}[c] \oplus \dots \oplus x_r[c]$ for $c = (r - s - 1) \bmod p$, the combination over the $s + 2$ processes $r - s - 1, \dots, r$ (indices mod $p$). At step $0$, process $r$ receives from $r - 1$ that process's chunk $(r - 1) \bmod p$, which is the input $x_{r-1}[r-1]$, and adds its own $x_r[r-1]$: the claim for $s = 0$. At step $s \ge 1$, process $r$ receives from $r - 1$ the chunk $((r - 1) - s) \bmod p$ — the chunk that process $r - 1$ completed at step $s - 1$, which by the claim holds the combination over processes $r - s - 1, \dots, r - 1$ — and adds its own input chunk, extending the combination to process $r$. (Process $r$'s own copy of that chunk has not been modified before: it modifies chunk $(r - s' - 1) \bmod p$ at step $s'$, a different chunk at each step.) After step $p - 2$, process $r$'s chunk $(r + 1) \bmod p$ holds the combination over all $p$ processes.

*Allgather.* At step $0$ each process $r$ sends its completed chunk $(r + 1) \bmod p$ and receives chunk $r \bmod p$, completed by process $r - 1$; at each later step it forwards the chunk it received at the previous step. After $p - 1$ steps every process has every completed chunk.

*Cost.* Each of the $2(p - 1)$ steps sends one chunk of $m/p$ bytes and receives one, all processes in parallel, so each step takes $\alpha + \beta m/p$; summing gives [[#eq-ring]].
:::

::: example Tracing the ring allreduce {#ex-ring-trace}
Three processes hold $(1, 2, 3)$, $(10, 20, 30)$ and $(100, 200, 300)$, one element per chunk. Show their vectors after each of the four steps.
::: solution
| after | P0 | P1 | P2 |
|---|---|---|---|
| reduce-scatter step $0$ | $(1, 2, \mathbf{303})$ | $(\mathbf{11}, 20, 30)$ | $(100, \mathbf{220}, 300)$ |
| reduce-scatter step $1$ | $(1, \mathbf{222}, 303)$ | $(11, 20, \mathbf{333})$ | $(\mathbf{111}, 220, 300)$ |
| allgather step $0$ | $(\mathbf{111}, 222, 303)$ | $(11, \mathbf{222}, 333)$ | $(111, 220, \mathbf{333})$ |
| allgather step $1$ | $(111, 222, \mathbf{333})$ | $(\mathbf{111}, 222, 333)$ | $(111, \mathbf{222}, 333)$ |

(Bold entries changed in that step.) At reduce-scatter step $0$, P0 received P2's chunk $2$ ($300$) and added its own $3$; P1 received P0's chunk $0$; P2 received P1's chunk $1$. After the reduce-scatter, P0 holds the complete chunk $1$ ($222$), P1 chunk $2$ ($333$) and P2 chunk $0$ ($111$), exactly as the proof's claim says (process $r$ holds chunk $r + 1$). Two allgather steps circulate them. Each process sent four messages of one element; a reduce to P0 followed by a broadcast would have sent whole vectors.
:::
:::

The Python implementation of the opening experiment follows the algorithm line by line. Its `exchange` function sends to the right and receives from the left with even ranks sending first, to avoid the deadlock of [[#ex-deadlock]]:

```python
from array import array

def exchange(rank, send_conn, recv_conn, data):
    """Send data right and receive from the left without deadlock (cf. MPI_Sendrecv)."""
    if rank % 2 == 0:
        send_conn.send_bytes(data); return recv_conn.recv_bytes()
    got = recv_conn.recv_bytes(); send_conn.send_bytes(data); return got

def ring_allreduce(rank, p, right, left, x):
    """Sum the vectors x of all p processes; afterwards every process has the sum."""
    n = len(x)
    bounds = [n * k // p for k in range(p + 1)]            # chunk k is x[bounds[k]:bounds[k+1]]
    chunk = lambda k: slice(bounds[k % p], bounds[k % p + 1])
    for step in range(p - 1):                              # reduce-scatter
        out, inc = (rank - step) % p, (rank - step - 1) % p
        got = array("d", exchange(rank, right, left, x[chunk(out)].tobytes()))
        s = chunk(inc)
        x[s] = array("d", map(float.__add__, x[s], got))   # add the incoming partial sums
    for step in range(p - 1):                              # allgather of the summed chunks
        out, inc = (rank + 1 - step) % p, (rank - step) % p
        x[chunk(inc)] = array("d", exchange(rank, right, left, x[chunk(out)].tobytes()))
    return x
```

The driver starts $p$ processes, connects process $r$'s `right` end to process $r + 1$'s `left` end with a `Pipe`, gives process $r$ a vector of $2^{20}$ copies of $r + 1$, and reports the slowest process's time and whether every element of every result equals $p(p + 1)/2$. (The parity rule needs $p$ even, or $p = 1$; for odd $p$ the two neighbours of the wrap-around link would both send first.) The naive version's time grows with $p$ because process $0$ handles $2(p - 1)$ full vectors; the ring's grows slowly, mostly through the $2(p - 1)$ latencies and Python's per-element addition.

::: widget plot
f: log2(p)*(a + x*b); 2*(p - 1)*a + 2*(p - 1)/p*x*b
x: 0, 10
y: 0, 5000
sliders: p=64:2:1024:2; a=2:0.5:20:0.5; b=40:10:400:5
labels: \text{recursive doubling } \log p\,(\alpha + m\beta); \text{ring } 2(p-1)\alpha + 2\frac{p-1}{p}m\beta
caption: Time in microseconds for an allreduce of $m$ megabytes ($x$ axis) among $p$ processes, with latency $\alpha$ µs and $\beta$ µs per megabyte ($40$ µs/MB is $25$ GB/s). For small messages recursive doubling wins: it pays $\log p$ latencies instead of $2(p - 1)$. For large messages the ring wins: its bandwidth term is bounded by $2m\beta$ whatever $p$. Move $p$ to $1024$ and watch the crossover move right — with many processes the ring's latency term becomes large, which is why libraries switch algorithms by message size and use hierarchical or tree-pipelined schemes on big machines.
:::

How good is the ring? Its bandwidth term is optimal: a lower bound of $2\frac{p-1}{p}m\beta$ for allreduce holds for any algorithm in which each process sends and receives one message at a time (Patarasuk and Yuan, 2009). We prove the easier half, which shows why the factor $\frac{p-1}{p}$ appears.

::: proposition A lower bound for allgather {#prop-allgather-bound}
In the α–β model, any allgather in which each process contributes $m/p$ bytes takes time at least $\max\bigl(\lceil \log p \rceil\alpha,\ \frac{p - 1}{p}m\beta\bigr)$.
:::

::: proof
*Bandwidth.* Each process must end with the $p - 1$ blocks it did not start with, $\frac{p-1}{p}m$ bytes in total, and it receives at most one message at a time, at $\beta$ per byte; so it spends at least $\frac{p-1}{p}m\beta$ receiving. *Latency.* Consider process $0$'s block: the number of processes holding (any information about) it at most doubles per round, as in [[#thm-bcast]], so at least $\lceil \log p \rceil$ rounds, each costing at least $\alpha$, are needed. Each is a lower bound on the total time, so the time is at least the larger of the two.
:::

The ring allgather takes $(p - 1)\alpha + \frac{p-1}{p}m\beta$: optimal bandwidth, poor latency. The Bruck algorithm and recursive doubling achieve the latency term $\lceil \log p \rceil \alpha$ at the same bandwidth cost when $p$ is a power of two. Real MPI libraries choose among several algorithms per collective according to $m$ and $p$, and for large clusters use hierarchical algorithms: reduce within each node through shared memory, allreduce between nodes, broadcast within nodes.

::: example Two ways to broadcast a large message {#ex-bcast}
Broadcast $m = 64$ MB to $p = 64$ processes on a network with $\alpha = 2$ µs and $1/\beta = 25$ GB/s. Compare the binomial tree with **scatter–allgather**: the root scatters $64$ blocks of $1$ MB (by a binomial tree, in time $\log p\,\alpha + \frac{p-1}{p}m\beta$), and a ring allgather collects them everywhere.
::: solution
$m\beta = 64 \times 10^6 / (25 \times 10^9)$ s $= 2.56$ ms. Binomial tree: $\log 64 = 6$ rounds of $\alpha + m\beta \approx 2.562$ ms, total $15.4$ ms. Scatter–allgather: scatter $6\alpha + \frac{63}{64} \times 2.56$ ms $\approx 2.53$ ms, allgather $63\alpha + \frac{63}{64} \times 2.56$ ms $\approx 2.65$ ms; total about $5.2$ ms, three times faster. For a $1$ KB message the comparison reverses: the tree takes $6(\alpha + 0.04 \ \mu\text{s}) \approx 12.2$ µs, scatter–allgather at least $69\alpha \approx 138$ µs. This is van de Geijn's long-message broadcast (Barnett, Payne, van de Geijn and Watts, 1994), used by MPI libraries for large broadcasts.
:::
:::

::: quiz
Under the α–β model, which statements are correct for $p = 2^k$ processes and $m$-byte vectors?
- [x] A binomial-tree broadcast takes $k$ rounds, and no algorithm that forwards the message whole can take fewer.
- [x] In a ring allreduce, each process sends less than $2m$ bytes, independently of $p$.
- [ ] Recursive doubling allreduce is always faster than the ring allreduce, because $\log p < 2(p - 1)$.
- [ ] A barrier costs nothing in the α–β model, because it transfers no data.
::: solution
The broadcast statements are [[#thm-bcast]]. The ring sends $2\frac{p-1}{p}m$ bytes per process ([[#thm-ring]]). Recursive doubling has the better latency term but sends $m\log p$ bytes per process, so it loses for large $m$. A barrier needs at least $\lceil \log p \rceil$ rounds of messages (information that every process has arrived must reach every process), costing about $\log p\,\alpha$.
:::
:::

## Domain decomposition

Most large simulations evolve a quantity defined on a grid — temperature, pressure, velocity — by repeatedly updating every grid point from its neighbours. The **Jacobi** iteration for the heat equation on an $n \times n$ grid replaces each interior value by the average of its four neighbours:

$$
u^{(t+1)}_{ij} = \tfrac{1}{4}\left(u^{(t)}_{i-1,j} + u^{(t)}_{i+1,j} + u^{(t)}_{i,j-1} + u^{(t)}_{i,j+1}\right).
$$

To parallelise it on distributed memory, **decompose the domain**: give each process a contiguous piece of the grid, plus a layer of **ghost cells** (a **halo**) holding copies of its neighbours' boundary values. Each iteration, every process exchanges boundary values with its neighbours (a **halo exchange**), then updates its own points using only local data.

```c
/* Illustrative MPI (not compiled here): one Jacobi iteration on a 1D decomposition into
   strips of 'rows' rows of n doubles, with ghost rows 0 and rows+1 in u (row-major). */
int up = rank > 0 ? rank - 1 : MPI_PROC_NULL;         /* no neighbour: a null process */
int down = rank < p - 1 ? rank + 1 : MPI_PROC_NULL;
MPI_Sendrecv(&u[1 * n], n, MPI_DOUBLE, up, 0,          /* my first row goes up,      */
             &u[(rows + 1) * n], n, MPI_DOUBLE, down, 0,   /* ghost below comes up   */
             MPI_COMM_WORLD, MPI_STATUS_IGNORE);
MPI_Sendrecv(&u[rows * n], n, MPI_DOUBLE, down, 1,     /* my last row goes down,     */
             &u[0 * n], n, MPI_DOUBLE, up, 1,          /* ghost above comes down     */
             MPI_COMM_WORLD, MPI_STATUS_IGNORE);
double local = 0, global;
for (int i = 1; i <= rows; i++)
    for (int j = 1; j < n - 1; j++) {
        v[i * n + j] = 0.25 * (u[(i - 1) * n + j] + u[(i + 1) * n + j]
                               + u[i * n + j - 1] + u[i * n + j + 1]);
        local = fmax(local, fabs(v[i * n + j] - u[i * n + j]));
    }
MPI_Allreduce(&local, &global, 1, MPI_DOUBLE, MPI_MAX, MPI_COMM_WORLD);  /* converged? */
```

(The global boundary rows, held by the first and last processes, must not be updated; that bookkeeping is omitted here.) Messages to `MPI_PROC_NULL` complete immediately, so the end processes need no special case. The cost of each iteration is the halo exchange plus a convergence test — an allreduce of one number, which costs about $\log p\,\alpha$ and on very large machines becomes the bottleneck, so programs test convergence only every few iterations.

::: proposition Strips against blocks {#prop-decomposition}
For an $n \times n$ grid divided among $p$ processes, with $w$ bytes per value, each Jacobi iteration costs each interior process, in the α–β model,

- with a **1D (strip) decomposition** into $p$ strips of $n/p$ rows: $2(\alpha + nw\beta)$ of communication;
- with a **2D (block) decomposition** into $\sqrt{p} \times \sqrt{p}$ blocks of $(n/\sqrt{p})^2$ points: $4(\alpha + \frac{n}{\sqrt{p}}w\beta)$ of communication;

while the computation is $n^2/p$ updates in both cases. The 2D decomposition communicates fewer bytes as soon as $p > 4$.
:::

::: proof
A strip has two neighbours (above and below), with each of which it exchanges one row of $n$ values; a block has four, with each of which it exchanges one edge of $n/\sqrt{p}$ values. Counting one message per neighbour per direction, sent concurrently as the model allows, gives the stated costs. The byte counts compare as $2n$ against $4n/\sqrt{p}$, and $4n/\sqrt{p} < 2n$ exactly when $\sqrt{p} > 2$.
:::

The ratio of communication to computation is the **surface-to-volume** ratio of a process's piece: $2n / (n^2/p) = 2p/n$ for strips, $4(n/\sqrt{p})/(n^2/p) = 4\sqrt{p}/n$ for blocks. Blocks scale better, and in three dimensions the advantage grows. The price is more messages (four instead of two, each with latency $\alpha$) and non-contiguous data (a column of a row-major array, which MPI describes with a **derived datatype** such as `MPI_Type_vector`).

::: example Choosing a decomposition {#ex-decomposition}
A $16{,}384 \times 16{,}384$ grid of `double`s is distributed over $p = 256$ processes on a network with $\alpha = 2$ µs and $1/\beta = 10$ GB/s; each grid update costs $1$ ns. Estimate the time per iteration and the efficiency with strips and with blocks.
::: solution
Computation: $n^2/p = 2^{28}/2^8 = 2^{20} \approx 1.05 \times 10^6$ updates, $1.05$ ms. Strips: $2(\alpha + 16{,}384 \times 8 \times 0.1 \text{ ns}) = 2(2 + 13.1)$ µs $= 30.2$ µs. Blocks of $1024 \times 1024$: $4(\alpha + 1024 \times 8 \times 0.1 \text{ ns}) = 4(2 + 0.82)$ µs $= 11.3$ µs. Efficiencies (computation over computation plus communication, without overlap): $1.049/(1.049 + 0.030) = 97.2\%$ for strips and $1.049/(1.049 + 0.011) = 98.9\%$ for blocks. Both are fine at this size. Now scale to $p = 16{,}384$ processes for the same grid (strong scaling): computation $16$ µs per iteration; strips $2(2 + 13.1) = 30.2$ µs — efficiency $35\%$; blocks of $128 \times 128$: $4(2 + 0.1) = 8.4$ µs — efficiency $66\%$. At scale, the decomposition decides whether the machine is used or wasted, and latency, not bandwidth, becomes the limit for small pieces.
:::
:::

::: widget plot
f: 2*(a + n*8*b/1000); 4*(a + n/sqrt(x)*8*b/1000); n*n/x/1000
x: 4, 4096
y: 0, 100
sliders: n=16384:1024:65536:1024; a=2:0.5:20:0.5; b=0.1:0.02:1:0.02
labels: \text{strips: } 2(\alpha + nw\beta); \text{blocks: } 4(\alpha + \tfrac{n}{\sqrt p}w\beta); \text{computation } n^2/p \text{ at 1 ns}
caption: Communication and computation time per Jacobi iteration, in microseconds, against the number of processes $p$, for an $n \times n$ grid of `double`s ($w = 8$), latency $\alpha$ µs and $\beta$ ns per byte. The strip cost does not fall as $p$ grows; the block cost falls as $1/\sqrt{p}$ towards $4\alpha$; computation falls as $1/p$. Where the computation curve drops below a communication curve, efficiency falls below $50\%$. Notice how much further blocks go — and how a larger latency $\alpha$ pulls the block curve up for large $p$.
:::

::: warning Message passing does not make programs deterministic
Without shared memory there are no data races, but there are still **message races**: a receive from `MPI_ANY_SOURCE` matches whichever message arrives first, which can differ from run to run, and so can the order of floating-point reductions inside `MPI_Allreduce` (the standard does not fix it for a given $p$, though implementations usually give the same result on the same machine for the same process count). Deadlocks are possible too, and some appear only for large messages ([[#ex-deadlock]]) or on another MPI implementation. Prefer explicit sources and tags, `MPI_Sendrecv` and non-blocking pairs over send-then-receive, and test with small eager limits (most implementations have a setting for it) to expose unsafe programs.
:::

::: history
Message passing grew up with the hypercube multicomputers of the 1980s — Caltech's Cosmic Cube (1983) and the Intel iPSC and nCUBE machines — each with its own library. Roger Hockney's latency–bandwidth model appeared in the early 1990s (in its standard form in 1994), and David Culler and colleagues proposed LogP in 1993. PVM (Parallel Virtual Machine, developed from 1989 by Vaidy Sunderam, Al Geist and others at Emory University and Oak Ridge) made clusters of workstations programmable. After a 1992 workshop, at which Jack Dongarra, Rolf Hempel, Tony Hey and David Walker drafted a first proposal, the MPI Forum — vendors, laboratories and universities — published MPI-1 in 1994; MPI-2 (1997) added one-sided communication and parallel I/O, MPI-3 (2012) non-blocking collectives, and MPI-4 (2021) persistent collectives and large counts. MPICH (Argonne, from 1993) and Open MPI (first released in 2005) are the main open implementations. Rajeev Thakur, Rolf Rabenseifner and William Gropp's "Optimization of collective communication operations in MPICH" (2005) described the algorithm choices used in practice. The ring allreduce, known from the 1990s, became famous when Baidu applied it to deep-learning training in 2017, and Pitch Patarasuk and Xin Yuan proved its bandwidth optimality in 2009.
:::

## Where this leads

[[parallel-computing/performance-engineering]] measures how real programs scale, strongly and weakly, and how to tell computation-bound from communication-bound runs. Programs on GPU clusters combine this chapter with [[parallel-computing/gpu-programming]]: NVIDIA's NCCL library implements ring and tree allreduce between GPUs. Message passing between machines that can fail, over networks that lose and reorder messages, with no bound on delays, is the subject of [[distributed-systems]], where agreement itself becomes the central problem; the sockets underneath MPI are in [[networks]].

::: summary
- In the **message-passing** model, processes share nothing and communicate with sends and receives; MPI programs are SPMD, with ranks in communicators ([[#def-mpi]]).
- Blocking sends may or may not be buffered, so send-then-receive exchanges can **deadlock** for large messages ([[#ex-deadlock]]); use ordering, `MPI_Sendrecv` or non-blocking operations.
- The **α–β model** $T(m) = \alpha + \beta m$ ([[#def-alpha-beta]]); between two processes on this machine, $\alpha \approx 4.4$ µs and $1/\beta \approx 4$ GB/s ([[#ex-alpha-beta]]).
- A **binomial-tree broadcast** takes $\lceil\log p\rceil(\alpha + \beta m)$, optimal in rounds ([[#thm-bcast]]). The **ring allreduce** takes $2(p-1)\alpha + 2\frac{p-1}{p}m\beta$ ([[#thm-ring]], [[#ex-ring-trace]]) — bandwidth-optimal — while recursive doubling takes $\log p(\alpha + m\beta)$; libraries switch by message size ([[#ex-bcast]]).
- Our Python allreduce among $8$ processes took $1.11$ s centralised and $0.19$ s on a ring.
- **Domain decomposition** with halo exchange: 2D blocks communicate $4n/\sqrt{p}$ values per iteration against $2n$ for strips ([[#prop-decomposition]]), which decides efficiency at scale ([[#ex-decomposition]]).
:::

## Exercises

::: exercise One message {level=1 check="102"}
How long, in microseconds, does a $1$ MB ($10^6$-byte) message take with $\alpha = 2$ µs and a bandwidth of $10$ GB/s? (Enter the number of microseconds.)
::: solution
$\beta m = 10^6 / 10^{10}$ s $= 100$ µs, plus $\alpha = 2$ µs: $102$ µs. The message is bandwidth-bound; its half-bandwidth size is $\alpha/\beta = 20$ KB.
:::
:::

::: exercise Rounds of a broadcast {level=1 check="7"}
How many rounds does a binomial-tree broadcast among $100$ processes need? (Enter the number.)
::: solution
$\lceil \log_2 100 \rceil = 7$, since $2^6 = 64 < 100 \le 128 = 2^7$. After $6$ rounds only $64$ processes can hold the message.
:::
:::

::: exercise The ring's bandwidth factor {level=1 check="1.75"}
In the ring allreduce among $8$ processes, each process sends how many times the vector size $m$? (Enter the multiple.)
::: solution
$2(p - 1)/p = 2 \times 7/8 = 1.75$. As $p$ grows the factor approaches $2$; for $p = 2$ it is $1$, which is optimal: each process must send its whole vector to the other in some form.
:::
:::

::: exercise An unsafe exchange {level=2}
Each process of an MPI program executes `MPI_Send` of $n$ doubles to $(r + 1) \bmod p$ and then `MPI_Recv` from $(r - 1) \bmod p$. For which message sizes can it deadlock, and why? Give two correct rewrites.
::: solution
If the implementation buffers the message (small $n$, below its eager limit), every send returns and every receive is then matched: no deadlock. If it does not (large $n$), every process waits in `MPI_Send` for its right neighbour to post a receive, and every right neighbour is itself waiting in `MPI_Send`: a cycle of waits, a deadlock. The standard allows either behaviour, so the program is unsafe for every $n$. Rewrites: (1) `MPI_Sendrecv(sendbuf, n, MPI_DOUBLE, (r+1)%p, 0, recvbuf, n, MPI_DOUBLE, (r-1+p)%p, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE)`; (2) `MPI_Irecv` from the left, `MPI_Isend` to the right, then `MPI_Waitall` on both requests. (Ordering by parity, as in our Python ring, also works if $p$ is even; with odd $p$ two neighbours share a parity.)
:::
:::

::: exercise When the ring wins {level=2 check="176000"}
With $p = 8$, $\alpha = 2$ µs and $\beta = 0.1$ ns/byte, for which message size $m$ (in bytes) do recursive doubling, $\log p(\alpha + m\beta)$, and the ring allreduce, [[#eq-ring]], take the same time? (Enter $m$.)
::: solution
$3(\alpha + m\beta) = 14\alpha + 1.75m\beta$ gives $1.25\,m\beta = 11\alpha$, so $m = 8.8\,\alpha/\beta = 8.8 \times 2 \times 10^{-6} / 10^{-10} = 176{,}000$ bytes. Below about $176$ KB recursive doubling is faster; above, the ring.
:::
:::

::: exercise Halo bytes {level=2 check="32768"}
A $4096 \times 4096$ grid of `double`s is split among $16$ processes in $4 \times 4$ blocks. How many bytes does an interior process send per Jacobi iteration? (Enter the number.) How many with $16$ strips?
::: solution
Blocks are $1024 \times 1024$; an interior block sends one edge of $1024$ values to each of $4$ neighbours: $4 \times 1024 \times 8 = 32{,}768$ bytes. A strip sends a full row of $4096$ values to each of $2$ neighbours: $2 \times 4096 \times 8 = 65{,}536$ bytes — twice as much, and the ratio grows as $\sqrt{p}/2$.
:::
:::

::: exercise Recursive doubling {#ex-recursive-doubling level=3}
Implement recursive-doubling allreduce for $p = 2^k$ processes with Python `multiprocessing`: in round $j$, process $r$ exchanges its whole current vector with process $r \oplus 2^j$ and adds. Prove that after $k$ rounds every process holds the sum, and run it for $p = 8$.
::: solution
*Correctness.* Claim: after round $j$, process $r$ holds the sum of the inputs of the $2^{j+1}$ processes whose ranks agree with $r$ in all bits above bit $j$. Before round $0$ it holds its own input (the $2^0 = 1$ process agreeing with $r$ in all bits). In round $j$, $r$ and its partner $r \oplus 2^j$ agree in all bits above $j$ and differ in bit $j$, so their two groups (agreeing above bit $j - 1$ with $r$, respectively with the partner) are disjoint and together form the group of ranks agreeing with $r$ above bit $j$; adding the two sums gives that group's sum, and both partners compute the same value. After round $k - 1$ the group is all $2^k$ processes.

```python
from array import array

def rd_allreduce(rank, p, conns, x):
    """Recursive doubling: in round k, swap the whole vector with partner rank ^ 2^k and add."""
    k = 1
    while k < p:
        partner = rank ^ k
        c = conns[partner]
        if rank < partner:                       # lower rank sends first: no deadlock
            c.send_bytes(x.tobytes()); got = c.recv_bytes()
        else:
            got = c.recv_bytes(); c.send_bytes(x.tobytes())
        x = array("d", map(float.__add__, x, array("d", got)))
        k *= 2
    return x
```

The driver creates one `Pipe` for each pair $(r, r \oplus 2^j)$, gives process $r$ the vector $(r + 1, 10r)$ and collects the results:

```console
$ python3 recdouble.py
[(0, [36.0, 280.0]), (1, [36.0, 280.0]), (2, [36.0, 280.0]), (3, [36.0, 280.0]), (4, [36.0, 280.0]), (5, [36.0, 280.0]), (6, [36.0, 280.0]), (7, [36.0, 280.0])]
```

$\sum_{r=0}^{7}(r + 1) = 36$ and $\sum_r 10r = 280$. The cost is $\log p$ rounds of $\alpha + m\beta$: the right choice for short vectors. Each process adds the two operands in a different order from its partner, but addition is commutative, so partners agree exactly even in floating point; the grouping of the $p$ terms, however, differs from the ring's.
:::
:::

::: exercise Isoefficiency of the Jacobi iteration {level=3}
Using [[#prop-decomposition]] with per-update time $c$, ignoring latency, find for strips and for blocks how fast $n^2$ (the problem size) must grow with $p$ to keep the efficiency constant ([[parallel-computing/performance-laws#def-isoefficiency]]). What happens to strong scaling at fixed $n$?
::: solution
Per iteration, $T_1 = cn^2$ and the total overhead is $T_o = p \times$ (communication per process). Strips: $T_o = p \cdot 2nw\beta$, so constant efficiency needs $cn^2 \propto p\,n$, that is $n \propto p$ and $n^2 \propto p^2$: the problem must grow quadratically in $p$. Blocks: $T_o = p \cdot 4\frac{n}{\sqrt{p}}w\beta = 4\sqrt{p}\,nw\beta$, so $cn^2 \propto \sqrt{p}\,n$, $n \propto \sqrt{p}$ and $n^2 \propto p$: the problem need only grow linearly with $p$ — constant work per process, perfect weak scaling. With latency included, the blocks' overhead gains a term $4p\alpha$, so $n^2 \propto p$ still suffices. At fixed $n$ (strong scaling), efficiency falls in both cases, as $1/(1 + 2pw\beta/(cn))$ for strips and $1/(1 + 4\sqrt{p}w\beta/(cn))$ for blocks, so for a given efficiency, if strips can use $p_s$ processes, blocks can use about $p_s^2/4$ — the effect seen in [[#ex-decomposition]].
:::
:::
