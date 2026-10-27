A social network stores a billion user profiles, a few kilobytes each — several terabytes, served at a million requests per second. No single machine holds that much data in memory or answers that many requests, so the data must be split across, say, a hundred machines. Every request then begins with a question: *which machine holds the profile of user 42?* The answer must be computable by every client and server without asking a central directory on every request, must spread data and load evenly, and must keep working while machines are added, removed and replaced — and each piece of data must be stored on several machines so that the loss of one loses nothing.

This chapter is about **distributed storage**: how data is **partitioned** across machines, how each partition is **replicated**, and how the pieces are put together into key–value stores and file systems. We prove why naive hashing reshuffles almost everything when a machine is added, and why **consistent hashing** moves only the minimum; we analyse its load imbalance and how **virtual nodes** fix it, checked by simulation. We then study the two great design families: the leaderless, eventually consistent **Dynamo** style, with sloppy quorums, version vectors and Merkle-tree anti-entropy, and the leader-based style of **Bigtable** and **Spanner**, with range partitions each replicated by consensus. Finally we look at distributed file systems — the Google File System and its descendants — and at **erasure coding**, which provides durability at a fraction of the cost of replication. The chapter builds on replication and quorums ([[distributed-systems/replication-consistency]]), consensus ([[distributed-systems/consensus]]) and reliability arithmetic ([[distributed-systems/fault-tolerance]]); single-machine storage structures such as B-trees and log-structured merge trees are in [[databases/storage-indexing]].

## Partitioning

