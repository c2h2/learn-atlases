A program that writes one million characters with `putchar` finishes, on the test machine, in under a hundredth of a second. The same program writing each character with the `write` system call takes almost a second, and `strace` shows why: the first makes 245 system calls, the second one million. Both produce exactly the same output.

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
            { if (write(1, &c, 1) != 1) return 1; }   /* one system call per byte */
        else
            putchar(c);              /* buffered by the C library */
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

Input and output — reading and writing files, terminals, pipes and network connections — is where a program meets the outside world, and it is mediated by the operating system at every step. This chapter, the last of the course, explains the Unix I/O model that underlies every language's input and output on Linux and macOS: **file descriptors**; the system calls `open`, `read`, `write` and `close`; **short counts** and how robust programs handle them; file metadata and directories; how open files are represented in the kernel, which explains what `fork` shares and how a shell implements redirection and pipes; and finally the C standard I/O library, `stdio`, whose buffering produces the factor of a hundred above and a few well-known surprises.

Programs were compiled with GCC 15.2 on x86-64 Linux with glibc 2.43, as `gcc -std=c17 -Wall -Wextra` (and tested with `-fsanitize=address,undefined`); each begins with `#define _POSIX_C_SOURCE 200809L` to make the POSIX declarations visible. Timings are **observations** on one machine.

## Files and file descriptors

In Unix, a **file** is a sequence of bytes, and almost everything is presented as one: ordinary files on disk, but also directories, terminals, pipes between processes, network connections (sockets) and devices such as `/dev/null`. A single small set of system calls works on all of them. The kernel distinguishes several **file types**:

| type | what it is |
|---|---|
| regular file | data on a storage device; the kernel does not interpret its bytes (whether they are "text" or "binary" is up to programs) |
| directory | a file listing names and the files they refer to |
| pipe (FIFO) | a one-way channel between processes, buffered in the kernel |
| socket | an endpoint for communication with another process, possibly on another machine ([[networks]]) |
| character or block device | an interface to hardware or a kernel service (`/dev/tty`, `/dev/null`, a disk) |
| symbolic link | a file containing the name of another file |

