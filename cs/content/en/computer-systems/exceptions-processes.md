From the moment a computer is switched on until it is switched off, the processor does one simple thing: it executes an instruction, then the next one. The sequence of addresses it executes is its **control flow**. Within a program, the flow moves smoothly from one instruction to the next and changes only at jumps, calls and returns, as in [[computer-systems/machine-code]] — changes that the program itself asks for.

But a real system must also react to events the program did not plan. A key is pressed; a network packet arrives; a timer goes off, and it is another program's turn to run; the program divides by zero, or touches a page that is not in memory, or asks the operating system to read a file. Each of these causes an abrupt change in control flow that is not a jump or a call. Collectively, such changes are **exceptional control flow**, and they occur at every level of a system: in hardware (exceptions and interrupts), in the operating system (switching between processes), and between processes and the kernel (signals).

This chapter studies them from the bottom up. We define exceptions and their four classes, see how a program asks the kernel for service through a system call, introduce the **process** — perhaps the single most important abstraction in computing — and the Unix functions that create and control processes (`fork`, `execve`, `waitpid`, `exit`), and finally **signals**, the software form of exceptional control flow. Together they explain how a shell runs your programs and what happens when you press Ctrl-C.

All programs were compiled with GCC 15.2 on x86-64 Linux (kernel 7.0) and glibc 2.43, as `gcc -std=c17 -Wall -Wextra`. The functions used are POSIX rather than ISO C, so each program begins with `#define _POSIX_C_SOURCE 200809L`, which makes the POSIX declarations visible under `-std=c17`. Process IDs in the output differ from run to run.

## Exceptions

