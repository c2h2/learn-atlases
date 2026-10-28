存储设备，正如 [[operating-systems/storage-io]] 所示，是一个带编号的块的数组。可是没有人会去要"2099 号块"。我们要的是 `/home/alice/notes.txt`，期望它断电之后内容还在、追加时会变大、有所有者和权限，并且愿意的话能同时出现在两个目录里。**文件系统**把这个平面的数组变成由有名字、可持久、受保护的文件构成的层次——而且它必须只用很少几次慢速设备访问做到这一点，还必须以能在*任何*时刻发生的崩溃中幸存的方式组织自己——包括在它更新自身数据结构的半途之中。

本章研究它如何做到。我们从抽象开始——文件即索引节点，目录即从名字到索引节点号的映射，硬链接与符号链接——用的就是一个我们在普通文件里创建、用 `debugfs` 检查的 ext4 文件系统。然后看盘上布局：超级块、位图、索引节点表和数据块；经典 Unix 索引节点的多级索引与 ext4 的区段；以及让相关数据彼此靠近的放置策略。最后直面**崩溃一致性**：为什么单独一次 `write` 就能让磁盘处于不一致状态，`fsck` 如何修复它，以及**日志**如何让更新成为原子的——并用一个在每一步崩溃来检验该协议的模型来说明。

