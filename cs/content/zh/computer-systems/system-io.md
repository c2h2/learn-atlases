一个程序用 `putchar` 写出一百万个字符，在测试机上不到百分之一秒就跑完了。同样的程序每写一个字符调用一次 `write` 系统调用，则要耗时将近一秒，`strace` 道出了原因：前者发出 245 次系统调用，后者一百万次。两者产生的输出完全相同。

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    int raw = argc > 1 && strcmp(argv[1], "raw") == 0;
    for (int i = 0; i < 1000000; i++) {
        char c = 'a' + i % 26;
        if (raw)
            { if (write(1, &c, 1) != 1) return 1; }   /* 每个字节一次系统调用 */
        else
            putchar(c);              /* 由 C 库缓冲 */
    }
    return 0;
}
```

```console
$ ./chars > out.buf; ./chars raw > out.raw; cmp out.buf out.raw && echo same
same
$ strace -c -e trace=write ./chars > /dev/null       # buffered by stdio
100.00    0.000145           0       245           write
$ strace -c -e trace=write ./chars raw > /dev/null   # one write per byte
100.00    2.507726           2   1000000           write
```

输入与输出——读写文件、终端、管道和网络连接——是程序与外部世界相接的地方，而每一步都由操作系统居中调停。本章是这门课的最后一章，讲解 Linux 与 macOS 上一切语言的输入输出背后共同依赖的 Unix I/O 模型：**文件描述符**；`open`、`read`、`write`、`close` 这几个系统调用；**短计数**，以及健壮的程序如何对付它；文件的元数据与目录；已打开文件在内核中的表示——它解释了 `fork` 共享了什么，shell 如何实现重定向和管道；最后是 C 的标准输入输出库 stdio，它的缓冲既造就了本章开头那百倍之差，也带来几个众所周知的意外。

程序都在 x86-64 Linux 和 glibc 2.43 上用 GCC 15.2 以 `gcc -std=c17 -Wall -Wextra` 编译（并用 `-fsanitize=address,undefined` 测试）；每个程序都以 `#define _POSIX_C_SOURCE 200809L` 开头，使 POSIX 声明可见。计时都是在**一台机器上的观察**。

## 文件与文件描述符

在 Unix 中，**文件**是字节的序列，而几乎所有东西都被呈现为文件：磁盘上的普通文件，还有目录、终端、进程之间的管道、网络连接（套接字），以及 `/dev/null` 之类的设备。一小套统一的系统调用对它们全部适用。内核区分几种**文件类型**：

| 类型 | 是什么 |
|---|---|
| 普通文件 | 存储设备上的数据；内核不解释这些字节（它们是"文本"还是"二进制"由程序自己定夺） |
| 目录 | 一个列出名字以及名字所指文件的文件 |
| 管道（FIFO） | 进程之间的单向通道，在内核中缓冲 |
| 套接字 | 与另一个进程（可能在另一台机器上）通信的端点（[[networks]]） |
| 字符设备或块设备 | 通往硬件或某种内核服务的接口（`/dev/tty`、`/dev/null`、磁盘） |
| 符号链接 | 一个装着另一个文件的名字的文件 |

