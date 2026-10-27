A storage device, as [[operating-systems/storage-io]] showed, is an array of numbered blocks. Yet nobody asks for "block 2099". We ask for `/home/alice/notes.txt`, expect it to keep its contents when the power fails, to grow when we append to it, to have an owner and permissions, and to appear in two directories at once if we wish. The **file system** turns the flat array into that hierarchy of named, persistent, protected files — and it must do so with very few slow device accesses, and in a way that survives a crash at *any* moment, including halfway through updating its own data structures.

This chapter studies how. We begin with the abstraction — files as inodes, directories as maps from names to inode numbers, hard and symbolic links — using an ext4 file system that we create in an ordinary file and inspect with `debugfs`. Then we look at the on-disk layout: superblock, bitmaps, inode tables and data blocks; the multi-level index of the classic Unix inode and the extents of ext4; and the placement policies that keep related data close together. Finally we confront **crash consistency**: why a single `write` can leave the disk inconsistent, how `fsck` repairs it, and how **journalling** makes updates atomic, with a model that checks the protocol by crashing it at every step.

[[computer-systems/system-io]] covered the programming interface — `open`, `read`, `write`, `close`, `stat`, file descriptors and the kernel's open-file tables ([[computer-systems/system-io#def-tables]]) — and we take it as known.

The examples use a 64 MiB ext4 file system made in a file on the test machine (whose own root file system is ZFS), without root privileges: `mkfs.ext4 -d` copies a directory tree into the new file system, and `debugfs` reads its structures directly.

```console
$ mkdir -p fsroot/home/alice
$ printf 'hello, file system\n' > fsroot/home/alice/notes.txt
$ head -c 300000 /dev/urandom > fsroot/home/alice/photo.jpg
$ ln fsroot/home/alice/notes.txt fsroot/home/alice/notes-link.txt
$ ln -s notes.txt fsroot/home/alice/shortcut
$ truncate -s 64M fs.img && mkfs.ext4 -q -b 4096 -d fsroot fs.img
```

## Files, inodes and directories

