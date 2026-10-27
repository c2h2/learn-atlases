A table of a hundred million sensor readings occupies several gigabytes. Finding the readings of one sensor by reading the whole table means moving all those gigabytes from storage into memory; finding them through an index means reading a handful of pages. The difference — seconds or minutes against a millisecond — is what this chapter is about. SQL ([[databases/sql]]) says nothing about where rows live or how they are found, and the relational model insists that it should not ([[databases/relational-model]]). Underneath, though, every DBMS has a **storage manager** that arranges records in pages, pages in files, and keeps the most useful pages in memory, and **indexes** that turn searches into short walks down a tree or a single hash probe.

We first set up the cost model that every database textbook uses — count page transfers, not instructions — then build up from records and pages to files and the buffer pool, and then study the two families of indexes: B+-trees, the default index of almost every relational system, and hash indexes. The tree structures themselves were developed in [[data-structures/balanced-trees]], and hashing in [[data-structures/hash-tables]]; here the question is how they behave when each node is a disk page. **SQLite 3.46.1** is used for the experiments.

## The storage hierarchy and the cost model

Data lives on a hierarchy of devices. As rough orders of magnitude (as of 2026, and varying widely between products):

| device | typical access latency | sequential bandwidth | survives power loss |
|---|---|---|---|
| CPU cache | 1–10 ns | — | no |
| main memory (DRAM) | ~100 ns | tens of GB/s | no |
| NVMe flash SSD | ~10–100 µs per random 4 KiB read | several GB/s | yes |
| magnetic disk (HDD) | ~5–10 ms per random read (seek + rotation) | ~100–250 MB/s | yes |

Two facts shape everything. First, persistent storage is orders of magnitude slower than memory, so the time to answer a query on data that is not cached is dominated by **I/O**. Second, storage is read and written in **blocks** of fixed size, and reading one byte costs as much as reading the whole block; on disks, reading consecutive blocks is also far cheaper than reading scattered ones. The DBMS therefore manages data in **pages** — blocks of typically 4–16 KiB (SQLite's default is 4096 bytes, PostgreSQL's 8 KiB) — and the standard cost model counts them.

