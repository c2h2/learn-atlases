A processor that could only compute would be useless: it must read a keyboard, a sensor or a network, and write to a display, a motor driver or a disk. These **input/output** (I/O) devices are wildly diverse. A keyboard produces a few bytes per second at irregular moments; a temperature sensor is read ten times a second; a solid-state drive moves several gigabytes per second; a 100-gigabit network interface delivers a packet every few hundred nanoseconds. Some devices need an answer within microseconds — the motor controller of a drone, the audio codec whose buffer must not run dry — while others can wait milliseconds.

This chapter answers three questions about how a processor deals with them. **How are devices connected and addressed?** Through buses and interconnects, and in RISC-V through ordinary loads and stores to special addresses. **How does the processor find out that a device needs attention?** Either by asking repeatedly (polling) or by being told (interrupts), which requires the pipeline to stop one program cleanly and start another. **Who moves the data?** Either the processor itself, one word at a time, or a direct-memory-access engine that moves whole blocks while the processor does something else. In each case we estimate the cost in processor time, because I/O is often where a system's performance and responsiveness are really decided.

The embedded-systems view — programming timers, UARTs, SPI and I²C on a microcontroller — is in [[embedded-systems/timers-interrupts]] and [[embedded-systems/serial-communication]]; the operating system's side, device drivers and system calls, is in [Exceptional control flow and processes](/learn/cs/lesson.php?c=computer-systems&l=exceptions-processes) and [Storage devices and input/output](/learn/cs/lesson.php?c=operating-systems&l=storage-io). Here we concentrate on the hardware mechanisms and their costs.

## Connecting devices

Devices are connected to the processor and memory by **interconnects**. In the simplest case this is a **bus**: a shared set of wires carrying addresses, data and control signals, to which several devices are attached.