::: definition Partitioning {#def-partitioning}
**Partitioning** (sharding) splits a data set, viewed as a set of keys with values, into disjoint **partitions** (shards) and assigns each partition to one or more machines. A **partitioning scheme** is a function from keys to partitions, together with a placement of partitions on machines. A partition (or machine) that receives a disproportionate share of data or requests is a **hot spot**; unevenness in general is **skew**.
:::

There are two basic schemes.

- **Range partitioning** assigns contiguous ranges of keys to partitions: `a`–`f`, `g`–`m`, and so on. Range queries ("all orders of customer 42 in March") touch few partitions, and partitions can be **split** when they grow too large. But skewed keys create hot spots: if keys are timestamps, all of today's writes land on the last partition.
- **Hash partitioning** applies a hash function $h$ to the key and partitions the hash values. A good hash spreads keys evenly whatever their distribution, killing hot spots caused by key patterns — but range queries must now ask every partition. (A single extremely popular key — a celebrity's profile — is still a hot spot under any scheme; it needs caching or splitting the key itself.)

The simplest hash scheme, $\mathit{machine}(k) = h(k) \bmod n$, has a fatal flaw.

::: proposition Rehashing moves almost everything {#prop-mod-n}
If keys are assigned to machine $h(k) \bmod n$ and hash values are uniformly distributed, then changing the number of machines from $n$ to $n + 1$ changes the machine of a fraction $n/(n+1)$ of the keys.
:::

::: proof
The pair $(h \bmod n, h \bmod (n+1))$ depends only on $h \bmod n(n+1)$, because $n$ and $n + 1$ are coprime, and for uniform hash values $h \bmod n(n+1)$ is uniform on $\set{0, \dots, n(n+1) - 1}$. Write such a value as $x = q(n + 1) + r$ with $0 \le q < n$ and $0 \le r \le n$; then $x \bmod (n+1) = r$ and $x \bmod n = (q + r) \bmod n$ (since $n + 1 \equiv 1 \pmod n$). The key stays put iff $(q + r) \bmod n = r$, which requires $r < n$ (as $(q+r) \bmod n < n$) and then $q \equiv 0 \pmod n$, i.e. $q = 0$. So exactly the $n$ values $x = 0, 1, \dots, n - 1$ keep their machine, a fraction $n / (n(n+1)) = 1/(n+1)$. The rest, $n/(n+1)$, move.
:::

Adding an eleventh machine to ten moves $91\%$ of the data, although the ideal is to move only the $1/11 \approx 9\%$ that the new machine should own. During the move, almost every request misses — for a cache, almost every request goes to the database behind it. The fix is to make the assignment depend on the machines themselves, not on how many there are.

## Consistent hashing

David Karger and colleagues introduced **consistent hashing** in 1997 for distributing web caches, and it became the standard way to partition peer-to-peer systems and key–value stores.

::: definition Consistent hashing {#def-consistent-hashing}
Hash both machines and keys onto a circle, the **ring** — in practice the integers $0, \dots, 2^{64} - 1$ with wrap-around, which we normalise to $[0, 1)$. Each machine $s$ is placed at the point $h(s)$. A key $k$ is assigned to the first machine clockwise from $h(k)$, its **successor**. Each machine therefore owns the **arc** from its predecessor's point (exclusive) to its own point (inclusive).
:::

::: theorem Consistent hashing moves the minimum {#thm-consistent}
Model the hash function as placing machines and keys at independent uniform random points of the ring. When a machine joins a ring of $n$ machines, only keys in the arc that it takes over move, all of them to the new machine, and the expected fraction of keys that move is $1/(n+1)$. When a machine leaves, only its own keys move, all to its successor.
:::

::: proof
The new machine $s$ lands inside the arc of some machine $t$, splitting it: keys between $t$'s predecessor and $h(s)$ now have successor $s$; keys between $h(s)$ and $h(t)$ still have successor $t$; and every other key's successor is unchanged, because no other point was added. So only keys in the arc now owned by $s$ move, and they move from $t$ to $s$. After the join there are $n + 1$ machines at independent uniform points, and by symmetry each owns an arc of the same expected length; the lengths sum to $1$, so each has expected length $1/(n+1)$, and so does the arc of $s$. The expected fraction of (uniformly placed) keys in it is $1/(n+1)$. Removal is the reverse of a join.
:::

Exactly the right *amount* of data moves on average — but is it spread evenly in the first place? The arcs of $n$ random points vary a lot.

::: proposition The largest arc {#prop-max-arc}
With $n$ machines at independent uniform points, the probability that some machine owns an arc longer than $c/n$ (that is, $c$ times the average) is at most $n(1 - c/n)^{n-1} \le n e^{-c(n-1)/n}$. In particular, with high probability the largest arc has length $O(\log n / n)$, about $\ln n$ times the average.
:::

::: proof
Machine $s$'s arc is longer than $x$ exactly when none of the other $n - 1$ points falls in the interval of length $x$ just before $h(s)$ (counter-clockwise). For each other point this has probability $1 - x$, independently, so the probability is $(1 - x)^{n-1}$. By the union bound over the $n$ machines, the probability that some arc exceeds $x = c/n$ is at most $n(1 - c/n)^{n-1}$, and $1 - y \le e^{-y}$ gives the second form. Choosing $c = 2\ln n \cdot n/(n-1)$ makes the bound at most $1/n$.
:::

So with a single point per machine, the busiest machine typically holds several times its fair share, and the least busy almost nothing. The standard remedy is to give each machine many points.

::: definition Virtual nodes {#def-vnodes}
With **virtual nodes**, each physical machine $s$ is placed at $v$ points $h(s\#1), \dots, h(s\#v)$ on the ring, and owns the union of the arcs ending at its points.
:::

A machine's share is now the sum of $v$ arc lengths, which concentrates around its mean $1/n$: with $v = \Theta(\log n)$ points per machine, every machine's share is within a constant factor of $1/n$ with high probability, and with larger $v$ the spread shrinks roughly like $1/\sqrt{v}$. Virtual nodes have two further benefits: a machine with twice the capacity can simply take twice as many points, and when a machine fails, its load spreads over many machines (the owners of the successors of its many points) instead of falling entirely on one neighbour.

::: example Simulating a ring {#ex-ring}
Place $10$ machines with $v = 1$, $10$ and $100$ virtual nodes on a ring, assign $100{,}000$ keys, and measure the most and least loaded machines relative to the mean. Then add an eleventh machine and count the keys that move. Compare with $h(k) \bmod n$.
::: solution
```python
import bisect, hashlib

def h(s):
    """A 64-bit position on the ring from a cryptographic hash (stable across runs)."""
    return int.from_bytes(hashlib.sha256(s.encode()).digest()[:8], "big")

class Ring:
    def __init__(self, nodes, vnodes):
        self.points = sorted((h(f"{n}#{v}"), n) for n in nodes for v in range(vnodes))
        self.keys = [p for p, _ in self.points]
    def owner(self, key):
        i = bisect.bisect(self.keys, h(key)) % len(self.points)   # first point clockwise
        return self.points[i][1]

keys = [f"user:{i}" for i in range(100_000)]
for vnodes in (1, 10, 100):
    before = Ring([f"node{i}" for i in range(10)], vnodes)
    after = Ring([f"node{i}" for i in range(11)], vnodes)          # add an eleventh node
    load = {}
    for k in keys:
        o = before.owner(k); load[o] = load.get(o, 0) + 1
    moved = sum(before.owner(k) != after.owner(k) for k in keys)
    print(f"vnodes={vnodes:3}  max/mean load={max(load.values()) / (len(keys) / 10):.2f}"
          f"  min/mean={min(load.values()) / (len(keys) / 10):.2f}  moved={moved / len(keys):.3f}")
moved_mod = sum(h(k) % 10 != h(k) % 11 for k in keys)
print(f"hash mod n: moved={moved_mod / len(keys):.3f}")
```

```console
$ python3 ring.py
vnodes=  1  max/mean load=2.46  min/mean=0.04  moved=0.076
vnodes= 10  max/mean load=1.77  min/mean=0.46  moved=0.108
vnodes=100  max/mean load=1.17  min/mean=0.77  moved=0.090
hash mod n: moved=0.909
```

With one point per machine, the busiest machine holds $2.46$ times its share and the idlest $4\%$ of it — the imbalance [[#prop-max-arc]] predicts. With $100$ virtual nodes the loads are within about $25\%$ of the mean. In every case about $1/11 \approx 0.091$ of the keys move when the eleventh machine joins (the single-point case is less exact, because one random arc is far from its expectation), against $0.909$ for $h(k) \bmod n$, exactly the $n/(n+1)$ of [[#prop-mod-n]]. The bisection makes each lookup $O(\log(nv))$; with $1000$ points the ring table is a few kilobytes and is replicated on every client.
:::
:::

::: widget plot
f: n*(1 - x/n)^(n - 1)
x: 1, 20
y: 0, 1
sliders: n=1000:10:10000:10
labels: \text{bound on P(some arc} > c \times \text{average)}
points: 10,0.0436
caption: The union bound of [[#prop-max-arc]] on the probability that some machine's arc exceeds $c$ times the average, plotted against $c$, for $n$ machines with one point each. The dot is $n = 1000$, $c = 10$: even a tenfold overload has a probability of about $4\%$. The bound only falls below $1$ once $c$ exceeds roughly $\ln n$ — move $n$ and watch the knee shift right logarithmically. This is the imbalance virtual nodes remove.
:::

Two alternatives to the ring are worth knowing. **Rendezvous hashing** (highest random weight; Thaler and Ravishankar, 1998) assigns key $k$ to the machine $s$ maximising $h(k, s)$; it needs no ring, balances well, and moves only the keys of a departing machine (Exercise 9), at a cost of $O(n)$ per lookup. **Jump consistent hashing** (Lamping and Veach, 2014) computes a bucket number in $[0, n)$ with a few arithmetic operations and moves only $1/(n+1)$ of the keys when $n$ grows — but only supports adding and removing the *last* bucket, so it suits numbered shards rather than individual machines. Many systems avoid the problem altogether by creating many more partitions than machines (say $1000$ fixed partitions) and moving whole partitions between machines, recording the assignment in a small, replicated **metadata** table.

## Leaderless replication: the Dynamo design

Amazon's Dynamo (DeCandia and colleagues, 2007) combined consistent hashing with the quorums of [[distributed-systems/replication-consistency]] to build a key–value store that always accepts writes — a shopping cart should never refuse an "add item" — at the price of eventual consistency. Its design was adopted by Riak, Cassandra (which combined it with Bigtable's data model) and Voldemort.

::: algorithm Dynamo-style replication {#alg-dynamo}
1. **Placement.** Each key is stored on the first $N$ distinct physical machines clockwise from $h(k)$ (skipping further virtual nodes of a machine already chosen), its **preference list**.
2. **Writes.** A **coordinator** (any node, typically the first in the list) sends the write, with an updated version vector, to the $N$ replicas, and reports success after $W$ acknowledgements.
3. **Reads.** The coordinator asks the $N$ replicas and returns after $R$ replies. If the replies contain causally unrelated versions (incomparable version vectors), all of them — **siblings** — are returned, and the client merges them and writes back the result.
4. **Sloppy quorum and hinted handoff.** If some machines of the preference list are unreachable, the write goes to the next healthy machines on the ring instead, with a **hint** naming the intended owner; when the owner recovers, the hinted data is handed back to it.
5. **Repair.** **Read repair** sends the newest version to replicas that returned stale ones; **anti-entropy** compares replicas in the background with Merkle trees and copies missing updates.
:::

The pieces fit together. Version vectors ([[distributed-systems/time-clocks#alg-vector]]), with one entry per replica that coordinated a write, tell a newer version from a concurrent one: if one vector dominates the other, the older version is discarded; otherwise both are kept for the application, which knows how to merge carts, or the store merges them automatically as a CRDT ([[distributed-systems/replication-consistency#def-crdt]]). Sloppy quorums keep writes available during failures, but they break the intersection argument of [[distributed-systems/replication-consistency#thm-quorum]]: a write accepted by stand-in machines is not on any of the $N$ designated replicas, so a read of those replicas does not see it until hinted handoff completes. Typical settings are $N = 3$ with $R = W = 2$; latency-sensitive applications use $R = 1$ or $W = 1$.

::: example Siblings in a shopping cart {#ex-siblings}
A cart key has preference list $A, B, C$ with $N = 3$, $R = W = 2$, and version vectors with entries $[A, B, C]$. Trace: (1) a client adds "book", coordinated by $A$; (2) a network partition separates $A$ from $B$ and $C$; one client adds "pen" through $A$, another adds "lamp" through $B$; (3) the partition heals and a client reads.
::: solution
(1) $A$ stores $\set{\text{book}}$ with vector $[1, 0, 0]$ and replicates it; $B$ and $C$ acknowledge.

(2) $A$ cannot reach $B$ or $C$. With a sloppy quorum it writes $\set{\text{book}, \text{pen}}$, $[2, 0, 0]$, locally and on a stand-in node $D$, the next healthy machine on the ring, with a hint that the copy belongs to $B$ or $C$; $W = 2$ is met. On the other side, $B$ reads $\set{\text{book}}$, $[1,0,0]$, and writes $\set{\text{book}, \text{lamp}}$, $[1, 1, 0]$, to itself and $C$.

(3) After hinted handoff, a read collects $[2, 0, 0]$ and $[1, 1, 0]$. Neither dominates the other ($2 > 1$ in $A$'s entry, $0 < 1$ in $B$'s), so they are concurrent, and the read returns both siblings. The client merges them — for a cart, by union, $\set{\text{book}, \text{pen}, \text{lamp}}$ — and writes the result with the merged vector $[2, 1, 0]$ advanced at its coordinator, which dominates both siblings, so they are discarded. Both writes were accepted during the partition and neither was lost; the price is that the application had to merge. Had the client removed "book" on one side, the union merge would have resurrected it — the anomaly that OR-Sets ([[distributed-systems/replication-consistency]]) fix.
:::
:::

### Anti-entropy with Merkle trees

Read repair fixes only data that is read. To find all differences between two replicas, each holding perhaps billions of keys, without sending all the keys, Dynamo-style systems compare **Merkle trees** (hash trees, Ralph Merkle, 1979).

::: definition Merkle tree {#def-merkle}
Split the key range into $2^d$ buckets. The **Merkle tree** of a replica is a complete binary tree of depth $d$: each leaf holds a cryptographic hash of the contents of one bucket, and each internal node holds the hash of its two children's hashes. Two replicas compare trees from the root down, descending only into subtrees whose hashes differ.
:::

::: proposition Cost of a Merkle comparison {#prop-merkle}
If two replicas' trees of depth $d$ differ in exactly $k$ leaves, the top-down comparison exchanges at most $1 + 2kd$ node hashes and identifies the $k$ differing buckets. If $k = 0$ it exchanges one hash.
:::

::: proof
A node's hash differs between the replicas only if some leaf below it differs (assuming no hash collisions, which a cryptographic hash makes negligible). The comparison sends the root, and for every differing internal node sends its two children. The differing internal nodes are the ancestors of the $k$ differing leaves: at most $k$ per level at each of the $d$ levels above the leaves (levels $0$ to $d-1$). So at most $kd$ internal nodes are expanded, each sending $2$ hashes, plus the root: $1 + 2kd$. The leaves reached are exactly the differing ones. If $k = 0$, the roots agree and the comparison stops.
:::

::: example Comparing two replicas {#ex-merkle}
Two replicas of a partition hold $10^8$ keys, split into $2^{20}$ buckets of about $100$ keys each, with $32$-byte hashes. After a brief outage, $3$ buckets differ. How much data does the comparison exchange, compared with sending every key's hash?
::: solution
By [[#prop-merkle]] with $d = 20$ and $k = 3$: at most $1 + 2 \cdot 3 \cdot 20 = 121$ hashes, under $4$ KB, in $21$ rounds of messages (one per level), after which only the $3$ differing buckets (about $300$ keys) are compared key by key. Sending a $32$-byte hash per key would cost $3.2$ GB. The price is maintenance: every write must update the hashes on its leaf-to-root path, or the trees must be recomputed periodically, and when partitions move between machines the trees must be rebuilt — a known operational cost of this design.
:::
:::

::: warning Last-writer-wins silently loses data
Many leaderless stores resolve concurrent writes by **last writer wins** (LWW): each write carries a wall-clock timestamp and the largest timestamp survives. This makes conflicts disappear by making one of the writes disappear. Concurrent writes — two users updating the same key at the same moment — lose all but one, without an error; and because clocks are skewed ([[distributed-systems/time-clocks]]), even a write that happened *later* in real time can lose to an earlier write from a machine whose clock runs fast. LWW is acceptable only for data where losing concurrent updates is harmless (caches, immutable keys written once), or with keys designed so that each is written by one writer.
:::

## Leader-based partitioned stores

The other design family keeps the partitioning but replicates each partition with a leader and consensus, giving linearisable reads and writes per key.

Google's **Bigtable** (Chang and colleagues, 2006) stores a sparse, sorted map from (row, column, timestamp) to values. Tables are **range-partitioned** into **tablets** of roughly $100$–$200$ MB, each served by one tablet server; the tablet locations form a three-level hierarchy of metadata tablets rooted in a file in the Chubby lock service, so clients cache locations and rarely ask for them. Tablets are stored as log-structured merge trees whose files live in a distributed file system, which provides the replication; a master assigns tablets to servers and uses Chubby leases to ensure that each tablet has exactly one server. Apache HBase follows this design.

**Spanner** (Corbett and colleagues, 2012) and the systems inspired by it, such as CockroachDB and TiDB, replicate each range partition (a "split", "range" or "region") with its own Paxos or Raft group, typically of three or five replicas in different failure domains. The group's leader serves linearisable reads and writes for its range; ranges split when they grow and are moved between machines by membership changes of their consensus groups. Transactions that span ranges need the atomic commitment protocols of [[distributed-systems/distributed-transactions]], and Spanner's TrueTime makes them externally consistent.

::: quiz
A store hash-partitions keys over $50$ machines with consistent hashing and $200$ virtual nodes each, and replicates each key on the next $3$ distinct machines with $R = W = 2$. Which statement is true?
- [ ] Adding a $51$st machine moves about $1/51$ of the *keys*, and the same fraction of replica copies, all onto the new machine
- [x] A range query over keys `user:1000` to `user:2000` must, in general, contact every machine
- [ ] Reads are linearisable because $R + W > N$
- [ ] With $200$ virtual nodes per machine, a single hot key's requests are spread over $200$ points
::: solution
Hash partitioning scatters adjacent keys over the whole ring, so a range query is a scatter–gather to all machines. Adding a machine moves about $1/51$ of each replica position's data onto it — but it also shifts which machines are second and third in some preference lists, so some copies move between existing machines too. Quorum intersection does not give linearisability (see [[distributed-systems/replication-consistency]]). And a single key maps to one point and therefore to one preference list, whatever the number of virtual nodes: a hot key stays hot.
:::
:::

## Distributed file systems

A distributed file system presents files and directories whose data lives on many machines. Sun's **NFS** (1984) let a client mount a remote server's directory: its server was originally **stateless**, and its operations were designed to be idempotent (read and write at explicit offsets, rather than relative to a server-side file position), so that a client could simply retry after a server crash ([[distributed-systems/remote-communication#def-idempotent]]). Clients cache data and check with the server on open; NFS's **close-to-open consistency** guarantees that a client opening a file sees all writes of clients that closed it earlier, but not concurrent writes. File system structures on a single machine are the subject of [[operating-systems/file-systems]].

Data-centre storage at Google's scale needed something else: files of many gigabytes, written mostly by appending and read mostly sequentially, on thousands of cheap machines that fail daily.

::: definition Google File System architecture {#def-gfs}
In the **Google File System** (Ghemawat, Gobioff and Leung, 2003) files are divided into fixed-size **chunks** of $64$ MB, each identified by a unique handle and stored as an ordinary file on several **chunkservers** (three by default, on different racks). A single **master** keeps all metadata in memory — the namespace, the mapping from files to chunks, and the chunk locations — and logs metadata changes to a replicated operation log. Clients ask the master only for metadata; data flows directly between clients and chunkservers. For each chunk, the master grants a **lease** to one replica, the **primary**, which chooses the order of all mutations to the chunk and forwards it to the secondaries.
:::

The design makes several bold simplifications that later systems inherited. A single master is simple and makes placement decisions with a global view, but limits the number of files (its memory holds about $64$ bytes per chunk) and is a single point of failure, mitigated by fast restart and shadow masters. Large chunks reduce metadata and master traffic. Failures are routine: chunkservers send heartbeats; when one disappears, the master re-replicates its chunks from the surviving copies — in parallel from many machines, which keeps the repair time, and hence by [[distributed-systems/fault-tolerance#thm-mttdl]] the risk of loss, small. GFS's consistency is deliberately weak: its **record append** operation appends data *at least once* at an offset of the system's choosing, so applications must tolerate duplicates and padding, identifying records by unique identifiers and checksums — the deduplication principle of [[distributed-systems/remote-communication]] pushed to the application. The Hadoop Distributed File System (HDFS) follows the same architecture, with a NameNode and DataNodes and, by default, $128$ MB blocks (as of 2026). Google's successor, Colossus, distributes the metadata itself over a Bigtable-like store.

::: example The master's memory {#ex-gfs-master}
A GFS cluster stores $4$ PiB of data in $64$ MiB chunks, three replicas each. How many chunks does the master track, and how much memory does chunk metadata need at about $64$ bytes per chunk?
::: solution
$4 \cdot 2^{50} / 2^{26} = 2^{26} \approx 67$ million chunks (replicas do not add chunks, only locations). At $64$ bytes each that is $2^{32}$ bytes $= 4$ GiB — comfortably in memory on a single large machine. With $1$ MiB blocks, the same data would need $256$ GiB of metadata, which is one reason chunks are large. The flip side is that many small files waste the design: a $1$ KB file still costs a chunk's metadata.
:::
:::

### Erasure coding

Three-way replication stores every byte three times. **Erasure codes** achieve comparable durability far more cheaply.

::: definition Reed–Solomon $(k, m)$ coding {#def-erasure}
A **$(k, m)$ erasure code** splits a block of data into $k$ data fragments and computes $m$ parity fragments such that the original data can be reconstructed from **any** $k$ of the $k + m$ fragments. Reed–Solomon codes (1960) achieve this for any $k$ and $m$ by treating the data as the values of a polynomial of degree less than $k$ over a finite field and storing its values at $k + m$ points. The storage overhead is $(k + m)/k$, and the code tolerates the loss of any $m$ fragments.
:::

A $(6, 3)$ code stores $1.5$ bytes per byte of data and tolerates any $3$ lost fragments, against $3$ bytes per byte for triple replication, which tolerates only $2$ lost copies. The costs are elsewhere. Reading data that is intact touches $k$ machines instead of one (or reads one data fragment if the layout keeps data fragments readable directly), and **repair** of one lost fragment requires reading $k$ fragments — six times the network traffic of re-copying a replica. Storage systems therefore keep hot, recently written data replicated and convert cold data to erasure-coded form; Facebook's f4 system for photos (2014) and HDFS's erasure coding (since version 3) are examples, and Microsoft's Azure storage uses **local reconstruction codes** that make the common single-failure repair cheaper. The polynomial machinery is that of finite fields, covered in the Maths Atlas.

::: history
Distributed file systems date from the early 1980s: Sun's NFS (1984) and Carnegie Mellon's Andrew File System (1980s; Howard and colleagues, 1988), whose whole-file caching and callbacks influenced later designs. David Karger, Eric Lehman, Tom Leighton, Rina Panigrahy, Matthew Levine and Daniel Lewin's "Consistent hashing and random trees" appeared at STOC 1997 and led to Akamai's content delivery network; in 2001, Chord (Stoica and colleagues) and other distributed hash tables used it for peer-to-peer lookup. Sanjay Ghemawat, Howard Gobioff and Shun-Tak Leung described the Google File System at SOSP 2003, and Fay Chang and colleagues Bigtable at OSDI 2006. Giuseppe DeCandia and colleagues' "Dynamo: Amazon's highly available key-value store" (SOSP 2007) set out the leaderless design; Avinash Lakshman and Prashant Malik's Cassandra (2009–10) combined it with Bigtable's data model. Merkle trees date from Ralph Merkle's work on digital signatures (patent filed 1979); Irving Reed and Gustave Solomon published their codes in 1960. James Corbett and colleagues' Spanner appeared at OSDI 2012.
:::

## Where this leads

A partitioned, replicated store gives each key a consistent home; operations that touch several keys on several partitions — a bank transfer between accounts on different shards — need **distributed transactions**, the next chapter ([[distributed-systems/distributed-transactions]]). Large-scale batch and stream processing reads its input from and writes its output to exactly these file systems and stores, and moves computation to the data ([[distributed-systems/data-processing]]). Inverted indexes for web search are partitioned across thousands of machines in the same ways ([[information-retrieval/web-search]]).

::: summary
- **Partitioning** spreads data over machines by key range (good for range queries, prone to hot spots) or by hash (even, but range queries touch all partitions).
- $h(k) \bmod n$ moves a fraction $n/(n+1)$ of keys when a machine is added ([[#prop-mod-n]]); **consistent hashing** moves only $1/(n+1)$ in expectation ([[#thm-consistent]]).
- One point per machine leaves arcs up to about $\ln n$ times the average ([[#prop-max-arc]]); **virtual nodes** balance load and spread recovery.
- **Dynamo-style** stores use preference lists, quorums, **sloppy quorums** with hinted handoff, **version vectors** with siblings, read repair and **Merkle-tree** anti-entropy ([[#prop-merkle]]) — available but eventually consistent; LWW loses concurrent writes.
- **Leader-based** stores (Bigtable, Spanner) range-partition data and replicate each partition with a consensus group, giving linearisable access per key.
- **GFS/HDFS** separate a metadata master from chunkservers, use large chunks, leases for mutation order and fast parallel re-replication; record append is at-least-once.
- **Erasure codes** $(k, m)$ tolerate $m$ losses at overhead $(k+m)/k$, trading cheaper storage for costlier reads and repairs.
:::

## Exercises

::: exercise Rehashing {level=1 check="9/10"}
A cache cluster uses $h(k) \bmod n$ and grows from $9$ to $10$ machines. What fraction of keys move? (Enter the fraction.)
::: solution
By [[#prop-mod-n]] with $n = 9$, a fraction $9/10$ moves: $90\%$ of the cache becomes useless at once.
:::
:::

::: exercise Consistent hashing on growth {level=1 check="1/10"}
With consistent hashing, a ring of $9$ machines grows to $10$. What fraction of keys move, in expectation? (Enter the fraction.)
::: solution
$1/(n+1) = 1/10$, all of it onto the new machine, by [[#thm-consistent]].
:::
:::

::: exercise Counting chunks {level=1 check="2^24"}
How many $64$ MiB chunks does $1$ PiB of data occupy? (Enter the number.)
::: solution
$2^{50}/2^{26} = 2^{24} = 16{,}777{,}216$ chunks.
:::
:::

::: exercise Erasure-code overhead {level=2 check="1.4"}
A $(10, 4)$ Reed–Solomon code is used. What is the storage overhead factor, how many simultaneous fragment losses does it tolerate, and how many fragments must be read to repair one lost fragment? (Enter the overhead factor.)
::: solution
Overhead $(10 + 4)/10 = 1.4$. It tolerates any $4$ lost fragments. Repairing one lost fragment requires reading any $10$ surviving fragments — ten times the data of the lost fragment, which is the main operational cost of erasure coding.
:::
:::

::: exercise A tenfold overload {level=2 check="1000*(1 - 10/1000)^999"}
Using the union bound of [[#prop-max-arc]], bound the probability that, with $1000$ machines and one point each, some machine owns more than $10$ times its fair share of the ring. (Enter the bound.)
::: solution
$n(1 - c/n)^{n-1} = 1000 \times 0.99^{999} \approx 0.044$. For $c = 14$ the bound drops to about $0.00076$; the largest arc is typically around $\ln 1000 \approx 7$ times the average.
:::
:::

::: exercise Preference lists and virtual nodes {level=2}
In [[#alg-dynamo]], why must the preference list skip virtual nodes of machines already chosen? What further constraint would you add so that a key's replicas survive the loss of an entire rack?
::: solution
With virtual nodes, the next $N$ *points* clockwise may belong to fewer than $N$ machines — two of a machine's $v$ points may be adjacent. If the list did not skip them, a key could have two of its three "replicas" on the same machine, and the loss of that machine would lose two copies. Skipping repeated machines guarantees $N$ distinct machines. For rack failures, skip machines in a rack already used as well, walking further round the ring until $N$ distinct racks are covered (Cassandra's rack-aware placement does this). The price is slightly less even load, since the walk is longer for some keys.
:::
:::

::: exercise A Merkle comparison {level=2 check="1 + 2*5*16"}
Two replicas use Merkle trees of depth $16$ and differ in $5$ buckets. What is the maximum number of hashes exchanged by the top-down comparison of [[#prop-merkle]]? (Enter the number.)
::: solution
$1 + 2kd = 1 + 2 \cdot 5 \cdot 16 = 161$. If the $5$ differing buckets share ancestors (for example, all are in the same subtree), fewer internal nodes differ and fewer hashes are sent.
:::
:::

::: exercise Proving the rehashing fraction directly {level=3}
Give a counting proof of [[#prop-mod-n]] for $n = 9$ by listing which of the residues $x \in \set{0, \dots, 89}$ satisfy $x \bmod 9 = x \bmod 10$, and generalise: for arbitrary $n < n'$, what fraction of keys keeps its machine when $h \bmod n$ is replaced by $h \bmod n'$?
::: solution
$x \bmod 9 = x \bmod 10$ holds exactly for $x = 0, 1, \dots, 8$: for $x = 10q + r$ ($0 \le q \le 8$, $0 \le r \le 9$) we have $x \bmod 9 = (q + r) \bmod 9$, which equals $r$ only if $r \le 8$ and $q = 0$. That is $9$ of $90$ residues, a fraction $1/10$; so $9/10$ of keys move.

In general, for any $n < n'$, $x \bmod n = x \bmod n'$ holds for $x \in [0, \mathrm{lcm}(n,n'))$ exactly when $x \bmod n' < n$ and $x - (x \bmod n')$ is a common multiple of $n$ and $n'$, i.e. when $x = \ell \cdot \mathrm{lcm}(n, n') + r$ with $0 \le r < n$ — within one period, the $n$ values $x = 0, \dots, n - 1$. So the fraction of keys that stay is always $n/\mathrm{lcm}(n, n')$, for every pair. For $n' = n + 1$ this is $1/(n+1)$; for $n' = 2n$ it is $1/2$ — doubling a cluster moves half the keys, which is why some systems only ever double.
:::
:::

::: exercise Rendezvous hashing {level=3}
Implement rendezvous hashing in Python (assign key $k$ to the machine $s$ maximising $h(k \,\|\, s)$) and prove that when a machine leaves, only its own keys move, and when a machine $s'$ joins, only keys that $s'$ now wins move, all to $s'$. What is the expected fraction moved on a join?
::: solution
```python
import hashlib

def score(key, node):
    return int.from_bytes(hashlib.sha256(f"{key}|{node}".encode()).digest()[:8], "big")

def owner(key, nodes):
    return max(nodes, key=lambda s: score(key, s))

nodes = [f"node{i}" for i in range(10)]
keys = [f"user:{i}" for i in range(100_000)]
moved = sum(owner(k, nodes) != owner(k, nodes + ["node10"]) for k in keys)
print(f"moved on join: {moved / len(keys):.3f}")
```

```console
$ python3 hrw.py
moved on join: 0.091
```

*Leave.* If $s$ leaves, a key $k$ owned by another machine $t$ had $t$ as the maximiser of $h(k \| \cdot)$ over all machines; removing $s \ne t$ removes a smaller score, so $t$ is still the maximum. Only keys owned by $s$ move, each to its second-highest machine — and these are spread over all remaining machines, not dumped on one neighbour.

*Join.* Adding $s'$ adds one score per key. If $h(k \| s')$ is not the new maximum, the old maximiser still wins and $k$ stays; if it is, $k$ moves to $s'$. So all moved keys move to $s'$. Modelling scores as independent and continuous, each of the $n + 1$ machines is equally likely to have the highest score for a given key, so a key moves with probability $1/(n+1)$, matching the simulated $0.091$ for $n = 10$.
:::
:::
