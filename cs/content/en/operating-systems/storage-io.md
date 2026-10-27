A program calls `read` on a file and, a few microseconds or milliseconds later, the bytes are in its buffer. In between, the kernel has looked up which block of which device holds them, built a request, handed it to a driver, which wrote a few numbers into a device's registers; the device has fetched the data — from a spinning platter, by moving an arm and waiting for the right sector to come round, or from flash memory, by reading a page of charge-trapping cells — copied it into main memory by itself, and raised an interrupt; and the kernel has woken the sleeping process. The processor executed none of the copying.

This chapter follows that path from the bottom. We look at how the processor talks to devices at all — registers, polling, interrupts and direct memory access — and at the device drivers that hide the details. Then we study the two storage technologies of current computers: **hard disks**, whose mechanical delays make the *order* of requests matter enormously, and **solid-state drives**, whose flash memory cannot be overwritten in place and needs a layer of indirection that has its own costs. Finally we combine several disks into a **RAID** array, for speed and to survive failures, and calculate how reliable such an array really is. This is the first chapter of the third theme of the course, **persistence**; [[operating-systems/file-systems]] builds on it.

Disk and SSD numbers in this chapter are representative of devices sold around 2026 and are given to explain orders of magnitude, not as specifications of particular products; check a datasheet when it matters.

## Talking to devices

A device presents itself to the processor as a small set of **registers**: typically a *status* register (is the device busy? did an error occur?), a *command* register (what to do), and *data* registers or a pointer to a data buffer in memory. Behind them is the device's own hardware and, nowadays, its own processor running firmware.