::: definition Exception {#def-exception}
An **exception** is an abrupt change in the control flow in response to some change in the processor's state, called an **event**. When an event occurs, the processor stops the current instruction stream, saves enough state to resume it, and makes an indirect procedure call through an **exception table** — a table of handler addresses indexed by an **exception number** — to an **exception handler**, which runs in **kernel mode**. When the handler finishes, control either returns to the interrupted instruction, returns to the next instruction, or the interrupted program is aborted.
:::

Exception numbers are assigned partly by the processor's designers (divide error, page fault, …) and partly by the operating system (system calls, device interrupts). The kernel fills in the table at boot time, and a special register holds its address. Unlike a procedure call, an exception switches the processor from **user mode**, in which a program may execute only ordinary instructions and access only its own memory, to **kernel mode**, in which it may execute privileged instructions (halting the processor, changing page tables, talking to devices) and access any memory. The mode bit is what lets the operating system protect itself and other programs from a faulty or malicious program: the only way into kernel mode is through an exception, to a handler the kernel chose.

Exceptions fall into four classes:

| class | cause | synchronous? | returns to | examples |
|---|---|---|---|---|
| **interrupt** | signal from an I/O device or timer | no | next instruction | timer tick, key press, packet arrival, disk transfer complete |
| **trap** | intentional, executed by an instruction | yes | next instruction | system calls (`syscall`), breakpoints (`int3`) |
| **fault** | a possibly recoverable error | yes | the faulting instruction (re-executed), or abort | page fault, protection fault, divide error |
| **abort** | an unrecoverable hardware error | yes | never (program terminated) | machine check (memory parity error) |

**Interrupts** are **asynchronous**: they are caused by events outside the processor and are unrelated to the instruction that happens to be executing. A device raises a signal on an interrupt line; after the current instruction completes, the processor notices it and runs the handler; then the interrupted program continues as if nothing had happened. The other three classes are **synchronous**: caused by executing a particular instruction.

**Faults** are the interesting case. A **page fault** occurs when an instruction references a virtual address whose page is not currently in physical memory ([[computer-systems/memory-hierarchy]]). The handler loads the page from disk, updates the page table, and returns to the *faulting instruction*, which runs again and now succeeds. The program never knows. If instead the address is not part of the program's address space at all, or the access violates the page's permissions (writing to read-only code, executing data), the kernel cannot fix it and terminates the program — on Linux by sending it the `SIGSEGV` signal, the "segmentation fault" of every C programmer's experience.

::: quiz
Which of these events cause a synchronous exception?
- [x] A program executes `idivq` with a zero divisor.
- [ ] The network card receives a packet while a program is running a loop.
- [x] A program calls `read`, which executes the `syscall` instruction.
- [x] A program dereferences a pointer to a page that has been swapped out to disk.
- [ ] The timer fires to end a program's time slice.
::: solution
Division by zero is a fault (the divide error, which Linux reports as `SIGFPE`), `syscall` is a trap, and touching a swapped-out page is a page fault — all caused by the instruction being executed. The packet arrival and the timer are interrupts, asynchronous with respect to the running program: they would have happened whatever instruction it was executing.
:::
:::

### System calls

A user program cannot read a file directly — the disk is a device, and only the kernel may touch devices. Instead it makes a **system call**: a trap into the kernel requesting a service. On x86-64 Linux the program puts a system-call number in `%rax` and up to six arguments in `%rdi`, `%rsi`, `%rdx`, `%r10`, `%r8` and `%r9` (almost the calling convention of [[computer-systems/machine-code#def-abi]], with `%r10` instead of `%rcx`), and executes the `syscall` instruction. The kernel's handler looks up the number in its system-call table, performs the service, and returns the result in `%rax`; a value between $-4095$ and $-1$ indicates an error, which the C library wrapper stores, negated, in `errno` before returning $-1$.

There are a few hundred system calls (`read` is number 0, `write` 1, `open` 2, `fork` 57, `execve` 59, `exit` 60, `kill` 62 on x86-64 Linux). C programs normally reach them through thin wrapper functions in the C library, declared in `<unistd.h>` and related headers:

```c
#include <unistd.h>

int main(void) {
    write(1, "hello\n", 6);     /* system call: fd 1 is standard output */
    return 0;
}
```

The `strace` tool runs a program and logs every system call it makes. For this program it records 32 calls; the first and last few are:

```console
$ strace -o trace.txt ./hello > /dev/null
$ head -1 trace.txt; tail -3 trace.txt
execve("./hello", ["./hello"], 0x7ffcd9976690 /* 54 vars */) = 0
write(1, "hello\n", 6)                  = 6
exit_group(0)                           = ?
+++ exited with 0 +++
```

The calls in between are the dynamic linker of [[computer-systems/linking-loading]] at work: opening `libc.so.6`, mapping it into memory with `mmap`, setting protections. Our own program makes exactly one system call, `write`, which returns $6$, the number of bytes written, and returning from `main` ends in `exit_group`.

::: example A failing system call {#ex-syscall}
What happens, at the level of registers and `errno`, when a program calls `write(42, "hi\n", 3)` and descriptor 42 is not open?

```c
#define _POSIX_C_SOURCE 200809L
#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void) {
    ssize_t n = write(42, "hi\n", 3);         /* descriptor 42 is not open */
    int e = errno;                             /* save before calling anything else */
    printf("write returned %zd, errno = %d (%s)\n", n, e, strerror(e));
    return 0;
}
```
::: solution
The library wrapper `write` places the system-call number $1$ in `%rax`, the descriptor $42$ in `%rdi`, the address of the string in `%rsi` and the count $3$ in `%rdx`, and executes `syscall`. The kernel finds no open file with descriptor $42$ in the process's table and returns $-9$ in `%rax`, that is $-$`EBADF`. The wrapper sees a value in $[-4095, -1]$, stores $9$ in `errno` and returns $-1$. The program prints

```console
$ ./badfd
write returned -1, errno = 9 (Bad file descriptor)
```

and `strace` shows the kernel's view: `write(42, "hi\n", 3) = -1 EBADF (Bad file descriptor)`. Two habits follow: always check the return value of a system call, and read `errno` immediately, because any later library call (here, `printf`) may change it.
:::
:::

System calls are much more expensive than function calls, because of the mode switch and the work of saving and checking state. On the test machine (a 2014 Xeon running a 2026 kernel with mitigations for the Spectre and Meltdown processor vulnerabilities enabled) a minimal system call, `getppid`, took about 430 ns in a loop of ten million — an **observation** for one machine; on others it ranges from under 100 ns to several hundred. A function call takes about a nanosecond. This cost is why the standard library buffers input and output ([[computer-systems/system-io]]).

## Processes

::: definition Process {#def-process}
A **process** is an instance of a program in execution. Each process has its own **context**: the program's code and data in memory, its stack, the contents of the registers and program counter, its environment variables and open file descriptors, and kernel bookkeeping. The process abstraction gives each program two illusions:

- a **logical control flow**: the program seems to have the processor to itself, executing its instructions one after another without interruption;
- a **private address space**: the program seems to have the whole memory to itself ([[computer-systems/memory-hierarchy]] explains how virtual memory provides it).
:::

The illusion of exclusive use of the processor is produced by **context switches**. The kernel's **scheduler** lets a process run for a **time slice** (a few milliseconds); then a timer interrupt enters the kernel, which saves the registers of the current process, chooses another process, restores its registers and switches to its address space, and returns from the exception — into the other process. A process that makes a system call that must wait (reading from a disk or a network connection) is likewise switched out until its data arrive. Two processes whose executions overlap in time are **concurrent**; on a machine with several cores, they may also run truly in **parallel**. Scheduling policies are a central topic of [[operating-systems]].

::: widget graph
nodes: kernel@3,2; P1@1,0; P2@3,0; P3@5,0
edges: P1>kernel; kernel>P2; P2>kernel; kernel>P3; P3>kernel; kernel>P1
algorithm: bfs
start: P1
caption: Control passing between three processes and the kernel. Every arrow into `kernel` is an exception — a timer interrupt ending a time slice, a system call, or a fault — and every arrow out of it is the return from an exception, possibly *into a different process* after a context switch. Notice that processes never transfer control to each other directly: all switching passes through kernel mode. Step through the search from `P1` to see that every process is reachable only through the kernel.
:::

### Creating processes: fork

In Unix, new processes are created by copying existing ones.

::: definition fork {#def-fork}
The function `pid_t fork(void)` creates a new **child process** that is an almost exact duplicate of the calling **parent**: it gets a copy of the parent's address space (code, data, heap, stack), registers and open file descriptors, and begins executing at the same point, returning from the same `fork` call. The two differ in their **process IDs** (`getpid()`), and in the return value: `fork` returns $0$ in the child and the child's (positive) PID in the parent, or $-1$ in the parent if no child could be created.
:::

`fork` is called once and **returns twice**, once in each process. After it, the two run concurrently, in an order chosen by the scheduler, with separate copies of every variable:

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int x = 1;
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); exit(1); }
    if (pid == 0) {                       /* child */
        x++;
        printf("child:  x = %d, pid = %d, parent = %d\n", x, (int) getpid(), (int) getppid());
        exit(0);
    }
    int status;                           /* parent */
    waitpid(pid, &status, 0);             /* wait for the child to finish */
    x--;
    printf("parent: x = %d, child %d exited with status %d\n", x, (int) pid, WEXITSTATUS(status));
    return 0;
}
```

```console
$ ./fork1
child:  x = 2, pid = 3322080, parent = 3322079
parent: x = 0, child 3322080 exited with status 0
```

The child's increment and the parent's decrement act on different copies of `x`. Copying a whole address space sounds expensive, but the kernel uses **copy-on-write**: parent and child initially share the same physical pages, marked read-only, and a page is copied only when one of them writes to it.

Because every process can call `fork`, the processes of a system form a tree, rooted at the first user process (`init`, PID 1, today usually `systemd`), and a program that calls `fork` several times in sequence produces a tree of its own.

::: proposition Counting processes {#prop-fork-count}
If a process executes $n$ calls to `fork` in sequence (each executed unconditionally and successfully, by every process that reaches it), then $2^n$ processes, including the original, finish the sequence.
:::

::: proof
By induction on $n$. For $n = 0$ there is one process. Suppose $2^{n-1}$ processes reach the $n$-th call. Each of them executes it, and each call produces one additional process which continues from the same point; so after the call there are $2 \cdot 2^{n-1} = 2^n$ processes, all of which continue past it.
:::

So `fork(); fork(); printf("hello\n");` prints four lines, and a loop of three unconditional `fork`s prints eight. Programs that fork in a loop without care can exhaust the system's process limit (a "fork bomb"); the per-user limit set with `ulimit -u` is the defence.

::: example Possible orders of output {#ex-fork-order}
Consider

```c
int main(void) {
    printf("A");               /* sits in the stdio buffer, not yet written */
    if (fork() == 0) {
        printf("B\n");
        return 0;
    }
    wait(NULL);
    printf("C\n");
    return 0;
}
```

(with the headers of the previous program). It prints

```console
$ ./forkbuf
AB
AC
```

Why is `A` printed twice, and why must `B` come before `C`?
::: solution
`printf("A")` does not write anything yet: the C library collects output in a buffer in the process's memory, and writes it with the `write` system call only when a newline is printed to a terminal, when the buffer fills, or when the program exits (when standard output is a pipe or file, only the last two; [[computer-systems/system-io]]). At the moment of `fork`, the buffer contains `"A"`, and the child gets a copy of the whole address space — including the buffer. Each process later prints its own line after its own `A`.

The order is forced by `wait(NULL)`: the parent does not print `C` until the child has terminated, by which time the child has flushed `"AB\n"` (it flushes on exit at the latest). Without `wait`, both `AB` / `AC` and `AC` / `AB` would be possible. The rule to draw: call `fflush(stdout)` before `fork` if output may be pending — otherwise the child inherits it.
:::
:::

### Waiting and exiting

A process terminates by returning from `main`, by calling `exit(status)`, or because it receives a signal whose default action is to terminate it. The low 8 bits of the status are passed to the parent. A terminated process does not disappear at once: it remains a **zombie**, holding its PID and exit status, until its parent **reaps** it with `wait` or `waitpid`:

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) exit(7);                 /* child exits at once */
    sleep(1);                              /* child is now a zombie */
    char cmd[64];
    snprintf(cmd, sizeof cmd, "ps -o pid,stat,comm -p %d", (int) pid);
    system(cmd);
    int status;
    waitpid(pid, &status, 0);              /* reap it */
    printf("reaped %d, status %d\n", (int) pid, WEXITSTATUS(status));
    fflush(stdout);                        /* before ps writes to the same output */
    system(cmd);
    return 0;
}
```

```console
$ ./zombie
    PID STAT COMMAND
3326991 Z    zombie
reaped 3326991, status 7
    PID STAT COMMAND
```

`ps` shows the child in state `Z` until it is reaped; afterwards it is gone. Zombies consume little memory, but a long-running server that never reaps its children slowly exhausts the process table. If a parent terminates first, its children become **orphans** and are adopted by `init` (or a designated "subreaper"), which reaps them.

`waitpid(pid, &status, options)` waits for the child `pid` (or any child if `pid` is $-1$) and stores a status word that macros decode: `WIFEXITED(status)` and `WEXITSTATUS(status)` for a normal exit, `WIFSIGNALED(status)` and `WTERMSIG(status)` for termination by a signal. The option `WNOHANG` makes it return $0$ immediately instead of blocking if no child has terminated yet.

### Running programs: execve

`fork` creates a copy of the *same* program. To run a *different* program, a process calls

```c
int execve(const char *path, char *const argv[], char *const envp[]);
```

which replaces the code, data, heap and stack of the calling process with a new program loaded from `path`, as in [[computer-systems/linking-loading]], and starts it at its entry point with the given argument and environment arrays (both terminated by a null pointer). The PID and the open file descriptors stay the same. `execve` returns only if it fails; on success there is nothing to return to. The library variants `execvp` and `execlp` search the directories of the `PATH` environment variable for the program.

The pair **fork-then-exec** is how every Unix program is started: the parent forks; the child, a copy of the parent, may adjust its environment (redirect file descriptors, change directory, drop privileges) and then execs the new program; the parent waits. Here is the core of a shell, running one command given on its command line:

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

/* Run the command given on our command line and report how it ended. */
int main(int argc, char *argv[]) {
    if (argc < 2) { fprintf(stderr, "usage: %s cmd [args...]\n", argv[0]); return 2; }
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return 1; }
    if (pid == 0) {
        execvp(argv[1], &argv[1]);        /* returns only on failure */
        perror("execvp");
        _exit(127);
    }
    int status;
    if (waitpid(pid, &status, 0) < 0) { perror("waitpid"); return 1; }
    if (WIFEXITED(status))
        printf("[%d exited with status %d]\n", (int) pid, WEXITSTATUS(status));
    else if (WIFSIGNALED(status))
        printf("[%d killed by signal %d (%s)]\n", (int) pid, WTERMSIG(status),
               strsignal(WTERMSIG(status)));
    return 0;
}
```

::: example Running commands {#ex-run}
Explain each line of this session, in which `crash` is a program that dereferences a null pointer.

```console
$ ./run echo hi there
hi there
[3323753 exited with status 0]
$ ./run ls /nonexistent
ls: cannot access '/nonexistent': No such file or directory
[3323758 exited with status 2]
$ ./run nosuchcmd
execvp: No such file or directory
[3323761 exited with status 127]
$ ./run ./crash
[3323778 killed by signal 11 (Segmentation fault)]
```
::: solution
In each case `run` forks, and the child calls `execvp` with `argv[1]` as the program name and `&argv[1]` as its argument vector — so the new program sees `echo`, `hi`, `there` as its `argv[0..2]`, followed by the null pointer that ends `argv`.

`echo` prints its arguments and exits with status $0$. `ls` fails to find the directory and exits with status $2$ (its documented status for serious trouble). For `nosuchcmd`, `execvp` finds no such program in `PATH` and *returns*, still in the child, which reports the error and calls `_exit(127)` — the status shells use for "command not found". The child uses `_exit` rather than `exit` so that it does not flush stdio buffers inherited from the parent (the duplicated-output problem of [[#ex-fork-order]]). Finally, `crash` performs an invalid memory access; the MMU raises a page fault, the kernel finds that the address is not mapped, and it terminates the process with signal 11, `SIGSEGV`. `waitpid` reports this through `WIFSIGNALED`. A shell such as `bash` reports a death by signal $n$ as exit status $128 + n$: running `./crash` directly and then `echo $?` prints $139$.
:::
:::

::: warning `fork` failures and `exec` failures
Every call to `fork`, `execve` and `waitpid` can fail, and robust code checks. A child whose `exec` fails must not fall through into the parent's code: without the `_exit(127)` above, the child would continue running the rest of `main` as a second copy of the parent, which in a shell means two shells reading the same terminal. Also remember that `fork` returns twice: code after it runs in both processes unless a test on the return value separates them.
:::

## Signals

Exceptions are handled by the kernel. **Signals** carry the same idea up to user programs: a small message that notifies a process that an event of some type has occurred, interrupting its normal flow.

::: definition Signal {#def-signal}
A **signal** is a notification, identified by a small integer, sent to a process by the kernel (often on behalf of another process). A signal is **sent** (delivered to the destination's context) when the kernel detects a system event or a process calls `kill`; it is **received** when the destination is forced by the kernel to react to it. Between the two, it is **pending**. For each signal type a process has a **pending** bit and a **blocked** bit: a blocked signal can become pending but is not received until it is unblocked. On receipt, the process performs the signal's **action**: the default action (terminate, terminate and dump core, stop, continue, or ignore), or a user-defined **signal handler**, if one has been installed.
:::

| signal | number (Linux x86-64) | default action | typical cause |
|---|---|---|---|
| `SIGINT` | 2 | terminate | Ctrl-C typed at the terminal |
| `SIGQUIT` | 3 | terminate, core dump | Ctrl-\ |
| `SIGKILL` | 9 | terminate (cannot be caught or ignored) | `kill -9` |
| `SIGSEGV` | 11 | terminate, core dump | invalid memory reference |
| `SIGPIPE` | 13 | terminate | writing to a pipe with no reader |
| `SIGALRM` | 14 | terminate | timer set by `alarm` expired |
| `SIGTERM` | 15 | terminate | polite request to terminate (`kill` default) |
| `SIGCHLD` | 17 | ignore | a child stopped or terminated |
| `SIGSTOP` / `SIGTSTP` | 19 / 20 | stop | `kill -STOP` / Ctrl-Z |

Signals bridge hardware exceptions and software: a divide error becomes `SIGFPE`, an invalid memory access `SIGSEGV`; keyboard input becomes `SIGINT` through the terminal driver; and the kernel sends `SIGCHLD` to a parent when one of its children terminates.

Since a pending signal is recorded by a single bit, a fact of great practical importance follows.

::: proposition Signals are not queued {#prop-no-queue}
For each process and each (standard) signal type, at most one signal of that type is pending at any time. If a signal of type $k$ is sent while one of type $k$ is already pending, the second is discarded. Consequently, the number of times a handler for $k$ runs can be smaller than the number of signals of type $k$ sent.
:::

::: proof
Sending sets the pending bit $k$, and receiving clears it. Setting a bit that is already set does not change the state, so a second signal sent while the first is pending leaves no record. In particular, while a handler for $k$ runs, the kernel blocks $k$ (by default); if two further signals of type $k$ arrive during the handler, the first makes $k$ pending and the second is lost. When the handler returns, $k$ is received once more, so three signals cause two executions of the handler. (POSIX real-time signals, `SIGRTMIN` and above, *are* queued; this proposition concerns the standard signals.)
:::

::: example Tracing pending and blocked bits {#ex-pending}
A process has a handler for `SIGUSR1`. Three `SIGUSR1` signals are sent to it at times $t_1 < t_2 < t_3$; the first is received at once, and the handler is still running at $t_2$ and $t_3$. How many times does the handler run?
::: solution
Track the pending bit $p$ and the blocked bit $b$ of `SIGUSR1`.

| time | event | $p$ | $b$ | handler runs |
|---|---|---|---|---|
| $t_1$ | signal sent | 1 | 0 | |
| | received: $p$ cleared, $b$ set while the handler runs | 0 | 1 | 1st (starts) |
| $t_2$ | signal sent while blocked: becomes pending | 1 | 1 | |
| $t_3$ | signal sent: $p$ is already $1$, nothing changes | 1 | 1 | |
| | handler returns: $b$ cleared; pending signal received | 0 | 1 | 2nd (starts) |
| | handler returns | 0 | 0 | |

The handler runs twice for three signals: the signal sent at $t_3$ left no trace, exactly as [[#prop-no-queue]] predicts. Had the second signal been sent after the first handler finished, all three would have been handled.
:::
:::

The classic consequence is in reaping children: a `SIGCHLD` handler that calls `waitpid` once per signal will miss children that terminate in quick succession and leave zombies. A correct handler loops, `while (waitpid(-1, NULL, WNOHANG) > 0) ;`, reaping every terminated child each time it runs.

### Installing a handler

The portable way to install a handler is `sigaction`. The program below catches `SIGINT` and shuts down cleanly instead of dying; to run unattended, it sends the signal to itself with `kill(getpid(), SIGINT)` after a while, which is exactly what the terminal does when you press Ctrl-C.

```c
#define _POSIX_C_SOURCE 200809L
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

static volatile sig_atomic_t got_int = 0;   /* shared with the handler */

static void on_int(int sig) {
    (void) sig;
    got_int = 1;                  /* only set a flag: async-signal-safe */
}

int main(void) {
    struct sigaction sa;
    memset(&sa, 0, sizeof sa);
    sa.sa_handler = on_int;
    sigemptyset(&sa.sa_mask);
    if (sigaction(SIGINT, &sa, NULL) < 0) { perror("sigaction"); return 1; }

    printf("pid %d: press Ctrl-C to stop\n", (int) getpid());
    fflush(stdout);
    long work = 0;
    while (!got_int) {
        work++;                   /* pretend to do something useful */
        if (work % 100000000 == 0) kill(getpid(), SIGINT);   /* demo: interrupt ourselves */
    }
    printf("caught SIGINT after %ld iterations; cleaning up\n", work);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O1 -o sig sig.c && ./sig
pid 3338577: press Ctrl-C to stop
caught SIGINT after 100000000 iterations; cleaning up
```

The handler does almost nothing: it sets a flag, and the main loop notices. This is the recommended pattern, because a handler runs *concurrently* with the main program — it can interrupt it between any two instructions — which creates the same hazards as threads ([[parallel-computing]]).

::: warning What a signal handler may do
A signal can arrive while the main program is in the middle of `printf` or `malloc`, holding a lock or with a data structure half-updated. If the handler then calls `printf` or `malloc` itself, the program may deadlock or corrupt memory. POSIX lists the **async-signal-safe** functions that a handler may call — `write`, `_exit`, `waitpid`, `kill`, `sigaction` and some others, but *not* `printf`, `malloc`, `free` or `exit`. Keep handlers minimal: set a flag of type `volatile sig_atomic_t` (`volatile` stops the compiler from keeping the flag in a register across the loop; `sig_atomic_t` guarantees the write cannot be torn), save and restore `errno` if you call anything that may change it, and do the real work in the main program.
:::

### Nonlocal jumps

C also offers a user-level form of exceptional control flow: `setjmp(env)` saves the current registers, stack pointer and program counter in a buffer and returns $0$; a later `longjmp(env, v)` restores them, so that the `setjmp` call returns a second time, now with value $v$. This lets a deeply nested function abandon its callers and jump straight back to an error handler, the mechanism underneath exceptions in many language runtimes (C++ and Java implement `throw` differently, by unwinding the stack frame by frame). It skips any cleanup in the abandoned functions, so it is easy to leak memory or leave locks held; in modern C it is rarely the right tool.

::: history
Interrupts appeared in computers of the mid-1950s (the UNIVAC 1103A of 1956 is usually credited with the first interrupt facility), so that the processor need not wait idly for slow input and output. The Atlas computer (1962) combined interrupts, a supervisor running in a privileged mode, "extracodes" through which programs requested its services — system calls — and virtual memory with page faults. The process as an abstraction was developed in the time-sharing systems of the 1960s, notably CTSS (1961) and Multics (from 1965). `fork` and `exec` came to Unix from the Berkeley Timesharing System (Project Genie, mid-1960s); Dennis Ritchie and Ken Thompson's paper "The UNIX Time-Sharing System" (*Communications of the ACM*, 1974) describes them, with signals, essentially as they are used today. Early Unix signals were unreliable (a handler was reset to the default on each delivery); 4.2BSD (1983) introduced reliable signals and signal masks, and POSIX.1 (1988) standardised them as `sigaction`.
:::

## Where this leads

This chapter has shown the mechanisms; [[operating-systems]] shows how a kernel uses them: how the scheduler chooses which process runs next, how page faults implement demand paging and copy-on-write, and how threads share one address space between several flows of control. [[computer-systems/system-io]] continues with the file descriptors that processes inherit across `fork` and `exec`, which a shell uses to implement redirection (`>`) and pipes (`|`). Concurrency between handlers and main programs, and between threads, is the subject of [[parallel-computing]], and the privilege boundary between user and kernel mode is a recurring theme of [[security]].

::: summary
- An **exception** transfers control, through an exception table, to a kernel handler in **kernel mode**; the four classes are interrupts (asynchronous, from devices), traps (intentional: system calls), faults (possibly recoverable: page faults) and aborts.
- A **system call** is a trap: number in `%rax`, arguments in `%rdi, %rsi, %rdx, %r10, %r8, %r9`, then `syscall`. System calls cost hundreds of times more than function calls; `strace` lists them.
- A **process** is a program in execution with its own context, giving the illusions of a private control flow and a private address space; context switches, triggered by exceptions, interleave processes.
- `fork` returns twice — $0$ in the child, the child's PID in the parent — and copies the address space (copy-on-write); $n$ sequential forks make $2^n$ processes ([[#prop-fork-count]]). `execve` replaces the program; `exit` ends it; `waitpid` reaps zombies and decodes the status.
- **Signals** notify processes of events (Ctrl-C, child termination, invalid memory access); each type has a pending and a blocked bit, so standard signals are not queued ([[#prop-no-queue]]).
- Install handlers with `sigaction`, keep them minimal and async-signal-safe (set a `volatile sig_atomic_t` flag), and reap children in a loop.
:::

## Exercises

::: exercise Classifying exceptions {level=1}
Classify each event as an interrupt, trap, fault or abort, and say where control returns: (a) a program executes `syscall` to call `getpid`; (b) a disk controller signals that a transfer has finished; (c) a program writes to a page of its stack that has never been touched before; (d) a program jumps to address $0$; (e) a debugger's breakpoint instruction `int3` is executed.
::: solution
(a) Trap; returns to the instruction after `syscall` with the PID in `%rax`. (b) Interrupt; after the handler, the interrupted program resumes at its next instruction. (c) Fault (a page fault): the kernel allocates a zeroed page, maps it, and returns to the faulting instruction, which is re-executed and succeeds. (d) Fault: fetching an instruction from the unmapped page $0$ causes a page fault that the kernel cannot satisfy, so it sends `SIGSEGV` and the process (by default) terminates. (e) Trap; the kernel notifies the debugger, which may later resume the program at the next instruction.
:::
:::

::: exercise Counting forks {level=1 check="8"}
How many lines does this print? `for (int i = 0; i < 3; i++) fork(); printf("hi\n");` (Enter the number.)
::: solution
The loop executes three sequential `fork` calls in every process that reaches them, so by [[#prop-fork-count]] there are $2^3 = 8$ processes after the loop, each printing one line. Run with `wait` loops so that the program exits only after all children, and piped into `wc -l`, it gives `8`.
:::
:::

::: exercise Decoding exit statuses {level=1 check="6"}
A shell reports `$?` as $134$ after running a program. By which signal was the program killed? (Enter the signal number.)
::: solution
Shells report death by signal $n$ as $128 + n$, so $n = 134 - 128 = 6$: `SIGABRT`, sent by `abort()` — for instance by a failed `assert`, or by glibc when it detects heap corruption or a stack-protector failure (`__stack_chk_fail`, [[computer-systems/machine-code]]).
:::
:::

::: exercise Short-circuit forks {level=2 check="4"}
How many processes, including the original, execute the `printf` in `if (fork() && fork()) fork(); printf("x\n");`? Draw the process tree. (Enter the number.)
::: solution
Let $P$ be the original. The first `fork` creates $A$. In $A$ it returns $0$, so `&&` short-circuits: the condition is false and $A$ goes straight to `printf`. In $P$ it returns a positive PID, so $P$ evaluates the second `fork`, creating $B$; in $B$ it returns $0$, the condition is false, and $B$ prints. In $P$ the condition is true, so $P$ executes the third `fork`, creating $C$. Both $P$ and $C$ then print. Total: $P, A, B, C$, four processes; the tree has $P$ as the parent of $A$, $B$ and $C$. The program prints 4 lines.
:::
:::

::: exercise Possible outputs {level=2}
Without `wait` and with output to a terminal, list all possible outputs of

```c
int main(void) {
    printf("1\n");
    if (fork() == 0) printf("2\n");
    else printf("3\n");
    printf("4\n");
    return 0;
}
```
::: solution
The terminal is line-buffered, so `1\n` is written before the `fork` and printed once. After the fork, the child prints `2` then `4`, and the parent prints `3` then `4`; the two sequences can interleave arbitrarily, but each process's own order is preserved. There are $\binom{4}{2} = 6$ interleavings of $(2, 4)$ with $(3, 4)$, but because both processes print `4`, some of them produce the same text. The distinct outputs are

| output (one number per line) | how |
|---|---|
| `1 2 4 3 4` | child finishes before the parent prints |
| `1 2 3 4 4` | child 2, parent 3, then both 4s in either order |
| `1 3 2 4 4` | parent 3, child 2, then both 4s |
| `1 3 4 2 4` | parent finishes before the child prints |

four in all. If standard output were redirected to a file, the `1` would still be in the buffer at the `fork` and would be printed twice.
:::
:::

::: exercise Lost signals {level=2 check="1"}
A parent installs a `SIGUSR1` handler that increments a counter, blocks nothing else, forks a child that immediately sends three `SIGUSR1` signals to the parent with three consecutive `kill` calls and exits, and then waits for the child and prints the counter. What is the smallest value it can print? (Enter it.)
::: solution
By [[#prop-no-queue]], if all three signals arrive while the first is still pending (before the parent is scheduled to receive it), the second and third are discarded, and the handler runs once: the counter can be $1$. It can also be $2$ or $3$, depending on when the kernel delivers the signals relative to the `kill` calls. The value $0$ is impossible here, since the parent waits for the child and so receives the pending signal at the latest when it returns from `waitpid`. Counting events by counting signals is therefore unreliable; use a pipe or another queued mechanism.
:::
:::

::: exercise A tiny shell {level=3}
Write a shell `msh` that repeatedly prints a prompt, reads a line with `fgets`, splits it into words, runs the command with fork–execvp–waitpid, reports non-zero exit statuses, and supports a built-in `exit`. Why must `exit` be a built-in rather than a program?
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define MAXARGS 32

int main(void) {
    char line[1024];
    for (;;) {
        printf("msh> ");
        fflush(stdout);
        if (fgets(line, sizeof line, stdin) == NULL) break;   /* end of input */
        char *argv[MAXARGS];
        int argc = 0;
        for (char *tok = strtok(line, " \t\n"); tok && argc < MAXARGS - 1;
             tok = strtok(NULL, " \t\n"))
            argv[argc++] = tok;
        argv[argc] = NULL;
        if (argc == 0) continue;
        if (strcmp(argv[0], "exit") == 0) break;               /* a built-in */
        pid_t pid = fork();
        if (pid < 0) { perror("fork"); continue; }
        if (pid == 0) {
            execvp(argv[0], argv);
            perror(argv[0]);
            _exit(127);
        }
        int status;
        waitpid(pid, &status, 0);
        if (WIFEXITED(status) && WEXITSTATUS(status) != 0)
            printf("[exit %d]\n", WEXITSTATUS(status));
    }
    printf("\n");
    return 0;
}
```

```console
$ printf 'echo one two\nls /nonexistent\n\nnosuch\nexit\n' | ./msh
msh> one two
msh> ls: cannot access '/nonexistent': No such file or directory
[exit 2]
msh> msh> nosuch: No such file or directory
[exit 127]
msh>
```

(Typed input does not appear in the output because it came from a pipe; the empty line produced the doubled prompt.) `exit` must be built in because a program run by the shell executes in a *child* process: it could only terminate itself, not the shell. The same holds for `cd`, which must change the shell's own working directory. A real shell adds signal handling (Ctrl-C should interrupt the child, not the shell), job control, redirection and pipes ([[computer-systems/system-io]]).
:::
:::

::: exercise Reaping in a handler {level=3}
A server forks a child for every request and must never leave zombies, but cannot block in `waitpid` because it is busy accepting requests. Write a `SIGCHLD` handler that reaps correctly, and prove that, after the handler's last execution, no terminated child remains unreaped (assume no other code calls `wait`).
::: solution
```c
#include <errno.h>
#include <sys/wait.h>

static void on_chld(int sig) {
    (void) sig;
    int saved = errno;                        /* waitpid may change errno */
    while (waitpid(-1, NULL, WNOHANG) > 0)    /* reap every terminated child */
        ;
    errno = saved;
}
```

It is installed with `sigaction(SIGCHLD, …)`, ideally with `sa.sa_flags = SA_RESTART` so that interrupted system calls in the main program are restarted. Proof: consider any child $c$ that terminates. When it terminates, the kernel makes `SIGCHLD` pending. Either a handler invocation is already running at that moment, or not. If not, the pending signal is received later and the handler runs. If one is running, `SIGCHLD` is blocked during it and becomes pending, so the handler runs again after it returns. In both cases some execution of the handler *starts* after $c$ has terminated. That execution loops until `waitpid` returns $0$ (children exist but none has terminated) or $-1$ (no children): in either case no terminated, unreaped child exists at that point, and in particular $c$ has been reaped. The loop is essential: one handler run may be the only notification for several terminated children ([[#prop-no-queue]]). `waitpid` is async-signal-safe, and saving `errno` keeps the handler from disturbing a main program that was interrupted between a failing call and its check of `errno`.
:::
:::