[[computer-systems/system-io]] 讲过编程接口——`open`、`read`、`write`、`close`、`stat`、文件描述符和内核的打开文件表（[[computer-systems/system-io#def-tables]]）——我们以其为已知。

例子使用测试机上在一个文件里做出的 64 MiB ext4 文件系统（测试机自身的根文件系统是 ZFS），无需 root 权限：`mkfs.ext4 -d` 把一棵目录树拷贝进新文件系统，`debugfs` 则直接读取它的结构。

```console
$ mkdir -p fsroot/home/alice
$ printf 'hello, file system\n' > fsroot/home/alice/notes.txt
$ head -c 300000 /dev/urandom > fsroot/home/alice/photo.jpg
$ ln fsroot/home/alice/notes.txt fsroot/home/alice/notes-link.txt
$ ln -s notes.txt fsroot/home/alice/shortcut
$ truncate -s 64M fs.img && mkfs.ext4 -q -b 4096 -d fsroot fs.img
```

## 文件、索引节点与目录

::: definition 索引节点 {#def-inode}
**索引节点**（inode，index node 的缩写）是文件元数据的盘上记录：文件类型（普通文件、目录、符号链接、设备……）、权限、所有者与组、大小、时间戳、**链接计数**，以及其数据块的位置。每个索引节点有一个编号，在文件系统内唯一，充当文件的底层名字。索引节点*不*包含文件的名字。
:::

::: definition 目录 {#def-directory}
**目录**是内容为一串**目录项**的文件，每个目录项把一个名字映射到一个索引节点号。每个目录都含 `.`（自身）与 `..`（父目录）两个目录项。像 `/home/alice/notes.txt` 这样的**路径**，按从**根目录**（其索引节点号固定，ext4 中为 2）出发要依次跟随的一串目录项来命名文件。
:::

`debugfs` 把两者都显示出来：

```console
$ debugfs -R "ls -l /home/alice" fs.img
     14   40775 (2)   1000   1000    4096 27-Oct-2026 16:18 .
     13   40775 (2)   1000   1000    4096 27-Oct-2026 16:18 ..
     15  100664 (1)   1000   1000      19 27-Oct-2026 16:18 notes-link.txt
     15  100664 (1)   1000   1000      19 27-Oct-2026 16:18 notes.txt
     16  100664 (1)   1000   1000   300000 27-Oct-2026 16:18 photo.jpg
     17  120777 (7)   1000   1000       9 27-Oct-2026 16:18 shortcut
$ debugfs -R "stat /home/alice/notes.txt" fs.img | grep -E 'Inode:|Links|EXTENTS' -A1
Inode: 15   Type: regular    Mode:  0664   Flags: 0x80000
Generation: 0    Version: 0x00000000:00000000
--
Links: 2   Blockcount: 8
Fragment:  Address: 0    Number: 0    Size: 0
--
EXTENTS:
(0):2099
```

第一列是索引节点号，第二列是八进制的类型和权限位（`100664` 是模式 `rw-rw-r--` 的普通文件；`40775` 是目录；`120777` 是符号链接），然后是所有者、组和大小。`notes.txt` 与 `notes-link.txt` 是*同一个*索引节点 $15$ 的两个目录项：一条**硬链接**。该索引节点的链接计数是 $2$，它的数据——19 字节——位于 2099 号块。（`Blockcount` 的 $8$ 以 512 字节为单位：即一个 4 KiB 块。）

### 硬链接、unlink 与符号链接

名字住在目录里，文件是索引节点，所以一个文件可以有任意多个名字，位于同一文件系统的任意目录里。系统调用 `link(old, new)` 添加一个目录项；`unlink(name)` 移走一个目录项并把索引节点的链接计数减一。没有"删除文件"的系统调用：文件系统只有在链接计数为 $0$ **且**没有任何进程打开该文件时，才释放索引节点及其块。

::: example 一个没有名字的文件 {#ex-unlink}
创建一个文件，给它第二个名字，在它仍被打开时把两个名字都删掉，然后读它。

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>

static void show(const char *when, int fd) {
    struct stat st;
    fstat(fd, &st);                               /* 元数据取自索引节点 */
    printf("%-22s inode %lu, links %lu, size %lld\n", when,
           (unsigned long)st.st_ino, (unsigned long)st.st_nlink, (long long)st.st_size);
}

int main(void) {
    int fd = open("a.txt", O_CREAT | O_TRUNC | O_RDWR, 0644);
    if (fd < 0 || write(fd, "data\n", 5) != 5) return 1;
    show("after create:", fd);
    if (link("a.txt", "b.txt") != 0) return 1;    /* 第二个名字，同一个索引节点 */
    show("after link b.txt:", fd);
    unlink("a.txt");                              /* 删去第一个名字 */
    show("after unlink a.txt:", fd);
    unlink("b.txt");                              /* 名字全部没了…… */
    show("after unlink b.txt:", fd);
    char buf[8] = {0};
    if (pread(fd, buf, 5, 0) != 5) return 1;     /* ……但文件仍然存在 */
    printf("still readable: %s", buf);
    close(fd);                                    /* 这时它的块才被释放 */
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -o links links.c && ./links
after create:          inode 684667, links 1, size 5
after link b.txt:      inode 684667, links 2, size 5
after unlink a.txt:    inode 684667, links 1, size 5
after unlink b.txt:    inode 684667, links 0, size 5
still readable: data
```
索引节点编号始终不变：`link` 与 `unlink` 编辑的是目录，不是文件。第二次 `unlink` 之后，文件没有了名字、链接计数为 $0$，但打开的描述符仍然引用着那个索引节点（[[computer-systems/system-io#def-tables]]），所以数据仍可读；文件系统到 `close` 时才释放索引节点和它的块。程序用这一招创建即使程序崩溃也会自动消失的临时文件，包管理器则依赖它在替换仍被运行中程序映射的库时不出问题。（索引节点号来自测试机的 ZFS 文件系统，每次运行都不同。）若机器在没有名字的文件打开期间崩溃，文件系统必须在恢复过程中释放它；ext4 为此专门维护一条**孤儿节点链表**（我们镜像中的 `orphan_file` 特性）。
:::
:::

**符号链接**不同：它是一个小文件，内容是一个*路径*，链接被使用时内核去跟踪它。上面的 `shortcut` 是索引节点 $17$，类型 `120777`，大小 $9$——就是 `notes.txt` 这九个字节，ext4 把它直接存进索引节点（`debugfs` 里的 "Fast link dest"）而不用数据块。符号链接可以跨文件系统、可以指向目录，但也会悬空：删掉 `notes.txt` 和它的两个硬链接名，`shortcut` 就无处可指。禁止对目录建硬链接（`.` 与 `..` 除外，它们由文件系统自己建立），因为目录树中可能出现环，那会破坏释放文件的链接计数规则，也会让遍历目录树的程序犯糊涂。

::: quiz
索引节点 $15$ 有两个名字 `notes.txt` 与 `notes-link.txt`，`shortcut` 是指向 `notes.txt` 的符号链接。哪些说法正确？
- [x] `unlink("notes.txt")` 之后，数据仍能以 `notes-link.txt` 访问。
- [ ] `unlink("notes.txt")` 之后，`shortcut` 仍通向数据。
- [x] `rename("notes-link.txt", "notes.txt")` 之后，`shortcut` 又能用了。
- [x] 对 `notes.txt` 用 `chmod` 改权限，`notes-link.txt` 的权限也随之改变。
::: solution
数据属于索引节点，而节点还剩下一个名字。符号链接里存的是*路径* `notes.txt`，它已不存在，所以链接悬空——直到这个名字下重新出现文件时才又通，rename 正是如此。权限存在索引节点里，由所有硬链接共享。
:::
:::

### 路径解析

::: algorithm 路径解析 {#alg-namei}
解析绝对路径 $/c_1/c_2/\dots/c_k$：

1. $i \gets$ 根索引节点（相对路径则为进程的当前目录）。
2. 对每个成分 $c_j$：
   1. 检查 $i$ 是目录，且进程对它有搜索（执行）权限。
   2. 读 $i$ 的目录块，找到名为 $c_j$ 的目录项；没有就以 `ENOENT` 失败。
   3. $i \gets$ 该目录项的索引节点。（若它是符号链接且不是最后一个成分，就解析它的内容并从那里继续，并记录已跟踪的链接数以阻止环路。）
3. 返回 $i$。
:::

在我们的镜像里，解析 `/home/alice/notes.txt` 要读索引节点 $2$（根）、它的目录块 $10$（把 `home` 映射到索引节点 $13$）；索引节点 $13$ 和它的块 $2097$（把 `alice` 映射到 $14$）；索引节点 $14$ 和块 $2098$（把 `notes.txt` 映射到 $15$）；最后是索引节点 $15$，它指向 2099 号块中的数据。若无缓存，打开文件要 $7$ 次块读，再读它便是第八次。真实的内核用**目录项缓存**（dentry cache，缓存最近解析过的名字）和索引节点缓存把其中几乎全部免掉了。

::: widget graph
nodes: inode2@0,3; blk10@1,3; inode13@2,2; blk2097@3,2; inode14@4,1; blk2098@5,1; inode15@6,0; blk2099@7,0
edges: inode2>blk10; blk10>inode13; inode13>blk2097; blk2097>inode14; inode14>blk2098; blk2098>inode15; inode15>blk2099
algorithm: bfs
start: inode2
caption: 在 ext4 镜像中逐块解析 `/home/alice/notes.txt`：每个索引节点指向它的目录块，每个目录块把下一个名字映射到一个索引节点。逐步执行这个搜索并数一数：文件打开之前要七次读，第八次读它的数据。若无任何缓存，路径每多一个成分就多两次读——这就是内核的 dentry 缓存让重复查找几乎免费、也让很深的路径在冷缓存下很慢的原因。
:::

早期 Unix 的目录是一个个由 16 字节目录项组成的简单数组，线性查找。ext4 对小目录保留这一格式（上面根目录的 `ls` 显示着每个目录项的记录长度），但有了 `dir_index` 特性后，用哈希 B 树（"HTree"）为大目录建索引，于是百万目录项的目录几次块读就能查完。

## 盘上布局

::: definition 文件系统的布局 {#def-layout}
Unix 风格的文件系统把它的块划分为：

- **超级块**，描述文件系统整体：块大小、块数与索引节点数、其他结构的位置、状态标志；
- **分配位图**，每个数据块一位、每个索引节点一位，记录哪些在用；
- **索引节点表**，一个定长索引节点的数组，靠算术就能找到第 $n$ 号索引节点；
- **数据块**，存放文件内容、目录内容、间接块或区段树块。
:::

`dumpe2fs` 对我们的镜像输出如下：

```console
$ dumpe2fs -h fs.img | grep -E 'Inode count|Block count|Block size|Inode size|Total journal size'
Inode count:              16384
Block count:              16384
Block size:               4096
Inode size:               256
Total journal size:       4096k
$ dumpe2fs fs.img | grep -A5 '^Group 0'
Group 0: (Blocks 0-16383) csum 0x2ba0 [ITABLE_ZEROED]
  Primary superblock at 0, Group descriptors at 1-1
  Reserved GDT blocks at 2-8
  Block bitmap at 9 (+9), csum 0xd8ec3b7e
  Inode bitmap at 25 (+25), csum 0x9f7da08f
  Inode table at 41-1064 (+41)
```

$16{,}384$ 个 $256$ 字节的索引节点占满 $16384 \times 256 / 4096 = 1024$ 个块，从 $41$ 号到 $1064$ 号。索引节点 $n$（从 $1$ 编号）位于表的字节偏移 $(n - 1) \times 256$ 处，所以索引节点 $15$ 在 $41 + \lfloor 14 \times 256/4096 \rfloor = 41$ 号块、偏移 $14 \times 256 = 3584 = 0xe00$ 处——与 `debugfs -R "imap /home/alice/notes.txt"` 的报告（"located at block 41, offset 0x0e00"）分毫不差。其余的块是数据：两个目录占 $2097$ 与 $2098$ 号块，`notes.txt` 占 $2099$ 号块。

### 找到文件的块

索引节点该如何记录哪些块存放着文件的数据？答案要能处理从几个字节到太字节的文件，还要让小文件便宜。

::: definition 多级索引 {#def-multilevel-index}
经典的 Unix 索引节点（如 ext2 与 ext3）有 $12$ 个**直接指针**指向最前面的 $12$ 个数据块、一个**一次间接**指针指向一个装满了指向数据块的指针的块、一个**二次间接**指针指向一个装一次间接块指针的块，以及一个**三次间接**指针。
:::

::: proposition 多级索引可达到的大小 {#prop-max-size}
设块大小 $B$ 字节、指针 $p$ 字节，故一块装 $k = B/p$ 个指针，则 [[#def-multilevel-index]] 的索引节点可寻址

$$
(12 + k + k^2 + k^3)\,B \text{ 字节},
$$ {#eq-max-size}

并且读文件的第 $x$ 个字节（在索引节点之外）最多需要 $3$ 次索引块读。
:::

::: proof
直接指针寻址 $12$ 个块。一次间接块装 $k$ 个指向数据块的指针。二次间接块装 $k$ 个指针，各指向一个有 $k$ 个数据指针的一次间接块：$k^2$ 个块。同理，三次间接指针可达 $k^3$ 个块。求和后乘以 $B$ 即得 [[#eq-max-size]]。块下标为 $b = \lfloor x/B \rfloor$ 的字节要经过至多三级索引块才能到达（当 $b \ge 12 + k + k^2$ 时）。
:::

取 $B = 4096$、$p = 4$，则 $k = 1024$，索引可寻址 $(12 + 1024 + 2^{20} + 2^{30}) \times 4096$ 字节，略多于 $4$ TiB。不超过 $48$ KiB 的文件完全不需要索引块，而且对真实文件系统的长期测量一直发现：文件大多数很小，而*字节*大多数在大文件里——所以这一设计让常见情形便宜、让大文件成为可能。

它的弱点是大文件：一个 1 GiB 的文件需要 $262{,}144$ 个指针、$1$ MiB 的索引块，哪怕它的数据完全连续。因此 ext4 用**区段**（extent）来描述数据。

::: definition 区段 {#def-extent}
**区段**是一段连续的块，记为（首个逻辑块、长度、首个物理块）。一个 ext4 索引节点可直接存放至多四个区段；区段更多的文件用一棵以索引节点为根的小区段块树。在 ext4 中，一个已初始化的区段至多覆盖 $32{,}768$ 个块（4 KiB 块时为 $128$ MiB）。
:::

300,000 字节的 `photo.jpg` 需要 $\lceil 300000/4096\rceil = 74$ 个块，`debugfs` 显示一个区段就描述了全部：`(0-73):2100-2173`。分配在位图附近的日志需要三个：`(0-9):15-24, (10-24):26-40, (25-1023):1066-2064`。基于区段的文件，其元数据开销与*碎片程度*成正比而非与大小成正比——这就是文件系统拼命要连续分配的原因。

::: example 要多少索引块？ {#ex-index}
一个 $10$ MiB 的文件用 4 KiB 块存储。经典多级索引节点需要多少索引块？若文件 (a) 连续、(b) 分成 $40$ 个片段，ext4 各需要多少个区段？
::: solution
文件有 $10 \times 2^{20}/4096 = 2560$ 个块。直接指针覆盖 $12$ 个，一次间接块再加 $1024$ 个（共 $1036$ 个），其余 $2560 - 1036 = 1524$ 个需要二次间接块加其下 $\lceil 1524/1024 \rceil = 2$ 个一次间接块。索引块：$1 + 1 + 2 = 4$ 个，即 $16$ KiB 元数据，而读文件的最后一个块在索引节点之后还需两次索引读。用区段：(a) 一个区段（$2560 \le 32768$），存在索引节点本身里，不需额外的块；(b) $40$ 个区段，超过能放进索引节点的四个，于是要一个区段块（它装 $340$ 个目录项）。决定代价的是连续性，不是大小。
:::
:::

### 放置：让相关的东西彼此靠近

在硬盘上，一个块住在哪里与它如何被找到同等重要（[[operating-systems/storage-io#ex-hdd]]）。最初的 Unix 文件系统把所有索引节点放在盘的最前面，数据块哪里有空间就放哪里，所以读一个文件意味着从它的索引节点到它的数据一次长长的寻道；而随着空闲链表被打乱，文件的块也四散各处。Marshall McKusick 等人的**快速文件系统**（FFS，1984）把磁盘划分成**柱面组**，每组有自己的位图、索引节点和数据块，并把一个文件的索引节点和数据放进同一组、同一目录的文件放在一起、新目录放进空闲索引节点多的组；在当时的硬件上把吞吐率提高到至多十倍。ext2、ext3、ext4 把组称为**块组**（每组 32,768 块，4 KiB 块时 $128$ MiB——我们 64 MiB 的镜像只有一个）。ext4 又加了**延迟分配**（只在脏数据被写回时才选择块，那时最终大小已经确定）和多块分配，使文件得以连续。对 SSD，局部性对读不太重要，但大的顺序写仍降低写放大（[[operating-systems/storage-io#prop-wa]]）。

### 缓存与持久性

这些结构全都在内存里有缓存：**页缓存**存放文件数据，内核的索引节点缓存、目录项缓存和缓冲区缓存存放元数据。写先进缓存，稍后写回——Linux 上默认由内核线程回写存在了约 $30$ 秒以上的脏数据——这让 `write` 很快，也让文件系统能批量处理并安排更新的顺序。它还意味着：**`write` 成功返回并不意味着数据已在设备上**。

::: warning "write() 返回了，所以我的数据安全了"
`write` 把数据拷进页缓存就返回；若机器几秒后断电，数据就没了。要让数据持久，程序必须调用 `fsync(fd)`（或 `fdatasync`），它直到文件的数据和元数据都已到达稳定存储——包括刷掉设备自己的易失写缓存——才返回。而因为新文件的*名字*住在它的目录里，新建或改名的文件还要对目录再 `fsync` 之后才算持久。替换一个文件的安全做法——使崩溃后它要么是旧内容要么是新内容，绝不能是混合或空无——是：写一个临时文件，对它 `fsync`，把它 `rename` 成旧名字（POSIX 保证改名是原子的），再对目录 `fsync`：

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

/* 原子地替换 `path` 的内容：读者看到的是旧文件或新文件，从不会是混合体，
   即使机器崩溃也一样。 */
static int replace_file(const char *path, const char *tmp, const char *data) {
    int fd = open(tmp, O_CREAT | O_TRUNC | O_WRONLY, 0644);
    if (fd < 0) return -1;
    size_t n = strlen(data);
    if (write(fd, data, n) != (ssize_t)n || fsync(fd) != 0) {   /* 数据持久 */
        close(fd); unlink(tmp); return -1;
    }
    if (close(fd) != 0 || rename(tmp, path) != 0) return -1;     /* 原子切换 */
    int dir = open(".", O_RDONLY);                               /* 让改名持久 */
    if (dir < 0) return -1;
    int r = fsync(dir);
    close(dir);
    return r;
}

int main(void) {
    if (replace_file("config.txt", "config.txt.tmp", "version = 1\n")) return 1;
    if (replace_file("config.txt", "config.txt.tmp", "version = 2\n")) return 1;
    FILE *f = fopen("config.txt", "r");
    char line[64];
    if (f && fgets(line, sizeof line, f)) printf("%s", line);
    if (f) fclose(f);
    return 0;
}
```

它打印 `version = 2`，而 `strace` 显示每次替换的次序是 `write`、`fsync`、`rename`、`fsync(".")`。跳过第一个 `fsync` 造成过真实的数据丢失：崩溃之后，有些文件系统把改名比数据先持久化了，留给应用程序一个空的配置文件。数据库、编辑器和包管理器都遵循这一模式，或者自己维护日志。
:::

## 崩溃一致性

给文件追加一个块要改动三样结构：数据块本身、索引节点（新大小、新的块指针或区段）、数据位图（这个块现在被占用了）。它们在设备上位于不同地方，所以是三次独立的写，而设备可能以任意顺序完成它们。电源可以在任意两次之间断掉。

::: example 崩溃可能留下什么 {#ex-crash-states}
对一个必须写数据块 D、索引节点 I 和位图 B 的追加，列出崩溃后盘上可能出现的这些写的所有组合，并说明每种错在哪里。
::: solution
$2^3 = 8$ 个子集中两种没问题：一个都没写（追加根本没发生）和三个都写了。其余六种：

| 盘上有 | 后果 |
|---|---|
| 只有 D | 数据写了，但没有任何东西指向它，位图又说块是空闲的：就当追加没发生。无害（只丢了数据）。 |
| 只有 I | 索引节点指向一个位图说空闲、内容却是**垃圾**（旧内容）的块。文件读出垃圾，这个块以后还可能被再分配给第二个文件。 |
| 只有 B | 位图把一个没有任何东西指向的块标为占用：**空间泄漏**。 |
| I 和 B | 元数据一致，但文件里本该是新数据的地方是垃圾。 |
| I 和 D | 索引节点指向正确的数据，但位图说块空闲：它可能被重新分配，两个文件将共享它。 |
| B 和 D | 块被标为占用却没有被引用：泄漏，且数据丢了。 |

六种状态中只有四种是文件系统元数据真正的**不一致**（有 I 无 B、有 B 无 I）；另两种（只有 D，以及有 I 有 B 无 D）是元数据一致而*数据*丢失或过期。崩溃一致性机制必须修正前者，最好连后者也一并管上。
:::
:::

第一种补救是事后修复。**fsck**（"file-system check"，文件系统检查）在非正常关机后的启动时运行，把一切扫一遍：从索引节点重建位图，检查每个目录项是否指向已分配的索引节点、每个已分配的索引节点是否有正确的链接计数，把没有引用的索引节点放进 `lost+found`（我们的镜像中是 11 号节点），并裁决两个索引节点同时声称的块。它管用，但恢复不了丢掉的数据，而且运行时间正比于文件系统的大小而不是损坏的程度——一块几 TB 的盘要跑上几个小时。

### 日志

**日志**（journalling，预写式日志）从数据库借来，把一组更新变成**原子的**：在原地改动任何东西之前，把所有改动的描述写进一个单独的区域——**日志**；只有当描述完整且持久地落盘之后，才应用这些改动。崩溃之后，日志告诉你还有什么没做完。

::: algorithm 日志化更新（数据日志） {#alg-journal}
要原子地更新一组块：

1. **写日志。** 写一个事务开始块（带事务号）和每个块的新内容到日志。等到这些写都持久。
2. **提交日志。** 向日志写一个事务结束（提交）块。等到它持久。事务此刻**已提交**。
3. **检查点。** 把块写到它们在文件系统中的真正位置。
4. **释放。** 检查点的写持久之后，把日志中该事务占用的空间标为空闲（通过更新日志超级块）。

崩溃后的**恢复**：扫描日志；对每个带提交块的事务，把它记录的块写到真正的位置（再写一遍）；丢弃没有提交块的事务。
:::

::: theorem 日志使更新成为原子 {#thm-journal}
假设单个块写是原子的（要么完整完成要么完全不发生），[[#alg-journal]] 中"等到持久"的步骤被遵守，且崩溃后文件系统被使用之前先运行恢复。那么恢复之后，对每个事务，它的块更新要么全部已原地生效，要么一个都没有。
:::

::: proof
考虑任意时刻的崩溃。若一个事务的提交块没有持久地写入日志，那么步骤 2 尚未完成，因此步骤 3 尚未开始：该事务没有任何原地块被写过，恢复会把它丢弃——它的更新一个都不生效。若提交块已持久，那么由步骤 1 和 2 的等待，每个记录块在日志里也已持久，而提交块本身是原子的，所以恢复找到一个完整的事务并把它的所有块写到原地：它的更新全部生效。恢复可能重写检查点早已写过的块，这无害，因为每次写都把块置成同样的最终内容（**重放是幂等的**）。同理，*恢复过程中*崩溃也无害：恢复从头再来一遍就是。
:::

等待必不可少，而且不会自动发生：设备可能重排写，或者在写还留在它的易失缓存里时就报告完成。内核用 **flush** 与 **force-unit-access** 命令（块层屏障）强制执行顺序，ext4 的日志给每个提交加一个校验和，使先于其事务数据块写入的提交能被识别并忽略。一个模型展示了不这样做会出什么事。

::: example 在每一步崩溃一个日志 {#ex-journal-model}
把一个追加建模成更新 B、I、D 的事务。在协议写序列的每个前缀之后崩溃，运行恢复，检查结果是否总是全旧或全新。然后让设备把提交块重排到记录的块之前。
::: solution
```python
# 一个玩具预写日志。"磁盘"是一个 块 -> 内容 的字典。
# 一个事务更新某次追加的位图 B、索引节点 I 和数据块 D。
OLD = {'B': 'b0', 'I': 'i0', 'D': 'd0'}
NEW = {'B': 'b1', 'I': 'i1', 'D': 'd1'}

def writes(order_ok=True):
    """日志协议发出的块写序列。"""
    j = [('J', ('begin', None))] + [('J', ('blk', (k, v))) for k, v in NEW.items()]
    commit = [('J', ('commit', None))]
    checkpoint = [(k, v) for k, v in NEW.items()]
    # 正确：提交块只在该事务的日志块落盘之后。
    # 错误：磁盘把提交块重排到记录的块之前。
    return j + commit + checkpoint if order_ok else commit + j + checkpoint

def recover(disk):
    log = disk['J']
    if ('commit', None) in log:                       # 重放已提交的事务
        for kind, x in log:
            if kind == 'blk':
                disk[x[0]] = x[1]
    disk['J'] = []
    return {k: disk[k] for k in 'BID'}

for order_ok in (True, False):
    seq = writes(order_ok)
    outcomes = set()
    for crash in range(len(seq) + 1):                 # 在第 `crash` 次写之后崩溃
        disk = dict(OLD, J=[])
        for target, val in seq[:crash]:
            if target == 'J': disk['J'].append(val)
            else: disk[target] = val
        state = recover(disk)
        outcomes.add('old' if state == OLD else 'new' if state == NEW else f'MIXED {state}')
    print('ordered' if order_ok else 'reordered', sorted(outcomes))
```
```console
$ python3 journal.py
ordered ['new', 'old']
reordered ["MIXED {'B': 'b1', 'I': 'i0', 'D': 'd0'}", "MIXED {'B': 'b1', 'I': 'i1', 'D': 'd0'}", 'new', 'old']
```
按协议顺序写时，$9$ 个崩溃点中的每一个都恢复到旧状态（崩溃在提交之前）或新状态（之后）——[[#thm-journal]] 的缩影。若提交先到盘，崩溃在提交之后、记录块未全部到齐时会留下一个"已提交"但恢复只能部分重放的事务：位图说块已用，而索引节点或数据还是旧的——恰是 [[#ex-crash-states]] 中的不一致状态。顺序才是日志起作用的原因。
:::
:::

数据日志把每个数据块写两遍——一遍进日志，一遍到原地——大写的写带宽因此减半。所以多数文件系统只记**元数据**日志。ext4 默认的**有序**模式（`data=ordered`）中，数据块*先*写到原地，然后元数据事务记入日志并提交，最后做检查点。这样崩溃可能丢掉最近的数据，但绝不让索引节点指向一块垃圾，因为索引节点的更新只在它所指向的数据落盘之后才提交。（更弱的 `data=writeback` 模式连这个顺序也放弃。）我们镜像的日志是 8 号索引节点、$1024$ 个块、$4$ MiB（`dumpe2fs` 报告 "Total journal size: 4096k"），ext4 把许多操作打包进每个事务，默认每 $5$ 秒或 `fsync` 要求时提交。

::: widget graph
nodes: data@0,1; jmeta@1,1; commit@2,1; ckpt@3,1; free@4,1; flush1@1,0; flush2@2,0
edges: data>flush1; jmeta>flush1; flush1>commit; commit>flush2; flush2>ckpt; ckpt>free
algorithm: topo
caption: ext4 有序模式中写的顺序，画成依赖图：把数据写到原地、把元数据写进日志（两者任意顺序或并行），等待两者完成（flush），写提交块，再等待，然后对元数据做检查点，最后释放日志空间。逐步执行拓扑排序就得到一种合法次序。注意什么*没*被约束——数据与记日志的元数据可以并发写——什么被约束：任何东西不得先于指向它的箭头。把任意一条箭头反过来，上面的崩溃模型就能找出混合状态。
:::

### 其他途径

**写时复制**（copy-on-write）文件系统从不覆写在用的数据或元数据：把改动过的块的新版本写到别处，然后写指向它们的那些块的新版本，一路向上到一个根，最后原子地切换一个类似超级块的指针指向新根。切换前的崩溃留下完好的旧树；切换后是新树。ZFS（在测试机上）和 Btrfs 就这样工作，这也让快照几乎免费——留着旧根就是——并让它们能对**每个块做校验和**、发现静默损坏。**日志结构**文件系统（Rosenblum 与 Ousterhout，1991）走得更远，把*一切*，数据与元数据，顺序写进一条日志，在后台清理旧段；每块 SSD 内部的 FTL 正是这样一套日志结构系统（[[operating-systems/storage-io#def-ftl]]）。而**软更新**（soft updates，Ganger 与 Patt，1994），用于 FreeBSD 的 UFS，精心安排元数据写的顺序，使盘上状态除泄漏外始终一致，泄漏由后台检查回收。

::: history
Thompson 与 Ritchie 的 Unix 文件系统（1974 年发表）引入了索引节点、带硬链接的层次目录树、以及名字与文件的分离；它的索引节点有直接块和间接块，与 [[#def-multilevel-index]] 十分相像。Multics（1965）更早开创了层次文件系统。McKusick、Joy、Leffler 与 Fabry 的快速文件系统（1984）引入了柱面组和考虑局部性的放置。IBM 的 JFS（1990）和微软的 NTFS（1993）把元数据日志带进主流系统；Stephen Tweedie 给 ext2 加上日志成为 ext3（2001 年并入 Linux），ext4（在 Linux 2.6.28 中稳定，2008）加入了区段、延迟分配和日志校验和。Mendel Rosenblum 与 John Ousterhout 的日志结构文件系统出现于 1991 年；NetApp 的 WAFL（1994）、Sun 的 ZFS（2005）和 Btrfs（2009）使写时复制文件系统走向实用。Vijay Chidambaram、Thanumalayan Sankaranarayana Pillai 与威斯康星大学的同事们（2014）表明，许多应用未能正确使用 `fsync` 与 `rename` 来挺过崩溃。
:::

## 后续内容

数据库建立在同样的思想之上但控制更多——自己的缓冲池、预写日志、节点即盘块的 B 树、以及 ARIES 这样的恢复算法（[[databases]]）。分布式文件系统与对象存储在机器之间复制文件，并且必须在网络故障之下与崩溃之下同样保持一致（[[distributed-systems]]）。权限、访问控制列表与静态加密属于 [[security]]。在本课程里，[[operating-systems/virtualisation]] 展示容器如何用覆盖挂载与绑定挂载给每组进程自己的文件系统视图，以及虚拟磁盘本身就是宿主文件系统上的文件。

::: summary
- 文件是一个**索引节点**——元数据与块位置，但没有名字（[[#def-inode]]）；**目录**把名字映射到索引节点号（[[#def-directory]]）。硬链接是额外的名字；链接计数为 $0$ 且不再被打开时文件被释放（[[#ex-unlink]]）；符号链接存一个路径。
- **路径解析**每个成分读一个索引节点和一个目录块（[[#alg-namei]]）：冷缓存下打开 `/home/alice/notes.txt` 要 $7$ 次读；dentry 缓存免掉其中几乎全部。
- 盘上：超级块、位图、索引节点表与数据块（[[#def-layout]]）；索引节点 $n$ 靠算术定位。块组让相关的索引节点和数据彼此靠近。
- 经典索引节点的直接、一次、二次、三次间接指针可达 $(12 + k + k^2 + k^3)B$ 字节（[[#prop-max-size]]）；ext4 的**区段**的元数据开销与碎片程度而非大小成正比（[[#def-extent]]）。
- `write` 到的是页缓存，不是盘：要用 `fsync`，并按 写–`fsync`–`rename`–`fsync(目录)` 替换文件。
- 崩溃可能把一次更新的任意写子集留在盘上（[[#ex-crash-states]]）；**fsck** 修复得慢；**日志**在原地写之前把事务提交进日志，崩溃后重放已提交的事务，使更新成为原子——前提是写序被强制执行（[[#thm-journal]]、[[#ex-journal-model]]）。ext4 在有序模式下只记元数据日志；写时复制与日志结构文件系统干脆不覆写。
:::

## 习题

::: exercise 最大文件长度 {level=1 check="65804"}
某文件系统用 1 KiB 块、4 字节块指针，索引节点有 $12$ 个直接指针、一个一次间接和一个二次间接指针（无三次间接）。最大的文件是多少 KiB？（输入 KiB 数。）
::: solution
一块 $k = 1024/4 = 256$ 个指针。由 [[#prop-max-size]] 去掉三次项，$(12 + 256 + 256^2) \times 1$ KiB $= (12 + 256 + 65536)$ KiB $= 65{,}804$ KiB，约 $64.3$ MiB。
:::
:::

::: exercise 定位索引节点 {level=1 check="43"}
在 ext4 镜像里，索引节点表从 41 号块开始，索引节点 256 字节、块 4096 字节。索引节点 $20$ 在哪个块、什么偏移？$40$ 号呢？（输入 $40$ 号所在的块。）
::: solution
一块装十六个索引节点，索引节点 $n$ 在表的下标 $n - 1$ 处。$20$ 号：下标 $19$，块 $41 + \lfloor 19/16 \rfloor = 42$，偏移 $(19 - 16) \times 256 = 768$。$40$ 号：下标 $39$，块 $41 + \lfloor 39/16 \rfloor = 43$，偏移 $(39 - 32) \times 256 = 1792$。（`debugfs -R "imap <40>" fs.img` 证实：block 43, offset 0x0700。）
:::
:::

::: exercise 链接计数 {level=1 check="2"}
从文件 `f`（链接计数 $1$）出发，程序执行 `link("f", "g")`、`link("g", "h")`、`unlink("f")`、`rename("h", "f")`。此后该索引节点的链接计数是多少？（输入计数。）
::: solution
两次链接后索引节点有三个名字 `f`、`g`、`h`：计数 $3$。`unlink("f")` 剩 $2$。`rename("h", "f")` 把名字 `h` 挪成 `f`；它既不增加也不减少此索引节点的链接（此时已没有别的文件叫 `f`），所以计数保持 $2$，名字是 `g` 和 `f`。
:::
:::

::: exercise 冷缓存下的路径解析 {level=2 check="10"}
无任何缓存时，打开 `/usr/share/dict/words` 再读它的第一个块需要多少次块读？设每个目录装得进一个块、每次索引节点读算一次块读。（输入总读次数。）
::: solution
路径有四个成分。打开要读根索引节点和根目录块（找 `usr`）、`usr` 的索引节点和它的块（找 `share`）、`share` 的索引节点和它的块（找 `dict`）、`dict` 的索引节点和它的块（找 `words`）、以及 `words` 的索引节点：$9$ 次读。再读第一个数据块共 $10$ 次。一般地，$c$ 个成分的路径打开要 $2c + 1$ 次读，数据另计。
:::
:::

::: exercise 数据日志的代价 {level=2 check="206"}
一个事务给文件追加 $100$ 个数据块，同时改变索引节点和一个位图块。算上写到设备的每个块（日志块含一个开始块和一个提交块，以及检查点写），**数据**日志需要多少次写？**有序**模式呢？（输入数据日志的数字。）
::: solution
数据日志：日志开始（$1$）、$102$ 个新块（$100$ 个数据、索引节点、位图）、提交（$1$）：$104$ 次日志写；检查点：$102$ 次原地写。总计 $206$。有序模式：$100$ 个数据块原地写；日志开始、索引节点、位图、提交：$4$；检查点索引节点和位图：$2$。总计 $106$。大写时数据日志让流量翻倍；小的同步写却可能*更快*，因为一切先顺序进日志，然后 `fsync` 才返回，而分散的原地写留到之后。
:::
:::

::: exercise 为什么要对目录 fsync？ {level=2}
一个程序创建 `new.txt`，写入，对其描述符调用 `fsync`，然后关闭。一秒后机器崩溃。解释为什么在有些文件系统上，恢复之后 `new.txt` 可能不见了，尽管它的数据已经持久；程序本应怎么做？`replace_file` 函数的哪一段处理了这一点？
::: solution
`fsync(fd)` 让文件的索引节点和数据持久，但*名字* `new.txt` 是目录里的一个目录项，而目录是另一个文件。若目录块（或包含新目录项的日志事务）没有到达磁盘，恢复就会得到一个没有名字的索引节点——作为孤儿被回收，或在 `lost+found` 里被发现。POSIX 要求对目录 `fsync` 才能让目录项持久；ext4 在有序模式下通常把目录项在同一事务里提交，但可移植程序不能指望这一点。`replace_file` 里最后的 `open(".")` 与 `fsync(dir)` 让 `rename` 持久。
:::
:::

::: exercise ext4 的极限 {level=3 check="16"}
ext4 用 $32$ 位存放文件内的逻辑块号。4 KiB 块时，可能的最大文件是多少 TiB？它需要多少个最大长度的区段，区段树的叶子层又要多少个区段块（每块装 $340$ 个目录项）？（输入 TiB 数。）
::: solution
$2^{32}$ 块 $\times\ 2^{12}$ 字节 $= 2^{44}$ 字节 $= 16$ TiB。最大区段长 $32768 = 2^{15}$ 块，所以文件需要 $2^{32}/2^{15} = 2^{17} = 131{,}072$ 个区段，要 $\lceil 131072/340 \rceil = 386$ 个叶子块——一个 16 TiB 的文件约 $1.5$ MiB 区段元数据；经典方案却要 $16$ GiB 间接块（$2^{32}$ 个 $4$ 字节指针）。
:::
:::

::: exercise 恢复是幂等的 {level=3}
证明恢复（[[#alg-journal]]）在任何时刻被崩溃打断、然后从头再跑一遍，最终状态与第一次恢复顺利完成相同。日志记录的什么性质使它成立？哪类日志记录会破坏它？
::: solution
恢复只查看日志，而在重放完成之前并不修改日志（日志到最后才被释放）。重放一个已提交事务就是对每个记录块 $b$，把记录的内容 $v_b$ 写到位置 $b$。设恢复前的状态为 $S$。一次完整重放产生 $S$ 并把每个被记录的 $b$ 置为 $v_b$（被多个事务记录的块按提交次序处理，最后提交的值胜出）。被打断的重放已应用了这些写的某个前缀；再跑一遍恢复就按同样的次序把全部写再执行一遍，而每块的最终值只由对它的最后一次写决定，两次运行的这最后一次相同。所以最终状态相同。该性质是日志记录为**物理的、绝对的**镜像（"块 $b$ 变成 $v_b$"），其应用是幂等的：$f(f(S)) = f(S)$。**逻辑**或**相对**记录（"链接计数加 $1$"、"把这个目录项追加到目录"）不幂等；重放两遍就会应用两遍。使用逻辑日志的数据库，如 ARIES，在每个页里存一个日志序列号，让恢复能判断一条记录是否已经应用（[[databases]]）。
:::
:::