::: definition File descriptor {#def-fd}
A process opens a file with `int open(const char *path, int flags, ... /* mode_t mode */)`. On success the kernel returns a **file descriptor**: a small non-negative integer, the *lowest-numbered descriptor not currently open in the process*, which identifies the open file in all later operations. The kernel keeps, for each open file, a **file position** (or **offset**): the byte at which the next `read` or `write` begins. `close(fd)` releases the descriptor. Every process starts with three descriptors open: **standard input** (0), **standard output** (1) and **standard error** (2), as defined in `<unistd.h>` by `STDIN_FILENO`, `STDOUT_FILENO` and `STDERR_FILENO`.
:::

The `flags` say how to open the file: exactly one of `O_RDONLY`, `O_WRONLY` or `O_RDWR`, optionally combined with `O_CREAT` (create the file if it does not exist), `O_TRUNC` (truncate it to length zero), `O_APPEND` (every write goes to the current end of the file) and others. When `O_CREAT` creates a file, `mode` gives its permission bits, which are then masked by the process's **umask**: `open("out.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644)` creates a file readable by everyone and writable by its owner (with the usual umasks `022` or `002`, which remove nothing from `0644`).

### Reading and writing

```c
ssize_t read(int fd, void *buf, size_t n);
ssize_t write(int fd, const void *buf, size_t n);
off_t lseek(int fd, off_t offset, int whence);
```

`read` copies *at most* `n` bytes from the current file position into `buf`, advances the position, and returns the number of bytes copied; it returns $0$ at **end of file** (EOF) and $-1$ on error, with the cause in `errno`. `write` copies at most `n` bytes from `buf` to the file at the current position and returns the number written. `lseek` sets the file position explicitly, for files that support it (regular files, not pipes or terminals).

::: definition Short count {#def-short-count}
A **short count** is a return value of `read` or `write` that is non-negative but less than the number of bytes requested. Short counts are not errors. `read` returns them at end of file; when reading from a terminal (one line at a time) or from a pipe or socket (whatever data have arrived so far); and when the call is interrupted by a signal after transferring some data. `write` can return them for pipes and sockets whose buffers are full, and when interrupted. Reading and writing regular files on disk produce short counts only at end of file, or in unusual conditions (a full disk).
:::

Robust programs therefore never assume that one call transfers everything. Here is a program like `cat`, which copies a file (or standard input) to standard output:

```c
#define _POSIX_C_SOURCE 200809L
#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

/* Write all n bytes, retrying after short writes and interruptions. */
static int write_all(int fd, const char *buf, size_t n) {
    while (n > 0) {
        ssize_t k = write(fd, buf, n);
        if (k < 0) {
            if (errno == EINTR) continue;    /* interrupted by a signal: retry */
            return -1;
        }
        buf += k;
        n -= (size_t) k;
    }
    return 0;
}

int main(int argc, char *argv[]) {
    int fd = argc > 1 ? open(argv[1], O_RDONLY) : 0;    /* default: standard input */
    if (fd < 0) { perror(argv[1]); return 1; }
    char buf[8192];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) != 0) {      /* 0 means end of file */
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

::: proposition Correctness of write_all {#prop-write-all}
Assume each call `write(fd, buf, n)` with $n > 0$ either fails (returning $-1$) or writes $k$ bytes with $1 \le k \le n$ — the first $k$ bytes of its buffer — and returns $k$. Then `write_all(fd, buf, n)` returns $0$ if and only if all $n$ bytes were written, in order; otherwise it returns $-1$ after the first error other than `EINTR`.
:::

::: proof
Let $b_0$ and $n_0$ be the initial buffer pointer and count. **Invariant**: at the top of the loop, the bytes $b_0[0 .. n_0 - n - 1]$ have been written, in order, and `buf` $= b_0 + (n_0 - n)$. Initially $n = n_0$ and nothing has been written. An iteration that receives `EINTR` changes nothing. An iteration in which `write` returns $k \ge 1$ writes the next $k$ bytes, $b_0[n_0 - n .. n_0 - n + k - 1]$, and then advances `buf` by $k$ and decreases $n$ by $k$, restoring the invariant. An iteration that fails otherwise returns $-1$. Each successful iteration decreases $n$ by at least $1$, so unless the loop returns early or is interrupted forever, $n$ reaches $0$, and by the invariant all $n_0$ bytes have been written. (A file opened in non-blocking mode can also return $-1$ with `errno == EAGAIN`; this function treats that as an error.)
:::

::: example Short counts in practice {#ex-short}
Trace the `read` calls of the program for (a) a 20 000-byte regular file, (b) a pipe into which another process writes `abc`, waits half a second, and writes `def`.
::: solution
With `strace -e trace=read`:

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

(The dynamic linker's own reads of `libc.so.6` are omitted.) For the regular file, the reads return full buffers until the last, which returns the remaining $20000 - 2 \cdot 8192 = 3616$ bytes — a short count at end of file — and then $0$. For the pipe, the first `read` returns as soon as *any* data are available: just $3$ bytes, although $8192$ were requested and more is coming. A program that assumed each `read` fills the buffer — or that a "message" of known size arrives in one `read` — would break on pipes and network sockets, even though it worked on files.
:::
:::

### Metadata and directories

`stat(path, &st)` and `fstat(fd, &st)` fill a `struct stat` with a file's **metadata**: its type and permission bits (`st_mode`), size in bytes (`st_size`), owner, timestamps, and the device and inode number that identify it. The macros `S_ISREG`, `S_ISDIR` and so on test the type.

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

(The error appears first because standard error is unbuffered, while standard output to a pipe or file is buffered until exit — see below.) A directory is read with `opendir`, `readdir` (one `struct dirent` per entry, each with a name `d_name`) and `closedir`. Directory entries map names to **inodes**, the kernel's records of files; several names can refer to the same inode (**hard links**), which is why removing a file is called `unlink`.

## Sharing files

To understand what happens when a process forks, or when two descriptors refer to the same file, we need the kernel's representation of open files. It uses three levels of tables.

::: definition Kernel file tables {#def-tables}
- Each process has a **descriptor table**, indexed by file descriptor, whose entries point to entries of the open file table.
- The **open file table** is shared by all processes. Each entry, created by one call to `open`, holds the **file position**, the flags (such as `O_APPEND`), and a **reference count** of descriptor-table entries pointing to it; it points to a v-node.
- The **v-node table** is shared by all processes and has one entry per file in use, holding information from its inode (type, size, permissions, where its data are).

`close` removes a descriptor and decrements the reference count; the open file entry is destroyed when its count reaches $0$.
:::

Three consequences follow, and each matters in practice.

1. Opening the same file twice creates *two* open file entries, each with its own position: reading through one descriptor does not move the other.
2. `fork` copies the descriptor *table*, so the child's descriptors point to the *same* open file entries as the parent's — they share file positions, and the reference counts increase. That is how a shell's children inherit its standard input and output.
3. `dup2(old, new)` makes descriptor `new` point to the same open file entry as `old` (closing whatever `new` referred to before). That is how redirection works.

::: widget graph
nodes: P3@0,3; C3@0,1.5; P4@0,0; fileA@3,2.25; fileB@3,0; vnode@6,1.2
edges: P3>fileA; C3>fileA; P4>fileB; fileA>vnode; fileB>vnode
algorithm: none
caption: The three kernel tables for the program in [[#ex-share]], just after the child has read a byte. Left: descriptor-table entries — `P3` and `P4` are the parent's descriptors 3 and 4, `C3` is the child's descriptor 3. Middle: open file table entries, each with its own file position (`fileA` at position 2, `fileB` at position 1). Right: the v-node of `abc.txt`. Two `open` calls made two open file entries, so descriptors 3 and 4 have independent positions; `fork` copied the descriptor table, so `P3` and `C3` point to the same entry and share its position. Drag the vertices to rearrange the picture.
:::

::: example What fork shares {#ex-share}
The file `abc.txt` contains `abcdef`. What does this program print? (Return values of `read` are not checked, for brevity.)

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    char c;
    int fd1 = open("abc.txt", O_RDONLY);
    int fd2 = open("abc.txt", O_RDONLY);          /* a second, independent open */
    if (fd1 < 0 || fd2 < 0) { perror("abc.txt"); return 1; }
    read(fd1, &c, 1); printf("fd1: %c\n", c);
    read(fd2, &c, 1); printf("fd2: %c\n", c);     /* own offset: starts at 0 */
    fflush(stdout);
    if (fork() == 0) {                            /* child shares fd1's offset */
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

`fd1` (descriptor 3) and `fd2` (descriptor 4) come from separate `open` calls, so they have separate open file entries and separate positions: each reads the first byte, `a`. After the `fork`, the child's descriptor 3 points to the same open file entry as the parent's, whose position is $1$. The child reads `b` and moves the shared position to $2$; when the parent, after `wait`, reads through its descriptor 3, it gets `c`, not `b`. The `fflush` before `fork` prevents the duplicated-buffer effect of [[computer-systems/exceptions-processes]].
:::
:::

### Redirection and pipes

A shell implements `echo hello > out.txt` by forking, and in the child opening the file, making descriptor 1 refer to it with `dup2`, and executing the program, which writes to "standard output" as usual, unaware that it is now a file:

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

/* Equivalent of the shell command:  echo hello > out.txt */
int main(void) {
    int fd = open("out.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) { perror("out.txt"); return 1; }
    if (dup2(fd, 1) < 0) { perror("dup2"); return 1; }   /* fd 1 now refers to out.txt */
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

Descriptors survive `execve` ([[computer-systems/exceptions-processes]]), which is what makes this work. A **pipe** connects two processes: `pipe(fds)` creates a kernel buffer with a read end `fds[0]` and a write end `fds[1]`. Data written to the write end can be read from the read end; `read` on an empty pipe blocks until data arrive, and returns $0$ (end of file) only when *every* descriptor for the write end has been closed. A shell runs `ls | wc -l` by creating a pipe, forking two children, redirecting the first child's standard output to the write end and the second child's standard input to the read end, and closing all the unused ends.

::: example A pipe to sort {#ex-pipe}
Write a program that sends three lines through a pipe to the `sort` program, and explain why each `close` is needed.
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

/* Send three lines through a pipe to the program sort. */
int main(void) {
    int fds[2];
    if (pipe(fds) < 0) { perror("pipe"); return 1; }    /* fds[0] read end, fds[1] write end */
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return 1; }
    if (pid == 0) {                                     /* child: stdin from the pipe */
        dup2(fds[0], 0);
        close(fds[0]);
        close(fds[1]);                                  /* else sort never sees EOF */
        execlp("sort", "sort", (char *) NULL);
        perror("sort");
        _exit(127);
    }
    close(fds[0]);                                      /* parent: writes only */
    const char *text = "pear\napple\nfig\n";
    if (write(fds[1], text, strlen(text)) < 0) perror("write");
    close(fds[1]);                                      /* EOF for the child */
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

`sort` must read all its input before printing anything, so it waits for end of file on its standard input. End of file arrives only when every descriptor referring to the write end is closed: the parent's `fds[1]` (closed after writing) *and the child's own copy*, inherited through `fork`. If the child did not close `fds[1]` before `exec`, `sort` itself would hold the write end open and wait forever. The child closes `fds[0]` after duplicating it onto descriptor 0 because it no longer needs two descriptors for the same end; the parent closes `fds[0]` because it never reads. Forgetting such `close` calls is the most common bug in programs that use pipes.
:::
:::

## Standard I/O

The C standard library offers a higher-level interface, **standard I/O** (`<stdio.h>`), built on top of the system calls. A **stream**, of type `FILE *`, wraps a file descriptor together with a **buffer** in the process's memory: `stdin`, `stdout` and `stderr` wrap descriptors 0, 1 and 2, and `fopen` and `fclose` create and destroy others. Functions such as `getc`, `fgets`, `scanf`, `putchar`, `fputs` and `printf` work on the buffer, and the library calls `read` or `write` only when the buffer is empty (for input) or must be flushed (for output). For one million `putchar` calls the library made 245 `write` calls of (mostly) 4096 bytes: $\lceil 10^6 / 4096 \rceil = 245$. One `write` of 4 KiB costs little more than a `write` of one byte, so the buffered program does roughly $4000$ times fewer system calls — the factor seen at the start of the chapter.

::: definition Buffering modes {#def-buffering}
A stdio output stream is

- **fully buffered**: output is written when the buffer fills, when `fflush` is called, and when the stream is closed (including at normal program exit) — the default for files and pipes;
- **line buffered**: in addition, the buffer is written whenever a newline is output, and before input is read from a line-buffered or unbuffered stream — the default for a stream connected to a terminal;
- **unbuffered**: every output function writes immediately — the default for `stderr`, so that error messages appear at once.

`setvbuf` chooses the mode explicitly.
:::

::: example Buffering modes observed {#ex-modes}
Predict the `write` system calls made by this program when its output goes to a terminal and when it goes to `/dev/null` (or a file or pipe).

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
On a terminal, `stdout` is line buffered, so each newline flushes: three writes of 7 bytes to descriptor 1, then the unbuffered `stderr` writes `done` at once. Redirected, `stdout` is fully buffered: the three lines accumulate, `done` is written immediately — *first* — and the 21 buffered bytes are written in one call at exit. `strace -e trace=write` confirms both (the terminal case run under `script` to give the program a terminal):

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

This is why, in `./prog > out 2>&1`, error messages often appear in the file *before* normal output that was printed earlier: the two streams are buffered differently.
:::
:::

::: widget plot
f: (1000000 / x) * c / 1000000
x: 1, 64
y: 0, 0.5
sliders: c=430:50:1000:10
labels: \text{seconds in write calls}
caption: A model of the time spent in system calls to write one million bytes with a buffer of $x$ bytes: $10^6/x$ calls of $c$ nanoseconds each (the slider starts at the $430$ ns measured for a minimal system call in [[computer-systems/exceptions-processes]]). Already at $x = 64$ the cost has fallen by a factor of 64; with stdio's 4096-byte buffer it is about a ten-thousandth of a second. Notice that the curve flattens quickly: beyond a few kilobytes, larger buffers gain little, which is why 4–64 KiB buffers are typical. (The model ignores the cost of copying bytes and the time to reach the device.)
:::

::: quiz
A program prints `printf("step 1 done\n");` and then crashes by calling `abort()`. In which situations will `step 1 done` appear?
- [x] When standard output is a terminal.
- [ ] When standard output is redirected to a file, `./prog > log.txt`.
- [ ] When standard output is a pipe, `./prog | less`.
- [ ] Always, because the string ends with a newline.
::: solution
To a terminal, `stdout` is line buffered, so the newline flushes the line before the crash. Redirected to a file or a pipe, `stdout` is fully buffered: the line sits in the buffer, `abort` terminates the process without the normal exit-time flush, and the output is lost — the test machine shows an empty `log.txt` with exit status $134$. This is why log messages from programs that may crash should go to `stderr` (unbuffered) or be followed by `fflush`, and why debugging by `printf` can be misleading.
:::
:::

::: warning Mixing stdio and system calls on the same file
Because stdio keeps data in its own buffer, mixing stdio functions and raw `read`/`write` calls on the same descriptor reorders data: `printf("a"); write(1, "b", 1);` prints `ba` when output is buffered. Similarly, a stdio input stream reads ahead a whole buffer, so after `fgets(line, n, stdin)` a `read(0, …)` misses whatever stdio has already consumed. Use one interface per file, or call `fflush` at the boundary. And remember that `fflush` only moves data from the program into the kernel: to make sure data reach the storage device — before reporting a database transaction as committed, say — call `fsync(fd)` as well.
:::

### Choosing an interface

The rules of thumb, then:

- Use **standard I/O** for text and for files read or written in small pieces: it is portable (ISO C), buffered, and offers formatted I/O. Check the results of `fopen`, `fgets` and the like, and `fclose` output files and check that too, since a write error may be reported only when the buffer is flushed.
- Use **Unix I/O** (`open`, `read`, `write`) when you need control that stdio does not give: for network sockets (where stdio's buffering interacts badly with request–response protocols), for pipes and terminals in carefully controlled programs, for file metadata, and inside signal handlers (`write` is async-signal-safe; `printf` is not).
- Never use `gets` (removed from C in 2011) or `scanf("%s", …)` without a field width: both write an unbounded amount into a fixed buffer, the buffer overflow of [[computer-systems/c-programming#sec-ub]]. Use `fgets(buf, sizeof buf, stdin)`.
- For binary data, `fread` and `fwrite` move blocks of bytes; files written this way are not portable between machines with different byte orders or type sizes ([[computer-systems/bits-integers]]).

::: history
Ken Thompson and Dennis Ritchie's Unix (from 1969 at Bell Labs) made "a file is a sequence of bytes" and a uniform interface to files and devices central to its design; their 1974 *Communications of the ACM* paper describes `open`, `read`, `write` and the hierarchical file system with essentially today's semantics. Pipes were added in 1973 at the urging of Doug McIlroy, who had proposed connecting programs "like garden hose"; with them came the Unix style of small programs combined in pipelines. Mike Lesk's "portable I/O library" (early 1970s) was the precursor of the standard I/O library that appeared in Version 7 Unix (1979) and was standardised with C in 1989. The POSIX.1 standard (IEEE 1003.1, 1988) fixed the system-call interface across Unix variants; its current edition is POSIX.1-2024.
:::

## Where this leads

This chapter completes the journey of the course, from bits to a process doing input and output. Network programming with sockets, which behave like the pipes of this chapter with all their short counts, continues in [[networks]]; file systems — how the bytes of a file are laid out on a device, how directories and inodes are stored, and how journaling makes them survive crashes — and the kernel side of I/O, from device drivers to the page cache, belong to [[operating-systems]]. Durable storage with transactions builds on `fsync` in [[databases]]. Doing many I/O operations concurrently, with threads or with event-driven interfaces such as `epoll` and `io_uring`, is part of [[parallel-computing]] and [[distributed-systems]].

::: summary
- Unix presents files, directories, pipes, sockets and devices uniformly as sequences of bytes accessed through **file descriptors**; descriptors 0, 1 and 2 are standard input, output and error, and `open` returns the lowest free descriptor.
- `read` and `write` transfer *at most* the requested number of bytes; **short counts** are normal for terminals, pipes and sockets, so loop until done ([[#prop-write-all]]); `read` returns 0 at end of file.
- `stat` gives metadata (type, size, permissions); directories map names to inodes.
- The kernel's descriptor tables, open file table and v-node table explain sharing: separate `open` calls have separate positions; `fork` and `dup2` make descriptors share an open file entry and its position ([[#def-tables]]).
- Redirection is `open` plus `dup2` before `exec`; pipelines use `pipe`, `fork`, `dup2` and careful `close`ing — end of file arrives only when every write end is closed.
- Standard I/O buffers in user space: full buffering for files and pipes, line buffering for terminals, none for `stderr` ([[#def-buffering]]); this saves system calls but can lose output on a crash and reorder output when mixed with `write`. `fflush` moves data to the kernel, `fsync` to the device.
:::

## Exercises

::: exercise Which descriptor? {level=1 check="0"}
A process starts with descriptors 0, 1 and 2 open. It executes `a = open("t.txt", O_RDONLY); b = open("t.txt", O_RDONLY); close(a); c = open("t.txt", O_RDONLY); close(0); d = open("t.txt", O_RDONLY);`. What are `a`, `b`, `c` and `d`? (Enter `d`.)
::: solution
`open` returns the lowest unused descriptor ([[#def-fd]]). `a = 3`, `b = 4`; closing 3 frees it, so `c = 3`; closing 0 frees standard input, so `d = 0`. Running this on the test machine prints `3 4 3 0`. Old programs used exactly this trick — `close(0); open(file, …)` — to redirect standard input before `dup2` existed.
:::
:::

::: exercise Counting system calls {level=1 check="3"}
A program writes 10 000 bytes to a file with `putchar`, through a fully buffered `stdout` with a 4096-byte buffer, and exits normally. How many `write` system calls does stdio make? (Enter the number.)
::: solution
The buffer is flushed when it is full: after 4096 and after 8192 bytes. The remaining $10000 - 8192 = 1808$ bytes are flushed at exit. That is $\lceil 10000 / 4096 \rceil = 3$ calls.
:::
:::

::: exercise Short counts or not? {level=1}
For each situation, say whether `read(fd, buf, 4096)` may return a value between 1 and 4095, and why: (a) `fd` is a regular file of 10 000 bytes, first call; (b) the same file, third call; (c) `fd` is a terminal and the user types `hello` and Enter; (d) `fd` is a TCP socket and the peer has sent 4096 bytes.
::: solution
(a) No: 4096 bytes are available, so a full buffer is returned (barring a signal). (b) Yes: after two full reads, $10000 - 8192 = 1808$ bytes remain, a short count at end of file. (c) Yes: a terminal in its usual mode returns one line at a time, here the 6 bytes `hello\n`. (d) Yes: the data may arrive in several network packets, and `read` returns whatever has arrived — perhaps 1448 bytes, one packet's worth — so the program must loop until it has all 4096.
:::
:::

::: exercise Shared positions {level=2}
`abc.txt` contains `abcdef`. A program does `fd = open("abc.txt", O_RDONLY); read(fd, &c, 1);`, then `fd2 = dup(fd); read(fd2, &c, 1);`, then forks; the child reads one byte from `fd2` and exits; the parent waits and reads one byte from `fd`. Which bytes are read, in order?
::: solution
`dup` makes `fd2` point to the same open file entry as `fd`, so all three descriptors (the parent's `fd` and `fd2` and, after the fork, the child's copies) share one file position. Reads: `a` (position $0 \to 1$), `b` through `fd2` ($1 \to 2$), `c` in the child ($2 \to 3$), `d` in the parent through `fd` ($3 \to 4$). Only separate `open` calls create independent positions ([[#def-tables]]).
:::
:::

::: exercise Lost output {level=2}
Explain the output of `./prog > log.txt` for `int main(void) { printf("starting\n"); fork(); printf("forked\n"); return 0; }`. How many lines does `log.txt` contain, and how does that change when output goes to a terminal? Fix the program.
::: solution
Redirected to a file, `stdout` is fully buffered, so `starting\n` is still in the buffer when `fork` copies the process. Each process then appends `forked\n` and flushes its buffer at exit, so `log.txt` contains four lines: `starting`, `forked`, `starting`, `forked`. To a terminal the stream is line buffered, `starting` is written before the fork, and the output is three lines: `starting` and two `forked`. The fix is `fflush(stdout);` before `fork()` (or, if the child will `exec`, using `_exit` in the child on failure, as in [[computer-systems/exceptions-processes]]).
:::
:::

::: exercise A copy program {level=2}
Write `copy src dst` using Unix I/O, creating `dst` with permissions `0644` (subject to the umask) and truncating it if it exists. Reuse `write_all`. What happens if `src` and `dst` name the same file, and how could the program detect it?
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int write_all(int fd, const char *buf, size_t n);   /* as in the text */

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
    if (close(out) < 0) { perror("close"); return 1; }   /* errors can surface here */
    close(in);
    return 0;
}
```

Compiled together with `write_all` from the text (made non-`static`), `./copy t.txt t2.txt && cmp t.txt t2.txt` succeeds. If `src` and `dst` are the same file, `open` with `O_TRUNC` empties it *before* anything is read, so the "copy" destroys the data and produces an empty file. To detect it, `fstat` both descriptors after opening the source and before truncating (open the destination without `O_TRUNC`, compare the `st_dev` and `st_ino` fields, then call `ftruncate(out, 0)` only if they differ): equal device and inode numbers mean the same file, even under different names.
:::
:::

::: exercise A pipeline {level=3}
Write a program that runs the pipeline `ls -1 / | wc -l` using `pipe`, two `fork`s, `dup2` and `execlp`, and prove that `wc` terminates (receives end of file) once `ls` exits.
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

/* Run the pipeline  ls -1 /  |  wc -l */
int main(void) {
    int fds[2];
    if (pipe(fds) < 0) { perror("pipe"); return 1; }
    pid_t left = fork();
    if (left == 0) {                       /* ls: stdout -> pipe */
        dup2(fds[1], 1);
        close(fds[0]); close(fds[1]);
        execlp("ls", "ls", "-1", "/", (char *) NULL);
        _exit(127);
    }
    pid_t right = fork();
    if (right == 0) {                      /* wc: stdin <- pipe */
        dup2(fds[0], 0);
        close(fds[0]); close(fds[1]);
        execlp("wc", "wc", "-l", (char *) NULL);
        _exit(127);
    }
    close(fds[0]); close(fds[1]);          /* the parent uses neither end */
    waitpid(left, NULL, 0);
    waitpid(right, NULL, 0);
    return 0;
}
```

It prints the same number as the shell's `ls -1 / | wc -l` (the number depends on the system). **Termination.** `wc` receives end of file when the pipe is empty and the reference count of the write end's open file entry is $0$ ([[#def-tables]]). Descriptors referring to that entry exist in at most three processes: the parent (closed right after the second `fork`), the right child (its inherited `fds[1]` is closed before `exec`, and its descriptor 0 refers to the *read* end), and the left child, whose only remaining reference is its descriptor 1 after the `dup2` and `close`s. When `ls` exits, the kernel closes all its descriptors, so the count drops to $0$; once `wc` has read the remaining data, its next `read` returns $0$, and `wc` prints its count and exits. If any one of the four `close(fds[1])`-type calls were omitted in the parent or the right child, that process would keep the write end open and `wc` would wait forever — and the parent, waiting for `wc`, would hang too.
:::
:::

::: exercise Durable writes {level=3}
A program saves a document by writing it to `doc.txt` with `fopen`, `fprintf` and `fclose`. Describe two different ways the saved document can be lost or corrupted if the machine loses power shortly afterwards, and give a sequence of calls that makes saving safe. Use the distinction between the stdio buffer, the kernel and the device.
::: solution
(1) `fclose` flushes stdio's buffer into the kernel, but the kernel keeps written data in its page cache and writes it to the device later (typically within seconds). A power failure in that window loses the data, even though every call succeeded. (2) Opening the file with mode `"w"` truncates it at once; if power fails after the truncation reaches the device but before the new data do, both the old and the new versions are lost — the file is empty or partly written.

The standard safe sequence writes a new file and atomically replaces the old one: `f = fopen("doc.txt.tmp", "w")`; write the data; `fflush(f)` (stdio buffer → kernel); `fsync(fileno(f))` (kernel → device); `fclose(f)`, checking every result; then `rename("doc.txt.tmp", "doc.txt")`, which atomically replaces the directory entry, so that after a crash the name refers either to the complete old file or to the complete new one; and finally `fsync` on a descriptor of the containing directory, so that the rename itself is durable. Databases and editors use variants of this sequence; the details of what file systems guarantee are covered in [[operating-systems]].
:::
:::
