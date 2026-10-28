从计算机开机到关机的每一刻，处理器只做一件简单的事：执行一条指令，再执行下一条。它依次执行的地址序列就是它的**控制流**。在程序内部，控制流平顺地从一条指令移到下一条，只在跳转、调用和返回处改变，如 [[computer-systems/machine-code]] 所述——这些改变都是程序自己要求的。

但真实的系统还必须对程序未曾计划的事件作出反应。一个键被按下；一个网络分组到达；定时器到期，轮到另一个程序运行；程序除以零，或触碰了一个不在内存中的页，或请求操作系统读一个文件。这些事件中的每一个都引起一次既非跳转也非调用的控制流突变。这样的改变统称为**异常控制流**，它们发生在系统的每一个层次：硬件中（异常与中断）、操作系统中（进程之间的切换）、以及进程与内核之间（信号）。

本章自底向上研究它们。我们先定义异常及其四种类型，看程序如何通过系统调用请求内核的服务，然后介绍**进程**——也许是计算中最重要的一个抽象——以及创建和控制进程的 Unix 函数（`fork`、`execve`、`waitpid`、`exit`），最后是**信号**，异常控制流的软件形式。它们合在一起解释了 shell 如何运行你的程序，以及你按下 Ctrl-C 时会发生什么。

所有程序都在 x86-64 Linux（内核 7.0）和 glibc 2.43 上用 GCC 15.2 以 `gcc -std=c17 -Wall -Wextra` 编译。所用的函数属于 POSIX 而非 ISO C，因此每个程序都以 `#define _POSIX_C_SOURCE 200809L` 开头，它在 `-std=c17` 下使 POSIX 声明可见。输出中的进程号每次运行都不同。

## 异常

