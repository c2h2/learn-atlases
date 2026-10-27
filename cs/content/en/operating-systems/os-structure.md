Run a program on a laptop and dozens of others are already running: a browser with forty tabs, a music player, a backup daemon, the window system, a terminal. Each believes it has the processor and the memory to itself. None of them can read the others' memory, crash the machine by writing to the disk controller, or keep the processor for ever by entering an infinite loop. Yet they all share one processor (or a few cores), one memory and one disk. Something is arbitrating — and that something cannot simply be another program, because a program that wanted to cheat could ignore it.

The arbiter is the **operating system**, and the key to how it works is a feature of the hardware: the processor can run in two modes, and only one of them can touch the machinery that matters. This chapter explains that foundation. We start with what an operating system is for; then we see exactly which hardware mechanisms make protection possible and prove that each is necessary; we look at the system-call boundary through which programs ask for service and what it costs; we compare the ways a kernel can be organised — monolithic, layered, microkernel and others — and the trade-offs between them; and we follow a machine from power-on to the first user process.

[[computer-systems/exceptions-processes]] has already introduced exceptions, the four exception classes, system calls at the register level, processes, `fork`, `execve` and signals. We use all of that here and do not repeat it; read that chapter first if any of these words is unfamiliar.

All programs in this course were compiled with GCC 15.2 on x86-64 Linux (kernel 7.0, glibc 2.43, an Intel Xeon E5-2696 v3), as `gcc -std=c17 -Wall -Wextra -O2` unless stated otherwise. Timings are **observations** on that machine; process IDs and addresses change from run to run.

## What an operating system does

It helps to have three pictures of an operating system in mind at once.

- **The referee.** Several programs, written by different people who do not trust one another, share one machine. The operating system decides who gets what — which program runs on which core, how much memory each may use, who may open which file — and enforces the decisions, so that one faulty or malicious program cannot harm the others.
- **The illusionist.** Each program is given a simplified, idealised machine: a processor of its own (the process abstraction), a large private memory (virtual memory), and named, persistent, byte-addressable files instead of numbered disk sectors. The physical resources are **virtualised** — multiplexed in time (the processor) or in space (memory, disk) so that each user sees a private copy.
- **The glue.** It provides common services that every program needs: a file system, network protocols, a uniform interface to thousands of different devices, a way to start other programs and to communicate with them.

These three roles organise the rest of the course under the headings that Remzi and Andrea Arpaci-Dusseau's textbook made standard: **virtualisation** (processes, scheduling, address spaces, paging), **concurrency** (threads, locks, condition variables, semaphores, deadlock) and **persistence** (devices, disks, file systems, crash consistency), ending with the virtualisation of whole machines.