::: definition 文件描述符 {#def-fd}
进程用 `int open(const char *path, int flags, ... /* mode_t mode */)` 打开文件。成功时内核返回一个**文件描述符**：一个小的非负整数，即*进程中当前未被占用的编号最小的描述符*，其后的所有操作都用它来标识这个已打开的文件。内核为每个已打开的文件记录一个**文件位置**（或**偏移量**）：下一次 `read` 或 `write` 从哪个字节开始。`close(fd)` 释放描述符。每个进程启动时就有三个描述符打开：**标准输入**（0）、**标准输出**（1）和**标准错误**（2），`<unistd.h>` 把它们分别定义为 `STDIN_FILENO`、`STDOUT_FILENO`、`STDERR_FILENO`。
:::

`flags` 说明打开的方式：`O_RDONLY`、`O_WRONLY`、`O_RDWR` 三者必居其一，还可以任意搭配 `O_CREAT`（文件不存在则创建）、`O_TRUNC`（把文件截断为零长度）、`O_APPEND`（每次写入都放到文件的当前末尾）等等。当 `O_CREAT` 创建文件时，`mode` 给出它的权限位，这些权限位随后再被进程的 **umask**（文件模式创建掩码）掩去一部分：`open("out.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644)` 创建一个人人可读、属主可写的文件（在常见的 `022` 或 `002` 掩码下，`0644` 一位都不会被去掉）。

### 读与写

```c
ssize_t read(int fd, void *buf, size_t n);
ssize_t write(int fd, const void *buf, size_t n);
off_t lseek(int fd, off_t offset, int whence);
```

`read` 从当前文件位置至多把 `n` 个字节*拷进* `buf`，推进文件位置，并返回实际拷贝的字节数；到达**文件末尾**（EOF）时返回 $0$，出错时返回 $-1$，原因记在 `errno` 里。`write` 至多把 `buf` 的 `n` 个字节拷到当前位置处的文件中，返回实际写入的字节数。`lseek` 为支持它的文件（普通文件，管道和终端不支持）显式设置文件位置。

::: definition 短计数 {#def-short-count}
**短计数**指 `read` 或 `write` 返回了一个非负、却小于请求字节数的值。短计数不是错误。`read` 在下列情况下返回短计数：到达文件末尾；从终端（一次一行）或从管道、套接字（只到了目前已到达的数据）读；以及调用在传送了一部分数据之后被信号打断。`write` 在管道和套接字的缓冲区已满时、以及被打断时可能返回短计数。对磁盘上的普通文件，只有在文件末尾或异常情形（磁盘写满）下，读写才会出现短计数。
:::

因此，健壮的程序从不假定一次调用就把一切传完。下面是一个类似 `cat` 的程序，把一个文件（或标准输入）拷到标准输出：

```c
#define _POSIX_C_SOURCE 200809L
#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

/* 写完全部 n 个字节；短写和被中断之后重试。 */
static int write_all(int fd, const char *buf, size_t n) {
    while (n > 0) {
        ssize_t k = write(fd, buf, n);
        if (k < 0) {
            if (errno == EINTR) continue;    /* 被信号打断：重试 */
            return -1;
        }
        buf += k;
        n -= (size_t) k;
    }
    return 0;
}

int main(int argc, char *argv[]) {
    int fd = argc > 1 ? open(argv[1], O_RDONLY) : 0;    /* 默认：标准输入 */
    if (fd < 0) { perror(argv[1]); return 1; }
    char buf[8192];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) != 0) {      /* 0 表示文件末尾 */
        if (n < 0) {
            if (errno == EINTR) continue;
            perror("read"); return 1;
        }
        if (write_all(1, buf, (size_t) n) < 0) { perror("write"); return 1; }
    }
    close(fd);
    return 0;
}
```

::: proposition write_all 的正确性 {#prop-write-all}
设每个满足 $n > 0$ 的调用 `write(fd, buf, n)` 要么失败（返回 $-1$），要么写出 $k$ 个字节（$1 \le k \le n$）——其缓冲区的前 $k$ 个字节——并返回 $k$。那么 `write_all(fd, buf, n)` 当且仅当全部 $n$ 个字节都被按序写出时返回 $0$；否则它在遇到第一个非 `EINTR` 的错误之后返回 $-1$。
:::

::: proof
设 $b_0$ 和 $n_0$ 为最初的缓冲区指针和字节数。**不变式**：在循环体的开头，字节 $b_0[0 .. n_0 - n - 1]$ 已被按序写出，且 `buf` $= b_0 + (n_0 - n)$。初始时 $n = n_0$，什么都没写出。收到 `EINTR` 的一轮什么都不改变。`write` 返回 $k \ge 1$ 的一轮写出了接下来的 $k$ 个字节 $b_0[n_0 - n .. n_0 - n + k - 1]$，然后把 `buf` 前移 $k$、把 $n$ 减 $k$，恢复了不变式。因其他原因失败的一轮返回 $-1$。每个成功轮次至少把 $n$ 减 $1$，所以除非循环提前返回或被无限打断，$n$ 终将到达 $0$，此时由不变式知全部 $n_0$ 个字节都已写出。（以非阻塞方式打开的文件还可能返回 $-1$ 且 `errno == EAGAIN`；本函数把这当作错误。）
:::

::: example 实践中的短计数 {#ex-short}
追踪这个程序的 `read` 调用，情形为：(a) 输入是 20 000 字节的普通文件；(b) 输入是一个管道，另一个进程先向它写 `abc`，等半秒，再写 `def`。
::: solution
用 `strace -e trace=read`：

```console
$ strace -e trace=read ./mycat z > /dev/null       # z: 20000 bytes
read(3, ..., 8192) = 8192
read(3, ..., 8192) = 8192
read(3, ..., 8192) = 3616
read(3, ..., 8192)                       = 0
$ (printf abc; sleep 0.5; printf def) | strace -e trace=read ./mycat > /dev/null
read(0, "abc", 8192)                    = 3
read(0, "def", 8192)                    = 3
read(0, "", 8192)                       = 0
```

（动态链接器自己对 `libc.so.6` 的读已略去。）对普通文件，每次读都返回装满的缓冲区，直到最后一次返回剩下的 $20000 - 2 \cdot 8192 = 3616$ 个字节——文件末尾处的短计数——然后返回 $0$。对管道，只要有*任何*数据到达，第一次 `read` 就返回：只有 $3$ 个字节，尽管请求了 $8192$ 个、后面还会有更多。假定每次 `read` 都会装满缓冲区、或假定已知大小的"消息"会在一次 `read` 中到齐的程序——在文件上也许碰巧好用——到了管道和网络套接字上就会坏掉。
:::
:::

### 元数据与目录

`stat(path, &st)` 和 `fstat(fd, &st)` 把一个 `struct stat` 填上文件的**元数据**：类型与权限位（`st_mode`）、字节数（`st_size`）、属主、各时间戳，以及标识它的设备和 inode 号。宏 `S_ISREG`、`S_ISDIR` 等用来测试类型。

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <sys/stat.h>

int main(int argc, char *argv[]) {
    for (int i = 1; i < argc; i++) {
        struct stat st;
        if (stat(argv[i], &st) < 0) { perror(argv[i]); continue; }
        const char *type = S_ISREG(st.st_mode) ? "regular file"
                         : S_ISDIR(st.st_mode) ? "directory"
                         : S_ISCHR(st.st_mode) ? "character device"
                         : S_ISFIFO(st.st_mode) ? "pipe" : "other";
        printf("%-10s %-16s %8lld bytes  mode %04o\n", argv[i], type,
               (long long) st.st_size, (unsigned) (st.st_mode & 07777));
    }
    return 0;
}
```

```console
$ ./st t.txt . /dev/null nofile
nofile: No such file or directory
t.txt      regular file            8 bytes  mode 0664
.          directory             560 bytes  mode 0775
/dev/null  character device        0 bytes  mode 0666
```

（错误最先出现，是因为标准错误不带缓冲，而通往管道或文件的标准输出要缓冲到退出——见下文。）目录用 `opendir`、`readdir`（每次一个表项的 `struct dirent`，每个表项带名字 `d_name`）和 `closedir` 来读取。目录项把名字映射到**索引节点（inode）**，即内核为文件建立的记录；几个名字可以指向同一个 inode（**硬链接**），这就是删除文件为何叫 `unlink`。

## 共享文件

要理解一个进程 fork 时会发生什么、两个描述符指向同一个文件时会发生什么，就需要内核对已打开文件的表示。它使用三层表。

::: definition 内核的文件表 {#def-tables}
- 每个进程有一张**描述符表**，以文件描述符为下标，其表项指向打开文件表中的表项。
- **打开文件表**为所有进程共享。每个表项由一次 `open` 调用创建，保存**文件位置**、标志（如 `O_APPEND`），以及指向它的描述符表项的**引用计数**；该表项指向一个 v 节点。
- **v 节点表**为所有进程共享，每个正在使用的文件一个表项，保存从其 inode 得来的信息（类型、大小、权限、数据所在）。

`close` 去掉一个描述符并把引用计数减一；引用计数降到 $0$ 时，打开文件表项即被销毁。
:::

由此得出三条推论，每一条在实践中都紧要。

1. 同一个文件打开两次创建*两个*打开文件表项，各有各的位置：经由一个描述符读取不会移动另一个的位置。
2. `fork` 复制的是描述符*表*，所以子进程的描述符与父进程的指向*同一个*打开文件表项——它们共享文件位置，引用计数随之增加。shell 的子进程就是这样继承 shell 的标准输入和输出的。
3. `dup2(old, new)` 让描述符 `new` 指向与 `old` 相同的打开文件表项（原先 `new` 所指的一切先被关闭）。重定向就是这样实现的。

::: widget graph
nodes: P3@0,3; C3@0,1.5; P4@0,0; fileA@3,2.25; fileB@3,0; vnode@6,1.2
edges: P3>fileA; C3>fileA; P4>fileB; fileA>vnode; fileB>vnode
algorithm: none
caption: [[#ex-share]] 中那个程序在子进程刚读完一个字节时的三张内核表。左：描述符表的表项——`P3`、`P4` 是父进程的描述符 3 和 4，`C3` 是子进程的描述符 3。中：打开文件表的表项，各自带着自己的文件位置（`fileA` 在位置 2，`fileB` 在位置 1）。右：`abc.txt` 的 v 节点。两次 `open` 调用产生两个打开文件表项，所以描述符 3 和 4 的位置互不相干；`fork` 复制了描述符表，所以 `P3` 与 `C3` 指向同一个表项并共享它的位置。可以拖动顶点重新排列这张图。
:::

::: example fork 共享了什么 {#ex-share}
文件 `abc.txt` 的内容是 `abcdef`。这个程序打印什么？（为省篇幅，`read` 的返回值未作检查。）

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    char c;
    int fd1 = open("abc.txt", O_RDONLY);
    int fd2 = open("abc.txt", O_RDONLY);          /* 第二次、独立的 open */
    if (fd1 < 0 || fd2 < 0) { perror("abc.txt"); return 1; }
    read(fd1, &c, 1); printf("fd1: %c\n", c);
    read(fd2, &c, 1); printf("fd2: %c\n", c);     /* 自己的偏移：从 0 开始 */
    fflush(stdout);
    if (fork() == 0) {                            /* 子进程共享 fd1 的文件位置 */
        read(fd1, &c, 1); printf("child fd1: %c\n", c);
        return 0;
    }
    wait(NULL);
    read(fd1, &c, 1); printf("parent fd1: %c\n", c);
    return 0;
}
```
::: solution
```console
$ ./share
fd1: a
fd2: a
child fd1: b
parent fd1: c
```

`fd1`（描述符 3）和 `fd2`（描述符 4）来自两次分开的 `open` 调用，所以它们各有自己的打开文件表项和自己的位置：各自读到第一个字节 `a`。`fork` 之后，子进程的描述符 3 与父进程的指向同一个打开文件表项，其位置为 $1$。子进程读出 `b`，把共享位置推进到 $2$；父进程 `wait` 之后再经自己的描述符 3 去读，读到的就不是 `b` 而是 `c`。`fork` 之前的 `fflush` 避免了 [[computer-systems/exceptions-processes]] 中缓冲区被复制的效应。
:::
:::

### 重定向与管道

shell 实现 `echo hello > out.txt` 的办法是 fork，在子进程中打开该文件、用 `dup2` 让描述符 1 指向它，然后执行程序；程序照旧往"标准输出"写，全然不知那里现在是一个文件：

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

/* shell 命令  echo hello > out.txt  的等价物 */
int main(void) {
    int fd = open("out.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) { perror("out.txt"); return 1; }
    if (dup2(fd, 1) < 0) { perror("dup2"); return 1; }   /* 现在 fd 1 指向 out.txt */
    close(fd);
    execlp("echo", "echo", "hello", (char *) NULL);
    perror("echo");
    return 127;
}
```

```console
$ ./redir && cat out.txt
hello
```

描述符能活过 `execve`（[[computer-systems/exceptions-processes]]），这正是此法可行的原因。**管道**连接两个进程：`pipe(fds)` 创建一个内核缓冲区，读端是 `fds[0]`，写端是 `fds[1]`。写进写端的数据可以从读端读出；对空管道 `read` 会阻塞到数据到来，并且只有当写端的*每一个*描述符都已关闭时才返回 $0$（文件末尾）。shell 运行 `ls | wc -l` 的做法是：创建一条管道，fork 两个子进程，把第一个子进程的标准输出重定向到写端、第二个子进程的标准输入重定向到读端，再把所有用不到的端关闭。

::: example 通往 sort 的管道 {#ex-pipe}
写一个程序，通过管道把三行文本送进 `sort` 程序，并解释每个 `close` 为什么少不了。
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

/* 通过管道把三行文本送给 sort 程序。 */
int main(void) {
    int fds[2];
    if (pipe(fds) < 0) { perror("pipe"); return 1; }    /* fds[0] 读端，fds[1] 写端 */
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return 1; }
    if (pid == 0) {                                     /* 子进程：标准输入来自管道 */
        dup2(fds[0], 0);
        close(fds[0]);
        close(fds[1]);                                  /* 否则 sort 永远等不到 EOF */
        execlp("sort", "sort", (char *) NULL);
        perror("sort");
        _exit(127);
    }
    close(fds[0]);                                      /* 父进程：只写 */
    const char *text = "pear\napple\nfig\n";
    if (write(fds[1], text, strlen(text)) < 0) perror("write");
    close(fds[1]);                                      /* 给子进程发出 EOF */
    waitpid(pid, NULL, 0);
    return 0;
}
```

```console
$ ./pipe
apple
fig
pear
```

`sort` 必须读完全部输入才开始打印，所以它在标准输入上等待文件末尾。而文件末尾只有当指向写端的每一个描述符都关闭之后才会到来：既有父进程的 `fds[1]`（写完后关闭），*也有子进程自己经 `fork` 继承的那一份*。倘若子进程不在 exec 之前关闭 `fds[1]`，`sort` 自己就会持着写端不放，永远等下去。子进程把 `fds[0]` 复制到描述符 0 之后就把它关闭，因为同一端不再需要两个描述符；父进程关闭 `fds[0]`，因为它根本不读。忘掉这类 `close` 是使用管道的程序中最常见的错误。
:::
:::

## 标准 I/O

C 标准库在这些系统调用之上提供了层次更高的接口**标准 I/O**（`<stdio.h>`）。一个**流**（类型 `FILE *`）把一个文件描述符和一块位于进程内存中的**缓冲区**包在一起：`stdin`、`stdout`、`stderr` 分别包住描述符 0、1、2，其余的流由 `fopen` 和 `fclose` 创建和销毁。`getc`、`fgets`、`scanf`、`putchar`、`fputs`、`printf` 这类函数都在缓冲区上做文章，库只在缓冲区空了（输入）或非刷不可（输出）时才去调用 `read` 或 `write`。一百万次 `putchar` 调用，库只发出了 245 次（几乎每次 4096 字节的）`write`：$\lceil 10^6 / 4096 \rceil = 245$。一次 4 KiB 的 `write` 与一次一字节 `write` 的开销相差无几，所以带缓冲的程序做的系统调用大约少 $4000$ 倍——就是本章开头看到的那个倍数。

::: definition 缓冲方式 {#def-buffering}
一个 stdio 输出流可以是

- **全缓冲**：输出在缓冲区写满时、调用 `fflush` 时、流被关闭时（包括程序正常退出）写出去——文件与管道的默认方式；
- **行缓冲**：除上述之外，每输出一个换行符、以及从一个行缓冲或不带缓冲的流读取输入之前，把缓冲区写出去——连接终端的流的默认方式；
- **不带缓冲**：每个输出函数都立即写出——`stderr` 的默认方式，错误信息因此能立刻显现。

用 `setvbuf` 可以显式选择方式。
:::

::: example 观察到的缓冲方式 {#ex-modes}
预测这个程序在输出接终端时、以及输出接 `/dev/null`（或文件、管道）时分别发出哪些 `write` 系统调用。

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 3; i++)
        printf("line %d\n", i);
    fprintf(stderr, "done\n");
    return 0;
}
```
::: solution
接终端时，`stdout` 是行缓冲的，每个换行都触发刷出：三次向描述符 1 写 7 个字节，随后不带缓冲的 `stderr` 立即写出 `done`。重定向后，`stdout` 是全缓冲的：三行攒在缓冲区里，`done` 立即写出——在*最前*——那 21 个缓冲字节到退出才用一次调用写出去。`strace -e trace=write` 证实了两种情形（终端情形是在 `script` 下运行的，以便给程序一个终端）：

```console
$ strace -e trace=write ./lines > /dev/null 2>&1
write(2, "done\n", 5)                   = 5
write(1, "line 1\nline 2\nline 3\n", 21) = 21
$ strace -e trace=write ./lines          # on a terminal
write(1, "line 1\n", 7)                 = 7
write(1, "line 2\n", 7)                 = 7
write(1, "line 3\n", 7)                 = 7
write(2, "done\n", 5)                   = 5
```

这就是为什么 `./prog > out 2>&1` 时，错误信息常常出现在文件里*比它更晚*才打印的普通输出*之前*：两个流的缓冲方式不同。
:::
:::

::: widget plot
f: (1000000 / x) * c / 1000000
x: 1, 64
y: 0, 0.5
sliders: c=430:50:1000:10
labels: \text{write 系统调用耗时（秒）}
caption: 一个模型：用 $x$ 字节的缓冲区写出一百万个字节，花在系统调用上的时间为 $10^6/x$ 次调用乘以每次 $c$ 纳秒（滑块的起点是在 [[computer-systems/exceptions-processes]] 中实测一次最简系统调用的 $430$ ns）。$x = 64$ 时开销已降为 $1/64$；用 stdio 的 4096 字节缓冲区则约为万分之一秒。注意曲线很快就平了：超过几 KB 之后，更大的缓冲区收效甚微，这就是 4–64 KiB 是典型缓冲区大小的原因。（模型忽略了拷贝字节的开销和抵达设备的时间。）
:::

::: quiz
一个程序执行 `printf("step 1 done\n");` 之后调用 `abort()` 崩溃。哪些情形下 `step 1 done` 会出现？
- [x] 标准输出是终端。
- [ ] 标准输出重定向到文件：`./prog > log.txt`。
- [ ] 标准输出是管道：`./prog | less`。
- [ ] 总会出现，因为串以换行结尾。
::: solution
接终端时 `stdout` 行缓冲，换行在崩溃之前已把这行刷了出去。重定向到文件或管道时 `stdout` 全缓冲：这行还躺在缓冲区里，`abort` 就结束了进程，正常退出时的刷出并未发生，输出随之丢失——测试机上 `log.txt` 为空，退出状态 $134$。这就是可能崩溃的程序的日志消息应当写到 `stderr`（不带缓冲）之后、或随手补一个 `fflush` 的原因，也是用 `printf` 调试可能骗人的原因。
:::
:::

::: warning 在同一个文件上混用 stdio 与系统调用
因为 stdio 把数据装在自己的缓冲区里，在同一个描述符上混用 stdio 函数和裸的 `read`/`write` 会打乱数据的顺序：`printf("a"); write(1, "b", 1);` 在输出带缓冲时打印的是 `ba`。同样，stdio 的输入流会一次预读一缓冲区，所以 `fgets(line, n, stdin)` 之后再 `read(0, …)`，stdio 已经消耗掉的数据就再也读不到了。同一个文件只用一套接口，或者在两套接口交界的地方调用 `fflush`。还要记住 `fflush` 只是把数据从程序交给内核：真要确保数据到达存储设备——比如在宣布一个数据库事务已经提交之前——还要再调用 `fsync(fd)`。
:::

### 如何选择接口

经验法则如下：

- 文本，以及小块读写的文件，用**标准 I/O**：它可移植（ISO C）、带缓冲，并提供格式化输入输出。检查 `fopen`、`fgets` 之类的结果；对输出文件，`fclose` 之后也要检查，因为写错误可能要到缓冲区刷出时才报告。
- 需要 stdio 给不了的控制时，用 **Unix I/O**（`open`、`read`、`write`）：网络套接字（stdio 的缓冲与请求—应答协议相处得很糟）、需要严密控制的程序里的管道和终端、文件的元数据，以及信号处理程序内部（`write` 是异步信号安全的；`printf` 不是）。
- 绝不用 `gets`（2011 年已从 C 语言中移除），绝不用不带字段宽度的 `scanf("%s", …)`：两者都会往固定缓冲区里写入无上限的数据，就是 [[computer-systems/c-programming#sec-ub]] 里的缓冲区溢出。用 `fgets(buf, sizeof buf, stdin)`。
- 二进制数据用 `fread` 和 `fwrite` 成块地搬运字节；这样写出的文件，在字节序或类型大小不同的机器之间并不可移植（[[computer-systems/bits-integers]]）。

::: history
汤普森（Thompson）与里奇（Ritchie）的 Unix（1969 年起于贝尔实验室）把"文件是字节的序列"以及文件与设备的统一接口做进了核心设计；他们 1974 年发表于 *Communications of the ACM* 的论文描述的 `open`、`read`、`write` 和层次文件系统，其语义与今天已无本质差别。管道于 1973 年在 Doug McIlroy 的力促下加入，他早前就主张像"花园里的水管"那样把程序连接起来；管道随之带来了把小程序串成流水线组合使用的 Unix 风格。Mike Lesk 的"可移植 I/O 库"（20 世纪 70 年代初）是 Version 7 Unix（1979）中标准 I/O 库的前身，该库于 1989 年随 C 语言一起被标准化。POSIX.1 标准（IEEE 1003.1，1988）固定了各 Unix 变体之间的系统调用接口；现行版本是 POSIX.1-2024。
:::

## 后续内容

本章走完了这门课的旅程，从比特一路走到做输入输出的进程。用套接字做网络编程——套接字的行为就像本章的管道，短计数一样不少——在 [[networks]] 中继续；文件系统（文件的字节如何在设备上布局、目录和 inode 如何存放、日志如何让它们在崩溃之后幸存）和输入输出的内核一侧（从设备驱动程序到页缓存）属于 [[operating-systems]]。基于事务的持久存储在 [[databases]] 中建立在 `fsync` 之上。并发地进行大量 I/O——无论是用线程，还是用 `epoll`、`io_uring` 这样的事件驱动接口——是 [[parallel-computing]] 与 [[distributed-systems]] 的一部分。

::: summary
- Unix 把文件、目录、管道、套接字和设备一律呈现为经由**文件描述符**访问的字节序列；描述符 0、1、2 是标准输入、输出、错误，`open` 返回当前最小的空闲描述符。
- `read` 和 `write` 至多传输所请求的字节数；**短计数**对终端、管道和套接字是家常便饭，所以循环到传完为止（[[#prop-write-all]]）；`read` 在文件末尾返回 0。
- `stat` 给出元数据（类型、大小、权限）；目录把名字映射到 inode。
- 内核的描述符表、打开文件表和 v 节点表解释了共享是怎么回事：分开的 `open` 调用各有各的位置；`fork` 和 `dup2` 让描述符共享一个打开文件表项及其位置（[[#def-tables]]）。
- 重定向是 exec 之前的 `open` 加 `dup2`；流水线靠 `pipe`、`fork`、`dup2` 和一丝不苟的 `close`——所有写端都关闭之后，文件末尾才会到来。
- 标准 I/O 在用户空间缓冲：文件和管道全缓冲，终端行缓冲，`stderr` 不带缓冲（[[#def-buffering]]）；这省下了系统调用，却可能在崩溃时丢输出、与 `write` 混用时乱顺序。`fflush` 把数据交给内核，`fsync` 交给设备。
:::

## 习题

::: exercise 哪个描述符？ {level=1 check="0"}
一个进程启动时描述符 0、1、2 已打开。它执行 `a = open("t.txt", O_RDONLY); b = open("t.txt", O_RDONLY); close(a); c = open("t.txt", O_RDONLY); close(0); d = open("t.txt", O_RDONLY);`。`a`、`b`、`c`、`d` 各是多少？（输入 `d`。）
::: solution
`open` 返回最小的未用描述符（[[#def-fd]]）。`a = 3`，`b = 4`；关闭 3 使它空出，所以 `c = 3`；关闭 0 空出了标准输入，所以 `d = 0`。这段代码在测试机上运行打印 `3 4 3 0`。老程序用的正是这一招——`close(0); open(file, …)`——在 `dup2` 出现之前重定向标准输入。
:::
:::

::: exercise 数系统调用 {level=1 check="3"}
一个程序经缓冲区为 4096 字节、全缓冲的 `stdout` 用 `putchar` 向文件写出 10 000 个字节，然后正常退出。stdio 发出了多少次 `write` 系统调用？（输入数字。）
::: solution
缓冲区写满即刷出：写满 4096 字节后一次，8192 字节后一次。剩下的 $10000 - 8192 = 1808$ 个字节在退出时刷出。总共 $\lceil 10000 / 4096 \rceil = 3$ 次调用。
:::
:::

::: exercise 是不是短计数？ {level=1}
对每种情形，说明 `read(fd, buf, 4096)` 是否可能返回 1 到 4095 之间的值，并说明原因：(a) `fd` 是 10 000 字节的普通文件，第一次调用；(b) 同一个文件，第三次调用；(c) `fd` 是终端，用户键入 `hello` 后按下回车；(d) `fd` 是 TCP 套接字，对端已发来 4096 个字节。
::: solution
(a) 不可能：4096 个字节都取得到，所以返回装满的缓冲区（除非被信号打断）。(b) 可能：两次满读之后只剩 $10000 - 8192 = 1808$ 个字节，是文件末尾处的短计数。(c) 可能：处于通常模式的终端一次返回一行，这里是 `hello\n` 这 6 个字节。(d) 可能：数据可能分成好几个网络分组到达，而 `read` 只返回已经到达的部分——比如一个分组容纳的 1448 个字节——所以程序必须循环，直到集齐全部 4096 个字节。
:::
:::

::: exercise 共享的位置 {level=2}
`abc.txt` 的内容是 `abcdef`。一个程序做 `fd = open("abc.txt", O_RDONLY); read(fd, &c, 1);`，然后 `fd2 = dup(fd); read(fd2, &c, 1);`，然后 fork；子进程从 `fd2` 读一个字节后退出；父进程等待之后再从 `fd` 读一个字节。依次读出的是哪些字节？
::: solution
`dup` 使 `fd2` 与 `fd` 指向同一个打开文件表项，所以所有描述符——父进程的 `fd` 和 `fd2`，以及 fork 之后子进程里的那两份副本——共享同一个文件位置。读出的字节依次是：`a`（位置 $0 \to 1$），经 `fd2` 的 `b`（$1 \to 2$），子进程里的 `c`（$2 \to 3$），父进程经 `fd` 的 `d`（$3 \to 4$）。只有分开的 `open` 调用才产生独立的位置（[[#def-tables]]）。
:::
:::

::: exercise 丢失的输出 {level=2}
对 `int main(void) { printf("starting\n"); fork(); printf("forked\n"); return 0; }`，解释 `./prog > log.txt` 的输出。`log.txt` 里有几行？输出接终端时又怎么变？改正这个程序。
::: solution
重定向到文件时 `stdout` 全缓冲，所以 `fork` 复制进程时 `starting\n` 还在缓冲区里。每个进程随后都追加 `forked\n`，退出时刷出自己的缓冲区，于是 `log.txt` 含四行：`starting`、`forked`、`starting`、`forked`。接终端时流是行缓冲的，`starting` 在 fork 之前就已写出，输出共三行：`starting` 和两个 `forked`。改正是 `fork()` 之前 `fflush(stdout);`（或者，若子进程将要 exec，失败时在子进程里用 `_exit`，如 [[computer-systems/exceptions-processes]] 所示）。
:::
:::

::: exercise 一个拷贝程序 {level=2}
用 Unix I/O 写 `copy src dst`：以权限 `0644`（受 umask 约束）创建 `dst`，若它已存在则截断。复用 `write_all`。若 `src` 和 `dst` 是同一个文件的名字会发生什么？程序怎样才能察觉？
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int write_all(int fd, const char *buf, size_t n);   /* 与正文中相同 */

int main(int argc, char *argv[]) {
    if (argc != 3) { fprintf(stderr, "usage: %s src dst\n", argv[0]); return 2; }
    int in = open(argv[1], O_RDONLY);
    if (in < 0) { perror(argv[1]); return 1; }
    int out = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (out < 0) { perror(argv[2]); return 1; }
    char buf[65536];
    ssize_t n;
    while ((n = read(in, buf, sizeof buf)) != 0) {
        if (n < 0) { if (errno == EINTR) continue; perror("read"); return 1; }
        if (write_all(out, buf, (size_t) n) < 0) { perror("write"); return 1; }
    }
    if (close(out) < 0) { perror("close"); return 1; }   /* 错误可能在这里才冒出来 */
    close(in);
    return 0;
}
```

与正文里那个（去掉了 `static` 的）`write_all` 一起编译链接后，`./copy t.txt t2.txt && cmp t.txt t2.txt` 成功。若 `src` 和 `dst` 是同一个文件，带 `O_TRUNC` 的 `open` 会在读到任何东西*之前*把它清空，于是这次"拷贝"毁掉了数据，只留下一个空文件。要察觉这种情况，可在打开源文件之后、截断之前对两个描述符做 `fstat`（打开目标文件时不带 `O_TRUNC`，比较 `st_dev` 和 `st_ino` 字段，仅在二者不同时才调用 `ftruncate(out, 0)`）：设备号与 inode 号都相等就是同一个文件，哪怕名字不同。
:::
:::

::: exercise 一条流水线 {level=3}
用 `pipe`、两次 `fork`、`dup2` 和 `execlp` 写一个程序，运行流水线 `ls -1 / | wc -l`，并证明 `ls` 一退出，`wc` 就会终止（收到文件末尾）。
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

/* 运行流水线  ls -1 /  |  wc -l */
int main(void) {
    int fds[2];
    if (pipe(fds) < 0) { perror("pipe"); return 1; }
    pid_t left = fork();
    if (left == 0) {                       /* ls：标准输出 -> 管道 */
        dup2(fds[1], 1);
        close(fds[0]); close(fds[1]);
        execlp("ls", "ls", "-1", "/", (char *) NULL);
        _exit(127);
    }
    pid_t right = fork();
    if (right == 0) {                      /* wc：标准输入 <- 管道 */
        dup2(fds[0], 0);
        close(fds[0]); close(fds[1]);
        execlp("wc", "wc", "-l", (char *) NULL);
        _exit(127);
    }
    close(fds[0]); close(fds[1]);          /* 父进程两端都不用 */
    waitpid(left, NULL, 0);
    waitpid(right, NULL, 0);
    return 0;
}
```

它打印的数字与 shell 运行 `ls -1 / | wc -l` 相同（数字依系统而定）。**终止性。** 当管道已空、且写端所对应的打开文件表项的引用计数为 $0$ 时，`wc` 收到文件末尾（[[#def-tables]]）。指向该表项的描述符至多存在于三个进程中：父进程（在第二次 `fork` 之后立即关闭）；右子进程（继承来的 `fds[1]` 在 exec 之前已关闭，它的描述符 0 指向*读*端）；以及左子进程——经过 `dup2` 和各个 `close` 之后，它手里仅剩的描述符 1 还指着该表项。`ls` 退出时，内核关闭它的所有描述符，计数随之降为 $0$；`wc` 读完剩余数据之后，下一次 `read` 返回 $0$，于是 `wc` 打印计数并退出。倘若父进程或右子进程里四个 `close(fds[1])` 一类的调用漏掉了任何一个，那个进程就会持着写端不放，`wc` 将永远等待——而等着 `wc` 的父进程也会一并挂死。
:::
:::

::: exercise 持久的写入 {level=3}
一个程序用 `fopen`、`fprintf`、`fclose` 把文档写进 `doc.txt` 保存。说明若机器在此后不久断电，保存的文档可能被丢失或损坏的两种不同方式，并给出让保存安全的一组调用顺序。请使用 stdio 缓冲区、内核、设备三者的区分。
::: solution
(1) `fclose` 把 stdio 的缓冲刷进了内核，但内核把写入的数据留在页缓存里，稍后才写到设备上（通常是几秒之内）。在这个延迟窗口里断电，数据就丢了，尽管每一次调用都成功了。(2) 以 `"w"` 方式打开文件会立刻截断它；若截断已到达设备、新数据尚未到达时断电，新旧两版就都没了——文件要么为空，要么只写了一半。

标准的稳妥做法是写一个新文件再原子地替换旧文件：`f = fopen("doc.txt.tmp", "w")`；写入数据；`fflush(f)`（stdio 缓冲区 → 内核）；`fsync(fileno(f))`（内核 → 设备）；`fclose(f)`，每个结果都要检查；然后 `rename("doc.txt.tmp", "doc.txt")`，它原子地替换目录项，于是崩溃之后这个名字要么指向完整的旧文件，要么指向完整的新文件；最后对包含它的目录的一个描述符做 `fsync`，让 rename 本身也持久。数据库和编辑器用的就是这套顺序的变体；文件系统究竟保证什么，细节在 [[operating-systems]] 中。
:::
:::