::: definition 异常 {#def-exception}
**异常**是对处理器状态某一变化（称为**事件**）的响应而发生的控制流突变。事件发生时，处理器停止当前指令流，保存足以恢复它的状态，并通过一张**异常表**——一张以**异常号**为下标的处理程序地址表——间接过程调用一个**异常处理程序**，后者在**内核态**运行。处理程序结束后，控制流要么返回被中断的指令，要么返回下一条指令，要么中止被中断的程序。
:::

异常号一部分由处理器的设计者规定（除法错误、缺页……），一部分由操作系统规定（系统调用、设备中断）。内核在启动时填好这张表，并由一个专门的寄存器保存其地址。与过程调用不同，异常会把处理器从**用户态**切换到**内核态**：前者之下程序只能执行普通指令、只能访问自己的内存，后者之下它可以执行特权指令（使处理器停机、修改页表、与设备通信）并访问任意内存。模式位正是操作系统得以保护自己和其他程序、使之不受有缺陷或恶意程序之害的机制：进入内核态的唯一途径是经过一个异常，到达内核自己选定的处理程序。

异常分为四种类型：

| 类型 | 起因 | 同步？ | 返回到 | 例子 |
|---|---|---|---|---|
| **中断** | I/O 设备或定时器发来的信号 | 否 | 下一条指令 | 定时器滴答、按键、分组到达、磁盘传送完成 |
| **陷入** | 有意的，由指令执行 | 是 | 下一条指令 | 系统调用（`syscall`）、断点（`int3`） |
| **故障** | 可能可恢复的错误 | 是 | 出错的那条指令（重新执行），或中止 | 缺页、保护错误、除法错误 |
| **终止** | 不可恢复的硬件错误 | 是 | 从不（程序被终止） | 机器检查（内存奇偶错误） |

**中断**是**异步的**：由处理器之外的事件引起，与当时恰好在执行的指令无关。设备在中断线上发出信号；当前指令执行完毕后处理器察觉到它，并运行处理程序；随后被中断的程序如同什么都没发生一样继续执行。其余三种类型是**同步的**：由执行某条特定指令引起。

**故障**是有意思的一类。当一条指令引用某个虚拟地址，而它所在的页此刻不在物理内存中时，就发生**缺页**（[[computer-systems/memory-hierarchy]]）。处理程序从磁盘调入该页，更新页表，然后返回*出错的那条指令*，该指令重新执行，这次成功了。程序对此毫不知情。反之，若这个地址根本不属于程序的地址空间，或者访问违反了页的权限（向只读代码写入、执行数据），内核就无从补救，只能终止程序——在 Linux 上通过向它发送 `SIGSEGV` 信号，即每个 C 程序员都领教过的"段错误"。

::: quiz
下列哪些事件引起同步异常？
- [x] 程序以零为除数执行 `idivq`。
- [ ] 程序在跑一个循环时，网卡收到一个分组。
- [x] 程序调用 `read`，后者执行 `syscall` 指令。
- [x] 程序解引用一个指向已换出到磁盘的页的指针。
- [ ] 定时器触发，结束一个程序的时间片。
::: solution
除零是一个故障（除法错误，Linux 以 `SIGFPE` 报告），`syscall` 是陷入，触碰换出的页是缺页——它们都由正在执行的那条指令引起。分组到达和定时器是中断，相对于正在运行的程序是异步的：无论程序在执行哪条指令，它们都会发生。
:::
:::

### 系统调用

用户程序不能直接读文件——磁盘是设备，只有内核可以触碰设备。它转而发起一次**系统调用**：一次陷入内核、请求某项服务的陷入。在 x86-64 Linux 上，程序把系统调用号放进 `%rax`，把至多六个实参放进 `%rdi`、`%rsi`、`%rdx`、`%r10`、`%r8` 和 `%r9`（几乎就是 [[computer-systems/machine-code#def-abi]] 的调用约定，只是用 `%r10` 代替 `%rcx`），然后执行 `syscall` 指令。内核的处理程序在系统调用表中按号查找，执行所请求的服务，并把结果放在 `%rax` 中返回；$-4095$ 到 $-1$ 之间的值表示错误，C 库的包装函数把该错误取负存入 `errno`，然后返回 $-1$。

系统调用共有几百个（在 x86-64 Linux 上，`read` 是 0 号，`write` 是 1 号，`open` 是 2 号，`fork` 是 57 号，`execve` 是 59 号，`exit` 是 60 号，`kill` 是 62 号）。C 程序通常经由 C 库中薄薄的包装函数来使用它们，这些函数声明在 `<unistd.h>` 及相关头文件中：

```c
#include <unistd.h>

int main(void) {
    write(1, "hello\n", 6);     /* 系统调用：fd 1 是标准输出 */
    return 0;
}
```

`strace` 工具运行一个程序，并记录它发起的每一次系统调用。对这个程序它记录了 32 次调用；头一个和最后几个是：

```console
$ strace -o trace.txt ./hello > /dev/null
$ head -1 trace.txt; tail -3 trace.txt
execve("./hello", ["./hello"], 0x7ffcd9976690 /* 54 vars */) = 0
write(1, "hello\n", 6)                  = 6
exit_group(0)                           = ?
+++ exited with 0 +++
```

其间的调用是 [[computer-systems/linking-loading]] 的动态链接器在干活：打开 `libc.so.6`，用 `mmap` 把它映射进内存，设置保护属性。我们自己的程序恰好只发起一次系统调用 `write`，它返回 $6$，即写入的字节数；从 `main` 返回则以 `exit_group` 收尾。

::: example 一次失败的系统调用 {#ex-syscall}
当程序调用 `write(42, "hi\n", 3)` 而描述符 42 并未打开时，在寄存器和 `errno` 的层面上会发生什么？

```c
#define _POSIX_C_SOURCE 200809L
#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void) {
    ssize_t n = write(42, "hi\n", 3);         /* 描述符 42 未打开 */
    int e = errno;                             /* 在调用其他任何东西之前先保存 */
    printf("write returned %zd, errno = %d (%s)\n", n, e, strerror(e));
    return 0;
}
```
::: solution
库包装函数 `write` 把系统调用号 $1$ 放进 `%rax`，描述符 $42$ 放进 `%rdi`，字符串的地址放进 `%rsi`，个数 $3$ 放进 `%rdx`，然后执行 `syscall`。内核在该进程的表里找不到描述符为 $42$ 的已打开文件，于是在 `%rax` 中返回 $-9$，即 $-$`EBADF`。包装函数看到 $[-4095, -1]$ 内的值，把 $9$ 存入 `errno`，并返回 $-1$。程序打印

```console
$ ./badfd
write returned -1, errno = 9 (Bad file descriptor)
```

`strace` 则显示内核眼中的情形：`write(42, "hi\n", 3) = -1 EBADF (Bad file descriptor)`。由此得出两个习惯：永远要检查系统调用的返回值；并且要立刻读取 `errno`，因为之后的任何一次库调用（这里是 `printf`）都可能改变它。
:::
:::

系统调用比函数调用昂贵得多，因为要切换模式，还要保存和检查状态。在测试机上（一台 2014 年的 Xeon，运行 2026 内核，启用了针对 Spectre 与 Meltdown 处理器漏洞的缓解措施），一次最简系统调用 `getppid` 在一千万次循环中约需 430 ns——这是对一台机器的**观察**；其他机器上从不足 100 ns 到几百 ns 不等。一次函数调用约需 1 ns。标准库之所以对输入输出作缓冲，正是为了摊薄这一代价（[[computer-systems/system-io]]）。

## 进程

::: definition 进程 {#def-process}
**进程**是一个正在执行的程序实例。每个进程都有自己的**上下文**：内存中程序的代码和数据、它的栈、寄存器和程序计数器的内容、它的环境变量和已打开的文件描述符，以及内核的簿记。进程抽象赋予每个程序两种幻象：

- **逻辑控制流**：程序仿佛独占处理器，毫无反扰地一条接一条执行自己的指令；
- **私有地址空间**：程序仿佛独占整个内存（[[computer-systems/memory-hierarchy]] 解释虚拟内存如何提供它）。
:::

独占处理器的幻象由**上下文切换**产生。内核的**调度器**让一个进程运行一个**时间片**（几毫秒）；随后定时器中断进入内核，内核保存当前进程的寄存器，挑选另一个进程，恢复它的寄存器并切换到它的地址空间，然后从异常返回——返回到另一个进程中。发出必须等待的系统调用（从磁盘或网络连接读取）的进程同样会被换出，直到它的数据到达。执行在时间上重叠的两个进程是**并发的**；在多核机器上，它们还可能真正**并行**地运行。调度策略是 [[operating-systems]] 的核心主题。

::: widget graph
nodes: kernel@3,2; P1@1,0; P2@3,0; P3@5,0
edges: P1>kernel; kernel>P2; P2>kernel; kernel>P3; P3>kernel; kernel>P1
algorithm: bfs
start: P1
caption: 三个进程与内核之间控制权的传递。每一条进入 `kernel` 的箭头都是一次异常——结束时间片的定时器中断、一次系统调用或一次故障——每一条离开它的箭头都是某次异常的返回，经上下文切换后可能*进入另一个进程*。注意：进程从不直接把控制权交给彼此，一切切换都要经过内核态。从 `P1` 起逐步执行这次搜索，可以看到每个进程都只能经由内核到达。
:::

### 创建进程：fork

在 Unix 中，新进程通过复制现有进程来创建。

::: definition fork {#def-fork}
函数 `pid_t fork(void)` 创建一个新的**子进程**，它是调用者（**父进程**）几乎完全相同的副本：它得到父进程地址空间（代码、数据、堆区、栈）、寄存器和已打开文件描述符的副本，并在同一点开始执行，从同一次 `fork` 调用返回。两者的不同在于各自的**进程号**（`getpid()`）和返回值：`fork` 在子进程中返回 $0$，在父进程中返回子进程的（正的）PID；若无法创建子进程，则在父进程中返回 $-1$。
:::

`fork` 被调用一次却**返回两次**，在每个进程中各返回一次。此后二者并发运行，先后次序由调度器决定，各自持有每个变量的一份独立副本：

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
    if (pid == 0) {                       /* 子进程 */
        x++;
        printf("child:  x = %d, pid = %d, parent = %d\n", x, (int) getpid(), (int) getppid());
        exit(0);
    }
    int status;                           /* 父进程 */
    waitpid(pid, &status, 0);             /* 等待子进程结束 */
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

子进程的加一和父进程的减一作用在 `x` 的不同副本上。复制整个地址空间听起来昂贵，但内核使用**写时复制**：父进程和子进程起初共享同样的物理页，并把它们标为只读；只有当其中一个写入某个页时，这个页才会被复制。

由于每个进程都能调用 `fork`，一个系统的所有进程构成一棵树，树根是第一个用户进程（`init`，PID 为 1，如今通常是 `systemd`）；一个连续调用几次 `fork` 的程序也会生成一棵自己的树。

::: proposition 数进程 {#prop-fork-count}
若一个进程依次执行 $n$ 次 `fork` 调用（每次调用都被到达它的每个进程无条件且成功地执行），那么连同原来的进程在内，共有 $2^n$ 个进程走完了这一串调用。
:::

::: proof
对 $n$ 归纳。$n = 0$ 时只有一个进程。设有 $2^{n-1}$ 个进程到达第 $n$ 次调用。它们每个都执行这次调用，而每次调用产生一个额外的进程，从同一点继续执行；于是调用之后共有 $2 \cdot 2^{n-1} = 2^n$ 个进程，全都继续往下走。
:::

所以 `fork(); fork(); printf("hello\n");` 打印四行，一个含三次无条件 `fork` 的循环打印八行。在循环里不加节制地 fork 的程序会耗尽系统的进程限额（"fork 炸弹"）；用 `ulimit -u` 设定的每用户限额就是防线。

::: example 输出的可能次序 {#ex-fork-order}
考虑

```c
int main(void) {
    printf("A");               /* 待在 stdio 缓冲区里，尚未写出 */
    if (fork() == 0) {
        printf("B\n");
        return 0;
    }
    wait(NULL);
    printf("C\n");
    return 0;
}
```

（连同上一个程序的各个头文件）。它打印

```console
$ ./forkbuf
AB
AC
```

为什么 `A` 被打印了两次？为什么 `B` 必定先于 `C`？
::: solution
`printf("A")` 此刻什么都没写：C 库把输出收集在进程内存中的一个缓冲区里，只有当向终端打印了换行、缓冲区写满、或程序退出时，才用 `write` 系统调用写出去（标准输出是管道或文件时，只有后两种情形；[[computer-systems/system-io]]）。`fork` 的那一刻，缓冲区里装着 `"A"`，而子进程得到整个地址空间的副本——包括这个缓冲区。于是每个进程稍后都在自己的那个 `A` 后面打印自己那一行。

次序是 `wait(NULL)` 逼出来的：父进程要等子进程终止之后才打印 `C`，那时子进程早已刷出了 `"AB\n"`（最迟在退出时刷出）。没有 `wait` 的话，`AB` / `AC` 和 `AC` / `AB` 都可能。教训是：输出可能尚悬在缓冲区里时，要在 `fork` 之前调用 `fflush(stdout)`——否则子进程会把它们继承过去。
:::
:::

### 等待与退出

进程因从 `main` 返回而终止，或因调用 `exit(status)` 而终止，或因收到一个默认动作为终止它的信号而终止。状态的低位 8 位会传给父进程。终止的进程不会立刻消失：它仍是一个**僵尸进程**，保留着自己的 PID 和退出状态，直到父进程用 `wait` 或 `waitpid` **回收**它：

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) exit(7);                 /* 子进程立即退出 */
    sleep(1);                              /* 此时子进程是僵尸进程 */
    char cmd[64];
    snprintf(cmd, sizeof cmd, "ps -o pid,stat,comm -p %d", (int) pid);
    system(cmd);
    int status;
    waitpid(pid, &status, 0);              /* 回收它 */
    printf("reaped %d, status %d\n", (int) pid, WEXITSTATUS(status));
    fflush(stdout);                        /* 在 ps 写同一输出之前先刷出 */
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

`ps` 显示子进程处于状态 `Z`，直到它被回收；此后它就消失了。僵尸进程几乎不占内存，但一个从不回收子进程的长期运行的服务器会慢慢耗尽进程表。若父进程先终止，它的子进程就成为**孤儿进程**，由 `init`（或指定的"subreaper"）收养，并由它负责回收。

`waitpid(pid, &status, options)` 等待子进程 `pid`（`pid` 为 $-1$ 时等待任一子进程），并保存一个由宏解读的状态字：正常退出用 `WIFEXITED(status)` 与 `WEXITSTATUS(status)` 判断，被信号终止用 `WIFSIGNALED(status)` 与 `WTERMSIG(status)` 判断。选项 `WNOHANG` 使得尚无任何子进程终止时它立即返回 $0$，而不是阻塞。

### 运行程序：execve

`fork` 创建的是*同一个*程序的副本。要运行一个*不同的*程序，进程调用

```c
int execve(const char *path, char *const argv[], char *const envp[]);
```

它把调用进程的代码、数据、堆区和栈替换为从 `path` 装入的一个新程序（如 [[computer-systems/linking-loading]] 所述），并以给定的参数数组和环境数组（二者都以空指针结尾）在其入口处开始执行该程序。PID 和已打开的文件描述符保持不变。`execve` 只在失败时返回；成功了就没有什么可返回的了。库变体 `execvp` 与 `execlp` 会在 `PATH` 环境变量的各目录中搜索该程序。

**先 fork 再 exec** 这一对是 Unix 启动每个程序的方式：父进程 fork；子进程——父进程的一份副本——可以先调整自己的环境（重定向文件描述符、改变目录、放弃特权），再 exec 新程序；父进程则等待。下面是一个 shell 的核心，它执行命令行上给出的一个命令：

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

/* 运行我们命令行上给出的命令，并报告它如何结束。 */
int main(int argc, char *argv[]) {
    if (argc < 2) { fprintf(stderr, "usage: %s cmd [args...]\n", argv[0]); return 2; }
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return 1; }
    if (pid == 0) {
        execvp(argv[1], &argv[1]);        /* 只在失败时返回 */
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

::: example 运行命令 {#ex-run}
解释这次会话的每一行，其中 `crash` 是一个解引用空指针的程序。

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
每种情形下 `run` 都先 fork，子进程调用 `execvp`，以 `argv[1]` 为程序名、`&argv[1]` 为参数向量——于是新程序把 `echo`、`hi`、`there` 看成它的 `argv[0..2]`，其后是结束 `argv` 的空指针。

`echo` 打印它的参数并以状态 $0$ 退出。`ls` 找不到那个目录，以状态 $2$ 退出（这是它的文档规定的严重错误状态）。对 `nosuchcmd`，`execvp` 在 `PATH` 中找不到这个程序，*返回*到仍处于子进程中的调用处，于是子进程报告错误并调用 `_exit(127)`——shell 对"命令未找到"使用的状态码。子进程用 `_exit` 而不用 `exit`，这样就不会刷新它从父进程继承来的 stdio 缓冲区（[[#ex-fork-order]] 的输出重复问题）。最后，`crash` 进行了一次非法内存访问；MMU 产生一次缺页，内核发现该地址未被映射，于是用信号 11（`SIGSEGV`）终止该进程。`waitpid` 通过 `WIFSIGNALED` 报告这一点。像 `bash` 这样的 shell 会把死于信号 $n$ 报告为退出状态 $128 + n$：直接运行 `./crash` 再 `echo $?` 打印 $139$。
:::
:::

::: warning `fork` 失败与 `exec` 失败
对 `fork`、`execve` 和 `waitpid` 的每一次调用都可能失败，健壮的代码要逐一检查。`exec` 失败的子进程决不能落进父进程的代码：没有上面那句 `_exit(127)`，子进程就会作为父进程的第二份副本继续执行 `main` 剩下的部分；放在 shell 里，这就意味着两个 shell 在读同一个终端。还要记住 `fork` 返回两次：其后的代码除非用对返回值的测试把二者分开，否则在两个进程中都会执行。
:::

## 信号

异常由内核处理。**信号**把同样的思想带到用户程序这一层：一条小消息，通知进程某类事件已经发生、打断了它的正常流程。

::: definition 信号 {#def-signal}
**信号**是由内核（常常是代另一个进程）发给一个进程、用一个小整数标识的通知。内核检测到某个系统事件、或某进程调用 `kill` 时，信号被**发出**（递送到目标的上下文中）；当内核迫使目标对其作出反应时，信号被**接收**。二者之间，它处于**挂起**状态。对每种信号类型，进程各有一个**挂起**位和一个**阻塞**位：被阻塞的信号可以变为挂起，但在解除阻塞之前不会被接收。接收时，进程执行该信号的**动作**：默认动作（终止、终止并转储核心、停止、继续或忽略），或若已安装，则为用户定义的**信号处理程序**。
:::

| 信号 | 编号（Linux x86-64） | 默认动作 | 典型起因 |
|---|---|---|---|
| `SIGINT` | 2 | 终止 | 在终端按下 Ctrl-C |
| `SIGQUIT` | 3 | 终止并转储核心 | Ctrl-\ |
| `SIGKILL` | 9 | 终止（不可捕获、不可忽略） | `kill -9` |
| `SIGSEGV` | 11 | 终止并转储核心 | 非法内存引用 |
| `SIGPIPE` | 13 | 终止 | 向没有读取者的管道写入 |
| `SIGALRM` | 14 | 终止 | `alarm` 设置的定时器到期 |
| `SIGTERM` | 15 | 终止 | 礼貌的终止请求（`kill` 的默认信号） |
| `SIGCHLD` | 17 | 忽略 | 子进程停止或终止 |
| `SIGSTOP` / `SIGTSTP` | 19 / 20 | 停止 | `kill -STOP` / Ctrl-Z |

信号衔接了硬件异常与软件世界：除法错误变成 `SIGFPE`，非法内存引用变成 `SIGSEGV`；键盘输入经由终端驱动程序变成 `SIGINT`；子进程之一终止时，内核向其父进程发送 `SIGCHLD`。

由于挂起的信号只用一个位记录，下面这条在实践中极重要的事实随之而来。

::: proposition 信号不排队 {#prop-no-queue}
对每个进程的每种（标准）信号类型，同一时刻至多有一个该类型的信号处于挂起状态。若类型 $k$ 已有一个信号挂起时又发出一个类型 $k$ 的信号，第二个就被丢弃。因此，$k$ 的处理程序运行的次数可能少于发出的类型 $k$ 的信号条数。
:::

::: proof
发出置起挂起位 $k$，接收清除它。对一个已经置起的位再置起不会改变状态，所以第一个信号挂起时发出的第二个信号不留任何记录。特别地，$k$ 的处理程序运行期间，内核（默认）会阻塞 $k$；若处理程序运行中又到达两个类型 $k$ 的信号，第一个使 $k$ 挂起，第二个就丢了。处理程序返回时，$k$ 再被接收一次，所以三条信号只引起处理程序两次执行。（POSIX 实时信号，即 `SIGRTMIN` 及以上，*是*排队的；本命题只谈标准信号。）
:::

::: example 追踪挂起位与阻塞位 {#ex-pending}
某进程为 `SIGUSR1` 装了处理程序。在时刻 $t_1 < t_2 < t_3$ 分别向它发出一个 `SIGUSR1` 信号；第一个立即被接收，而处理程序在 $t_2$ 和 $t_3$ 时刻仍在运行。处理程序共运行几次？
::: solution
追踪 `SIGUSR1` 的挂起位 $p$ 和阻塞位 $b$。

| 时刻 | 事件 | $p$ | $b$ | 处理程序运行 |
|---|---|---|---|---|
| $t_1$ | 信号发出 | 1 | 0 | |
| | 接收：$p$ 清零，处理程序运行期间 $b$ 置起 | 0 | 1 | 第 1 次（开始） |
| $t_2$ | 阻塞期间发出：变为挂起 | 1 | 1 | |
| $t_3$ | 信号发出：$p$ 已是 $1$，什么都不改变 | 1 | 1 | |
| | 处理程序返回：$b$ 清零；挂起的信号被接收 | 0 | 1 | 第 2 次（开始） |
| | 处理程序返回 | 0 | 0 | |

三条信号只让处理程序运行两次：$t_3$ 发出的那条没有留下任何痕迹，正像 [[#prop-no-queue]] 预言的那样。倘若第二个信号是在第一个处理程序结束之后发出的，三条就都会被处理。
:::
:::

一个经典的后果出在回收子进程上：每收到一次信号只调用一次 `waitpid` 的 `SIGCHLD` 处理程序，会漏掉相继迅速终止的子进程，留下僵尸。正确的处理程序应当循环：`while (waitpid(-1, NULL, WNOHANG) > 0) ;`，每次运行都把所有已终止的子进程收干净。

### 安装处理程序

安装处理程序的可移植办法是 `sigaction`。下面这个程序捕获 `SIGINT` 并干净地收场，而不是一死了之；为了无人值守地运行，它在一阵之后用 `kill(getpid(), SIGINT)` 把信号发给自己，这正是你在终端按下 Ctrl-C 时终端所做的事。

```c
#define _POSIX_C_SOURCE 200809L
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

static volatile sig_atomic_t got_int = 0;   /* 与处理程序共享 */

static void on_int(int sig) {
    (void) sig;
    got_int = 1;                  /* 只置一个标志：异步信号安全 */
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
        work++;                   /* 假装在做有用的事 */
        if (work % 100000000 == 0) kill(getpid(), SIGINT);   /* 演示：打断我们自己 */
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

处理程序几乎什么都不做：置一个标志，让主循环去察觉。这是推荐的模式，因为处理程序与主程序*并发*运行——它可以插进任意两条指令之间打断主程序——这就造成了与线程相同的危险（[[parallel-computing]]）。

::: warning 信号处理程序可以做什么
信号可能恰好在主程序做 `printf` 或 `malloc` 做到一半时到来，此刻它可能正持有锁，或某个数据结构更新到一半。倘若处理程序此时自己再调用 `printf` 或 `malloc`，程序就可能死锁或破坏内存。POSIX 列出了处理程序可以调用的**异步信号安全**函数——`write`、`_exit`、`waitpid`、`kill`、`sigaction` 等若干，但*不包括* `printf`、`malloc`、`free` 或 `exit`。让处理程序尽量精简：置一个 `volatile sig_atomic_t` 类型的标志（`volatile` 使编译器不会把这个标志跨循环留在寄存器里；`sig_atomic_t` 保证这次写入不会被撕开），若调用了可能改变 `errno` 的函数就要保存并恢复 `errno`，而把真正的工作留给主程序。
:::

### 非局部跳转

C 还提供一种用户级的异常控制流：`setjmp(env)` 把当前的寄存器、栈指针和程序计数器保存进一个缓冲区并返回 $0$；之后的 `longjmp(env, v)` 把它们恢复，于是那次 `setjmp` 调用第二次返回，这一次带着值 $v$。这让一个深陷的函数抛下它的调用者，直接跳回错误处理程序，许多语言运行时中异常机制的底层就是它（C++ 与 Java 实现 `throw` 的方式不同，是逐帧展开调用栈）。它会跳过被抛下的函数中的任何清理工作，因此很容易造成内存泄漏或锁未释放；在现代 C 中，它很少是正确的工具。

::: history
中断出现在 20 世纪 50 年代中期的计算机上（通常认为 1956 年的 UNIVAC 1103A 最早具备中断设施），处理器从此不必干等慢速的输入输出。Atlas 计算机（1962）把中断、运行在特权态的管理程序、程序借此请求其服务的"外部码"（extracode，即系统调用），以及带有缺页的虚拟内存结合在了一起。进程这一抽象发展于 20 世纪 60 年代的分时系统，尤其是 CTSS（1961）和 Multics（始于 1965）。`fork` 和 `exec` 从伯克利分时系统（Project Genie，60 年代中期）传入 Unix；里奇（Ritchie）与汤普森（Thompson）的论文《UNIX 分时系统》（*The UNIX Time-Sharing System*，*Communications of the ACM*，1974）对它们连同信号的描述，与今天的用法已无本质区别。早期 Unix 的信号是不可靠的（每次递送后处理程序都会被重置为默认）；4.2BSD（1983）引入了可靠信号和信号屏蔽字，POSIX.1（1988）把它们标准化为 `sigaction`。
:::

## 后续内容

本章展示了这些机制；[[operating-systems]] 展示内核如何使用它们：调度器如何选择下一个运行的进程，缺页如何实现请求调页和写时复制，线程如何在同一条地址空间中承载多条控制流。[[computer-systems/system-io]] 接着讲进程穿过 `fork` 和 `exec` 而继承下来的文件描述符，shell 用它们实现重定向（`>`）和管道（`|`）。处理程序与主程序之间、线程与线程之间的并发是 [[parallel-computing]] 的主题，而用户态与内核态之间的特权边界则是 [[security]] 反复出现的主题。

::: summary
- **异常**经异常表把控制权交给**内核态**中的内核处理程序；四种类型是中断（异步，来自设备）、陷入（有意为之：系统调用）、故障（可能可恢复：缺页）和终止。
- **系统调用**是一种陷入：调用号在 `%rax`，实参在 `%rdi, %rsi, %rdx, %r10, %r8, %r9`，然后执行 `syscall`。系统调用比函数调用昂贵数百倍；`strace` 能把它们一一列出。
- **进程**是一个正在执行、拥有自己上下文的程序，带来私有控制流与私有地址空间两种幻象；由异常引发的上下文切换使进程交替推进。
- `fork` 调用一次返回两次——在子进程中返回 $0$，在父进程中返回子进程的 PID——并复制地址空间（写时复制）；连续 $n$ 次 fork 产生 $2^n$ 个进程（[[#prop-fork-count]]）。`execve` 替换程序；`exit` 结束程序；`waitpid` 回收僵尸进程并解读状态。
- **信号**向进程通报事件（Ctrl-C、子进程终止、非法内存访问）；每种类型各有一个挂起位和一个阻塞位，所以标准信号不排队（[[#prop-no-queue]]）。
- 用 `sigaction` 安装处理程序；让它们保持精简且异步信号安全（置一个 `volatile sig_atomic_t` 标志），并在循环中回收子进程。
:::

## 习题

::: exercise 异常的分类 {level=1}
把每个事件归类为中断、陷入、故障或终止，并说明控制权返回到哪里：(a) 程序执行 `syscall` 调用 `getpid`；(b) 磁盘控制器发出信号说一次传送已经结束；(c) 程序向自己栈中一个从未被触碰过的页写入；(d) 程序跳转到地址 $0$；(e) 调试器的断点指令 `int3` 被执行。
::: solution
(a) 陷入；带着 `%rax` 中的 PID 返回 `syscall` 之后的那条指令。(b) 中断；处理程序结束后，被中断的程序从它的下一条指令继续。(c) 故障（缺页）：内核分配一个清零的页，将它映射，然后返回出错的那条指令，该指令重新执行并成功。(d) 故障：从未映射的页 $0$ 取指令引起一次内核无法满足的缺页，于是内核发送 `SIGSEGV`，进程（默认）终止。(e) 陷入；内核通知调试器，调试器之后可能从下一条指令恢复该程序。
:::
:::

::: exercise 数 fork {level=1 check="8"}
这段代码打印多少行？`for (int i = 0; i < 3; i++) fork(); printf("hi\n");`（输入数字。）
::: solution
循环在每个到达它的进程中执行三次连续的 `fork` 调用，所以由 [[#prop-fork-count]]，循环之后共有 $2^3 = 8$ 个进程，各打印一行。加上 `wait` 循环使程序在所有子进程结束之后才退出，并把输出接给 `wc -l`，得到 `8`。
:::
:::

::: exercise 解读退出状态 {level=1 check="6"}
一个 shell 运行某程序后把 `$?` 报告为 $134$。该程序是被哪个信号杀死的？（输入信号编号。）
::: solution
shell 把死于信号 $n$ 报告为 $128 + n$，所以 $n = 134 - 128 = 6$：`SIGABRT`，由 `abort()` 发出——例如 `assert` 失败时，或 glibc 检测到堆损坏或栈保护失效（`__stack_chk_fail`，[[computer-systems/machine-code]]）时发出。
:::
:::

::: exercise 短路求值的 fork {level=2 check="4"}
在 `if (fork() && fork()) fork(); printf("x\n");` 中，连同原来的进程在内，有多少个进程执行了那个 `printf`？画出进程树。（输入数字。）
::: solution
设 $P$ 为原来的进程。第一次 `fork` 创建 $A$。在 $A$ 中它返回 $0$，于是 `&&` 短路：条件为假，$A$ 直接走向 `printf`。在 $P$ 中它返回一个正的 PID，于是 $P$ 求值第二次 `fork`，创建 $B$；在 $B$ 中它返回 $0$，条件为假，$B$ 打印。在 $P$ 中条件为真，于是 $P$ 执行第三次 `fork`，创建 $C$。$P$ 与 $C$ 随后都打印。总共 $P, A, B, C$ 四个进程；进程树中 $P$ 是 $A$、$B$、$C$ 的父进程。程序打印 4 行。
:::
:::

::: exercise 所有可能的输出 {level=2}
不设 `wait`、输出接终端时，列出下列程序所有可能的输出

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
终端是行缓冲的，所以 `1\n` 在 `fork` 之前就已写出，只打印一次。fork 之后，子进程先打印 `2` 再打印 `4`，父进程先打印 `3` 再打印 `4`；两个序列可以任意交织，但每个进程自己的先后次序保持不变。$(2, 4)$ 与 $(3, 4)$ 的交织共有 $\binom{4}{2} = 6$ 种，但由于两个进程都打印 `4`，其中一些产生相同的文本。互不相同的输出是

| 输出（每行一个数字） | 情形 |
|---|---|
| `1 2 4 3 4` | 子进程在父进程打印之前结束 |
| `1 2 3 4 4` | 子进程打印 2，父进程打印 3，然后两个 4 任意先后 |
| `1 3 2 4 4` | 父进程打印 3，子进程打印 2，然后两个 4 |
| `1 3 4 2 4` | 父进程在子进程打印之前结束 |

共四种。若标准输出被重定向到文件，`fork` 时那个 `1` 还留在缓冲区里，就会被打印两次。
:::
:::

::: exercise 丢失的信号 {level=2 check="1"}
一个父进程安装一个把计数器加一的 `SIGUSR1` 处理程序，此外不阻塞任何信号；然后 fork 一个子进程，子进程立刻用连续三次 `kill` 调用向父进程发出三个 `SIGUSR1` 信号并退出；父进程随后等待子进程并打印计数器。它能打印出的最小值是多少？（输入该值。）
::: solution
由 [[#prop-no-queue]]，若三条信号都在第一个仍挂起时（父进程尚未被调度去接收它）到达，第二、三条就被丢弃，处理程序只运行一次：计数器可以是 $1$。依内核相对于三次 `kill` 调用何时递送信号，它也可能是 $2$ 或 $3$。这里 $0$ 不可能，因为父进程要等子进程，而最迟在从 `waitpid` 返回时它会接收挂起的信号。因此，靠数信号来数事件是不可靠的；应当使用管道或其他会排队的机制。
:::
:::

::: exercise 一个小型 shell {level=3}
写一个 shell `msh`：反复打印提示符，用 `fgets` 读一行，把它拆成单词，用 fork–execvp–waitpid 执行命令，报告非零退出状态，并支持内建命令 `exit`。为什么 `exit` 必须是内建命令而不能是一个程序？
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
        if (fgets(line, sizeof line, stdin) == NULL) break;   /* 输入结束 */
        char *argv[MAXARGS];
        int argc = 0;
        for (char *tok = strtok(line, " \t\n"); tok && argc < MAXARGS - 1;
             tok = strtok(NULL, " \t\n"))
            argv[argc++] = tok;
        argv[argc] = NULL;
        if (argc == 0) continue;
        if (strcmp(argv[0], "exit") == 0) break;               /* 内建命令 */
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

（键入的输入没有出现在输出里，因为它来自管道；空行造成了成对出现的提示符。）`exit` 必须内建，因为由 shell 运行的程序在*子*进程中执行：它只能终止自己，不能终止 shell。`cd` 也一样，它必须改变 shell 自己的工作目录。真正的 shell 还会加上信号处理（Ctrl-C 应当打断子进程而不是 shell）、作业控制、重定向和管道（[[computer-systems/system-io]]）。
:::
:::

::: exercise 在处理程序中回收 {level=3}
一个服务器为每个请求 fork 一个子进程，必须绝不留僵尸，但又因为忙于接受请求而不能阻塞在 `waitpid` 上。写一个能正确回收的 `SIGCHLD` 处理程序，并证明在处理程序最后一次执行之后，不会留下任何已终止而未被回收的子进程（假定其他代码都不调用 `wait`）。
::: solution
```c
#include <errno.h>
#include <sys/wait.h>

static void on_chld(int sig) {
    (void) sig;
    int saved = errno;                        /* waitpid 可能改变 errno */
    while (waitpid(-1, NULL, WNOHANG) > 0)    /* 回收每一个已终止的子进程 */
        ;
    errno = saved;
}
```

它用 `sigaction(SIGCHLD, …)` 安装，最好设 `sa.sa_flags = SA_RESTART`，使主程序中被中断的系统调用得以重新启动。证明：考虑任一终止的子进程 $c$。它终止时，内核使 `SIGCHLD` 挂起。要么那一刻已有一次处理程序调用正在运行，要么没有。若没有，挂起的信号稍后会被接收，处理程序随之运行。若有一次正在运行，`SIGCHLD` 在其运行期间被阻塞并变为挂起，所以处理程序在它返回之后还会运行一次。两种情形下，都有某次处理程序的执行在 $c$ 终止*之后开始*。那次执行会一直循环到 `waitpid` 返回 $0$（存在子进程但没有已终止的）或 $-1$（没有子进程）为止：两种情况下，此刻都不存在已终止而未被回收的子进程，特别地，$c$ 已被回收。这个循环必不可少：一次处理程序运行可能是若干已终止子进程的唯一通知（[[#prop-no-queue]]）。`waitpid` 是异步信号安全的；保存 `errno` 使处理程序不会搅扰这样一个主程序——它恰在一次失败的调用与其对 `errno` 的检查之间被打断。
:::
:::