::: definition I/O cost model {#def-io-model}
The **cost** of an operation is the number of pages read from or written to persistent storage. Computation in memory is free, every page access costs the same, and the cost of reading the final output to the user is not counted. Parameters: a relation has $N$ records stored in $B$ pages, so $N/B$ records per page.
:::

The model ignores CPU cost and treats random and sequential I/O alike — both simplifications, which [[databases/query-processing]] refines where it matters. It is nevertheless remarkably predictive, because the number of pages touched is what an algorithm controls.

## Records, pages and files

A **record** is the stored form of a tuple. If every field has fixed length, a record is just the fields laid end to end, and field $i$ is found at a fixed offset. Variable-length fields (strings, nulls stored as absence) need a small header: an array of field offsets at the start of the record, so that any field is found in constant time and nulls cost one bit in a null bitmap.

::: definition Slotted page {#def-slotted}
A **slotted page** stores variable-length records in a page as follows. A header at the start of the page holds the number of slots and, for each **slot**, the offset and length of one record; records are stored from the end of the page backwards, and free space lies between the slot array and the records. A record is identified by its **record id** (rid), the pair (page number, slot number).
:::

The indirection through the slot array is the point of the design. Records can be moved within the page — to compact free space after deletions — without changing their rid, because only the slot's offset changes. A deleted record's slot is marked empty and can be reused; a record that grows too large for its page can be moved to another page, leaving a forwarding address in its old slot. Indexes store rids, so rid stability matters.

A **file** is a collection of pages holding the records of one relation. The simplest organisation is a **heap file**: records are placed wherever there is space, in no particular order, and the DBMS keeps a directory of pages with free space. A **sorted file** keeps records in order of some attribute. Each organisation favours some operations:

| operation | heap file | sorted file (on the search key) |
|---|---|---|
| scan all records | $B$ | $B$ |
| equality search on a key | $B/2$ on average | $\lceil\log_2 B\rceil$ (binary search on pages) |
| range search | $B$ | $\lceil\log_2 B\rceil$ + pages of matches |
| insert | $2$ (read and write a page with space) | $\approx \log_2 B + B$ (find place, shift later records) |
| delete (given the record) | $2$ | $\approx \log_2 B + B$ (shift to close the gap) |

Neither is acceptable for a large, changing table that must answer selective queries: the heap file reads everything for a search, the sorted file rewrites half the file for an insertion. Indexes combine the virtues of both.

## The buffer manager

Pages are processed in memory, in a region called the **buffer pool**, divided into **frames** of one page each. The **buffer manager** gives the rest of the system the illusion that every page is in memory.

::: algorithm Buffer manager: requesting a page {#alg-buffer}
To serve a request for page $p$:
1. If $p$ is in some frame, increment that frame's **pin count** and return it.
2. Otherwise choose a frame with pin count $0$ by the **replacement policy**; if its page is **dirty** (modified since it was read), write it to storage first.
3. Read $p$ into the frame, set its pin count to $1$ and clear its dirty bit; return it.

The requester **unpins** the page when it no longer needs it (decrementing the pin count) and says whether it modified it (setting the dirty bit).
:::

A pinned page may not be evicted — some operator is reading it. The replacement policy decides which unpinned page to evict. **LRU** (least recently used) evicts the page whose last unpin is oldest; **clock** approximates LRU cheaply with one reference bit per frame and a rotating hand that clears bits and evicts the first frame whose bit is already clear (the same algorithms appear for virtual memory in [[operating-systems]]). LRU is a good default for random access, but it has a famous failure mode.

::: proposition Sequential flooding {#prop-flooding}
If a file of $P$ pages is scanned repeatedly from beginning to end through a buffer pool of $M < P$ frames, with no other activity, then under LRU *every* page request is a miss.
:::

::: proof
We show that when page $i$ is requested, it is not in the pool. During a scan, the $M$ most recently used pages are always the $M$ pages requested immediately before. Page $i$ was last requested exactly $P$ requests earlier (in the previous scan), and $P > M$, so at least $M$ other distinct pages have been requested since — namely the $P - 1 \ge M$ pages between the two requests of $i$. LRU keeps exactly the $M$ most recently used pages, so $i$ was evicted. On the first scan every page is missing anyway.
:::

The same thing happens to clock. A simple simulation with $M = 4$ frames and three scans of pages $1$ to $5$ gives:

```python
from collections import OrderedDict

def lru(refs, frames):
    pool, misses = OrderedDict(), 0
    for p in refs:
        if p in pool:
            pool.move_to_end(p)               # most recently used at the end
        else:
            misses += 1
            if len(pool) == frames:
                pool.popitem(last=False)      # evict the least recently used
            pool[p] = True
    return misses

def mru(refs, frames):
    pool, misses, last = set(), 0, None
    for p in refs:
        if p not in pool:
            misses += 1
            if len(pool) == frames:
                pool.remove(last)             # evict the most recently used
            pool.add(p)
        last = p
    return misses

scan = list(range(1, 6)) * 3                  # read pages 1..5, three times
print(lru(scan, 4), mru(scan, 4))
```

```console
$ python3 buf.py
15 7
```

LRU misses all $15$ requests; **MRU** (evict the most recently used page) misses only the $5$ of the first scan and then one page per scan. Real buffer managers detect large sequential scans and give them a small ring of frames of their own (PostgreSQL does this for scans of large tables), so that one big query does not flush the pages everyone else is using. Because the DBMS knows its access patterns — a nested-loop join will rescan the inner relation, an index root will be read constantly — it can manage its buffers better than the operating system's file cache, which is one reason database systems often bypass it. The buffer manager also enforces the rules of crash recovery about *when* a dirty page may be written ([[databases/recovery]]).

## Indexes

::: definition Index {#def-index}
An **index** on a **search key** (one or more attributes, not necessarily a key of the relation) is a data structure that, given a value or range of values of the search key, finds the matching records quickly. Its **data entries** are of one of three kinds: (1) the records themselves; (2) pairs (key value, rid); (3) pairs (key value, list of rids). An index is **clustered** if the order of the data records in the file is the same as, or close to, the order of the data entries; otherwise it is **unclustered**.
:::

A relation can have at most one clustered index — the records can be stored in only one order — but any number of unclustered ones. An index of kind (1) is clustered by construction: the index *is* the file. SQLite stores every ordinary table this way, as a B+-tree keyed by its integer `rowid` (an `INTEGER PRIMARY KEY` is an alias for it), and every secondary index as a separate B-tree of (key, rowid) entries — kind (2). PostgreSQL keeps tables in heap files and all its indexes are of kind (2), pointing at tuple ids; its `CLUSTER` command sorts a table once along an index but does not maintain the order. The distinction matters enormously for range queries, as [[#ex-unclustered]] shows.

### B+-trees

::: definition B+-tree {#def-bplus}
A **B+-tree** with **fan-out** $F$ and **leaf capacity** $L$ is a rooted tree in which every node occupies one page and:
1. all leaves are at the same depth $h$, the **height**; leaves hold between $\lceil L/2 \rceil$ and $L$ data entries in sorted order (the root, if it is a leaf, may hold fewer) and are linked to their neighbours, forming a sorted list;
2. every internal node holds $k$ keys $k_1 < \dots < k_k$ and $k + 1$ child pointers $c_0, \dots, c_k$, with every key in the subtree of $c_i$ at least $k_i$ and less than $k_{i+1}$; internal nodes other than the root have between $\lceil F/2\rceil$ and $F$ children, and the root has at least $2$ children if it is not a leaf.
:::

Internal nodes only route searches; all data entries are in the leaves. Compared with the B-trees of [[data-structures/balanced-trees#def-btree]], which store entries in internal nodes too, this has two advantages: internal nodes hold only keys and pointers, so $F$ is large, and a range scan walks the linked leaves without climbing back up the tree.

To search for key $k$, start at the root; in each internal node, follow the pointer $c_i$ with $k_i \le k < k_{i+1}$ (binary search within the page, free in our cost model); in the leaf, look for $k$. A **range search** for $a \le k \le b$ finds the leaf of $a$ and then follows leaf links until a key exceeds $b$.

::: theorem B+-tree height and search cost {#thm-bplus-height}
A B+-tree of height $h \ge 1$ holding $N$ data entries satisfies

$$
L\,F^{h} \;\ge\; N \;\ge\; 2\,\lceil F/2 \rceil^{h-1} \lceil L/2 \rceil,
\qquad\text{so}\qquad
\log_F \frac{N}{L} \;\le\; h \;\le\; 1 + \log_{\lceil F/2\rceil} \frac{N}{2\lceil L/2\rceil}.
$$ {#eq-bplus-height}

An equality search reads $h + 1$ pages, and a range search returning entries from $\ell$ leaves reads $h + \ell$ pages.
:::

::: proof
*Upper bound on $N$.* Each internal node has at most $F$ children, so there are at most $F^h$ nodes at depth $h$, each a leaf with at most $L$ entries.

*Lower bound on $N$.* The root has at least $2$ children, and every other internal node at least $\lceil F/2 \rceil$; so depth $d \ge 1$ has at least $2\lceil F/2\rceil^{d-1}$ nodes, and in particular there are at least $2\lceil F/2 \rceil^{h-1}$ leaves, each with at least $\lceil L/2\rceil$ entries (no leaf is the root when $h \ge 1$).

Taking logarithms of the two bounds gives the bounds on $h$. A search reads one node per level, $h + 1$ pages, and a range search reads $h$ internal nodes and then $\ell$ consecutive leaves.
:::

The base of the logarithm is what makes B+-trees practical: with $F$ in the hundreds, $h$ is tiny.

::: example B+-tree arithmetic {#ex-bplus-arith}
An index of kind (2) on a 64-bit integer key of a table with $N = 10^8$ rows uses 8 KiB pages. A data entry or an internal entry is a key (8 bytes) and a pointer (8 bytes), and pages are about two-thirds full in steady state. Estimate the height, the number of pages, and the cost of a lookup.
::: solution
A page holds at most $\lfloor 8192/16 \rfloor = 512$ entries (ignoring a small page header), so $F \approx L \approx 512$; at two-thirds occupancy, about $341$ entries per node.

- Leaves: $10^8 / 341 \approx 293\,256$ pages, about $2.2$ GiB.
- Level above: $293\,256 / 341 \approx 860$ pages.
- Next: $860/341 \approx 3$ pages; then one root.

So the tree has $4$ levels, height $h = 3$, and a lookup reads $4$ index pages plus $1$ page for the record: $5$ I/Os at most. With full nodes the tree would have $3$ levels ($512^3 \approx 1.3\times10^8 \ge 10^8$), matching the lower bound of [[#eq-bplus-height]], $\log_{512}(10^8/512) \approx 1.95$, so $h \ge 2$.

In practice the upper levels are always cached: the root and the $860$ pages above the leaves occupy about $7$ MiB, so a lookup costs about $2$ actual I/Os — one leaf, one data page. Compare binary search on the sorted file of about $10^8/100 = 10^6$ data pages (at $100$ rows per page): $\lceil\log_2 10^6\rceil = 20$ I/Os.
:::
:::

::: widget plot
f: log(x/L)/log(F); 1 + log(x/(2*ceil(L/2)))/log(ceil(F/2)); log(x)/log(2)
sliders: F=4:4:512; L=4:4:512
x: 1000, 100000000
y: 0, 30
labels: \text{lower bound } \log_F(N/L); \text{upper bound } 1 + \log_{\lceil F/2\rceil}(N/2\lceil L/2\rceil); \log_2 N
caption: Bounds on the height of a B+-tree against the number of entries $N$, from [[#eq-bplus-height]], compared with $\log_2 N$, the height of a balanced binary tree. Drag $F$ and $L$ up to a few hundred, typical for 4–16 KiB pages: the height stays at $2$–$4$ for a hundred million entries, while a binary tree would need $27$ levels — $27$ random I/Os per lookup. With tiny nodes ($F = L = 4$) the B+-tree is no better than a binary tree.
:::

The same arithmetic holds in SQLite. A table `Reading(id INTEGER PRIMARY KEY, sensor INTEGER, t INTEGER, value REAL)` was filled with $10^6$ random readings and given an index on `sensor`; SQLite's `dbstat` virtual table reports the pages at each level of each tree:

```sql
SELECT name, length(path) - length(replace(path, '/', '')) AS level,
       COUNT(*) AS pages, SUM(ncell) AS cells
FROM dbstat WHERE name LIKE 'reading%' GROUP BY name, level ORDER BY name, level;
```

```text
┌────────────────┬───────┬───────┬─────────┐
│      name      │ level │ pages │  cells  │
├────────────────┼───────┼───────┼─────────┤
│ Reading        │ 1     │ 1     │ 14      │
│ Reading        │ 2     │ 15    │ 5754    │
│ Reading        │ 3     │ 5769  │ 1000000 │
│ reading_sensor │ 1     │ 1     │ 9       │
│ reading_sensor │ 2     │ 10    │ 2638    │
│ reading_sensor │ 3     │ 2648  │ 997353  │
└────────────────┴───────┴───────┴─────────┘
```

Both trees have three levels over a million rows with 4 KiB pages. The table tree holds all $10^6$ rows in its $5769$ leaves (about $173$ rows each), and its internal nodes have a fan-out of about $384$ — so a lookup by `id` reads $3$ pages. The index is a B-tree rather than a B+-tree: $10^6 - 997\,353 = 2647$ of its entries live in the internal levels, one per separator.

### Insertion and deletion

Insertion keeps the tree balanced by splitting full nodes, as for B-trees, with one difference at the leaves.

::: algorithm B+-tree insertion {#alg-bplus-insert}
To insert entry $(k, v)$:
1. Search for the leaf $\lambda$ where $k$ belongs, remembering the path from the root.
2. If $\lambda$ has fewer than $L$ entries, insert $(k, v)$ in order; done.
3. Otherwise **split** $\lambda$: create a new leaf $\lambda'$, keep the first $\lceil (L+1)/2 \rceil$ of the $L + 1$ entries in $\lambda$ and move the rest to $\lambda'$, link $\lambda'$ after $\lambda$, and insert the **copy** of the smallest key of $\lambda'$ with a pointer to $\lambda'$ into the parent.
4. If the parent now has $F + 1$ children, split it: keep the first $\lceil (F+1)/2 \rceil$ children, move the rest to a new node, and **move up** (not copy) the middle key that separates them into the grandparent. Repeat up the path.
5. If the root splits, create a new root with two children; the height grows by one.
:::

At the leaf level the separator key is *copied* up, because every key must remain in a leaf; in internal nodes it is *moved* up, as in a B-tree. The cost is $h + 1$ reads and, in the worst case, about $2(h+1) + 1$ writes; splits are rare — at most one leaf split per $\lceil L/2\rceil$ insertions into a leaf — so the amortised cost is close to $h + 2$ I/Os.

::: example Splitting a leaf {#ex-split}
A B+-tree with $L = F = 3$ has a root with key $20$ and two leaves, $[5, 10, 15]$ and $[20, 25]$. Insert $12$, then $30$ and $35$.
::: solution
- Insert $12$: it belongs in the left leaf, which is full. The four entries $5, 10, 12, 15$ split into $[5, 10]$ and $[12, 15]$, and the key $12$ is *copied* into the root, which becomes $[12 \mid 20]$ with three children $[5, 10]$, $[12, 15]$, $[20, 25]$.
- Insert $30$: the right leaf becomes $[20, 25, 30]$.
- Insert $35$: the right leaf overflows; $20, 25, 30, 35$ split into $[20, 25]$ and $[30, 35]$, and $30$ is copied up. The root would have keys $12, 20, 30$ and four children, more than $F = 3$, so it splits too: the children are divided $2 + 2$, the middle key $20$ *moves* up into a new root, and the old root becomes two nodes $[12]$ and $[30]$.

The final tree has root $[20]$, internal nodes $[12]$ and $[30]$, and leaves $[5,10] \to [12,15] \to [20,25] \to [30,35]$. The height grew from $1$ to $2$, at the root, so all leaves stay at the same depth. Note that $20$ occurs both in the root and in a leaf, while $12$ and $30$ occur in internal nodes and leaves: a B+-tree's internal keys are copies used only for routing.
:::
:::

Deletion removes the entry from its leaf; if the leaf falls below $\lceil L/2 \rceil$ entries, it borrows an entry from a sibling (updating the separator in the parent) or merges with it (deleting a separator from the parent, which may underflow in turn). Many systems relax this and allow under-full pages, reclaiming them only when they become empty, since deletions are rarer than insertions and tables tend to grow back.

**Bulk loading** builds an index on existing data far faster than repeated insertion: sort the entries, fill leaves left to right (to any desired occupancy), and build each internal level from the first keys of the level below. The cost is that of the sort ([[databases/query-processing]]) plus one write per page, with no splits at all. `CREATE INDEX` on a full table works this way in most systems.

### Using an index well

::: example When an index is worse than a scan {#ex-unclustered}
A relation has $N = 10^6$ records in $B = 10^4$ pages ($100$ per page). A range query selects a fraction $s$ of the records. Compare a full scan, a clustered B+-tree, and an unclustered B+-tree of kind (2), all with height $h = 2$ and ignoring the leaf pages of the index.
::: solution
- **Full scan**: $B = 10\,000$ I/Os, whatever $s$ is.
- **Clustered index**: the matching records are consecutive, in about $sB$ pages: cost $\approx h + 1 + 10\,000\,s$.
- **Unclustered index**: each matching rid may point to a different page, and in the worst case each costs one I/O: $\approx h + 1 + 10^6 s$.

The unclustered index beats the scan only if $10^6 s < 10^4$, that is $s < 1\%$. At $s = 10\%$ it would cost about $100\,000$ I/Os — ten times the scan — while the clustered index costs about $1\,000$. A common refinement collects the rids, sorts them by page and fetches each page once, which bounds the cost by $\min(sN, B)$ pages (PostgreSQL calls this a bitmap heap scan); the optimiser chooses among these plans using an estimate of $s$ ([[databases/query-optimisation]]).
:::
:::

::: widget plot
f: 10000 + 0*x; 3 + 100*x; 3 + 10000*x
x: 0, 5
y: 0, 30000
labels: \text{full scan}; \text{clustered index}; \text{unclustered index}
points: 1,10003
caption: I/O cost of a range selection against its selectivity in per cent, for the relation of [[#ex-unclustered]] ($10^6$ records in $10^4$ pages). The unclustered index crosses the full scan at $1\%$ (the dot) and is much worse beyond it, because it pays one random page read per matching record; the clustered index stays far below both. This is why an optimiser sometimes ignores an index you have just created.
:::

A query that needs only columns stored in the index can be answered from the index alone, without touching the table: the index is **covering** for that query. SQLite's `EXPLAIN QUERY PLAN` shows the decision on the Reading table:

```console
$ sqlite3 big.db "EXPLAIN QUERY PLAN SELECT * FROM Reading WHERE sensor = 42;"
QUERY PLAN
`--SCAN Reading
$ sqlite3 big.db "CREATE INDEX reading_sensor ON Reading(sensor);"
$ sqlite3 big.db "EXPLAIN QUERY PLAN SELECT * FROM Reading WHERE sensor = 42;"
QUERY PLAN
`--SEARCH Reading USING INDEX reading_sensor (sensor=?)
$ sqlite3 big.db "EXPLAIN QUERY PLAN SELECT COUNT(*) FROM Reading WHERE sensor BETWEEN 10 AND 19;"
QUERY PLAN
`--SEARCH Reading USING COVERING INDEX reading_sensor (sensor>? AND sensor<?)
$ sqlite3 big.db "EXPLAIN QUERY PLAN SELECT * FROM Reading WHERE id = 500000;"
QUERY PLAN
`--SEARCH Reading USING INTEGER PRIMARY KEY (rowid=?)
```

Without an index, the only plan is a scan. With it, the equality query searches the index and fetches each matching row by rowid; the count needs only the sensor values, which are in the index, so the table is never read; and the lookup by `id` descends the table's own B+-tree. A **composite index** on $(a, b)$ orders entries by $a$ and then $b$: it serves conditions on $a$ alone or on $a$ and $b$, but not on $b$ alone, just as a telephone directory sorted by surname and first name does not help find everyone called Maria.

::: quiz
A table has a B+-tree index on (dept, salary). Which of these conditions can use the index to avoid a full scan?
- [x] `dept = 'CS'`
- [x] `dept = 'CS' AND salary > 50000`
- [ ] `salary > 50000`
- [x] `dept BETWEEN 'CS' AND 'MA'`
::: solution
Entries are sorted by dept, and by salary within each dept. A condition on dept (equality or range) selects a contiguous run of entries; with dept fixed, a salary range is contiguous inside that run. A condition on salary alone matches entries scattered through every dept's run, so the index cannot narrow the search (though a system may still scan the whole index instead of the table if the index is covering).
:::
:::

::: warning Indexes are not free
Every index speeds up some queries and slows down every insertion, deletion and update of its key columns, because the index must be changed too — with $k$ indexes, inserting a row costs roughly $k$ extra tree descents and page writes. Indexes also occupy space (the sensor index above is $2659$ pages, nearly half the size of the table) and compete for the buffer pool. An index on a column with few distinct values, or used only by queries that select a large fraction of the table, may never be chosen ([[#ex-unclustered]]). Index the columns of frequent selective conditions and of joins, measure with the system's plan explanation, and drop indexes that are never used.
:::

## Hash indexes

A hash index puts data entries into **buckets** by a hash function of the search key: an equality search computes $h(k)$ and reads one bucket — typically $1$ to $2$ I/Os, independent of $N$. Hashing cannot help with range searches, because it scatters adjacent keys deliberately ([[data-structures/hash-tables]]). The database problem is growth: a static hash file with a fixed number of buckets develops long overflow chains as the table grows, and rehashing the whole file at once is a long, blocking operation.

::: definition Extendible hashing {#def-extendible}
An **extendible hash index** has a **directory** of $2^g$ pointers to buckets, where $g$ is the **global depth**; the entry for key $k$ is found through directory slot $h(k) \bmod 2^g$, the low $g$ bits of the hash. Each bucket has a **local depth** $d \le g$, and the $2^{g-d}$ directory slots that agree on the low $d$ bits all point to it. When a bucket with local depth $d$ overflows, it is split on bit $d$ into two buckets of local depth $d + 1$; if $d = g$, the directory is first doubled (each slot copied) and $g$ incremented.
:::

The directory is small — pointers only — and usually stays in memory, so an equality search costs one bucket read. A split rewrites only one bucket and possibly doubles the directory; the rest of the file is untouched.

::: example Extendible hashing trace {#ex-extendible}
Insert the keys $8, 5, 6, 3, 10, 13$ into an extendible hash index with buckets of capacity $2$ and $h(k) = k$, starting from one empty bucket and $g = 0$.
::: solution
In binary: $8 = 1000$, $5 = 0101$, $6 = 0110$, $3 = 0011$, $10 = 1010$, $13 = 1101$.

- $8$, $5$: both go into the only bucket (local depth $0$).
- $6$: the bucket is full and $d = g = 0$, so the directory doubles to $2$ slots ($g = 1$), and the bucket splits on bit $0$: slot `0` gets $\set{8, 6}$, slot `1` gets $\set{5}$, both with local depth $1$.
- $3$ (low bit $1$): slot `1` becomes $\set{5, 3}$.
- $10$ (low bit $0$): slot `0` is full with $d = g = 1$, so the directory doubles to $4$ slots ($g = 2$) and the bucket splits on bit $1$: $8 = \ldots00$ goes to slot `00`, $6 = \ldots10$ and $10 = \ldots10$ to slot `10`. The bucket $\set{5, 3}$ has local depth $1$, so both slots `01` and `11` point to it.
- $13 = \ldots01$: slot `01` is full, but its bucket has $d = 1 < g = 2$, so it splits *without* doubling: $5 = \ldots01$ and $13 = \ldots01$ go to slot `01`, $3 = \ldots11$ to slot `11`.

Final state ($g = 2$): `00` $\to \set{8}$, `01` $\to \set{5, 13}$, `10` $\to \set{6, 10}$, `11` $\to \set{3}$, all with local depth $2$. A Python simulation of [[#def-extendible]] produces the same state.
:::
:::

If many keys share the same low bits — or simply the same key, a value repeated more times than a bucket holds — splitting cannot separate them, and the directory may double repeatedly; overflow pages are then needed after all. **Linear hashing** (Litwin, 1980) avoids a directory altogether by splitting buckets in a fixed round-robin order, one at a time, as the load grows. Hash indexes are used for equality lookups and, above all, inside query processing for hash joins and grouping ([[databases/query-processing]]); as persistent indexes, B+-trees dominate because they support ranges and ordering at nearly the same lookup cost.

## In practice

B+-trees have been the standard persistent index for half a century, but write-heavy systems increasingly use **log-structured merge trees** (LSM trees, O'Neil and others, 1996): updates are collected in a sorted in-memory table, written out sequentially as immutable sorted files, and merged in the background, trading slower reads (several files may need checking, helped by Bloom filters) for much faster writes. Systems such as LevelDB, RocksDB and Cassandra use them (as of 2026); Kleppmann's book compares the two designs carefully. Column stores for analytics store each column separately and compress it, so that a query reading three columns of a hundred reads only those three. Flash storage has narrowed the gap between random and sequential reads, which shifts optimiser cost constants but not the logic of this chapter: an index wins by touching fewer pages.

::: history
Rudolf Bayer and Edward McCreight invented B-trees at Boeing Scientific Research Laboratories ("Organization and maintenance of large ordered indexes", *Acta Informatica*, 1972; first presented in 1970); the B+-tree variant with all data in linked leaves became standard during the 1970s, and Douglas Comer's survey "The ubiquitous B-tree" (*ACM Computing Surveys*, 1979) already called it ubiquitous. IBM's VSAM (1973) used B+-tree-like indexing, and System R and Ingres both had B-tree indexes. Ronald Fagin, Jürg Nievergelt, Nicholas Pippenger and H. Raymond Strong published extendible hashing in 1979, and Witold Litwin linear hashing in 1980. The slotted-page layout and the buffer manager's pin-and-unpin protocol date from the same era of System R; Hong-Tai Chou and David DeWitt studied buffer replacement for database workloads in 1985, and Elizabeth O'Neil, Patrick O'Neil and Gerhard Weikum's LRU-K (1993) refined LRU for them.
:::

## Where this leads

Query processing ([[databases/query-processing]]) builds selection, sorting and join algorithms on top of heap files, B+-trees and hashing, with costs counted in the model of [[#def-io-model]]; the optimiser ([[databases/query-optimisation]]) chooses between scans and indexes using estimates of selectivity. The buffer manager reappears in crash recovery ([[databases/recovery]]), where the rules for writing dirty pages to storage decide what must be logged. Concurrency control must also protect index structures while many transactions use them at once ([[databases/transactions]]). The general theory of memory hierarchies and caching is in [[computer-systems/memory-hierarchy]].

::: summary
- The **I/O cost model** counts page transfers; persistent storage is orders of magnitude slower than memory and is accessed in pages of a few KiB.
- **Slotted pages** store variable-length records with stable **record ids** (page, slot); **heap files** are cheap to insert into but slow to search, **sorted files** the reverse.
- The **buffer manager** caches pages in frames with pin counts and dirty bits; LRU suffers **sequential flooding** when a scan exceeds the pool ([[#prop-flooding]]).
- A **B+-tree** keeps all entries in linked leaves and routes with internal nodes of fan-out $F$; its height is about $\log_F N$ ([[#thm-bplus-height]]) — $3$ or $4$ levels for $10^8$ entries — and it supports equality and range searches and inserts in $O(\log_F N)$ I/Os.
- **Clustered** indexes keep records in key order; an **unclustered** index pays up to one I/O per matching record and loses to a scan beyond a small selectivity.
- **Covering** and **composite** indexes answer queries from the index alone or by key prefix; every index costs space and update time.
- **Extendible hashing** grows by splitting one bucket and doubling a small directory; hash indexes answer equality searches in about one I/O but cannot do ranges.
:::

## Exercises

::: exercise Records per page {level=1 check="107"}
Records of $72$ bytes are stored in slotted pages of $8192$ bytes with a $24$-byte page header and a $4$-byte slot entry per record. How many records fit in a page? How many would fit without the slot array? (Enter the first number.)
::: solution
Each record costs $72 + 4 = 76$ bytes, and $8192 - 24 = 8168$ bytes are available, so $\lfloor 8168/76 \rfloor = 107$ records ($76 \cdot 107 = 8132 \le 8168 < 8208 = 76 \cdot 108$). Fixed-length records addressed by position need no slots: $\lfloor 8168/72 \rfloor = 113$. The slot array costs six records per page — the price of stable record ids and variable-length records.
:::
:::

::: exercise Height of an index {level=1 check="3"}
A B+-tree index has $F = L = 200$ and all nodes full. What is the smallest height $h$ that can hold $10^7$ entries? (Enter $h$.)
::: solution
By [[#thm-bplus-height]] we need $200 \cdot 200^h \ge 10^7$, i.e. $200^{h+1} \ge 10^7$. $200^2 = 40\,000$, $200^3 = 8\times10^6 < 10^7$, $200^4 = 1.6 \times 10^9$. So $h + 1 = 4$, $h = 3$: four levels, the root, two internal levels and the leaves.
:::
:::

::: exercise Sequential flooding with MRU {level=1 check="7"}
Verify by hand the number of misses of MRU for three scans of pages $1$ to $5$ through $4$ frames. (Enter the number of misses.)
::: solution
First scan: $1, 2, 3, 4$ miss and fill the pool; $5$ misses and evicts the most recently used, $4$: pool $\set{1, 2, 3, 5}$. Second scan: $1, 2, 3$ hit; $4$ misses and evicts $3$ (most recent): $\set{1, 2, 4, 5}$; $5$ hits. Third scan: $1, 2$ hit; $3$ misses and evicts $2$: $\set{1, 3, 4, 5}$; $4, 5$ hit. Misses: $5 + 1 + 1 = 7$, as the simulation printed.
:::
:::

::: exercise Choosing an index {level=2}
A table Orders(id, customer, date, total) has $5\times10^7$ rows. The workload is: look up an order by id (very frequent); list a customer's orders, newest first (frequent); total sales per day for a date range (nightly). Propose indexes and explain which plan each query would use.
::: solution
- id: the primary key, stored as a clustered B+-tree (or a primary-key index): about $3$–$4$ I/Os per lookup, mostly cached.
- A composite index on (customer, date): the entries of one customer are contiguous and already sorted by date, so "a customer's orders, newest first" reads them backwards with no sort; including total in the index (or as an `INCLUDE` column where supported) makes it covering for summaries per customer.
- For the nightly report, an index on date helps only if the range is narrow; for a range covering much of the table, a full scan is cheaper ([[#ex-unclustered]]). If the report is important, cluster the table by date instead (for example by inserting in date order, which happens naturally for orders).

Each extra index slows the insertion of new orders, which is acceptable here because lookups dominate.
:::
:::

::: exercise Leaf splits {level=2}
Insert the keys $1, 2, \ldots, 10$ in increasing order into an empty B+-tree with $L = F = 3$ using [[#alg-bplus-insert]]. Draw the final tree and compute the leaf occupancy. Why do increasing insertions waste space, and how do real systems avoid it?
::: solution
Following the algorithm (keep $\lceil 4/2 \rceil = 2$ entries in the old leaf, move $2$): after $1, 2, 3$ the root is the leaf $[1,2,3]$; $4$ splits it into $[1,2]$ and $[3,4]$ with root $[3]$; $5$ gives $[3,4,5]$; $6$ splits into $[3,4]$, $[5,6]$, root $[3 \mid 5]$; $7$ fills $[5,6,7]$; $8$ splits into $[5,6]$, $[7,8]$, and the root would get $3, 5, 7$ and four children, so it splits into $[3]$ and $[7]$ under a new root $[5]$; $9$ fills $[7,8,9]$; $10$ splits it into $[7,8]$, $[9,10]$ and adds $9$ to the node $[7]$, giving $[7 \mid 9]$.

Final tree: root $[5]$; internal nodes $[3]$ (children $[1,2]$, $[3,4]$) and $[7 \mid 9]$ (children $[5,6]$, $[7,8]$, $[9,10]$). Five leaves of capacity $3$ hold $10$ entries: occupancy $10/15 = 67\%$, and every leaf except the last stays half full for ever, since no later key goes into it. Systems detect appends at the right edge and split unevenly — leave the old leaf full and start a new one — which gives nearly $100\%$ occupancy for sequential keys; bulk loading does the same.
:::
:::

::: exercise Break-even selectivity {level=2 check="1/200"}
A relation has $N = 2\times 10^6$ records in $B = 10^4$ pages. Ignoring the index pages, at what selectivity $s$ does an unclustered index (one I/O per matching record) cost the same as a full scan? (Enter $s$ as a fraction.)
::: solution
The unclustered index costs $sN = 2\times10^6\,s$ I/Os and the scan $10^4$. They are equal at $s = 10^4 / (2\times10^6) = 1/200 = 0.5\%$. In general the break-even selectivity is $B/N$, one over the number of records per page: the more records per page, the sooner a scan wins.
:::
:::

::: exercise Extendible hashing continued {level=2}
Continue [[#ex-extendible]] by inserting $1$ and then $21$. Give the final directory and local depths.
::: solution
$1 = 0001$ goes to slot `01`, whose bucket $\set{5, 13}$ is full with local depth $2 = g$. Double the directory to $g = 3$ (slots `000`–`111`, each copying the slot with the same low two bits) and split the bucket on bit $2$: $5 = 0101$ and $13 = 1101$ have bit $2$ equal to $1$, so they go to slot `101`, and $1 = 0001$ (bit $2$ is $0$) to slot `001`. Now `001` $\to \set{1}$, `101` $\to \set{5, 13}$, both of local depth $3$; the other buckets keep local depth $2$, each pointed to by two slots.

$21 = 10101$, low three bits `101`: that bucket $\set{5, 13}$ is full with local depth $3 = g$. Double again to $g = 4$ and split on bit $3$: $5 = 0101$ and $21 = 1\,0101$ have bit $3$ equal to $0$ and go to slot `0101`, while $13 = 1101$ goes to slot `1101`. Final: $g = 4$, sixteen slots; buckets $\set{8}$, $\set{6, 10}$ and $\set{3}$ with local depth $2$ (four slots each), $\set{1}$ with local depth $3$ (two slots), and $\set{5, 21}$ and $\set{13}$ with local depth $4$ (one slot each). The simulation of [[#def-extendible]] agrees. Two insertions doubled the directory twice because $5$, $13$ and $21$ share their low bits — the weakness of using few bits of the hash.
:::
:::

::: exercise A lower bound for comparison-based indexes {level=3}
Suppose an index is a tree whose nodes are pages, each page can hold at most $F$ keys and pointers, and a search may compare the sought key only with keys in the pages it reads. Prove that some search must read at least $\log_{F+1} N$ pages when the index distinguishes $N$ different keys, and conclude that B+-trees are optimal up to a constant factor in the base of the logarithm.
::: solution
Model a search as a walk from the root: after reading a page holding at most $F$ keys, comparing the sought key with them determines one of at most $F + 1$ intervals, which determines the next page to read (or the answer). So after reading $t$ pages the search can have followed at most $(F + 1)^t$ different paths, and different paths are needed for keys whose searches must end differently. To distinguish $N$ keys we need $(F + 1)^t \ge N$, i.e. $t \ge \log_{F+1} N$ for the worst search. A B+-tree reads $h + 1 \le 2 + \log_{\lceil F/2 \rceil} (N/2\lceil L/2\rceil)$ pages ([[#thm-bplus-height]]); since $\log_{\lceil F/2\rceil} N = \log_{F+1} N \cdot \frac{\ln(F+1)}{\ln \lceil F/2\rceil}$ and the ratio tends to $1$ as $F$ grows, the B+-tree is within a constant factor (close to $1$ for large $F$) of the lower bound. Hashing escapes the bound because it does not compare keys.
:::
:::

::: exercise Simulating clock {level=3}
Implement the clock replacement policy and compare it with LRU on (a) three scans of pages $1$–$5$ with $4$ frames, and (b) the reference string $1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5$ with $3$ frames. Explain the results.
::: solution
```python
def clock(refs, frames):
    slots, ref, hand, misses = [None] * frames, [0] * frames, 0, 0
    for p in refs:
        if p in slots:
            ref[slots.index(p)] = 1          # referenced again: give a second chance
            continue
        misses += 1
        while ref[hand]:                     # skip and clear referenced frames
            ref[hand] = 0
            hand = (hand + 1) % frames
        slots[hand], ref[hand] = p, 1        # replace the victim
        hand = (hand + 1) % frames
    return misses

scan = list(range(1, 6)) * 3
belady = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
print(lru(scan, 4), clock(scan, 4), lru(belady, 3), clock(belady, 3))
```

```console
$ python3 clock.py
15 15 10 9
```

(a) Clock floods exactly like LRU: by the time a page comes round again, its reference bit has been cleared by the hand and it has been replaced. (b) On the second string LRU makes $10$ misses and clock $9$: clock only approximates LRU, and here its coarser information happens to keep page $5$'s neighbours slightly better. Neither is optimal; Bélády's optimal policy (evict the page used furthest in the future) makes $7$ misses on (b). Page replacement policies are studied further in [[operating-systems]].
:::
:::