::: definition Bus and bus transaction {#def-bus}
A **bus** is a shared communication link between a set of components, consisting of data lines, address lines and control lines. A **bus transaction** is a complete exchange: a **master** (initiator, such as a processor or a DMA controller) sends an address and a command, and a **slave** (target, such as a memory or a device register) responds by accepting or supplying data. A **synchronous** bus times all transfers by a common clock; an **asynchronous** bus uses a handshake (request and acknowledge signals) instead. When several masters may initiate transactions, an **arbiter** decides which one uses the bus.
:::

The **bandwidth** of a bus is the number of bytes it transfers per second. If a transaction takes $c$ clock cycles at frequency $f$ to transfer $b$ bytes, the bandwidth is $bf/c$. Overheads such as the address phase and turnaround cycles are amortised by **burst** transfers that move several consecutive data words after one address.

::: example Burst transfers {#ex-burst}
A synchronous bus is $32$ bits wide and clocked at $100\,\mathrm{MHz}$. A single-word transaction needs one address cycle and one data cycle. A burst transaction needs one address cycle followed by eight data cycles. Find the bandwidth of each, and compare with the peak.
::: solution
The peak — one 4-byte word every cycle — is $4\,\mathrm{B}\times 100\,\mathrm{MHz} = 400\,\mathrm{MB/s}$.

*Single-word*: $4$ bytes per $2$ cycles: $4\times 100\times 10^6/2 = 200\,\mathrm{MB/s}$, half the peak.

*Burst*: $32$ bytes per $9$ cycles: $32\times 100\times 10^6/9 = 356\,\mathrm{MB/s}$, $89\,\%$ of the peak.

Caches transfer whole lines, so the bus between a cache and memory is almost always used in bursts — another reason for blocks of $32$ or $64$ bytes.
:::
:::

At high speeds, shared parallel buses run into physical limits: every device loads the wires, signals on different lines arrive at slightly different times (skew), and a long bus is a transmission line ([[electromagnetics]]). Modern systems therefore use a hierarchy of interconnects:

- **On-chip** interconnects connect cores, caches, memory controllers and on-chip peripherals with wide, clocked, often packet-based protocols. Arm's AMBA family (AXI, AHB, APB) and SiFive's TileLink, common in RISC-V systems, define separate channels for addresses, read data, write data and responses, so that many transactions can be outstanding at once.
- **Off-chip**, fast devices are attached by **serial point-to-point links**. PCI Express sends data over **lanes**, each a pair of differential wire pairs (one per direction), with the clock embedded in the data. PCIe 5.0 runs at $32$ gigatransfers per second per lane with $128\mathrm{b}/130\mathrm{b}$ encoding, giving $32\times 10^9\times (128/130)/8 \approx 3.94\,\mathrm{GB/s}$ per lane per direction; a 16-lane graphics slot thus carries about $63\,\mathrm{GB/s}$ each way. As of 2026, PCIe 5.0 is standard in desktop and server platforms, PCIe 6.0 ($64\,\mathrm{GT/s}$, with PAM4 signalling) is entering servers, and the PCIe 7.0 specification ($128\,\mathrm{GT/s}$) has been published.
- **Slower peripherals** use simple serial buses — USB, SPI, I²C, UART — often connected through a bridge to the on-chip interconnect.

## Memory-mapped I/O

To control a device, the processor must be able to address it. Some ISAs, including x86, have separate I/O instructions (`in`, `out`) with a separate address space. RISC-V and Arm use **memory-mapped I/O** exclusively: each device's registers occupy a range of physical addresses, and ordinary loads and stores to those addresses read and write the registers. The address decoder of the interconnect routes the access to the device instead of to memory.

::: definition Device registers {#def-devregs}
A device presents a small set of **registers** at fixed addresses (its **register map**). Typically there are **control** registers, written by the processor to configure the device or start an operation; **status** registers, read by the processor to learn the device's state (busy, data ready, error); and **data** registers, through which bytes or words are transferred. Reading or writing a device register may have **side effects** — reading a receive-data register removes the byte from the device's buffer; writing a transmit register starts a transmission.
:::

Because device accesses have side effects, they must not be treated like ordinary memory. The hardware marks device address ranges as **uncacheable** (a cached copy of a status register would never change) and **strongly ordered** (two writes to a device must reach it in program order, and must not be merged or speculatively executed). On the software side, C code accesses device registers through `volatile` pointers so that the compiler neither caches the value in a register nor removes "redundant" accesses, and inserts **fence** instructions where ordering between device and memory accesses matters.

::: example Writing to a UART {#ex-uart}
A 16550-compatible UART (serial port) sits at physical address `0x10000000`, as in the RISC-V `virt` platform used by the QEMU emulator. Its transmit-holding register (THR) is at offset $0$, and its line-status register (LSR) at offset $5$; bit 5 of the LSR is $1$ when the THR is empty and can accept a new byte. Write a RISC-V routine that sends the byte in `a0`.
::: solution
The routine must wait until the transmitter is ready, then store the byte:

```
putc:   li   t0, 0x10000000     # UART base address
wait:   lbu  t1, 5(t0)          # read LSR (device register: uncached)
        andi t1, t1, 0x20       # isolate bit 5, THR empty
        beqz t1, wait           # not ready: try again
        sb   a0, 0(t0)          # write the byte to THR: starts transmission
        ret
```

The load in the loop is repeated even though the program never writes the LSR — which is exactly why the address must be uncacheable and, in C, accessed through a `volatile` pointer. At $115\,200$ baud, a byte (with start and stop bits, $10$ bits) takes $87\,\mathrm{\mu s}$ to send; a processor at $1\,\mathrm{GHz}$ can execute the four-instruction loop tens of thousands of times while it waits.
:::
:::

## Polling

The routine above is an example of **polling** (also called programmed I/O with busy waiting): the processor repeatedly reads a status register until the device is ready. Polling is simple, has the lowest possible latency when the processor is waiting anyway, and needs no special hardware. Its disadvantage is that it wastes processor time — either spinning in a loop, or, if polls are scheduled periodically, checking devices that have nothing to report.

::: proposition Processor time spent on I/O {#prop-iocost}
Let the processor run at clock frequency $f$. Then the fraction of processor time spent on I/O is

1. for **polling** at rate $r_p$ polls per second, each costing $c_p$ cycles: $\;\phi = r_p c_p/f$;
2. for **interrupt-driven** I/O with $r_e$ events per second, each costing $c_i$ cycles of interrupt entry, handling and return: $\;\phi = r_e c_i/f$;
3. for **DMA** transferring data at $R$ bytes per second in blocks of $B$ bytes, each block costing $c_d$ cycles to set up and complete: $\;\phi = (R/B)\,c_d/f$.
:::

::: proof
In each case the processor spends a fixed number of cycles per occurrence of an event (a poll, an interrupt, a block), and the number of occurrences per second is the rate given. Cycles spent per second divided by cycles available per second, $f$, is the fraction of time. (This ignores secondary effects such as cache pollution by the handler and, for DMA, memory-bandwidth contention, which raise the true cost.)
:::

For polling to lose no data, $r_p$ must be at least the rate at which the device can produce data (or the rate at which its buffer fills).

::: example Polling a mouse and a drive {#ex-polling}
A processor runs at $3\,\mathrm{GHz}$, and one poll (call, read status, test, return) costs $400$ cycles. (a) A mouse must be polled $30$ times per second. (b) A storage device delivers $200\,\mathrm{MB/s}$ in $16$-byte units, each of which must be read before the next arrives. What fraction of the processor does polling use in each case?
::: solution
(a) $\phi = 30\times 400/(3\times 10^9) = 4\times 10^{-6}$: negligible.

(b) The device produces $200\times 10^6/16 = 1.25\times 10^7$ units per second, so the processor must poll at least that often: $\phi = 1.25\times 10^7 \times 400/(3\times 10^9) = 1.67$. The processor would need $167\,\%$ of its time — it cannot keep up at all. Fast devices need a different mechanism for moving data (DMA) and, unless they are very regular, a different way of signalling (interrupts).
:::
:::

## Interrupts and exceptions

An **interrupt** lets a device tell the processor that it needs attention. The device asserts an interrupt request line; at the next suitable instruction boundary, the processor stops the running program, saves enough state to resume it, and starts an **interrupt handler**. When the handler finishes, the original program continues as if nothing had happened. The processor spends time on the device only when there is something to do.

The same mechanism handles **exceptions** caused by the running program itself, so the two are usually described together. RISC-V uses the word **trap** for either.

::: definition Exceptions and interrupts {#def-trap}
An **exception** is a synchronous event caused by the execution of an instruction: an illegal instruction, a misaligned or faulting memory access (such as a page fault), a breakpoint, or an environment call (`ecall`) by which a program requests an operating-system service. An **interrupt** is an asynchronous event caused by something outside the instruction stream: a device, a timer, or another processor. A trap is **precise** if all instructions before the trapping point have completed and no instruction after it has changed the architectural state.
:::

### The RISC-V trap mechanism

RISC-V defines privilege levels — machine mode (M), the most privileged, supervisor mode (S) for operating-system kernels and user mode (U) — and a set of **control and status registers** (CSRs) for each, read and written by the `csrr`, `csrw` and related instructions. For machine mode the important ones are:

| CSR | contents |
|---|---|
| `mtvec` | address of the trap handler (and a mode bit for vectored interrupts) |
| `mepc` | PC of the instruction that trapped, or that was interrupted |
| `mcause` | the cause: top bit $1$ for an interrupt, $0$ for an exception, plus a cause code |
| `mtval` | extra information, such as the faulting address |
| `mstatus` | global state, including the interrupt-enable bit `MIE` and the previous enable `MPIE` |
| `mie`, `mip` | enable and pending bits for each interrupt source (software, timer, external) |

::: algorithm Taking and returning from a trap {#alg-trap}
When a trap is taken in machine mode, the hardware, in a single step:

1. writes the PC of the interrupted or faulting instruction to `mepc`, the cause to `mcause` and any extra information to `mtval`;
2. copies `MIE` to `MPIE` and clears `MIE`, disabling further interrupts, and records the previous privilege level;
3. sets the PC to `mtvec` (in vectored mode, to `mtvec` $+ 4\times$ cause for interrupts).

The handler, in software:

4. saves the registers it will use (on a dedicated stack, often found through the `mscratch` CSR);
5. reads `mcause` to find the source, services the device (reading its status and data registers, which also removes the request) or handles the exception;
6. restores the registers; for an exception that must not be re-executed, such as `ecall`, adds $4$ to `mepc`;
7. executes `mret`, which restores `MIE` from `MPIE` and the privilege level, and jumps to `mepc`.
:::

In the pipeline of [[computer-architecture/pipelining]], an interrupt is taken by choosing one instruction — say the one in MEM — letting everything older complete, flushing everything younger, and saving that instruction's PC in `mepc`. Exceptions are recorded with the instruction that caused them and acted on when it reaches the commit point, so that an exception of an instruction that was itself on a mispredicted path is never taken. The **interrupt latency** — the time from the request to the first instruction of the handler — is the time to reach an instruction boundary and refill the pipeline, plus any time during which interrupts are disabled; in a microcontroller it is a few tens of cycles, in a large out-of-order core a few hundred.

::: example Interrupt overhead {#ex-intcost}
A network interface on a $3\,\mathrm{GHz}$ processor receives $10^6$ packets per second, and each interrupt costs $1000$ cycles (entry, handler, return, and the cache and pipeline disturbance). (a) What fraction of the processor do the interrupts consume? (b) The interface is configured to **coalesce** interrupts, raising one only after $16$ packets have arrived or $50\,\mathrm{\mu s}$ have passed, and each interrupt then costs $1000 + 100k$ cycles for $k$ packets. Find the fraction at full load, and the worst added latency.
::: solution
(a) By [[#prop-iocost]], $\phi = 10^6\times 1000/(3\times 10^9) = 0.333$: a third of the processor.

(b) At $10^6$ packets per second, $16$ packets arrive every $16\,\mathrm{\mu s}$, well within $50\,\mathrm{\mu s}$, so there are $62\,500$ interrupts per second, each costing $1000 + 1600 = 2600$ cycles: $\phi = 62\,500\times 2600/(3\times 10^9) = 0.054$, about $5\,\%$. The price is latency: the first packet of a group waits up to $15\,\mathrm{\mu s}$ for the rest at full load, and up to $50\,\mathrm{\mu s}$ when traffic is light. High-speed network drivers go further and switch to polling when traffic is heavy and back to interrupts when it is light (the Linux NAPI scheme).
:::
:::

::: widget plot
f: x*ci/(F*1e9); rp*cp/(F*1e9)
x: 0, 2000000
y: 0, 1
sliders: ci=1000:100:5000:100; rp=1000000:0:5000000:100000; cp=200:50:1000:10; F=3:1:5:0.5
labels: \text{interrupts}; \text{polling}
caption: Fraction of the processor spent on a device against its event rate $r$ (events per second, horizontal axis), for interrupts costing $c_i$ cycles each and for periodic polling at rate $r_p$ with $c_p$ cycles per poll, on an $F$-GHz processor. Polling costs the same whatever the traffic; interrupts cost in proportion to it. Find the crossover: below it interrupts are cheaper, above it polling is. That is why drivers for very busy devices poll.
:::

### Priorities and interrupt controllers

A system has many interrupt sources, and some are more urgent than others. An **interrupt controller** collects the request lines, applies per-source enables and priorities, and presents the processor with the highest-priority pending request. In RISC-V systems, the **core-local interruptor** (CLINT, or its successor ACLINT) provides the timer and software interrupts of each core, and the **platform-level interrupt controller** (PLIC) handles external device interrupts with programmable priorities; the newer Advanced Interrupt Architecture (AIA) adds message-signalled interrupts. A handler that re-enables interrupts early allows **nesting**: a higher-priority interrupt may preempt a lower-priority handler, which keeps the latency of urgent sources low at the cost of a deeper stack and more complex software.

::: warning Shared data between a handler and a program
An interrupt can occur between any two instructions. If the main program reads a 64-bit counter as two 32-bit loads and the timer interrupt handler increments it in between, the program sees a value that never existed. Data shared between a handler and the main program must be accessed atomically — by disabling interrupts briefly around the access, by using atomic instructions, or by designing the data so that a single aligned word carries the information. In C, such variables must also be `volatile`, or the compiler may keep a stale copy in a register.
:::

::: quiz
Which of these events is an exception rather than an interrupt?
- [ ] a timer reaching its compare value
- [ ] a network interface signalling that a packet has arrived
- [x] a load from an address whose page is not in memory
- [ ] another core sending an inter-processor message
::: solution
The page fault is caused synchronously by the load instruction itself, and the load must be re-executed after the operating system has brought the page in: an exception. The others are asynchronous events from outside the instruction stream: interrupts.
:::
:::

## Direct memory access

Interrupts solve the signalling problem, but if the processor still moves every byte with its own loads and stores, a fast device consumes most of its time. **Direct memory access** (DMA) hands the data movement to a separate engine.

::: definition Direct memory access {#def-dma}
A **DMA controller** is a bus master that transfers blocks of data between a device and memory without processor involvement. The processor programs it with a source address, a destination address, a length and a direction (or, in modern devices, a list of such **descriptors** in memory), starts it, and continues with other work. The controller performs the transfer, competing with the processor for the interconnect and memory, and raises an interrupt when the block is complete.
:::

In modern systems the DMA engine is usually built into the device itself — a network interface, an NVMe solid-state drive or a GPU **bus-masters** its own transfers across PCI Express — and the device and its driver communicate through **rings** of descriptors in memory: the driver writes descriptors pointing to buffers and advances a tail pointer in a device register; the device fills or drains the buffers, writes completion records, advances its head pointer and interrupts (or is polled). Each operation then costs the processor only the descriptor setup and the completion handling, independent of the block size.

::: example Choosing a DMA block size {#ex-dma}
A storage device delivers $2\,\mathrm{GB/s}$ to a $3\,\mathrm{GHz}$ processor by DMA. Setting up a transfer and handling its completion costs $2000$ cycles. (a) What fraction of the processor is used with $4\,\mathrm{KiB}$ blocks? (b) What is the smallest power-of-two block size that keeps the overhead below $1\,\%$?
::: solution
(a) Blocks per second: $2\times 10^9/4096 = 4.88\times 10^5$. By [[#prop-iocost]], $\phi = 4.88\times 10^5\times 2000/(3\times 10^9) = 0.326$: a third of the processor, even though no data passes through it.

(b) We need $(R/B)\,c_d/f < 0.01$, that is $B > R c_d/(0.01 f) = 2\times 10^9\times 2000/(3\times 10^7) = 1.33\times 10^5$ bytes. The smallest power of two above this is $2^{18} = 256\,\mathrm{KiB}$, giving $\phi = 0.51\,\%$ ($128\,\mathrm{KiB}$ gives $1.02\,\%$, just too much). Large transfers amortise the per-operation cost — which is why storage systems use large I/O sizes and why fast devices queue many requests per interrupt.
:::
:::

::: widget plot
f: R*1e9/2^x*c/(F*1e9); 0.01
x: 9, 20
y: 0, 0.5
sliders: R=2:0.5:16:0.5; c=2000:500:10000:100; F=3:1:5:0.5
labels: \text{DMA overhead }\phi; 1\,\%
caption: Processor time spent on DMA set-up and completion against the block size, with $x = \log_2 B$ on the horizontal axis ($x = 12$ is $4\,\mathrm{KiB}$, $x = 18$ is $256\,\mathrm{KiB}$), for a data rate of $R$ GB/s, $c$ cycles per block and an $F$-GHz processor. Each doubling of the block halves the overhead. Raise the data rate to that of a PCIe 5.0 drive ($14\,\mathrm{GB/s}$) and see how large the blocks must be — or how cheap the per-block software — to stay under the $1\,\%$ line.
:::

### DMA and caches

DMA introduces a consistency problem. The processor's caches may hold copies of memory that a device writes by DMA (the copies become stale), or dirty data that the device should read but that has not yet been written back (the device reads stale memory). There are two solutions:

- **Software-managed coherence**: before a device reads a buffer, the driver **cleans** (writes back) the buffer's lines from the cache; before the processor reads a buffer the device has written, the driver **invalidates** the lines. Many embedded processors work this way.
- **Hardware I/O coherence**: DMA accesses are routed through the cache-coherence mechanism of [[computer-architecture/parallel-architectures]], so devices see and update cached data automatically. Server and desktop processors do this for PCI Express traffic.

A further piece of hardware, the **IOMMU**, translates the addresses a device uses, just as the MMU translates processor addresses ([[computer-architecture/memory-hierarchy]]). It restricts each device to the buffers it has been given, protecting the system from faulty or malicious devices, and lets virtual machines own devices directly.

::: quiz
A driver prepares a buffer in memory and starts a DMA transfer that sends it to a network interface. The data cache is write-back and DMA is not coherent. What must the driver do first?
- [ ] invalidate the buffer's cache lines
- [x] clean (write back) the buffer's cache lines
- [ ] disable interrupts
- [ ] nothing, because DMA reads memory directly
::: solution
The data the driver wrote may still sit in dirty cache lines; memory holds old data. Cleaning writes the lines back so the device reads the right bytes. Invalidating would *discard* the new data. (For receive buffers, the order is the other way: invalidate before reading what the device wrote.)
:::
:::

## Design and practice

Choosing between the mechanisms is an engineering decision based on rate, regularity and latency:

| situation | best mechanism |
|---|---|
| rare events, low data rate (buttons, keyboards, slow sensors) | interrupts, or periodic polling from a timer tick |
| processor would wait anyway, short delay expected | polling (busy wait) |
| regular, high event rate (busy network, fast storage) | polling of DMA completion rings, or coalesced interrupts |
| bulk data at any rate | DMA |
| hard deadline of a few microseconds | high-priority interrupt with a short handler, or dedicated hardware (a timer peripheral, a small co-processor) |

In real-time systems ([[embedded-systems/real-time-systems]]) the worst-case interrupt latency, not the average, is what matters; it is bounded by the longest stretch during which interrupts are disabled and by the time spent in higher-priority handlers.

::: application I/O in a modern system
As of 2026, an NVMe solid-state drive on four lanes of PCIe 5.0 reads at up to about $14\,\mathrm{GB/s}$ and sustains well over a million 4 KiB operations per second. It exposes up to thousands of submission and completion queues, one or more per core, each a ring of descriptors in host memory; each core submits requests to its own queue and receives its own message-signalled interrupts, so the cores never contend for a lock. At these rates the per-operation software cost dominates, and high-performance storage and networking stacks (such as SPDK and DPDK, or Linux `io_uring` with polling) bypass interrupts entirely and poll completion rings from dedicated cores — the crossover of the figure above, applied in practice.
:::

::: history
Early computers performed I/O under direct program control. The UNIVAC 1103 of 1953 is usually credited with the first interrupt facility, and the IBM 709 of 1958 introduced **data channels**, small processors that executed channel programs to move data between memory and tape or disk while the main processor computed — the ancestor of DMA. Digital Equipment's PDP-11 (1970) made memory-mapped device registers on a single bus, the Unibus, the standard model for minicomputers and later microprocessors. Intel's PCI bus (1992) standardised the connection of expansion cards to personal computers, and PCI Express (first specification 2003) replaced its parallel bus with serial point-to-point lanes, the arrangement still used today.
:::

## Where this leads

Interrupts and exceptions are where hardware hands over to the operating system: system calls, page faults, the timer interrupt that drives scheduling, and the context switch that saves one program's registers and restores another's are the subject of [Processes and CPU scheduling](/learn/cs/lesson.php?c=operating-systems&l=processes-scheduling). [[embedded-systems/timers-interrupts]] applies the mechanisms on microcontrollers, where interrupt latency and handler design are daily concerns, and [[embedded-systems/serial-communication]] covers the serial buses at the bottom of the interconnect hierarchy. The DMA coherence problem is a special case of the cache coherence of [[computer-architecture/parallel-architectures]], and the cost formulas of [[#prop-iocost]] feed into the system-level performance analysis of [[computer-architecture/performance]].

::: summary
- Devices connect through buses ([[#def-bus]]) and, at high speed, serial point-to-point links such as PCI Express; burst transfers amortise the address overhead.
- In RISC-V, devices are memory-mapped ([[#def-devregs]]): ordinary loads and stores access their registers, which must be uncacheable, strongly ordered and accessed through `volatile` pointers.
- Polling is simple and fast to respond but costs processor time at the polling rate; interrupts cost time in proportion to the event rate ([[#prop-iocost]]).
- A trap ([[#def-trap]]) saves the PC in `mepc` and the cause in `mcause`, disables interrupts and jumps to `mtvec`; `mret` returns. Pipelines take traps precisely.
- Interrupt controllers prioritise sources; coalescing and adaptive polling reduce the cost of very frequent events.
- DMA ([[#def-dma]]) moves blocks without the processor; its overhead per block is fixed, so large blocks and descriptor rings make it efficient.
- DMA requires cache coherence, provided by explicit cache maintenance or by coherent I/O hardware; an IOMMU confines devices to their buffers.
:::

## Exercises

::: exercise Polling a sensor {level=1 check="2e-5"}
A sensor is polled $100$ times per second, each poll costing $200$ cycles, on a $1\,\mathrm{GHz}$ processor. What fraction of the processor time does this take?
::: solution
$\phi = 100\times 200/10^9 = 2\times 10^{-5}$, or $0.002\,\%$.
:::
:::

::: exercise PCI Express bandwidth {level=1 check="4*32e9*(128/130)/8"}
What is the bandwidth in bytes per second, per direction, of a 4-lane PCIe 5.0 link ($32\,\mathrm{GT/s}$ per lane, $128\mathrm{b}/130\mathrm{b}$ encoding)?
::: solution
Each lane carries $32\times 10^9$ bits per second, of which $128/130$ are data: $3.94\times 10^9\,\mathrm{B/s}$. Four lanes: $1.575\times 10^{10}\,\mathrm{B/s} \approx 15.75\,\mathrm{GB/s}$ per direction (before packet-protocol overheads, which reduce the usable rate by several percent).
:::
:::

::: exercise Uncached device registers {level=1}
Explain what would go wrong with the `putc` routine of [[#ex-uart]] if the UART's address range were marked cacheable in a write-back data cache.
::: solution
The first `lbu` of the status register would bring a line containing the LSR into the cache; later loads would hit in the cache and see the same stale value for ever, so the loop would never end (or never wait). The `sb` to the THR would be written into the cache line and reach the device only when the line was evicted, at an unpredictable time, and possibly together with stale values of neighbouring registers. Device registers have side effects and change independently of the processor, so they must bypass the cache.
:::
:::

::: exercise Keyboard versus network {level=2}
On a $2\,\mathrm{GHz}$ processor an interrupt costs $1500$ cycles. Compare the interrupt load of a keyboard producing at most $20$ characters per second with that of a network interface producing $5\times 10^5$ packets per second. What would polling the keyboard $100$ times per second at $300$ cycles per poll cost?
::: solution
Keyboard, interrupts: $20\times 1500/(2\times 10^9) = 1.5\times 10^{-5}$. Network, interrupts: $5\times 10^5\times 1500/(2\times 10^9) = 0.375$, over a third of the processor. Keyboard, polling: $100\times 300/(2\times 10^9) = 1.5\times 10^{-5}$ — the same as interrupts here, but polling costs it even when nobody types, while interrupts cost nothing then. For the network interface, coalescing or polling is needed.
:::
:::

::: exercise DMA overhead {level=2 check="8e8/65536*3000/2.5e9"}
A device transfers $8\times 10^8$ bytes per second by DMA in blocks of $64\,\mathrm{KiB}$ ($65\,536$ bytes); each block costs $3000$ cycles of processor time. What fraction of a $2.5\,\mathrm{GHz}$ processor does this use? (Give a fraction, not a percentage.)
::: solution
Blocks per second: $8\times 10^8/65\,536 = 12\,207$. By [[#prop-iocost]], $\phi = 12\,207\times 3000/(2.5\times 10^9) = 0.0146$, about $1.5\,\%$. With $4\,\mathrm{KiB}$ blocks it would be sixteen times as much, $23\,\%$.
:::
:::

::: exercise Burst length {level=2}
A $64$-bit synchronous bus at $200\,\mathrm{MHz}$ needs one address cycle and one turnaround cycle per transaction, plus one cycle per data word. What burst length (in words) is needed to reach $90\,\%$ of the peak bandwidth? What is the bandwidth then?
::: solution
With $n$ data words the efficiency is $n/(n + 2)$. $n/(n+2) \ge 0.9 \Rightarrow n \ge 18$. The peak is $8\,\mathrm{B}\times 200\,\mathrm{MHz} = 1.6\,\mathrm{GB/s}$; with $n = 18$ the bandwidth is $0.9\times 1.6 = 1.44\,\mathrm{GB/s}$. Bursts of $16$ words ($128$ bytes) give $16/18 = 88.9\,\%$, $1.42\,\mathrm{GB/s}$.
:::
:::

::: exercise Reading from the UART {level=2}
Bit 0 of the 16550 LSR is $1$ when a received byte is waiting in the receive buffer register (RBR, offset $0$, read-only). Write a RISC-V routine `getc` that waits for a byte and returns it in `a0`. Why can THR and RBR share offset $0$?
::: solution
```
getc:   li   t0, 0x10000000
wait:   lbu  t1, 5(t0)          # LSR
        andi t1, t1, 1          # data ready?
        beqz t1, wait
        lbu  a0, 0(t0)          # read RBR: removes the byte from the FIFO
        ret
```

THR is write-only and RBR is read-only, so the device decodes a store to offset $0$ as a write to THR and a load as a read of RBR. This is possible only because device registers are not memory: reading back what was written is not expected.
:::
:::

::: exercise Choosing a coalescing threshold {level=3}
A network interface receives packets at up to $2\times 10^6$ per second on a $3\,\mathrm{GHz}$ processor. Each interrupt costs $1200$ cycles plus $150$ cycles per packet handled. (a) Find the smallest coalescing count $k$ (packets per interrupt) that keeps the total processor load below $15\,\%$ at full rate. (b) What is the extra latency for the first packet of a batch at full rate? (c) Why is a timeout needed in addition to the count?
::: solution
(a) Interrupts per second: $2\times 10^6/k$. Load: $\phi = (2\times 10^6/k)(1200 + 150k)/(3\times 10^9) = 0.8/k + 0.1$. We need $0.8/k + 0.1 < 0.15$, i.e. $k > 16$: $k = 17$ gives $\phi = 0.147$. (The per-packet cost alone is $10\,\%$, which no coalescing can remove.)

(b) At $2\times 10^6$ packets per second, packets arrive every $0.5\,\mathrm{\mu s}$; the first of $17$ waits for $16$ more, $8\,\mathrm{\mu s}$.

(c) At low traffic the count may take a long time — or for ever — to be reached, so a lone packet would wait indefinitely. A timeout (say $20$–$50\,\mathrm{\mu s}$) bounds the latency when traffic is light, at which point the interrupt load is low anyway.
:::
:::

::: exercise The polling–interrupt crossover {level=3}
A device generates events at a rate $r$. With interrupts each event costs $c_i$ cycles. With polling the processor polls at a fixed rate $r_p \ge r$ (fast enough for the peak rate), each poll costing $c_p$ cycles, plus $c_h$ cycles to handle each event it finds. Derive the event rate above which polling is cheaper, and evaluate it for $c_i = 2000$, $c_p = 100$, $c_h = 500$ and $r_p = 10^6$ polls per second.
::: solution
Interrupt load: $r c_i$ cycles per second. Polling load: $r_p c_p + r c_h$. Polling is cheaper when $r_p c_p + r c_h < r c_i$, i.e.

$$
r > r^\ast = \frac{r_p c_p}{c_i - c_h},
$$

provided $c_i > c_h$ (an interrupt costs more than handling the event inside a poll, which it always does because of entry, exit and pipeline disruption). For the numbers given, $r^\ast = 10^6\times 100/(2000 - 500) = 6.7\times 10^4$ events per second. Above about $67\,000$ events per second polling is cheaper; below it interrupts are. Adaptive schemes switch between the two around this rate.
:::
:::

::: exercise A non-coherent receive path {level=3}
On a processor with a write-back data cache and non-coherent DMA, a driver receives a packet into a buffer, processes it and reuses the buffer for the next packet. List the cache maintenance operations needed and where they go, and explain what goes wrong if the buffer shares a cache line with an unrelated variable.
::: hint
Think about dirty lines that might be written back *while* the device is writing the buffer.
:::
::: solution
1. Before handing the buffer to the device: **invalidate** (or clean and invalidate) its lines, so that no dirty line can later be evicted on top of the data the device writes, and no clean stale copy remains.
2. Give the buffer to the device; do not touch it until the completion.
3. After the completion interrupt, **invalidate** the lines again (a speculative or prefetching processor may have brought stale lines in meanwhile), then read the packet.
4. Before reusing the buffer, repeat from step 1.

If the buffer shares a cache line with an unrelated variable, the processor may write that variable during the transfer, making the line dirty. When the line is later evicted, its stale copy of the buffer's bytes overwrites what the device wrote; and invalidating the line in step 3 throws away the update to the variable. The cure is to align DMA buffers to cache-line boundaries and pad them to whole lines — a rule that every driver framework for non-coherent systems enforces.
:::
:::