::: definition Operating system and kernel {#def-os}
An **operating system** is the software that manages a computer's hardware resources and provides common services to programs. Its core, the **kernel**, is the part that runs with full hardware privilege: it is entered only through exceptions (system calls, interrupts and faults), and it alone may execute privileged instructions and access all of memory and every device. The rest of the operating system — the C library, the shell, system daemons, the window system — runs as ordinary **user-mode** programs.
:::

The distinction matters because "operating system" is used loosely. A Linux distribution includes thousands of packages, but the Linux *kernel* is one program, loaded at boot, that stays resident for as long as the machine runs. When this course says "the operating system does X" without qualification, it means the kernel.

A recurring design principle is the separation of **mechanism** and **policy**. A mechanism is *how* something can be done — a timer interrupt that lets the kernel take the processor back, a page table that maps addresses. A policy is *which* thing to do — which process runs next, which page to evict. Good kernels make mechanisms general and keep policies replaceable: Linux, for example, offers several scheduling classes and several I/O schedulers using the same underlying mechanisms. We meet this division in every chapter.

## Protection: what the hardware must provide

Suppose an operating system were just a library of useful routines, linked into each program, as on early personal computers running MS-DOS. Then nothing would stop a program from overwriting the library, reprogramming the disk controller, or never giving the processor back. Protection cannot be built from software alone, because whatever checks the software performs, the program being checked can jump around them. It needs help from the processor.

::: definition Dual-mode operation {#def-dual-mode}
A processor supports **dual-mode operation** if it has (at least) two privilege levels, **kernel mode** and **user mode**, recorded in a mode bit of the processor state, such that:

1. a set of **privileged instructions** — those that change the mode, the memory mapping, the exception table or the timer, perform I/O or halt the processor — can be executed only in kernel mode; attempting one in user mode raises an exception;
2. the only way to enter kernel mode from user mode is an exception (trap, fault or interrupt), which transfers control to a handler at an address the kernel chose in advance;
3. returning from an exception (`iret`, `sysret` on x86-64) may lower the privilege level back to user mode.
:::

On x86-64 the privilege level is the **current privilege level** (CPL), two bits with four **rings** 0 to 3; Linux and Windows use only ring 0 (kernel) and ring 3 (user). ARMv8 has exception levels EL0 (user) to EL3 (secure monitor), and RISC-V has user, supervisor and machine modes. Two levels are enough for everything in this chapter; the extra levels are used for hypervisors and firmware ([[operating-systems/virtualisation]]).

Here is what happens when an ordinary program tries a privileged instruction. `hlt` stops the processor until the next interrupt — harmless for a kernel's idle loop, disastrous if any program could do it.

```c
#include <stdio.h>

int main(void) {
    printf("about to execute hlt in user mode\n");
    fflush(stdout);
    __asm__ volatile ("hlt");     /* privileged: allowed only in kernel mode (ring 0) */
    printf("never printed\n");
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o priv priv.c
$ ./priv; echo "exit status $?"
about to execute hlt in user mode
Segmentation fault         ./priv
exit status 139
$ strace -e trace=none ./priv
about to execute hlt in user mode
--- SIGSEGV {si_signo=SIGSEGV, si_code=SI_KERNEL, si_addr=NULL} ---
+++ killed by SIGSEGV +++
```

The processor raised a **general-protection fault** (exception 13 on x86); the kernel's handler, finding that a user program had caused it, sent the program `SIGSEGV` — status $139 = 128 + 11$ — and the machine went on running. `si_code=SI_KERNEL` records that the signal came from the kernel's fault handler rather than from another process.

Dual mode protects the privileged *instructions*. Two further mechanisms protect the other two resources a program could monopolise.

- **Memory protection.** In user mode every address is translated by the **memory management unit** (MMU) through page tables that only the kernel can change ([[operating-systems/address-spaces-paging]]). A user program can name only the pages the kernel has mapped for it, with the permissions the kernel chose; the kernel's own memory is mapped without user access.
- **CPU protection.** A hardware **timer** raises an interrupt periodically or at a programmed deadline. Since interrupts enter the kernel, the kernel regains control at least that often, however long a program loops. Only kernel mode may reprogram the timer or disable interrupts (`cli` is privileged when the I/O privilege level is below the CPL, which is how every modern kernel configures it).

::: proposition The three requirements of protection {#prop-protection}
Consider a machine that runs untrusted user programs together with a kernel. Suppose each of the following could be done by a user program: (a) entering kernel mode other than through a kernel-chosen exception entry point; (b) changing the memory mapping or accessing memory outside its own mapped pages; (c) disabling the timer interrupt or reprogramming the timer. Then, in each case, a user program can prevent the kernel from enforcing any policy. Conversely, if none of (a)–(c) is possible and the kernel's exception handlers are correct, a user program can affect other programs only through the services the kernel offers.
:::

::: proof
(a) If a program can enter kernel mode at an address of its choosing, it runs its own code with full privilege: it can execute every privileged instruction, so it controls everything the kernel controls. (b) If a program can change the mapping, it can map the kernel's code or the exception table and overwrite them with its own instructions; the next exception then runs the program's code in kernel mode, which is case (a). If it can read or write other memory directly, it can read or corrupt other programs' data without the kernel's involvement. (c) If a program can disable the timer, then once it is running and makes no system call and causes no fault, no exception ever occurs; since the kernel runs only in response to exceptions, it never runs again, and the program keeps the processor for ever.

For the converse, observe that the kernel executes only in response to exceptions, and while a user program runs it can execute only unprivileged instructions on its own mapped memory (by (a) and (b) and the definition of privileged instructions). Each such instruction affects only that program's registers and memory. The program can affect anything else only by causing an exception, which runs a kernel handler, so other programs are affected only as those handlers allow. By (c), the timer interrupt arrives within one timer period whatever the program does, so the kernel's scheduling policy is enforced too. (Devices that access memory directly must also be restricted, by an IOMMU, for the argument to cover DMA; and processor bugs such as Meltdown, which leaked kernel memory through speculative execution, show that the hardware must implement these rules exactly — see [[security]].)
:::

::: quiz
Which of these x86-64 instructions or actions must be privileged for protection to hold?
- [x] Loading `%cr3`, the register holding the physical address of the top-level page table.
- [ ] Executing `syscall`.
- [x] Executing `cli` to disable interrupts.
- [x] Loading the address of the interrupt descriptor table with `lidt`.
- [ ] Reading the time-stamp counter with `rdtsc`.
::: solution
Loading `%cr3` changes the memory mapping (requirement (b)); `cli` disables the timer interrupt (requirement (c)); `lidt` chooses where exceptions go, so an unprivileged `lidt` would let a program enter kernel mode at an address of its choice (requirement (a)). `syscall` *must* be unprivileged — it is the very instruction user programs use to enter the kernel, at an entry point the kernel stored in a model-specific register. `rdtsc` only reads a counter; it is unprivileged by default (the kernel can make it fault, which some sandboxes do to make precise timing harder, but protection in the sense of [[#prop-protection]] does not depend on it).
:::
:::

## The system-call boundary

With protection in place, a user program is confined to its own memory and to unprivileged instructions. Everything else — reading a file, sending a packet, creating a process, even asking for more memory — is a request to the kernel, made with a system call. [[computer-systems/exceptions-processes]] showed the register convention: number in `%rax`, arguments in `%rdi`, `%rsi`, `%rdx`, `%r10`, `%r8`, `%r9`, then the `syscall` instruction. Seen from the operating-system side, the set of system calls is the kernel's entire interface to the world.

::: definition System-call interface {#def-syscall-interface}
The **system-call interface** of a kernel is the set of services it offers to user programs, each identified by a number and taking up to six word-sized arguments. Every system call is a trap to a single kernel entry point, which (1) saves the user registers, (2) checks that the number is valid and dispatches through the **system-call table**, (3) validates every argument — that pointers refer to user memory the caller may access, that descriptors are open, that the caller has permission — (4) performs the service, and (5) returns a result, a negative error code $-\mathit{errno}$ on failure.
:::

The C library wrappers hide this, but nothing requires them.

::: example A system call without the library {#ex-raw-syscall}
Write a program that calls `write` with the `syscall` instruction directly, once on standard output and once on a descriptor that is not open, and predict what each call returns.


```c
#include <stddef.h>

/* write(fd, buf, len) without the C library's wrapper */
static long raw_write(int fd, const void *buf, size_t len) {
    long ret;
    __asm__ volatile ("syscall"
                      : "=a"(ret)                       /* result in %rax */
                      : "a"(1L), "D"((long)fd), "S"(buf), "d"(len)
                      : "rcx", "r11", "memory");        /* syscall clobbers rcx, r11 */
    return ret;
}

int main(void) {
    long n = raw_write(1, "hello from a raw syscall\n", 25);
    long e = raw_write(99, "x", 1);                     /* bad descriptor */
    return (n == 25 && e == -9) ? 0 : 1;                /* -9 is -EBADF */
}
```

::: solution
GCC's inline assembly places the arguments in the registers of the convention; the program checks both results itself.

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o rawsys rawsys.c && ./rawsys; echo "status $?"
hello from a raw syscall
status 0
$ strace ./rawsys 2>&1 | tail -3
write(99, "x", 1)                       = -1 EBADF (Bad file descriptor)
exit_group(0)                           = ?
+++ exited with 0 +++
```

The constraint letters `a`, `D`, `S` and `d` name `%rax`, `%rdi`, `%rsi` and `%rdx`. The clobber list matters: the `syscall` instruction saves the user's return address in `%rcx` and its flags in `%r11`, so the compiler must not keep anything there. Without a C library, nothing converts $-9$ into $-1$ and `errno`; the raw kernel convention is visible.
:::
:::

### Why the kernel must distrust its arguments

Step (3) of [[#def-syscall-interface]] is where kernels are most often wrong. A pointer argument is an address chosen by an untrusted program. If the kernel simply dereferenced it, a program could pass the address of kernel memory and have the kernel read or overwrite it on the program's behalf — breaking [[#prop-protection]] from inside. Linux therefore copies data between user and kernel memory only through functions such as `copy_from_user` and `copy_to_user`, which check that the whole range lies in the user part of the address space and handle a page fault in the middle gracefully (returning `-EFAULT`, the "Bad address" error) instead of crashing the kernel. Since 2012 (SMEP) and 2014 (SMAP), x86 processors also have **SMEP** and **SMAP** (supervisor-mode execution and access prevention), which make any kernel access to user pages fault unless the kernel explicitly opens a window for it, so a missing check becomes a crash rather than a silent hole.

A subtler bug is the **double fetch**: the kernel reads a length from user memory, checks it, and later reads it again to use it. Another thread of the same program can change the value between the two reads, so the value used is not the value checked. The fix is to copy each argument into kernel memory exactly once and then work only on the copy. This is an instance of the general **time-of-check-to-time-of-use** (TOCTOU) problem that we meet again with files ([[operating-systems/file-systems]]) and treat systematically in [[security]].

### What a system call costs

A system call is far more expensive than a function call. The processor must switch privilege level and stack; the kernel saves registers, dispatches, validates; and on processors affected by Meltdown, the kernel also switches page tables on every entry and exit (**kernel page-table isolation**, the `pti` flag in `/proc/cpuinfo` on the test machine) and flushes or partitions processor state to defend against speculative-execution attacks. The following program measures it:

```c
#define _GNU_SOURCE                        /* for syscall() */
#include <stdio.h>
#include <sys/syscall.h>
#include <time.h>
#include <unistd.h>

static double now(void) {                 /* seconds, monotonic clock */
    struct timespec t;
    clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec + t.tv_nsec * 1e-9;
}

__attribute__((noinline)) static long f(long x) { __asm__ volatile(""); return x + 1; }

int main(void) {
    enum { N = 10000000 };
    struct timespec ts;
    long s = 0;
    double t0 = now();
    for (int i = 0; i < N; i++) s += f(i);                      /* ordinary call */
    double t1 = now();
    for (int i = 0; i < N; i++) s += syscall(SYS_getppid);      /* real trap */
    double t2 = now();
    for (int i = 0; i < N; i++) { clock_gettime(CLOCK_MONOTONIC, &ts); s += ts.tv_nsec & 1; }
    double t3 = now();
    printf("function call   %6.1f ns\n", (t1 - t0) / N * 1e9);
    printf("getppid syscall %6.1f ns\n", (t2 - t1) / N * 1e9);
    printf("clock_gettime   %6.1f ns\n", (t3 - t2) / N * 1e9);
    return s == 42;                        /* use s so the loops are not removed */
}
```

```console
$ ./cost
function call      1.8 ns
getppid syscall  478.0 ns
clock_gettime     18.5 ns
```

A trivial system call costs about 250 times a function call on this machine (an **observation**: on recent processors without the Meltdown workaround it is typically 50–150 ns). But `clock_gettime`, which is also listed in the manual as a system call, costs only 18 ns. The reason is the **vDSO** (virtual dynamic shared object): the kernel maps a small, read-only shared library into every process (it appears as `[vdso]` in `/proc/self/maps`), together with a page of data it keeps up to date (`[vvar]`), so that reading the clock is an ordinary function call reading ordinary memory. `strace` confirms that the clock never enters the kernel:

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <time.h>
#include <unistd.h>

int main(void) {
    struct timespec t;
    for (int i = 0; i < 1000; i++) clock_gettime(CLOCK_MONOTONIC, &t);
    printf("pid %d\n", (int)getpid());
    return 0;
}
```

```console
$ strace -c ./vdso 2>&1 | grep -E 'clock|getpid|write|total'
  3.24    0.000018          18         1           write
  0.54    0.000003           3         1           getpid
100.00    0.000556          15        35         1 total
```

A thousand calls to `clock_gettime`, none of them a system call. The vDSO is the extreme of a general strategy: *cross the boundary as rarely as possible*. Buffered I/O in the C library ([[computer-systems/system-io]]) makes one `write` per 4 KiB instead of one per character; `io_uring` (Linux, since 2019) lets a program place many I/O requests in a shared-memory ring and submit them all with one call, or with none, if a kernel thread polls the ring.

::: proposition Amortising the boundary {#prop-amortise}
Suppose each system call costs a fixed $c$ plus $d$ per item of work, and a program must process $N$ items. If it processes them $k$ per call, the total time is

$$
T(k) = \left\lceil \frac{N}{k} \right\rceil c + N d ,
$$ {#eq-amortise}

so the boundary overhead per item is at most $c/k + c/N$, and batching $k$ items per call reduces the overhead per item by a factor of almost $k$, until it is small compared with $d$.
:::

::: proof
Processing $N$ items $k$ at a time takes $\lceil N/k\rceil$ calls, each paying $c$ once; every item pays $d$ exactly once, whatever $k$ is. Dividing by $N$ and using $\lceil N/k \rceil < N/k + 1$ gives an overhead per item of less than $c/k + c/N$.
:::

::: widget plot
f: c/x + d
x: 1, 256
y: 0, 500
sliders: c=480:50:1000:10; d=2:0:20:1
labels: \text{time per item (ns)}
points: 1,482; 16,32; 64,9.5; 256,3.9
caption: Time per item, $c/k + d$, when $k$ items share one system call of fixed cost $c$ ns (here $480$ ns, the measured `getppid` cost) and each item costs $d$ ns of real work. Notice how quickly the curve flattens: by $k = 64$ the boundary costs less than $8$ ns per item, and beyond that only $d$ matters. Increase $d$ to model expensive items (a disk write) and see that batching then buys little, because the overhead was never the main cost.
:::

::: example Counting a program's system calls {#ex-strace-count}
An empty C program, `int main(void) { return 0; }`, compiled normally and with `-static`, is run under `strace`. How many system calls does each make, and where do they come from?
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -o nothing nothing.c
$ gcc -std=c17 -Wall -Wextra -O2 -static -o nothing-static nothing.c
$ strace -c ./nothing 2>&1 | tail -1
100.00    0.000000           0        30         1 total
$ strace ./nothing-static 2>&1 | grep -c '('
15
```
The dynamically linked program makes $30$ calls (one of them, `access("/etc/ld.so.preload")`, fails with `ENOENT`, the "1" in the errors column). Fourteen are the dynamic linker of [[computer-systems/linking-loading]] at work: it opens `/etc/ld.so.cache` and `libc.so.6`, reads the ELF header, `mmap`s the library's segments and `mprotect`s the relocated data read-only. The static program makes $15$: `execve`, the C library's start-up (`brk` to set up the heap, `arch_prctl` to set the thread-local-storage register `%fs`, `set_tid_address`, `set_robust_list` and `rseq` for threads, `prlimit64` to read the stack limit, `getrandom` for the stack-protector canary and pointer mangling, `readlinkat` of `/proc/self/exe`), a final `mprotect`, and `exit_group`. Our `main` makes none at all. Every program, however trivial, depends on a dozen kernel services before its first line runs.
:::
:::

## How kernels are organised

The Linux kernel source has more than 35 million lines (as of 2026), most of them device drivers. How should such a body of privileged code be structured? There are several answers, and real systems mix them.

::: definition Kernel architectures {#def-kernel-arch}
- A **monolithic kernel** runs all operating-system services — scheduling, memory management, file systems, network protocols, device drivers — in kernel mode in one address space, calling one another by ordinary function calls. Examples: Unix, Linux, the BSDs.
- A **layered** system arranges the kernel as a hierarchy of levels, each using only the services of the levels below it. Example: Dijkstra's THE system (1968).
- A **microkernel** keeps in kernel mode only the minimum that must be privileged — address spaces, threads and scheduling, and **inter-process communication** (IPC) — and runs file systems, drivers and network stacks as user-mode **servers** that communicate by messages. Examples: Mach, L4 and seL4, QNX, MINIX 3.
- A **hybrid kernel** is structured around a microkernel design but runs most servers in kernel mode for speed. Examples: Windows NT and its successors, Apple's XNU (Mach plus BSD).
:::

**Monolithic kernels** are fast: reading a file is a system call, a few function calls through the file system to the block layer and the driver, and a return. Their weakness is that every line runs with full privilege. A bug in an obscure USB driver can corrupt the scheduler's data, and a security hole in it gives an attacker the whole machine. Monolithic does not mean unmodular: Linux loads most drivers as **loadable kernel modules** at run time (`/proc/modules` lists 138 on the test machine), and its internal interfaces — the virtual file system, the block layer, the network device interface — are carefully layered. But a module, once loaded, is part of the kernel, with no isolation at all.

**Layering**, the oldest discipline, makes a system easier to reason about: Dijkstra's group built THE in six levels (processor allocation and interrupts at level 0, memory segments at level 1, the operator console at 2, I/O buffering at 3, user programs at 4, the operator at 5) and tested each level fully before building on it. Strict layering is hard to maintain, though. Real dependencies are not linear — the memory manager needs to do I/O to swap pages, and the I/O system needs memory for buffers — and each layer crossing adds overhead.

**Microkernels** take the opposite bet: move everything that need not be privileged out of the kernel. A file system becomes a server process; a program reading a file sends it a message; the server sends a message to the disk-driver server; replies travel back. A crashing driver is just a crashing process, which can be restarted (MINIX 3 does this automatically), and the privileged code is small enough to inspect — or prove correct: in 2009 the seL4 team published a machine-checked proof that their roughly 8,700 lines of C implement their formal specification. The price is IPC. Every service that was a function call becomes a pair of messages, each crossing into and out of the kernel and switching address spaces.

::: example The price of messages {#ex-microkernel}
A program reads a block of a file. In a monolithic kernel this is one system call, costing $0.5$ µs of boundary overhead (entry, exit and dispatch) plus the work itself. In a microkernel, the request goes from the program to the file-system server, from the file-system server to the disk-driver server, and the replies come back the same way. Each one-way IPC message costs $1$ µs (it traps into the kernel, switches address space and returns into the receiver). What is the boundary overhead per read in each design? If the work itself (finding the block in a cache and copying 4 KiB) takes $2$ µs, by what factor is each read slower?
::: solution
The microkernel needs four messages: program → file system, file system → driver, driver → file system, file system → program. Overhead $4 \times 1 = 4$ µs, against $0.5$ µs. Total time per read: $2 + 0.5 = 2.5$ µs monolithic, $2 + 4 = 6$ µs microkernel, a factor of $6 / 2.5 = 2.4$. If the block is already in a cache inside the file-system server, the driver is not involved, two messages suffice and the factor is $(2 + 2)/2.5 = 1.6$; if the read has to go to an SSD taking $80$ µs, the factor is only $(80 + 6)/(80 + 2.5) \approx 1.04$. The lesson matches [[#prop-amortise]]: message overhead matters in proportion to how cheap the work it wraps is. First-generation microkernels such as Mach (1986) had IPC costs of tens of microseconds on the hardware of the time, and file-system-heavy workloads suffered badly; Jochen Liedtke's L4 (1993) showed that a kernel designed around IPC could make it twenty times faster, and modern L4-family kernels send a short message in a few hundred cycles.
:::
:::

There are more radical designs. An **exokernel** (MIT, 1995) multiplexes hardware securely but provides no abstractions at all, leaving them to libraries linked into each application. A **unikernel** compiles one application together with just the library-OS components it needs into a single image that runs in kernel mode inside a virtual machine, relying on the hypervisor for isolation ([[operating-systems/virtualisation]]). And Linux's **eBPF** lets user programs load small programs into the kernel — for tracing, packet filtering and security policy — after a **verifier** has proved that they terminate and access only memory they are allowed to: a way to extend a monolithic kernel without trusting the extension.

::: warning "The kernel is a process that runs all the time"
It is tempting to picture the kernel as a supervisor process that sits beside user processes and watches them. It is not. The kernel has no flow of control of its own in that sense: it runs *in the context of* whichever process trapped into it (for system calls and faults) or interrupted it (for interrupts), on that process's kernel stack, and returns to user mode — possibly in a different process after a context switch. When no program is running, a core executes the kernel's idle loop, which halts until the next interrupt. Linux does have **kernel threads** (`kworker`, `ksoftirqd`, `kswapd`), which are scheduled like processes, but they are helpers that the kernel creates for deferred work, not the kernel itself. Keeping this straight explains why a system call can block: the *calling process* sleeps in the kernel, and the scheduler runs someone else.
:::

## From power-on to the first process

A kernel is a program, so something must load it. Starting a computer is a chain of ever more capable loaders, each just smart enough to find and start the next — **bootstrapping**, after the impossible feat of lifting oneself by one's bootstraps.

::: algorithm Booting a PC {#alg-boot}
1. **Reset.** The processor starts at a fixed address mapped to flash memory on the motherboard, in its most privileged mode, with the MMU off.
2. **Firmware** (UEFI on current PCs, BIOS on older ones) initialises the memory controller, enumerates devices, runs a power-on self-test, and — with **Secure Boot** enabled — checks a signature on the next stage. It finds a boot loader on a disk's EFI system partition (a FAT file system) and runs it.
3. The **boot loader** (GRUB, systemd-boot or the kernel's own EFI stub) loads the kernel image and an **initial RAM file system** (initramfs) into memory, passes the kernel command line and a description of memory, and jumps to the kernel.
4. The **kernel** sets up its page tables and turns on paging, installs the exception table, initialises memory management, the scheduler, interrupts and timers, starts the other cores, probes drivers, and unpacks the initramfs as a temporary root file system.
5. The kernel creates the first user process, **PID 1**, by running `/init` from the initramfs. That program loads whatever modules are needed to reach the real root file system (RAID, encryption, network storage), mounts it, and executes the real `init` — on most Linux distributions **systemd** — which remains PID 1.
6. `init` starts system services in dependency order, and finally the login prompt or graphical session. Every other process is a descendant of PID 1, created by `fork` and `execve`.
:::

Each stage trusts the one before it to have loaded it correctly, so the security of the whole system can be no better than that of the earliest stage: Secure Boot extends a **chain of trust** from keys stored in the firmware, through a signed boot loader, to a signed kernel and (optionally) signed modules.

Step 6 is a scheduling problem in its own right. Services declare dependencies — the network service needs the device manager; the web server needs the network and the file systems — and `init` must start each only after everything it depends on. The dependencies form a directed acyclic graph, and any **topological order** of it is a valid start-up order; systemd starts independent services in parallel, which is why it boots faster than the strictly sequential scripts of traditional Unix `init`.

::: widget graph
nodes: firmware@0,1; loader@1,1; kernel@2,1; init@3,1; udev@4,2; mount@4,0; network@5,2; journal@4,1; sshd@6,2; web@6,1; login@6,0
edges: firmware>loader; loader>kernel; kernel>init; init>udev; init>mount; init>journal; udev>network; mount>network; network>sshd; network>web; journal>web; mount>login; journal>login
algorithm: topo
caption: A simplified boot dependency graph: firmware, boot loader and kernel run strictly in sequence, then `init` (PID 1) starts services once their dependencies are up. Step through the topological sort to get one valid start-up order. Notice that `udev`, `mount` and `journal` have no dependencies on one another, so they can start in parallel; drag the vertices to see the levels. Add an edge `web>mount` to create a cycle, and no order exists — a misconfiguration that systemd reports as an "ordering cycle" and breaks by skipping a unit.
:::

On the test machine, which is a container on a virtualised host, PID 1 is indeed `systemd`:

```console
$ ps -p 1 -o comm=
systemd
```

::: example Tracing from reset to a shell prompt {#ex-boot-trace}
List, in order, every privilege level and every program that has run on the boot core between pressing the power button and the moment a user's shell prints its first prompt after a text-console login on a Linux PC with UEFI. Which of them run in kernel mode?
::: solution
(1) UEFI firmware, in the processor's most privileged state (on x86, ring 0 with additional System Management Mode code, below even the kernel). (2) The boot loader, still in firmware context with full privilege. (3) The kernel's initialisation code, ring 0; it enables paging and installs exception handlers. (4) PID 1 from the initramfs, the first user-mode (ring 3) program. (5) The real `init`, systemd, which PID 1 `execve`d into — still PID 1, ring 3. (6) Service processes forked by systemd, ring 3, including `getty` on the console. (7) `getty` executes `login`, which checks the password, and `login` executes the user's shell, which prints the prompt — all ring 3. Throughout steps 4–7 the kernel runs only when one of these programs makes a system call, faults, or is interrupted. Only steps 1–3 run in kernel mode as the main flow of control; after step 3 there is no "kernel process", only kernel code entered by exceptions (the warning above).
:::
:::

## In practice

As of 2026, the general-purpose kernels in wide use are all monolithic or hybrid: Linux (on servers, Android phones and most embedded devices), Windows NT (hybrid), and Apple's XNU (hybrid, on macOS and iOS). Microkernels dominate where reliability and certification matter more than peak throughput: QNX in cars and industrial controllers, the L4 family in modem baseband processors and secure enclaves, seL4 in high-assurance systems. The ideas have also flowed back: Linux runs some drivers in user space (through `vfio` and FUSE file systems), and both Windows and macOS have moved classes of drivers out of the kernel to contain their failures.

The cost of crossing the boundary has risen since 2018 because of the speculative-execution vulnerabilities and their mitigations; that is one reason why new interfaces such as `io_uring` and the vDSO aim to cross it less. There is no single best architecture — only different positions on the trade-off between speed, isolation and the amount of code that must be trusted.

::: history
The first operating systems were **batch monitors** (General Motors and North American Aviation's system for the IBM 704, 1956), which loaded one job after another from tape. The Atlas computer at Manchester (1962) had a "supervisor" with extracodes — the ancestors of system calls — and interrupts. Fernando Corbató's group at MIT demonstrated the **Compatible Time-Sharing System** (CTSS) in 1961 and described it in 1962: several users at terminals sharing an IBM 709 through time slicing, the first interactive time-sharing system, which needed exactly the protection hardware of [[#prop-protection]] (a modified IBM 7090 provided memory protection and a clock). **Multics** (MIT, Bell Labs and General Electric, described in a set of papers in 1965) introduced hierarchical protection rings, implemented in hardware on the Honeywell 6180 in 1973. Edsger Dijkstra's 1968 paper on the **THE multiprogramming system** introduced layered structure (and semaphores, which we meet in [[operating-systems/synchronisation]]); Per Brinch Hansen's RC 4000 "nucleus" (1970) was an early microkernel. Ken Thompson and Dennis Ritchie's **Unix** (1969, described in *Communications of the ACM* in 1974) showed that a small, monolithic kernel written in a high-level language could be ported between machines. Mach (Carnegie Mellon, 1986) popularised microkernels; Jochen Liedtke's L4 (1993–95) made them fast; Gerwin Klein and colleagues verified seL4 (2009). Linus Torvalds announced Linux in 1991, and his 1992 newsgroup debate with Andrew Tanenbaum over "Linux is obsolete" is still the best-known argument about kernel architecture.
:::

## Where this leads

Every later chapter builds on the mechanisms of this one. [[operating-systems/processes-scheduling]] uses the timer interrupt to share the processor; [[operating-systems/address-spaces-paging]] uses the MMU to give each process its own memory; [[operating-systems/storage-io]] shows how the kernel talks to devices through interrupts and DMA; [[operating-systems/virtualisation]] adds a privilege level beneath the kernel to run whole operating systems as guests. Protection boundaries, the kernel's attack surface and the double-fetch bug reappear in [[security]], and kernel–user communication in parallel systems in [[parallel-computing]].

::: summary
- The operating system is referee, illusionist and glue; its **kernel** is the privileged core, entered only through exceptions ([[#def-os]]). Separate **mechanism** (how) from **policy** (which).
- Protection rests on hardware: **dual-mode operation** with privileged instructions ([[#def-dual-mode]]), an MMU only the kernel controls, and a timer only the kernel can reprogram. Each of the three is necessary ([[#prop-protection]]); a privileged instruction in user mode faults (`hlt` → `SIGSEGV`).
- The **system-call interface** is the kernel's whole API ([[#def-syscall-interface]]). The kernel must validate every argument and copy it exactly once (`copy_from_user`; double fetches are TOCTOU bugs).
- A system call costs hundreds of nanoseconds (about 480 ns measured, against 2 ns for a function call); the vDSO, buffering and `io_uring` cross the boundary less often, and batching $k$ items per call cuts overhead by about $k$ ([[#prop-amortise]]).
- Kernels are **monolithic** (fast, all code trusted), **layered**, **microkernels** (small trusted core, servers in user mode, IPC overhead) or **hybrid**; the trade-off is speed against isolation and the size of the trusted code ([[#ex-microkernel]]).
- Booting is a chain: firmware → boot loader → kernel → PID 1 (`init`), which starts services in a topological order of their dependencies ([[#alg-boot]]).
:::

## Exercises

::: exercise Privileged or not {level=1}
For each operation, say whether it must be privileged and which requirement of [[#prop-protection]] it falls under, if any: (a) writing to the timer's control register; (b) adding two registers; (c) writing to the register that holds the system-call entry address (`IA32_LSTAR` on x86-64, written with `wrmsr`); (d) executing `int3`, the breakpoint trap; (e) reading an I/O port connected to the disk controller with `in`.
::: solution
(a) Privileged — requirement (c): a program that could reprogram the timer could stop it. (b) Unprivileged: it affects only the program's own registers. (c) Privileged — requirement (a): whoever chooses the entry address chooses what code runs in kernel mode after `syscall`; `wrmsr` is privileged. (d) Unprivileged: like `syscall`, it is a trap to a kernel-chosen handler (the debugger interface), so it cannot give the program privilege. (e) Privileged: direct device access would let the program read or overwrite any disk block, bypassing the file system's permission checks — not one of the three requirements as stated, but the same argument as (b) applied to devices; x86 makes `in` and `out` privileged unless the kernel grants a program specific ports.
:::
:::

::: exercise The cost of a million system calls {level=1 check="0.48"}
A program writes a million bytes with one `write` call per byte. Taking the cost of a system call as $480$ ns and ignoring the work of writing each byte, how many seconds does the boundary overhead alone cost? (Enter the number of seconds.)
::: solution
$10^6 \times 480 \text{ ns} = 4.8 \times 10^8 \text{ ns} = 0.48$ s. With the C library's 4 KiB buffer the same output needs $\lceil 10^6 / 4096\rceil = 245$ calls, about $0.12$ ms of overhead — the 245 `write`s seen in [[computer-systems/system-io]].
:::
:::

::: exercise Static and dynamic start-up {level=1 check="15"}
Using [[#ex-strace-count]], how many more system calls does the dynamically linked empty program make than the static one? Name three of the extra calls and say what each is for. (Enter the difference.)
::: solution
$30 - 15 = 15$. The extra calls are the dynamic linker's: `access("/etc/ld.so.preload")` (checks for libraries to preload; fails with `ENOENT`), `openat` of `/etc/ld.so.cache` and of `libc.so.6` (find and open the library), `read` and `pread64` (read the ELF header and program headers), `fstat` (find the file size), five `mmap`s (map the library's code, read-only data and writable data, and zero-filled memory for its uninitialised data), `close`, further `mprotect`s that make relocated data read-only after relocation (RELRO), and `munmap` of the cache. Each is one boundary crossing of about half a microsecond, so start-up overhead is measured in microseconds — negligible for long programs, significant for very short ones started millions of times.
:::
:::

::: exercise Microkernel break-even {level=2 check="3"}
In the setting of [[#ex-microkernel]], a read through the microkernel needs four one-way messages of $1$ µs each, while the monolithic system call has $0.5$ µs of overhead. For what amount of work $w$ (in µs) per read is the microkernel exactly twice as slow? For which $w$ is it less than $10\%$ slower? (Enter $w$ for the first question, in microseconds.)
::: solution
Solve $(w + 4)/(w + 0.5) = 2$: $w + 4 = 2w + 1$, so $w = 3$ µs. Check: $7/3.5 = 2$. For less than $10\%$: $(w + 4)/(w + 0.5) < 1.1$ means $w + 4 < 1.1w + 0.55$, that is $0.1w > 3.45$, $w > 34.5$ µs. Requests that do tens of microseconds of real work — any that reach an SSD — hide the message overhead almost completely; requests served from a cache in a few microseconds do not.
:::
:::

::: exercise Breaking protection with one instruction {level=2}
A processor designer proposes making the instruction that writes the exception-table base register (`lidt` on x86) unprivileged, "because programs might want to handle their own divide errors". Show that a user program could then gain full control of the machine. What safe alternative already provides what the designer wants?
::: solution
The program builds, in its own memory, an exception table whose entry for some exception — say the divide error, or the timer interrupt — points to code of its own, and loads its address with `lidt`. It then divides by zero (or waits for the next timer tick). The processor delivers the exception through the new table, entering *kernel mode* and jumping to the program's code. That code now runs with full privilege: it can load `%cr3`, disable interrupts, overwrite the kernel. This violates requirement (a) of [[#prop-protection]] — entering kernel mode at an address not chosen by the kernel. (In practice, the program's page holding the handler would also need to be accessible in kernel mode, which it is by default unless SMEP is enabled; that does not rescue the design, since with control of `lidt` the program can also point the table at existing kernel code fragments.) The safe alternative is **signals**: the kernel handles the exception itself and, if the program asked for it with `sigaction`, delivers `SIGFPE` to a handler that runs in *user* mode ([[computer-systems/exceptions-processes]]).
:::
:::

::: exercise Your own getpid {level=2}
Using `raw_write` as a model, write `long raw_getpid(void)` that makes system call number 39 (`getpid` on x86-64) directly, and check that it agrees with the library's `getpid()`.
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <unistd.h>

static long raw_getpid(void) {
    long ret;
    __asm__ volatile ("syscall"
                      : "=a"(ret)
                      : "a"(39L)                  /* __NR_getpid on x86-64 */
                      : "rcx", "r11", "memory");
    return ret;
}

int main(void) {
    long a = raw_getpid(), b = getpid();
    printf("raw %ld, libc %ld\n", a, b);
    return a != b;
}
```
```console
$ gcc -std=c17 -Wall -Wextra -O2 -o rawpid rawpid.c && ./rawpid
raw 3430123, libc 3430123
```
(The number differs from run to run.) No arguments are needed, so only `%rax` is an input; the clobbers are as before. System-call numbers differ between architectures — `getpid` is 172 on 64-bit ARM — which is one reason to use the library wrappers or `syscall(SYS_getpid)` in real code.
:::
:::

::: exercise Batching with io_uring {level=3 check="16"}
A server handles small requests. Each request needs one I/O operation whose real work costs $d = 30$ ns of kernel time, and each system call has a fixed cost of $c = 480$ ns. With one system call per operation, the time per operation is $c + d$. Using [[#eq-amortise]] (ignore the ceiling), how many operations $k$ must be submitted per call to make the time per operation $c/k + d$ equal to $60$ ns? By what factor does that reduce the time per operation compared with $k = 1$? (Enter $k$.)
::: solution
We need $480/k + 30 = 60$, so $480/k = 30$ and $k = 16$. Then each operation costs $60$ ns instead of $480 + 30 = 510$ ns, a factor of $510/60 = 8.5$. Doubling $k$ to $32$ gives $45$ ns, a further improvement of only $25\%$: once $c/k$ is comparable with $d$, batching has done most of what it can, as the figure after [[#prop-amortise]] shows. (Real `io_uring` submissions have additional per-operation costs, so this is a model, not a prediction.)
:::
:::

::: exercise A double-fetch bug {level=3}
A toy kernel implements a system call `set_name(struct req *u)`, where `struct req { size_t len; char name[]; }` lives in user memory. The handler does: (1) `if (u->len > 64) return -EINVAL;` (2) `memcpy(kbuf, u->name, u->len);` into a 64-byte kernel buffer `kbuf`, reading `u->len` from user memory again. Describe an interleaving with a second user thread that makes the kernel overflow `kbuf`, and rewrite the handler correctly. Why does the check in step (1) give no protection?
::: solution
Thread A calls `set_name` with `len = 10`. The kernel reads `u->len` in step (1), sees $10 \le 64$ and passes the check. Before step (2), thread B, running on another core and sharing the address space, writes `u->len = 4096`. In step (2) the kernel reads `u->len` again and copies 4096 bytes into a 64-byte buffer, overwriting whatever kernel data follows it. The check gave no protection because it tested a *different value* from the one used: user memory can change at any time between two reads, so a value read twice from user memory is two values. Correct version: copy the request header into kernel memory once, check the copy, and use only the copy (a fragment of kernel C, using Linux's `copy_from_user`, so it is not a stand-alone program):

```text
size_t len;
if (copy_from_user(&len, &u->len, sizeof len)) return -EFAULT;  /* one fetch */
if (len > sizeof kbuf) return -EINVAL;                          /* check the copy */
if (copy_from_user(kbuf, u->name, len)) return -EFAULT;         /* use the copy */
```

`copy_from_user` also checks that the source range is user memory and turns a fault into `-EFAULT`. This is a time-of-check-to-time-of-use bug; static analysers that look for two fetches of the same user address have found real instances in production kernels.
:::
:::