::: definition Inode {#def-inode}
An **inode** (index node) is the on-disk record of a file's metadata: its type (regular file, directory, symbolic link, device …), permissions, owner and group, size, timestamps, **link count**, and the location of its data blocks. Each inode has a number, unique within the file system, which serves as the file's low-level name. The inode does *not* contain the file's name.
:::

::: definition Directory {#def-directory}
A **directory** is a file whose contents are a list of **entries**, each mapping a name to an inode number. Every directory contains the entries `.` (itself) and `..` (its parent). A **path** such as `/home/alice/notes.txt` names a file by a sequence of entries to follow from the **root directory**, whose inode number is fixed (2 in ext4).
:::

`debugfs` shows both:

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

The first column is the inode number, the second the type and permission bits in octal (`100664` is a regular file with mode `rw-rw-r--`; `40775` a directory; `120777` a symbolic link), then the owner, group and size. `notes.txt` and `notes-link.txt` are two directory entries for the *same* inode, $15$: a **hard link**. The inode's link count is $2$, and its data — 19 bytes — sit in block $2099$. (The `Blockcount` of $8$ is in 512-byte units: one 4 KiB block.)

### Hard links, unlink and symbolic links

Because names live in directories and files are inodes, a file can have any number of names, in any directories of the same file system. The system call `link(old, new)` adds an entry; `unlink(name)` removes one and decrements the inode's link count. There is no "delete file" call: the file system frees an inode and its blocks only when the link count is $0$ **and** no process has the file open.

::: example A file with no name {#ex-unlink}
Create a file, give it a second name, remove both names while it is still open, and read it.

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>

static void show(const char *when, int fd) {
    struct stat st;
    fstat(fd, &st);                               /* metadata from the inode */
    printf("%-22s inode %lu, links %lu, size %lld\n", when,
           (unsigned long)st.st_ino, (unsigned long)st.st_nlink, (long long)st.st_size);
}

int main(void) {
    int fd = open("a.txt", O_CREAT | O_TRUNC | O_RDWR, 0644);
    if (fd < 0 || write(fd, "data\n", 5) != 5) return 1;
    show("after create:", fd);
    if (link("a.txt", "b.txt") != 0) return 1;    /* second name, same inode */
    show("after link b.txt:", fd);
    unlink("a.txt");                              /* remove the first name */
    show("after unlink a.txt:", fd);
    unlink("b.txt");                              /* no names left ... */
    show("after unlink b.txt:", fd);
    char buf[8] = {0};
    if (pread(fd, buf, 5, 0) != 5) return 1;     /* ... but the file still exists */
    printf("still readable: %s", buf);
    close(fd);                                    /* now its blocks are freed */
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
The inode number never changes: `link` and `unlink` edit directories, not the file. After the second `unlink` the file has no name and a link count of $0$, but the open descriptor still refers to the inode ([[computer-systems/system-io#def-tables]]), so the data remain readable; the file system frees the inode and its block at `close`. Programs use this to create temporary files that vanish automatically even if the program crashes, and package managers rely on it to replace a library that running programs still have mapped. (The inode numbers come from the test machine's ZFS file system and differ from run to run.) If the machine crashes while a nameless file is open, the file system must free it during recovery; ext4 keeps an **orphan list** (the `orphan_file` feature of our image) for exactly this.
:::
:::

A **symbolic link** is different: a small file whose content is a *path*, which the kernel follows when the link is used. `shortcut` above is inode $17$, type `120777`, size $9$ — the nine bytes of `notes.txt`, which ext4 stores directly in the inode ("Fast link dest" in `debugfs`) instead of in a data block. A symbolic link can cross file systems and point to directories, but it can also dangle: delete `notes.txt` and both its hard link names, and `shortcut` points nowhere. Hard links to directories are forbidden (except for `.` and `..`, made by the file system itself), because they could create cycles in the directory tree, which would break the link-count rule for freeing and confuse programs that walk the tree.

::: quiz
Inode $15$ has two names, `notes.txt` and `notes-link.txt`, and `shortcut` is a symbolic link to `notes.txt`. Which statements are true?
- [x] After `unlink("notes.txt")`, the data are still reachable as `notes-link.txt`.
- [ ] After `unlink("notes.txt")`, `shortcut` still leads to the data.
- [x] After `rename("notes-link.txt", "notes.txt")`, `shortcut` works again.
- [x] Changing the permissions with `chmod` on `notes.txt` changes them for `notes-link.txt` too.
::: solution
The data belong to the inode, which still has one name. The symbolic link contains the *path* `notes.txt`, which no longer exists, so it dangles — until a file of that name appears again, as the rename makes it. Permissions are stored in the inode, shared by all hard links.
:::
:::

### Path resolution

::: algorithm Path resolution {#alg-namei}
To resolve an absolute path $/c_1/c_2/\dots/c_k$:

1. $i \gets$ the root inode (for a relative path, the process's current directory).
2. For each component $c_j$:
   1. Check that $i$ is a directory and that the process has search (execute) permission on it.
   2. Read $i$'s directory blocks and find the entry named $c_j$; if there is none, fail with `ENOENT`.
   3. $i \gets$ the inode of that entry. (If it is a symbolic link and not the last component, resolve its contents and continue from there, counting links followed to stop loops.)
3. Return $i$.
:::

In our image, resolving `/home/alice/notes.txt` reads inode $2$ (the root), its directory block $10$, which maps `home` to inode $13$; inode $13$ and its block $2097$, which maps `alice` to $14$; inode $14$ and block $2098$, which maps `notes.txt` to $15$; and finally inode $15$, which points to the data in block $2099$. Without caching, opening the file takes $7$ block reads and reading it an eighth. Real kernels avoid almost all of these with the **dentry cache** (recently resolved names) and the inode cache.

::: widget graph
nodes: inode2@0,3; blk10@1,3; inode13@2,2; blk2097@3,2; inode14@4,1; blk2098@5,1; inode15@6,0; blk2099@7,0
edges: inode2>blk10; blk10>inode13; inode13>blk2097; blk2097>inode14; inode14>blk2098; blk2098>inode15; inode15>blk2099
algorithm: bfs
start: inode2
caption: Resolving `/home/alice/notes.txt` in the ext4 image, block by block: each inode points to its directory block, and each directory block maps the next name to an inode. Step through the search and count: seven reads before the file is open, the eighth for its data. Every extra path component costs two more reads if nothing is cached, which is why the kernel's dentry cache makes repeated lookups almost free, and why very deep paths are slow on a cold cache.
:::

Directories in early Unix were simple arrays of 16-byte entries, searched linearly. ext4 keeps that format for small directories (the `ls` of the root above shows each entry's record length) but, with the `dir_index` feature, indexes large ones with a hashed B-tree ("HTree"), so that a directory with a million entries can be searched in a few block reads.

## On-disk layout

::: definition File-system layout {#def-layout}
A Unix-style file system divides its blocks into:

- a **superblock** describing the file system as a whole: block size, number of blocks and inodes, where the other structures are, state flags;
- **allocation bitmaps**, one bit per data block and one bit per inode, recording which are in use;
- the **inode table**, an array of fixed-size inodes, so that inode $n$ is found by arithmetic;
- **data blocks**, holding file contents, directory contents and indirect or extent-tree blocks.
:::

`dumpe2fs` prints this for our image:

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

$16{,}384$ inodes of $256$ bytes fill $16384 \times 256 / 4096 = 1024$ blocks, $41$ to $1064$. Inode $n$ (numbered from $1$) is at byte offset $(n - 1) \times 256$ of the table, so inode $15$ is in block $41 + \lfloor 14 \times 256/4096 \rfloor = 41$, at offset $14 \times 256 = 3584 = 0xe00$ — exactly what `debugfs -R "imap /home/alice/notes.txt"` reports ("located at block 41, offset 0x0e00"). The remaining blocks are data: the directories occupy blocks $2097$ and $2098$, `notes.txt` block $2099$.

### Finding a file's blocks

How should the inode record which blocks hold the file's data? The answer must handle files from a few bytes to terabytes, and make small files cheap.

::: definition Multi-level index {#def-multilevel-index}
The classic Unix inode (as in ext2 and ext3) has $12$ **direct pointers** to the first $12$ data blocks, one **single-indirect** pointer to a block full of pointers to data blocks, one **double-indirect** pointer to a block of pointers to single-indirect blocks, and one **triple-indirect** pointer.
:::

::: proposition Size reachable by a multi-level index {#prop-max-size}
With blocks of $B$ bytes and pointers of $p$ bytes, so that a block holds $k = B/p$ pointers, the inode of [[#def-multilevel-index]] can address

$$
(12 + k + k^2 + k^3)\,B \text{ bytes},
$$ {#eq-max-size}

and reading byte $x$ of a file requires at most $3$ index-block reads beyond the inode.
:::

::: proof
The direct pointers address $12$ blocks. The single-indirect block holds $k$ pointers to data blocks. The double-indirect block holds $k$ pointers, each to a single-indirect block of $k$ data pointers: $k^2$ blocks. Similarly the triple-indirect pointer reaches $k^3$. Summing and multiplying by $B$ gives [[#eq-max-size]]. A byte at block index $b = \lfloor x/B \rfloor$ is reached through at most three levels of index blocks (if $b \ge 12 + k + k^2$).
:::

With $B = 4096$ and $p = 4$, $k = 1024$, and the index can address $(12 + 1024 + 2^{20} + 2^{30}) \times 4096$ bytes, a little over $4$ TiB. Files of up to $48$ KiB need no index blocks at all, and measurements of real file systems have long found that most files are small, while most *bytes* are in large files — so this design makes the common case cheap and the large case possible.

Its weakness is large files: a 1 GiB file needs $262{,}144$ pointers, $1$ MiB of index blocks, even if its data are perfectly contiguous. ext4 therefore describes data by **extents**.

::: definition Extent {#def-extent}
An **extent** is a run of contiguous blocks, recorded as (first logical block, length, first physical block). An ext4 inode holds up to four extents directly; a file with more uses a small tree of extent blocks rooted in the inode. In ext4 an initialised extent covers at most $32{,}768$ blocks ($128$ MiB with 4 KiB blocks).
:::

The 300,000-byte `photo.jpg` needs $\lceil 300000/4096\rceil = 74$ blocks, and `debugfs` shows that a single extent describes them all: `(0-73):2100-2173`. The journal, allocated around the bitmaps, needs three: `(0-9):15-24, (10-24):26-40, (25-1023):1066-2064`. An extent-based file costs metadata in proportion to its *fragmentation*, not its size — which is why file systems try hard to allocate contiguously.

::: example How many index blocks? {#ex-index}
A file of $10$ MiB is stored with 4 KiB blocks. How many index blocks does the classic multi-level inode need, and how many extents does ext4 need if the file is (a) contiguous, (b) in $40$ fragments?
::: solution
The file has $10 \times 2^{20}/4096 = 2560$ blocks. The direct pointers cover $12$, the single-indirect block $1024$ more ($1036$ in all), and the remaining $2560 - 1036 = 1524$ need the double-indirect block plus $\lceil 1524/1024 \rceil = 2$ single-indirect blocks under it. Index blocks: $1 + 1 + 2 = 4$, i.e. $16$ KiB of metadata, and reading the last block of the file needs two index reads after the inode. With extents: (a) one extent ($2560 \le 32768$), stored in the inode itself, no extra blocks; (b) $40$ extents, more than the four that fit in the inode, so one extent block (which holds $340$ entries) is needed. Contiguity, not size, determines the cost.
:::
:::

### Placement: keeping related things close

On a hard disk, where a block lives matters as much as how it is found ([[operating-systems/storage-io#ex-hdd]]). The original Unix file system placed all inodes at the start of the disk and data blocks wherever free, so reading a file meant a long seek from its inode to its data, and as the free list became scrambled, a file's blocks scattered. Marshall McKusick and colleagues' **Fast File System** (FFS, 1984) divided the disk into **cylinder groups**, each with its own bitmaps, inodes and data blocks, and placed a file's inode and data in the same group, files in the same directory together, and new directories in groups with many free inodes; on the hardware of the time it improved throughput by a factor of up to ten. ext2, ext3 and ext4 call the groups **block groups** (32,768 blocks, $128$ MiB, each, with 4 KiB blocks — our 64 MiB image has only one). ext4 adds **delayed allocation** (choose blocks only when dirty data are written back, when the final size is known) and multi-block allocation, so that files come out contiguous. On SSDs locality matters less for reads, but large sequential writes still reduce write amplification ([[operating-systems/storage-io#prop-wa]]).

### Caching and durability

Every one of these structures is cached in memory: the **page cache** holds file data, and the kernel's inode, dentry and buffer caches hold metadata. Writes go to the cache and are written back later — on Linux, dirty data older than about $30$ seconds are flushed by kernel threads by default — which makes `write` fast and lets the file system batch and order updates. It also means that **a successful `write` does not mean the data are on the device**.

::: warning "write() returned, so my data are safe"
`write` copies into the page cache and returns; if the machine loses power seconds later, the data are gone. To make data durable a program must call `fsync(fd)` (or `fdatasync`), which returns only when the file's data and metadata have reached stable storage — including flushing the device's own volatile write cache. And because a new file's *name* lives in its directory, a newly created or renamed file is durable only after an `fsync` of the directory too. The safe way to replace a file — so that after a crash it holds either the old contents or the new, never a mixture or nothing — is: write a temporary file, `fsync` it, `rename` it over the old name (which POSIX makes atomic), and `fsync` the directory:

```c
#define _POSIX_C_SOURCE 200809L
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

/* Replace the contents of `path` atomically: readers see the old or the new file, never a mix,
   even if the machine crashes. */
static int replace_file(const char *path, const char *tmp, const char *data) {
    int fd = open(tmp, O_CREAT | O_TRUNC | O_WRONLY, 0644);
    if (fd < 0) return -1;
    size_t n = strlen(data);
    if (write(fd, data, n) != (ssize_t)n || fsync(fd) != 0) {   /* data durable */
        close(fd); unlink(tmp); return -1;
    }
    if (close(fd) != 0 || rename(tmp, path) != 0) return -1;     /* atomic switch */
    int dir = open(".", O_RDONLY);                               /* make the rename durable */
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

It prints `version = 2`, and `strace` shows the sequence `write`, `fsync`, `rename`, `fsync(".")` for each replacement. Skipping the first `fsync` has caused real data loss: after a crash, some file systems persisted the rename before the data and left applications with empty configuration files. Databases, editors and package managers all follow this pattern or keep their own logs.
:::

## Crash consistency

Appending one block to a file changes three structures: the data block itself, the inode (new size, new block pointer or extent), and the data bitmap (the block is now in use). These are in different places on the device, so they are three separate writes, and the device may complete them in any order. Power can fail between any two.

::: example What a crash can leave behind {#ex-crash-states}
For an append that must write the data block D, the inode I and the bitmap B, list every combination of these writes that can be on disk after a crash, and say what is wrong in each.
::: solution
Of the $2^3 = 8$ subsets, two are fine: none written (the append simply did not happen) and all three written. The other six:

| on disk | consequence |
|---|---|
| D only | The data are written but nothing points to them and the bitmap says the block is free: as if the append never happened. Harmless (only the data are lost). |
| I only | The inode points to a block that the bitmap says is free and that contains **garbage** (old contents). The file reads junk, and the block may later be given to a second file too. |
| B only | The bitmap marks a block in use that nothing points to: a **space leak**. |
| I and B | Metadata consistent, but the file contains garbage where the new data should be. |
| I and D | The inode points to the correct data, but the bitmap says the block is free: it may be reallocated, and two files will share it. |
| B and D | Block marked used but unreferenced: a leak, and the data are lost. |

Only four of the six states are actual **inconsistencies** of the file-system metadata (I without B, B without I); the other two (D alone, and I with B but no D) are consistent metadata with lost or stale *data*. A crash-consistency mechanism must fix the former and, ideally, the latter.
:::
:::

The first remedy was to repair after the fact. **fsck** ("file-system check") runs at boot after an unclean shutdown and scans everything: it rebuilds the bitmaps from the inodes, checks that every directory entry points to an allocated inode and every allocated inode has the right link count, puts unreferenced inodes in `lost+found` (inode 11 in our image), and resolves blocks claimed by two inodes. It works, but it cannot recover the lost data, and its running time is proportional to the size of the file system, not to the amount of damage — hours for a multi-terabyte disk.

### Journalling

**Journalling** (write-ahead logging), borrowed from databases, makes a group of updates **atomic**: before changing anything in place, write a description of all the changes to a separate area, the **journal**; only once the description is completely and durably on disk, apply the changes. After a crash, the journal says what to finish.

::: algorithm Journalled update (data journalling) {#alg-journal}
To update a set of blocks atomically:

1. **Journal write.** Write a transaction-begin block (with a transaction number) and the new contents of every block to the journal. Wait until these writes are durable.
2. **Journal commit.** Write a transaction-end (commit) block to the journal. Wait until it is durable. The transaction is now **committed**.
3. **Checkpoint.** Write the blocks to their real locations in the file system.
4. **Free.** Once the checkpoint writes are durable, mark the transaction's space in the journal free (by updating the journal superblock).

**Recovery** after a crash: scan the journal; for every transaction with a commit block, write its logged blocks to their real locations (again); discard transactions without a commit block.
:::

::: theorem Journalling makes updates atomic {#thm-journal}
Assume that a single block write is atomic (it completes entirely or not at all), that the "wait until durable" steps of [[#alg-journal]] are honoured, and that recovery runs before the file system is used after a crash. Then after recovery, for every transaction, either all of its block updates are present in place or none of them is.
:::

::: proof
Consider a crash at any point. If the commit block of a transaction is not durably in the journal, then step 2 had not completed, so step 3 had not begun: no in-place block of the transaction has been written, and recovery discards the transaction — none of its updates is present. If the commit block is durable, then by the waits in steps 1 and 2 every logged block is durable in the journal too, and the commit block itself is atomic, so recovery finds a complete transaction and writes all its blocks in place: all of its updates are present. Recovery may rewrite blocks that the checkpoint had already written, which is harmless because each write sets a block to the same final contents (**replay is idempotent**). For the same reason, a crash *during* recovery is harmless: recovery simply runs again from the start.
:::

The waits are essential, and they are not automatic: a device may reorder writes, or report them complete while they are still in its volatile cache. The kernel enforces the order with **flush** and **force-unit-access** commands (block-layer barriers), and ext4's journal adds a checksum to each commit so that a commit written before its transaction's blocks can be detected and ignored. A model shows what goes wrong otherwise.

::: example Crashing a journal at every step {#ex-journal-model}
Model an append as a transaction updating B, I and D. Crash after every prefix of the protocol's writes, run recovery, and check that the result is always all-old or all-new. Then let the device reorder the commit block ahead of the logged blocks.
::: solution
```python
# A toy write-ahead journal. The "disk" is a dict of block -> contents.
# A transaction updates bitmap B, inode I and data block D of an append.
OLD = {'B': 'b0', 'I': 'i0', 'D': 'd0'}
NEW = {'B': 'b1', 'I': 'i1', 'D': 'd1'}

def writes(order_ok=True):
    """The sequence of block writes issued by the journalling protocol."""
    j = [('J', ('begin', None))] + [('J', ('blk', (k, v))) for k, v in NEW.items()]
    commit = [('J', ('commit', None))]
    checkpoint = [(k, v) for k, v in NEW.items()]
    # Correct: commit only after the transaction's journal blocks are on disk.
    # Wrong: the disk reorders the commit block ahead of the logged blocks.
    return j + commit + checkpoint if order_ok else commit + j + checkpoint

def recover(disk):
    log = disk['J']
    if ('commit', None) in log:                       # replay committed transactions
        for kind, x in log:
            if kind == 'blk':
                disk[x[0]] = x[1]
    disk['J'] = []
    return {k: disk[k] for k in 'BID'}

for order_ok in (True, False):
    seq = writes(order_ok)
    outcomes = set()
    for crash in range(len(seq) + 1):                 # crash after `crash` writes
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
With the writes in protocol order, every one of the $9$ crash points recovers to the old state (crash before the commit) or the new one (after) — [[#thm-journal]] in miniature. If the commit reaches the disk first, a crash after the commit but before all logged blocks leaves a "committed" transaction that recovery replays only partly: the bitmap says the block is used, but the inode or the data are old — exactly the inconsistent states of [[#ex-crash-states]]. Ordering is what makes the journal work.
:::
:::

Data journalling writes every data block twice — once to the journal, once in place — halving write bandwidth for large writes. Most file systems therefore journal only **metadata**. In ext4's default **ordered** mode (`data=ordered`), the data blocks are written in place *first*, then the metadata transaction is journalled and committed, then checkpointed. A crash can then lose the most recent data, but never leaves an inode pointing to a block of garbage, because the inode update commits only after the data it points to are on disk. (The weaker `data=writeback` mode drops even that ordering.) Our image's journal is inode $8$, $1024$ blocks, $4$ MiB (`dumpe2fs` reports "Total journal size: 4096k"), and ext4 groups many operations into each transaction, committing every $5$ seconds by default or when `fsync` asks.

::: widget graph
nodes: data@0,1; jmeta@1,1; commit@2,1; ckpt@3,1; free@4,1; flush1@1,0; flush2@2,0
edges: data>flush1; jmeta>flush1; flush1>commit; commit>flush2; flush2>ckpt; ckpt>free
algorithm: topo
caption: The order of writes in ext4's ordered mode as a dependency graph: write the data in place and the metadata to the journal (in either order or in parallel), wait for both (flush), write the commit block, wait again, then checkpoint the metadata and finally free the journal space. Step through the topological sort to get one legal order. Notice what is *not* constrained — the data and the journalled metadata may be written concurrently — and what is: nothing may precede its incoming arrows. Reverse any one arrow and the crash model above finds a mixed state.
:::

### Other approaches

**Copy-on-write** file systems never overwrite live data or metadata: they write new versions of changed blocks elsewhere, then the new versions of the blocks that point to them, all the way up to a root, and finally atomically switch a single superblock-like pointer to the new root. A crash before the switch leaves the old tree intact; after it, the new one. ZFS (on the test machine) and Btrfs work this way, which also makes snapshots nearly free — keep the old root — and lets them **checksum every block** and detect silent corruption. **Log-structured** file systems (Rosenblum and Ousterhout, 1991) go further and write *everything*, data and metadata, sequentially into a log, cleaning old segments in the background; the FTL inside every SSD is a log-structured system of exactly this kind ([[operating-systems/storage-io#def-ftl]]). And **soft updates** (Ganger and Patt, 1994), used in FreeBSD's UFS, carefully order metadata writes so that the on-disk state is always consistent except for leaks, which a background check reclaims.

::: history
The Unix file system of Thompson and Ritchie (described in 1974) introduced inodes, the hierarchical directory tree with hard links, and the separation of names from files; its inode had direct and indirect blocks much like [[#def-multilevel-index]]. Multics (1965) had earlier pioneered the hierarchical file system. McKusick, Joy, Leffler and Fabry's Fast File System (1984) introduced cylinder groups and locality-aware placement. IBM's JFS (1990) and Microsoft's NTFS (1993) brought metadata journalling to mainstream systems; Stephen Tweedie added a journal to ext2 to make ext3 (merged into Linux in 2001), and ext4 (stable in Linux 2.6.28, 2008) added extents, delayed allocation and journal checksums. Mendel Rosenblum and John Ousterhout's log-structured file system appeared in 1991; NetApp's WAFL (1994), Sun's ZFS (2005) and Btrfs (2009) made copy-on-write file systems practical. Vijay Chidambaram, Thanumalayan Sankaranarayana Pillai and colleagues at Wisconsin (2014) showed how many applications fail to use `fsync` and `rename` correctly to survive crashes.
:::

## Where this leads

Databases build on the same ideas with more control — their own buffer pools, write-ahead logs, B-trees whose nodes are disk blocks, and recovery algorithms such as ARIES ([[databases]]). Distributed file systems and object stores replicate files across machines and must stay consistent under network failures as well as crashes ([[distributed-systems]]). Permissions, access-control lists and encryption at rest are part of [[security]]. In this course, [[operating-systems/virtualisation]] shows how containers give each group of processes its own view of the file system with overlay and bind mounts, and how virtual disks are themselves files on a host's file system.

::: summary
- A file is an **inode** — metadata and block locations, but no name ([[#def-inode]]); a **directory** maps names to inode numbers ([[#def-directory]]). Hard links are extra names; a file is freed when its link count is $0$ and it is no longer open ([[#ex-unlink]]); symbolic links store a path.
- **Path resolution** reads an inode and a directory block per component ([[#alg-namei]]): $7$ reads to open `/home/alice/notes.txt` with nothing cached; the dentry cache removes almost all of them.
- On disk: superblock, bitmaps, inode table and data blocks ([[#def-layout]]); inode $n$ is located by arithmetic. Block groups keep related inodes and data close.
- The classic inode's direct, indirect, double- and triple-indirect pointers reach $(12 + k + k^2 + k^3)B$ bytes ([[#prop-max-size]]); ext4's **extents** cost metadata in proportion to fragmentation, not size ([[#def-extent]]).
- `write` reaches the page cache, not the disk: use `fsync`, and replace files with write–`fsync`–`rename`–`fsync(dir)`.
- A crash can leave any subset of an update's writes on disk ([[#ex-crash-states]]); **fsck** repairs slowly; **journalling** commits a transaction to a log before writing in place and replays committed transactions after a crash, making updates atomic if write order is enforced ([[#thm-journal]], [[#ex-journal-model]]). ext4 journals metadata in ordered mode; copy-on-write and log-structured file systems avoid overwriting altogether.
:::

## Exercises

::: exercise Maximum file size {level=1 check="65804"}
A file system uses 1 KiB blocks, 4-byte block pointers, and inodes with $12$ direct pointers, one single-indirect and one double-indirect pointer (no triple-indirect). What is the largest file, in KiB? (Enter the number of KiB.)
::: solution
$k = 1024/4 = 256$ pointers per block. By [[#prop-max-size]] without the cubic term, $(12 + 256 + 256^2) \times 1$ KiB $= (12 + 256 + 65536)$ KiB $= 65{,}804$ KiB, about $64.3$ MiB.
:::
:::

::: exercise Locating an inode {level=1 check="43"}
In the ext4 image, the inode table starts at block $41$, inodes are $256$ bytes and blocks $4096$ bytes. In which block, and at which offset, is inode $20$? Inode $40$? (Enter the block of inode $40$.)
::: solution
Sixteen inodes fit in a block, and inode $n$ is at index $n - 1$ of the table. Inode $20$: index $19$, block $41 + \lfloor 19/16 \rfloor = 42$, offset $(19 - 16) \times 256 = 768$. Inode $40$: index $39$, block $41 + \lfloor 39/16 \rfloor = 43$, offset $(39 - 32) \times 256 = 1792$. (`debugfs -R "imap <40>" fs.img` confirms: block 43, offset 0x0700.)
:::
:::

::: exercise Link counts {level=1 check="2"}
Starting with a file `f` (link count $1$), a program runs `link("f", "g")`, `link("g", "h")`, `unlink("f")`, `rename("h", "f")`. What is the link count of the inode afterwards? (Enter the count.)
::: solution
After the two links the inode has three names, `f`, `g` and `h`: count $3$. `unlink("f")` leaves $2$. `rename("h", "f")` moves the name `h` to `f`; it neither adds nor removes a link to this inode (no other file was called `f` any more), so the count stays $2$, with names `g` and `f`.
:::
:::

::: exercise Path resolution on a cold cache {level=2 check="10"}
With no caching, how many block reads are needed to open `/usr/share/dict/words` and then read its first block, assuming each directory fits in one block and each inode read costs one block read? (Enter the total number of reads.)
::: solution
The path has four components. Opening reads the root inode and the root directory block (finding `usr`), the inode of `usr` and its block (finding `share`), the inode of `share` and its block (finding `dict`), the inode of `dict` and its block (finding `words`), and the inode of `words`: $9$ reads. Reading the first data block makes $10$. In general a path of $c$ components costs $2c + 1$ reads to open, plus the data.
:::
:::

::: exercise The cost of data journalling {level=2 check="206"}
A transaction appends $100$ data blocks to a file, which also changes the inode and one bitmap block. Counting every block written to the device (journal blocks including one begin and one commit block, and checkpoint writes), how many writes does **data** journalling need? How many does **ordered** mode need? (Enter the number for data journalling.)
::: solution
Data journalling: journal begin ($1$), the $102$ new blocks ($100$ data, inode, bitmap), commit ($1$): $104$ journal writes; checkpoint: $102$ in place. Total $206$. Ordered mode: $100$ data blocks in place; journal begin, inode, bitmap, commit: $4$; checkpoint inode and bitmap: $2$. Total $106$. For large writes, data journalling doubles the traffic; for small synchronous writes it can be *faster*, because everything goes sequentially to the journal before `fsync` returns, and the scattered in-place writes happen later.
:::
:::

::: exercise Why fsync the directory? {level=2}
A program creates `new.txt`, writes to it, calls `fsync` on its descriptor, and closes it. The machine crashes a second later. Explain why, on some file systems, `new.txt` may be missing after recovery although its data were made durable, and what the program should have done. Which part of the `replace_file` function deals with this?
::: solution
`fsync(fd)` makes the file's inode and data durable, but the *name* `new.txt` is an entry in the directory, which is a different file. If the directory block (or the journal transaction containing the new entry) had not reached the disk, recovery yields an inode with no name — reclaimed as an orphan or found in `lost+found`. POSIX requires an `fsync` of the directory to make the entry durable; ext4 in ordered mode usually commits the entry in the same transaction, but portable programs cannot rely on that. In `replace_file`, the final `open(".")` and `fsync(dir)` make the `rename` durable.
:::
:::

::: exercise ext4's limit {level=3 check="16"}
ext4 stores logical block numbers within a file in $32$ bits. With 4 KiB blocks, what is the largest possible file, in TiB? How many extents of maximal length would it need, and how many extent blocks (each holding $340$ entries) at the leaf level of the extent tree? (Enter the size in TiB.)
::: solution
$2^{32}$ blocks $\times\ 2^{12}$ bytes $= 2^{44}$ bytes $= 16$ TiB. A maximal extent is $32768 = 2^{15}$ blocks, so the file needs $2^{32}/2^{15} = 2^{17} = 131{,}072$ extents, which fill $\lceil 131072/340 \rceil = 386$ leaf blocks — about $1.5$ MiB of extent metadata for a 16 TiB file, against $16$ GiB of indirect blocks for the classic scheme ($2^{32}$ pointers of $4$ bytes).
:::
:::

::: exercise Recovery is idempotent {level=3}
Prove that if recovery ([[#alg-journal]]) is interrupted by a crash at any point and then run again from the start, the final state is the same as if the first recovery had completed. What property of the journal records makes this true, and which kinds of log record would break it?
::: solution
Recovery examines only the journal, which it does not modify until it has finished replaying (the journal is freed at the end). Replaying a committed transaction writes, for each logged block $b$, the logged contents $v_b$ to location $b$. Let the state before recovery be $S$. A complete replay produces $S$ with every logged $b$ set to $v_b$ (for blocks logged by several transactions, in commit order, so the last committed value wins). An interrupted replay has set some prefix of these writes; running recovery again performs all of them again in the same order, and the final value of each block is determined only by the last write to it, which is the same in both runs. So the final state is the same. The property is that log records are **physical, absolute** images ("block $b$ becomes $v_b$"), whose application is idempotent: $f(f(S)) = f(S)$. **Logical** or **relative** records ("add $1$ to the link count", "append this entry to the directory") are not idempotent; replaying them twice would apply them twice. Databases that use logical logging, such as ARIES, store a log sequence number in each page so that recovery can tell whether a record has already been applied ([[databases]]).
:::
:::