The processor reaches the registers in one of two ways. With **port-mapped I/O**, special privileged instructions (`in` and `out` on x86) address a separate I/O space. With **memory-mapped I/O**, the registers appear at physical addresses, and ordinary loads and stores reach them; the kernel maps those addresses into its address space uncached, so that each access really goes to the device. All modern high-speed devices use memory mapping. Either way only the kernel may do it ([[operating-systems/os-structure#prop-protection]]).

::: definition Programmed I/O, interrupts and DMA {#def-io-methods}
- With **polling** (programmed I/O), the processor repeatedly reads the status register until the device is ready, and moves each word of data itself.
- With **interrupt-driven I/O**, the processor issues a command and does other work — runs another process — until the device raises an **interrupt** to say that it has finished ([[computer-systems/exceptions-processes]]).
- With **direct memory access** (DMA), the processor tells the device (or a DMA engine) the physical address and length of a buffer in memory; the device transfers the data to or from memory itself and interrupts only when the whole transfer is complete.
:::

A disk read in a modern kernel uses all three ideas: the driver writes a command descriptor into memory, *rings a doorbell* (a store to a device register), and the device fetches the descriptor and the data by DMA and interrupts at the end. Because devices write to physical memory directly, an **IOMMU** translates and restricts their addresses, just as the MMU does for processes, so that a faulty or malicious device cannot overwrite the kernel.

Interrupts are not always better than polling. Each one costs a few microseconds of handler entry, exit and cache disturbance; a device that completes a million operations per second would interrupt a million times. If the operation is short, waiting for it is cheaper than switching away and back.

::: proposition When polling wins {#prop-poll}
Suppose an I/O operation takes time $d$ to complete, polling occupies the processor for the whole of $d$, and using an interrupt costs a fixed overhead $c$ of processor time (switching away, handling the interrupt, switching back) but frees the processor during $d$. Then interrupts waste less processor time exactly when $d > c$; for $d < c$, polling is cheaper, and it also has lower latency.
:::

::: proof
Polling uses $d$ of processor time per operation; interrupts use $c$. The first is larger exactly when $d > c$. Latency is lower with polling because the poller notices completion almost immediately, while the interrupt path adds the interrupt delivery and a context switch back to the waiting thread.
:::

With $c$ around $5$ µs, a hard-disk read ($d \approx 8$ ms) clearly needs an interrupt, but a read from a fast NVMe SSD ($d$ around $10$–$20$ µs as of 2026) is close to the break-even point, and network cards receiving millions of packets per second are well below it. Real systems therefore mix the two: Linux's NAPI network interface switches to polling under heavy load, devices **coalesce** interrupts (one interrupt per batch of completions), and `io_uring` can poll for block-device completions. On the test machine, `/proc/interrupts` lists the NVMe SSD's interrupts per queue, about ten million on each of the busy ones:

```console
$ grep nvme /proc/interrupts | head -4 | awk '{s=0; for(i=2;i<=37;i++) s+=$i; print $1, s, $NF}'
78: 0 nvme0q0
79: 12437262 nvme0q1
80: 0 nvme0q2
81: 11944503 nvme0q3
```

The `awk` program adds up the $36$ per-CPU columns. Queue $0$ is the administrative queue, used only for configuration; the I/O queues that have been used have each taken over ten million interrupts since boot (the queues with no interrupts are assigned to logical CPUs that are offline on this machine — `/sys/block/nvme0n1/mq/*/cpu_list` lists each queue's CPUs). The device has $72$ I/O queues (`ls /sys/block/nvme0n1/mq` lists them), one per possible logical CPU, each with its own interrupt — so cores can issue and complete I/O without sharing a lock.

### Device drivers

There are thousands of kinds of devices, each with its own registers and protocol. The kernel hides them behind a few abstractions: **block devices** (disks and SSDs: arrays of fixed-size blocks, addressed by number), **character devices** (terminals, serial ports: streams of bytes), and **network interfaces** (packets). A **device driver** is the kernel code that implements one of these abstractions for one kind of hardware. Above the drivers, Linux's **block layer** queues, merges and schedules requests, and the file systems of the next chapter see only "read block $b$" and "write block $b$". Drivers are by far the largest part of the kernel's source, and historically the buggiest: a 2001 study of Linux found error rates in driver code several times higher than in the rest of the kernel, which is one argument for the microkernels of [[operating-systems/os-structure]].

## Hard disk drives

A **hard disk drive** (HDD) stores data magnetically on rotating **platters**. Each surface is divided into concentric **tracks**, and each track into **sectors** (512 bytes historically, 4 KiB on drives made since about 2011, the "Advanced Format"). One **head** per surface, all mounted on a single **arm**, reads and writes; the set of tracks under the heads at one arm position is a **cylinder**. The drive presents the sectors to the computer as a linear array of **logical block addresses** (LBAs), numbered so that consecutive addresses lie along a track and then on the next track — so consecutive LBAs are physically close.

::: definition Disk access time {#def-disk-time}
The time to service a request is

$$
T = T_{\text{seek}} + T_{\text{rotation}} + T_{\text{transfer}},
$$ {#eq-disk}

where $T_{\text{seek}}$ is the time to move the arm to the right track, $T_{\text{rotation}}$ the time until the first wanted sector rotates under the head, and $T_{\text{transfer}}$ the time for the wanted sectors to pass under it (request size divided by the media transfer rate).
:::

For a random request, the rotational delay is on average half a revolution. The average seek needs more care.

::: proposition The average seek distance {#prop-seek}
If the current and the requested track are independent and uniformly distributed across a disk of $N$ tracks (treated as continuous positions in $[0, 1]$), the expected seek distance is $N/3$ — one third of a full stroke.
:::

::: proof
With $X, Y$ independent and uniform on $[0, 1]$,

$$
\E\lvert X - Y\rvert = \int_0^1\!\!\int_0^1 \lvert x - y\rvert \,dy\,dx = \int_0^1 \left(\frac{x^2}{2} + \frac{(1-x)^2}{2}\right) dx = \frac{1}{6} + \frac{1}{6} = \frac13 ,
$$

since for fixed $x$, $\int_0^x (x - y)\,dy = x^2/2$ and $\int_x^1 (y - x)\,dy = (1-x)^2/2$. Scaling by $N$ gives $N/3$. (A simulation of a million random pairs gives $0.33333$.) Seek *time* is not proportional to distance — the arm accelerates, coasts and settles, so short seeks cost relatively more — which is why datasheets quote an average seek time rather than a speed.
:::

::: example Random against sequential {#ex-hdd}
A $7200$ RPM disk has an average seek time of $4$ ms and a media transfer rate of $200$ MB/s. What is its throughput for random 4 KiB reads, and for sequential reads? What if each random read is $1$ MB?
::: solution
One revolution takes $60/7200$ s $= 8.33$ ms, so the average rotational delay is $4.17$ ms. Transferring $4096$ bytes at $200$ MB/s takes $0.02$ ms. By [[#eq-disk]], a random 4 KiB read takes $4 + 4.17 + 0.02 = 8.19$ ms: about $122$ reads per second (IOPS), or $0.5$ MB/s. Sequential reads pay no seek and no rotational delay between requests, so they run at the full $200$ MB/s — **four hundred times faster**. A random $1$ MB read takes $4 + 4.17 + 5 = 13.2$ ms, giving $76$ MB/s: larger requests amortise the positioning time. The lesson of hard disks is that positioning dominates everything; file systems and databases go to great lengths to make I/O sequential.
:::
:::

::: widget plot
f: 1000*x/(t + 1000*x/r)
x: 0, 8
y: 0, 200
sliders: t=8.17:0.1:20:0.01; r=200:50:300:10
labels: \text{throughput (MB/s)}
points: 0.004096,0.5; 1,75.9
caption: Throughput of a disk serving random requests of $x$ MB each, when every request pays a positioning time of $t$ ms (seek plus rotation, $8.17$ ms for the disk of [[#ex-hdd]]) and then transfers at $r$ MB/s. The dots are the 4 KiB and 1 MB cases of the example. Notice how slowly the curve approaches the sequential rate $r$: even 8 MB requests reach only about $83\%$ of it. Set $t$ close to $0.1$ ms, a rough figure for an SSD's access latency, and the curve jumps to the ceiling almost at once — request size matters far less without mechanical positioning.
:::

### Disk scheduling

When many requests are waiting, the order in which the disk serves them changes the total seek time dramatically. The policies are the scheduling policies of [[operating-systems/processes-scheduling]] adapted to a moving head.

::: algorithm Disk-scheduling policies {#alg-disk-sched}
Given the current head position and a queue of requested tracks:

- **FCFS**: serve requests in arrival order.
- **SSTF** (shortest seek time first): always serve the request nearest the head.
- **SCAN** (the elevator): move in one direction serving every request on the way, to the last track; then reverse.
- **C-SCAN** (circular SCAN): like SCAN, but only in one direction; at the end, return to the other end without serving, and start again.
- **LOOK** and **C-LOOK**: like SCAN and C-SCAN, but reverse (or return) at the last *request* in the current direction rather than the last track.
:::

::: example Comparing disk schedules {#ex-disk-sched}
The head is at track $100$ of $0$–$199$, moving towards higher tracks, and the queue holds $35, 170, 92, 140, 15, 120, 60, 190$. Find the order of service and the total head movement for each policy. (Count the return sweep of C-SCAN and C-LOOK as movement.)
::: solution
| policy | order of service | movement |
|---|---|---|
| FCFS | 35, 170, 92, 140, 15, 120, 60, 190 | 746 |
| SSTF | 92, 120, 140, 170, 190, 60, 35, 15 | 281 |
| SCAN | 120, 140, 170, 190, (199), 92, 60, 35, 15 | 283 |
| C-SCAN | 120, 140, 170, 190, (199, 0), 15, 35, 60, 92 | 390 |
| LOOK | 120, 140, 170, 190, 92, 60, 35, 15 | 265 |
| C-LOOK | 120, 140, 170, 190, 15, 35, 60, 92 | 342 |

For example, LOOK moves $100 \to 190$ ($90$) and then $190 \to 15$ ($175$): $265$. SSTF first goes *down* to $92$ (distance $8$), then has to come back up past $100$: greedily nearest is not globally shortest, and here LOOK beats it. (All totals were computed with a short Python script.) FCFS moves almost three times as far as any other policy.
:::
:::

SSTF, like shortest job first, can **starve**: requests at the edges of the disk wait as long as requests keep arriving near the head. SCAN and its variants bound the wait — every request is served within two sweeps — and C-SCAN gives more uniform waiting times, because SCAN serves tracks in the middle twice per round trip but those at the edges only once.

Two facts complicate this picture in practice. First, the kernel does not know the disk's geometry — logical block numbers are only roughly proportional to tracks — and rotational position matters as much as seek distance. So modern drives schedule internally, using **native command queuing** (NCQ: up to $32$ outstanding commands on SATA), with full knowledge of where every sector is. Second, the operating system's scheduler now aims mainly at fairness and latency between processes. As of 2026 Linux's multi-queue block layer offers `mq-deadline` (sorts requests but gives each a deadline, so none starves), `bfq` (budget fair queueing, proportional share for interactive desktops), `kyber` (latency targets for fast devices) and `none`. On the test machine the SATA SSD uses `mq-deadline` and the NVMe SSD `none`:

```console
$ cat /sys/block/sda/queue/scheduler /sys/block/nvme0n1/queue/scheduler
none [mq-deadline]
[none] mq-deadline
```

For a device with no seek time and its own deep internal parallelism, the best thing the kernel can do is get out of the way.

## Solid-state drives

A **solid-state drive** (SSD) stores data in **NAND flash** memory: cells that trap electric charge, storing one bit (SLC), two (MLC), three (TLC) or four (QLC) per cell by distinguishing $2$, $4$, $8$ or $16$ charge levels. There are no moving parts, so there is no seek and no rotation: a random read costs about the same as a sequential one. But flash has three peculiarities that shape everything about SSDs.

1. **Pages and blocks.** Flash is read and programmed (written) in **pages** of typically $4$–$16$ KiB, but erased only in **erase blocks** of hundreds of pages (several MiB).
2. **Erase before write.** A page can be programmed only when it has been erased; there is no overwriting in place.
3. **Wear.** Each block survives a limited number of program/erase cycles — of the order of $100{,}000$ for SLC, a few thousand for TLC and around a thousand for QLC — after which it can no longer hold charge reliably.

Representative performance, as of 2026: a reading of a flash page takes tens of microseconds, programming a page a few hundred, erasing a block a few milliseconds; an NVMe SSD with many flash chips working in parallel delivers random 4 KiB reads at around $10^5$–$10^6$ per second and sequential transfers of several GB/s, against about $100$–$200$ IOPS and $200$ MB/s for a hard disk.

### The flash translation layer

If the drive mapped each logical block to a fixed flash page, rewriting one 4 KiB block would require reading its whole erase block, erasing it and programming it all back — milliseconds of work and a full erase cycle for every small write. Instead, the SSD's firmware contains a **flash translation layer** (FTL) that behaves like a log-structured system with virtual memory:

::: definition Flash translation layer {#def-ftl}
A **page-mapped FTL** keeps a table from logical block numbers to physical flash pages. A write of logical block $b$ is programmed into the next free page of a currently open erase block, the table entry for $b$ is updated to point there, and the page that previously held $b$ is marked **invalid**. When free blocks run low, **garbage collection** chooses a victim erase block, copies its remaining valid pages to free pages elsewhere (updating the table), and erases the victim. **Wear levelling** steers writes and garbage collection so that all blocks are erased about equally often.
:::

This turns random writes into sequential programming of flash and avoids erasing on every write, at a price: garbage collection rewrites data the host never asked to write.

::: proposition Write amplification under garbage collection {#prop-wa}
Define **write amplification** as (pages programmed into flash) / (pages written by the host). Suppose that, in steady state, every erase block chosen for garbage collection has a fraction $u$ of its pages still valid. Then the write amplification is

$$
\text{WA} = \frac{1}{1 - u}.
$$ {#eq-wa}
:::

::: proof
Let an erase block hold $P$ pages. Cleaning one victim copies its $uP$ valid pages and then frees all $P$ pages, so the net gain is $(1 - u)P$ free pages, which in steady state are consumed by $(1-u)P$ host writes. For these the flash programs $(1-u)P$ host pages plus the $uP$ copies, $P$ pages in total. Hence $\text{WA} = P / ((1 - u)P) = 1/(1 - u)$.
:::

If the victims are $80\%$ valid, every host write causes five flash writes, cutting both write throughput and the drive's lifetime by five. $u$ depends on how full the drive is and on the workload. Drives therefore keep **over-provisioning** — flash capacity beyond the advertised size, often $7\%$ to $28\%$ — so that victims with few valid pages can be found, and the operating system helps by telling the drive which blocks no longer hold data: the **TRIM** command (`discard` in Linux, run periodically by `fstrim`), which lets the FTL mark those pages invalid without copying them. Hidden garbage collection also makes SSD write latency unpredictable — a write may wait behind a collection — which is why newer interfaces such as **zoned namespaces** let the host write sequentially into zones and take over some of the FTL's work.

::: warning "SSDs are just fast disks"
Treating an SSD as a disk without seek time gets several things wrong. Small random *writes* are not free: they increase write amplification, and sustained random-write performance can fall far below the figure for a fresh drive once garbage collection starts. Overwriting a file in place does not erase the old data: the old pages stay in flash until collected, so secure deletion requires the drive's own sanitise command or encryption. Defragmenting an SSD wastes write cycles for no gain. And disk-scheduling algorithms that minimise seek distance are pointless; what helps is keeping many requests outstanding, so that the drive's dozens of flash chips work in parallel.
:::

::: quiz
Which statements are true of a page-mapped FTL?
- [x] Rewriting logical block $7$ programs a new flash page and invalidates the old one.
- [ ] Rewriting logical block $7$ requires erasing the erase block that contains it.
- [x] If garbage-collection victims are on average $75\%$ valid, write amplification is $4$.
- [x] TRIM can reduce write amplification by marking deleted data invalid.
::: solution
Out-of-place writes are the point of the FTL; erasing happens later, during garbage collection, a whole block at a time. By [[#eq-wa]], $1/(1 - 0.75) = 4$. TRIM lowers the fraction of valid pages in victim blocks, since data the file system has deleted no longer has to be copied.
:::
:::

## RAID: redundant arrays of disks

One disk is a single point of failure and has the bandwidth of one disk. In 1988 David Patterson, Garth Gibson and Randy Katz proposed **RAID** — a *redundant array of inexpensive disks* — which presents several disks as one large, fast and fault-tolerant logical disk. The array's controller (hardware, or software such as Linux's `md` or ZFS on the test machine) maps each logical block to physical blocks.

::: definition RAID levels {#def-raid}
With $N$ disks of capacity $C$ each:

- **RAID 0** (striping): logical blocks are distributed round-robin over the disks in **stripes**; capacity $NC$; no redundancy.
- **RAID 1** (mirroring): every block is written to two (or more) disks; capacity $NC/2$ with two copies; survives the loss of one disk of each pair. RAID 1 combined with striping is called **RAID 10**.
- **RAID 4** (parity disk): $N - 1$ disks hold striped data; the last holds, for each stripe, the **parity** — the bitwise XOR of the data blocks of the stripe; capacity $(N-1)C$; survives any one failure.
- **RAID 5** (rotated parity): like RAID 4, but the parity block of each stripe is on a different disk, rotating; capacity $(N-1)C$; survives any one failure.
- **RAID 6**: two independent check blocks per stripe (XOR parity plus a Reed–Solomon code); capacity $(N-2)C$; survives any two failures.
:::

Parity works because XOR is its own inverse. If a stripe holds data blocks $D_1, \dots, D_{N-1}$ and parity $P = D_1 \oplus \dots \oplus D_{N-1}$, then any one lost block equals the XOR of all the others — for example $D_2 = P \oplus D_1 \oplus D_3 \oplus \dots \oplus D_{N-1}$ — so when a disk fails, every block on it can be **reconstructed**, and is, onto a replacement disk during a **rebuild**.

::: proposition The small-write penalty {#prop-small-write}
In RAID 4 and RAID 5, updating one data block $D$ of a stripe to $D'$ can be done with two reads and two writes: read $D$ and the parity $P$, compute $P' = P \oplus D \oplus D'$, write $D'$ and $P'$. The result is the correct parity of the new stripe.
:::

::: proof
Let the other data blocks of the stripe have XOR $Q$, so $P = Q \oplus D$. Then $P \oplus D \oplus D' = Q \oplus D \oplus D \oplus D' = Q \oplus D'$ (since $D \oplus D = 0$), which is the parity of the stripe with $D$ replaced by $D'$. The method reads two blocks and writes two, whatever $N$ is; the alternative — reading all the other data blocks to recompute the parity — costs $N - 2$ reads.
:::

::: example Reconstructing a lost block {#ex-reconstruct}
A four-disk RAID 5 stripe holds the bytes $D_1 = 0x3C$, $D_2 = 0xA5$ and $D_3 = 0x0F$ on three disks and their parity on the fourth. Compute the parity, and then recover $D_2$ after its disk fails.
::: solution
$P = 0x3C \oplus 0xA5 \oplus 0x0F$. In binary, $0x3C = 0011\,1100$ and $0xA5 = 1010\,0101$ give $1001\,1001 = 0x99$; with $0x0F = 0000\,1111$ that gives $1001\,0110 = 0x96$. After the failure, $D_2 = D_1 \oplus D_3 \oplus P = 0x3C \oplus 0x0F \oplus 0x96$: $0011\,1100 \oplus 0000\,1111 = 0011\,0011$, and $0011\,0011 \oplus 1001\,0110 = 1010\,0101 = 0xA5$. ✓ The same computation, applied to every byte of every stripe, rebuilds the whole failed disk — and requires reading every surviving disk completely, which is what makes rebuilds slow and risky ([[#ex-rebuild]]).
:::
:::

The small write turns one logical write into four disk operations. In RAID 4 every write also involves the single parity disk, which becomes the bottleneck: random writes proceed at the rate of *one* disk, divided by two. RAID 5 rotates the parity so that these operations spread over all disks.

| | RAID 0 | RAID 1 | RAID 4 | RAID 5 |
|---|---|---|---|---|
| capacity | $NC$ | $NC/2$ | $(N-1)C$ | $(N-1)C$ |
| failures survived | 0 | 1 (per pair) | 1 | 1 |
| random read rate | $NR$ | $NR$ | $(N-1)R$ | $NR$ |
| random write rate | $NR$ | $NR/2$ | $R/2$ | $NR/4$ |
| sequential write | $NS$ | $NS/2$ | $(N-1)S$ | $(N-1)S$ |

Here $R$ is one disk's random I/O rate and $S$ its sequential bandwidth; the numbers follow the analysis in Arpaci-Dusseau's *OSTEP*, assuming whole-stripe writes for the sequential case and the small-write method of [[#prop-small-write]] for random writes.

### How reliable is a RAID array?

Assume disk failures are independent, and each disk fails at a constant rate $\lambda$ — an exponential lifetime with **mean time to failure** $\text{MTTF} = 1/\lambda$. Large-scale field studies (published by Google and CMU in 2007 and by the storage company Backblaze since 2013) observe **annualised failure rates** of roughly $0.5\%$ to $2\%$ for hard disks in their first years, higher with age; independence is optimistic, because disks bought together tend to fail together.

::: theorem Mean time to data loss of RAID 5 {#thm-mttdl}
In a RAID 5 array of $N$ disks with independent exponential lifetimes of mean $\text{MTTF}$, in which a failed disk is replaced and rebuilt in time $\text{MTTR} \ll \text{MTTF}$, the mean time to data loss is approximately

$$
\text{MTTDL} \approx \frac{\text{MTTF}^2}{N(N-1)\,\text{MTTR}} .
$$ {#eq-mttdl}
:::

::: proof
Data are lost when a second disk fails during the rebuild after a first failure. With $N$ working disks, the time to the first failure is the minimum of $N$ exponential lifetimes, itself exponential with mean $\text{MTTF}/N$. During the rebuild, each of the $N - 1$ remaining disks fails with probability about $\text{MTTR}/\text{MTTF}$ (since $\text{MTTR} \ll \text{MTTF}$), so the probability that one of them does is about $q = (N-1)\text{MTTR}/\text{MTTF}$. Each first failure therefore starts an independent trial that ends in data loss with probability $q$; the expected number of first failures before a loss is $1/q$, and the mean time to data loss is about $(\text{MTTF}/N)/q$, which is [[#eq-mttdl]].
:::

::: example Rebuilding a large array {#ex-rebuild}
An array of $8$ disks of $8$ TB each uses RAID 5. Each disk has an annualised failure rate of $1.75\%$, so $\text{MTTF} \approx 8760/0.0175 \approx 500{,}000$ hours; a rebuild takes $24$ hours. (a) What is the MTTDL by [[#eq-mttdl]]? (b) The datasheet specifies at most one **unrecoverable read error** (URE) per $10^{14}$ bits read. Estimate the probability that a rebuild completes without one.
::: solution
(a) $\text{MTTDL} \approx (5 \times 10^5)^2 / (8 \times 7 \times 24) = 2.5 \times 10^{11}/1344 \approx 1.9 \times 10^8$ hours, about $21{,}000$ years. That looks safe.

(b) But a rebuild must read *every* block of the seven surviving disks: $7 \times 8 \times 10^{12} \times 8 = 4.48 \times 10^{14}$ bits. If UREs occur independently at the specified rate, their number is approximately Poisson with mean $\mu = 4.48$, so the probability of none is $e^{-4.48} \approx 1.1\%$. A URE during a RAID 5 rebuild means that one stripe cannot be reconstructed — data loss, or at best a damaged file. With an enterprise rate of one per $10^{15}$ bits, $\mu = 0.448$ and the probability of a clean rebuild is $e^{-0.448} \approx 64\%$. Datasheet URE rates are conservative upper bounds and real drives usually do much better, but the calculation explains why large arrays use RAID 6 (which can survive a URE during a single-disk rebuild) and why file systems such as ZFS checksum every block and scrub the disks regularly to find bad sectors before they are needed.
:::
:::

::: widget distribution
dist: poisson
params: lambda=4.48
a: 0
b: 0
caption: The number of unrecoverable read errors during the rebuild of [[#ex-rebuild]], modelled as Poisson with mean $\lambda = 4.48$ (seven 8 TB disks read in full at one error per $10^{14}$ bits). The shaded bar at $0$ is the probability of a clean rebuild, about $1.1\%$. Set $\lambda = 0.448$ (an error rate of one per $10^{15}$ bits) to see it rise to about $64\%$, and notice how sensitive the outcome is to an error rate printed in a datasheet.
:::

RAID protects against disk failure only. It does nothing against deleting the wrong file, a bug that writes garbage, ransomware, fire or theft — the array faithfully mirrors every mistake. **RAID is not a backup**: backups are separate copies, kept elsewhere, ideally with history.

::: history
IBM's RAMAC 305 (1956) was the first computer with a hard disk: fifty 24-inch platters storing about $5$ million characters. IBM's 3340 "Winchester" drive (1973) introduced the sealed head-disk assembly of every later drive. Fixed-head and moving-head scheduling policies were analysed by Denning (1967), who proposed SCAN, and by Teorey and Pinkerton (1972), who compared FCFS, SSTF, SCAN and C-SCAN. Fujio Masuoka invented flash memory at Toshiba in the early 1980s (NOR flash 1984, NAND 1987); flash SSDs entered laptops around 2007 and the NVMe interface, designed for flash with many deep queues, was specified in 2011. Patterson, Gibson and Katz's 1988 paper "A case for redundant arrays of inexpensive disks (RAID)" defined RAID levels 1 to 5. Field studies by Pinheiro, Weber and Barroso at Google, and by Schroeder and Gibson at CMU (both 2007), showed that disk failure rates in practice are higher than datasheet MTTFs suggest and correlated in time.
:::

## Where this leads

[[operating-systems/file-systems]] builds files and directories on top of the block interface, and must cope with the fact that a crash can interrupt any sequence of block writes; its designs — locality-aware placement, journalling, log-structured layout — are shaped by the numbers of this chapter. Databases manage their own I/O, buffer pools and logs on the same devices ([[databases]]). Distributed storage systems replicate and erasure-code data across machines and data centres, extending RAID's ideas with consensus and failure detection ([[distributed-systems]]). Interrupt handling and DMA protection by the IOMMU matter again for virtual machines ([[operating-systems/virtualisation]]), and the electronics of flash cells and disk heads belong to the [Electrical Engineering Atlas](/learn/ee/).

::: summary
- The processor controls devices through **registers** (port- or memory-mapped); it learns of completion by **polling** or **interrupts**, and devices move data by **DMA** ([[#def-io-methods]]). Polling wins when the operation is shorter than the interrupt overhead ([[#prop-poll]]); drivers hide devices behind block, character and network abstractions.
- Disk access time is seek + rotation + transfer ([[#eq-disk]]); the average random seek covers a third of the stroke ([[#prop-seek]]). Random 4 KiB reads achieve about $120$ IOPS ($0.5$ MB/s) against $200$ MB/s sequential ([[#ex-hdd]]).
- **Disk scheduling** (SSTF, SCAN, C-SCAN, LOOK) can cut head movement several-fold over FCFS ([[#ex-disk-sched]]); SSTF can starve. As of 2026 Linux offers `mq-deadline`, `bfq`, `kyber` and `none`, and fast SSDs use `none`.
- **SSDs** read and program pages but erase whole blocks; the **FTL** writes out of place and garbage-collects, with write amplification $1/(1-u)$ ([[#prop-wa]]); over-provisioning and TRIM reduce it.
- **RAID** 0, 1, 4, 5 and 6 trade capacity, performance and redundancy ([[#def-raid]]); parity reconstructs a lost disk, and a small write costs four I/Os ([[#prop-small-write]]). $\text{MTTDL} \approx \text{MTTF}^2/(N(N-1)\text{MTTR})$ ([[#thm-mttdl]]), but read errors during rebuilds make RAID 5 risky for large disks ([[#ex-rebuild]]). RAID is not a backup.
:::

## Exercises

::: exercise Rotational delay {level=1 check="3"}
What is the average rotational delay, in milliseconds, of a $10{,}000$ RPM disk? (Enter milliseconds.)
::: solution
One revolution takes $60/10000$ s $= 6$ ms; on average the wanted sector is half a revolution away: $3$ ms.
:::
:::

::: exercise Random IOPS {level=1 check="125"}
A disk has an average seek time of $6$ ms and rotates at $15{,}000$ RPM, and the transfer time of a small request is negligible. How many random small reads per second can it perform? (Enter the number.)
::: solution
One revolution takes $60/15000$ s $= 4$ ms, so the average rotational delay is $2$ ms. Each read takes $6 + 2 = 8$ ms, giving $1000/8 = 125$ reads per second. Even the fastest disks ever sold manage only a few hundred random IOPS; an NVMe SSD manages hundreds of thousands.
:::
:::

::: exercise SCAN by hand {level=1 check="283"}
Verify the SCAN row of [[#ex-disk-sched]]: the head starts at $100$, moves up to track $199$ serving requests, then reverses. Compute the total head movement. (Enter the number of tracks.)
::: solution
Upwards: $100 \to 199$, serving $120, 140, 170, 190$ on the way: $99$ tracks. Then down from $199$ to the lowest request, $15$, serving $92, 60, 35, 15$: $184$ tracks. Total $99 + 184 = 283$.
:::
:::

::: exercise Write amplification {level=2 check="2.5"}
An SSD's garbage collector finds victim blocks that are $60\%$ valid on average. What is its write amplification? If the host writes $100$ GB per day, how many GB are programmed into flash? (Enter the write amplification.)
::: solution
By [[#eq-wa]], $1/(1 - 0.6) = 2.5$. The flash receives $250$ GB per day: the $100$ GB of host data plus $150$ GB of copies made by garbage collection. If the drive is rated for $600$ TB of flash writes, it lasts $600{,}000/250 = 2400$ days, about $6.6$ years, instead of $16$ years at a write amplification of $1$.
:::
:::

::: exercise Parity by hand {level=2 check="4"}
A RAID 5 stripe holds the 4-bit data blocks $D_1 = 1011$, $D_2 = 0110$, $D_3 = 1100$. Compute the parity block. Then $D_2$ is overwritten with $0011$: compute the new parity with the small-write method, and check it by recomputing from scratch. (Enter the new parity as a decimal number.)
::: solution
$P = 1011 \oplus 0110 \oplus 1100 = 1101 \oplus 1100 = 0001$. Small write ([[#prop-small-write]]): $P' = P \oplus D_2 \oplus D_2' = 0001 \oplus 0110 \oplus 0011 = 0111 \oplus 0011 = 0100$. From scratch: $1011 \oplus 0011 \oplus 1100 = 1000 \oplus 1100 = 0100$. Both give $0100_2 = 4$. If the disk holding $D_3$ now fails, $D_3 = D_1 \oplus D_2' \oplus P' = 1011 \oplus 0011 \oplus 0100 = 1100$, as it should be.
:::
:::

::: exercise RAID 5 or RAID 10? {level=2}
You have $8$ disks, each of $10$ TB with random I/O rate $R = 150$ operations per second. Compare RAID 5 and RAID 10 on usable capacity, random read and write rates, and the number of disk failures each can survive. Which would you choose for a database with many small random writes, and why?
::: solution
RAID 5: capacity $7 \times 10 = 70$ TB; random reads $8R = 1200$/s; random writes $8R/4 = 300$/s (each small write is four I/Os, spread over all disks); survives any one failure. RAID 10 (four mirrored pairs, striped): capacity $40$ TB; random reads $8R = 1200$/s (either copy can serve a read); random writes $8R/2 = 600$/s (each write goes to two disks); survives one failure in each pair — up to four failures if they hit different pairs, but two failures in the same pair lose data. A rebuild copies only one disk's worth from its mirror, which is faster and less exposed to read errors than a RAID 5 rebuild that reads all seven survivors. For small random writes RAID 10 is twice as fast and rebuilds more safely, at the cost of $30$ TB of capacity; databases usually choose it (or SSDs).
:::
:::

::: exercise The third of a stroke, discretely {level=3}
For a disk with $N$ tracks numbered $0$ to $N - 1$, and current and requested tracks independent and uniform, show that the expected seek distance is exactly $(N^2 - 1)/(3N)$, and check that it tends to $N/3$.
::: solution
$\E\lvert X - Y\rvert = \frac{1}{N^2}\sum_{x=0}^{N-1}\sum_{y=0}^{N-1}\lvert x - y\rvert$. The number of ordered pairs at distance $d \ge 1$ is $2(N - d)$, so the sum is $\sum_{d=1}^{N-1} 2d(N - d) = 2N\sum d - 2\sum d^2 = 2N\cdot\frac{(N-1)N}{2} - 2\cdot\frac{(N-1)N(2N-1)}{6} = (N-1)N\left(N - \frac{2N - 1}{3}\right) = \frac{(N-1)N(N+1)}{3}$. Dividing by $N^2$: $\frac{(N-1)(N+1)}{3N} = \frac{N^2 - 1}{3N}$, which is $\frac{N}{3} - \frac{1}{3N} \to \frac{N}{3}$. For $N = 3$: pairs at distance $1$ occur $4$ times, at distance $2$ twice, total $8$, divided by $9$: $8/9$, and $(9 - 1)/9 = 8/9$. ✓
:::
:::

::: exercise RAID 6 reliability {level=3}
Extend the argument of [[#thm-mttdl]] to RAID 6, which loses data only if three disks fail within overlapping rebuild windows. Derive the approximation $\text{MTTDL}_6 \approx \text{MTTF}^3/(N(N-1)(N-2)\,\text{MTTR}^2)$ and evaluate it for the array of [[#ex-rebuild]] (with $N = 8$).
::: solution
After a first failure (mean time $\text{MTTF}/N$ to it), a second failure among the $N - 1$ survivors during the rebuild has probability about $(N-1)\text{MTTR}/\text{MTTF}$. Given two failures, a third among the $N - 2$ remaining during the (overlapping) rebuild window has probability about $(N-2)\text{MTTR}/\text{MTTF}$. Data loss requires both, probability $q \approx (N-1)(N-2)\text{MTTR}^2/\text{MTTF}^2$ per first failure, so $\text{MTTDL}_6 \approx (\text{MTTF}/N)/q = \text{MTTF}^3/(N(N-1)(N-2)\text{MTTR}^2)$. With $\text{MTTF} = 5 \times 10^5$ h, $\text{MTTR} = 24$ h: $1.25 \times 10^{17}/(8 \cdot 7 \cdot 6 \cdot 576) = 1.25 \times 10^{17}/193{,}536 \approx 6.5 \times 10^{11}$ hours — tens of millions of years. Such numbers are dominated in reality by correlated failures, operator error and read errors, not by independent disk deaths; their use is to compare designs, not to promise anything.
:::
:::
