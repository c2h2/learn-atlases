The test machine for this course is not quite a machine. Ask it:

```console
$ systemd-detect-virt
lxc
$ uname -r
7.0.14-8-pve
```

It is a **container** — an isolated group of processes, with its own file system, process tree, network interfaces and host name — running on a Proxmox host whose kernel (the `pve` in the version string) it shares. Next to it on the same hardware run other containers and full **virtual machines**, each with its own kernel, each believing it has a computer to itself. In a cloud data centre this is the normal state of affairs: one physical server runs dozens of virtual machines belonging to different customers, and inside each, often, dozens of containers.

This chapter applies the theme of the whole course — virtualisation — one level further down. Processes virtualise a processor and memory for a *program* ([[operating-systems/processes-scheduling]], [[operating-systems/address-spaces-paging]]); a **hypervisor** virtualises an entire machine for an *operating system*. We ask what a machine must provide for this to be possible — the Popek–Goldberg theorem, and why the x86 failed it until 2005 — and look at the techniques used to virtualise the processor (trap-and-emulate, binary translation, paravirtualisation, hardware support), memory (shadow and nested page tables) and devices. Then we turn to **containers**, which virtualise not the machine but the operating system's *namespaces*, and build one by hand. We end by comparing what each kind of isolation does and does not protect.

## Virtual machines and hypervisors

::: definition Virtual machine and hypervisor {#def-vm}
A **virtual machine** (VM) is an efficient, isolated duplicate of a real machine, created by a **hypervisor** or **virtual machine monitor** (VMM). Following Popek and Goldberg (1974), the VMM must provide:

1. **Equivalence** (fidelity): a program running in the VM behaves as it would on the real machine, except for timing and for the amount of resources available;
2. **Resource control** (safety): the VMM is in complete control of the real resources; a guest cannot use or affect anything the VMM has not allocated to it;
3. **Efficiency**: most instructions of the guest execute directly on the real processor, without intervention by the VMM.

The operating system running in a VM is the **guest**; the machine and software running the VMM is the **host**.
:::

A **type 1** (bare-metal) hypervisor runs directly on the hardware: Xen, VMware ESXi, Microsoft Hyper-V. A **type 2** (hosted) hypervisor runs as part of, or on top of, a conventional operating system: VirtualBox, VMware Workstation, QEMU. Linux's **KVM** blurs the line — a kernel module that turns Linux itself into a hypervisor, with each VM an ordinary process (usually QEMU) whose threads are the virtual CPUs, scheduled by the normal Linux scheduler.

Efficiency rules out the obvious approach, **emulation** — interpreting every guest instruction in software, as QEMU does when running an ARM guest on an x86 host — which is tens of times slower than native execution. The guest must run directly on the processor. But the guest kernel expects to run in kernel mode, executing privileged instructions and controlling the page tables, and the VMM cannot allow that without giving up resource control. The classic solution is **trap-and-emulate**: run the guest kernel in *user* mode (deprivileged), so that every privileged instruction it executes traps to the VMM, which then emulates the instruction's effect on the *virtual* machine's state.

::: widget graph
nodes: app@0,3; guestK@1,2; vmx@2,1; kvm@3,0; hw@4,1; qemu@4,2
edges: app>guestK; guestK>vmx; vmx>kvm; kvm>vmx; kvm>qemu; qemu>kvm; kvm>hw
algorithm: bfs
start: app
caption: Control in a KVM virtual machine. A guest application (`app`) makes system calls to the guest kernel (`guestK`) exactly as on real hardware, without involving the hypervisor; both run directly on the processor in VMX non-root mode (`vmx`). Only configured events cause a **VM exit** into KVM in the host kernel, which handles most of them itself and returns with a VM entry; device accesses it cannot handle go up to the QEMU process in host user space. Step through breadth-first search from `app` and notice how many steps separate the guest from the hardware on an exit path — and that the common path, `app` to `guestK`, crosses no hypervisor at all.
:::

### When trap-and-emulate works

To say when this works, classify instructions by how they relate to the machine's control state (the mode, the memory mapping, the timer, the I/O devices).

::: definition Privileged and sensitive instructions {#def-sensitive}
An instruction is **privileged** if it traps when executed in user mode and does not trap in kernel mode. It is **sensitive** if it is either *control-sensitive* — it can change the control state (the processor mode, the memory mapping, the interrupt state, device configuration) — or *behaviour-sensitive* — its effect depends on the control state, for example on the current mode or on where in physical memory it runs. An instruction that is not sensitive is **innocuous**.
:::

::: theorem Popek–Goldberg virtualisation theorem {#thm-popek}
For a conventional processor with kernel and user modes and relocation-based memory protection, a virtual machine monitor satisfying equivalence, resource control and efficiency can be built if the set of sensitive instructions is a subset of the set of privileged instructions.
:::

::: proof
(Sketch, following Popek and Goldberg's argument.) The VMM runs the guest — kernel and user code alike — in user mode, with memory relocated so that the guest sees only its own region, and keeps a copy of the guest's *virtual* control state (its virtual mode, its virtual mapping registers, its virtual interrupt flag). Innocuous instructions run directly on the hardware: by definition they neither change nor depend on the control state, so executing them in user mode with relocation has exactly the effect they would have on a real machine with the guest's virtual state — this gives efficiency, and equivalence for these instructions. Every sensitive instruction is, by hypothesis, privileged, so in user mode it traps to the VMM. The VMM's handler (called the *interpreter* routine) computes the effect the instruction would have had on the real machine in the guest's virtual state, applies it to the virtual state (and to the real state where the VMM's allocation allows — for example, by installing a relocation that combines the guest's mapping with its own), and resumes the guest after the instruction. Hence every instruction behaves as on a real machine with the virtual state (equivalence), and since every attempt to change the real control state passes through the VMM, the guest controls only what the VMM grants it (resource control).
:::

The condition is easy to state and was violated by the most important processor of the 1990s. The 32-bit x86 had seventeen sensitive but unprivileged instructions (counted by Robin and Irvine in 2000). The best known is `popf`, which loads the flags register from the stack. In kernel mode it can change the interrupt-enable flag IF; in user mode the same instruction *silently ignores* the change to IF — it is behaviour-sensitive, but it does not trap.

::: example A sensitive instruction that does not trap {#ex-popf}
Show that `popfq` cannot disable interrupts in user mode, and that it does not fault either.

```c
#include <stdio.h>

static unsigned long get_flags(void) {
    unsigned long f;
    __asm__ volatile ("pushfq; popq %0" : "=r"(f));
    return f;
}

static void set_flags(unsigned long f) {
    __asm__ volatile ("pushq %0; popfq" : : "r"(f) : "cc", "memory");
}

int main(void) {
    const unsigned long IF = 1UL << 9;            /* interrupt-enable flag */
    unsigned long before = get_flags();
    set_flags(before & ~IF);                      /* try to disable interrupts */
    unsigned long after = get_flags();
    printf("IF before: %lu, after popf with IF cleared: %lu\n",
           (before & IF) >> 9, (after & IF) >> 9);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -o popf popf.c && ./popf
IF before: 1, after popf with IF cleared: 1
$ strace ./popf 2>&1 | tail -2
exit_group(0)                           = ?
+++ exited with 0 +++
```
IF stays $1$: the request was ignored, and `strace` shows no signal — the processor raised no exception. For an ordinary program this is the right behaviour ([[operating-systems/os-structure#prop-protection]] requires that user code cannot disable interrupts). For a VMM it is fatal: a deprivileged guest kernel that executes `popf` to disable interrupts around a critical section believes it has done so, but the VMM never learns of it, and may deliver a virtual interrupt into the middle of the critical section. Trap-and-emulate cannot work on such a processor, because some sensitive instructions never reach the VMM.
:::
:::

### Virtualising the x86

Three answers were found.

**Binary translation.** VMware's first product (1999) ran guest *user* code directly, but scanned guest *kernel* code just before executing it, a basic block at a time, translating it into safe code: innocuous instructions were copied unchanged, sensitive ones were replaced by calls into the VMM, and the translations were cached. Most kernel code is innocuous, so after warm-up the overhead was modest.

**Paravirtualisation.** Xen (Barham et al., 2003) changed the guest instead: the guest kernel is modified to call the hypervisor explicitly — **hypercalls** — instead of executing sensitive instructions, and to cooperate with it over page tables and devices. Paravirtualisation is fast but needs a modified guest, which was possible for Linux and the BSDs and not, at the time, for Windows. Its device interfaces survive everywhere as **virtio** (Rusty Russell, 2008), the standard paravirtual network and disk devices of KVM and other hypervisors.

**Hardware support.** In 2005–2006 Intel (VT-x) and AMD (AMD-V) added a new dimension of privilege. With VT-x the processor is in **VMX root** mode (the hypervisor) or **VMX non-root** mode (a guest), and each has the usual rings $0$–$3$, so the guest kernel runs in ring $0$ of non-root mode, unmodified. A per-virtual-CPU **virtual machine control structure** (VMCS) tells the processor which events and instructions cause a **VM exit** to the hypervisor — `cpuid`, accesses to control registers, I/O instructions, external interrupts, and many configurable others — and holds the guest's state, which the processor saves and restores on every exit and **VM entry**. In effect the hardware makes all sensitive instructions trap (to the hypervisor, not the guest kernel), restoring the Popek–Goldberg condition. The test machine's processor lists `vmx` (VT-x), `ept` and `vpid` in `/proc/cpuinfo`.

A VM exit is not free: the processor saves and loads hundreds of bytes of state and the hypervisor must decode and handle the cause. A round trip costs of the order of a thousand cycles in hardware plus the handling — around a microsecond, as of 2026, for simple exits.

::: proposition The cost of exits {#prop-exits}
If a guest causes $n$ VM exits per second, each costing $c$ seconds of processor time to handle and return, the fraction of a virtual CPU lost to virtualisation overhead is $nc$, and the guest runs at a fraction $1 - nc$ of native speed (ignoring indirect effects such as cache and TLB pollution), provided $nc < 1$.
:::

::: proof
In each second, $nc$ seconds are spent in exits; the rest executes guest instructions directly, at native speed by the efficiency property.
:::

::: widget plot
f: 100*x*c/1000000
x: 0, 200000
y: 0, 50
sliders: c=1.5:0.5:10:0.5
labels: \text{overhead (\% of a CPU)}
points: 100000,15
caption: Virtualisation overhead in per cent of a CPU, $100\,nc$, against the number of VM exits per second $n$, with each exit costing $c$ µs to handle (from [[#prop-exits]]). At $1.5$ µs, $100{,}000$ exits per second — easily reached by a guest doing small, emulated I/O — cost $15\%$ of the CPU; a compute-bound guest that rarely exits loses almost nothing. Raise $c$ to $10$ µs, typical of an exit that must go to a user-space device emulator, and the line leaves the plot: this is why paravirtual and passthrough devices matter.
:::

## Virtualising memory

A guest kernel manages page tables that map **guest-virtual** addresses to what it believes are physical addresses — **guest-physical** addresses. These are not real: the hypervisor maps guest-physical memory to **host-physical** memory, wherever it chose to put it. Every guest memory access therefore needs two translations.

Before hardware support, hypervisors used **shadow page tables**. For each guest page table, the VMM maintains a *shadow* table mapping guest-virtual directly to host-physical addresses, and points the real `%cr3` at the shadow. To keep shadows up to date, the VMM write-protects the guest's own page-table pages: every time the guest kernel modifies its page tables, the write faults to the VMM, which updates both. This works with unmodified guests, but page-table-heavy workloads — `fork`, process creation, memory-mapped I/O — cause a storm of faults.

Since 2008 (AMD's Nested Page Tables, then Intel's **Extended Page Tables**, EPT) the hardware walks both levels itself. The guest's `%cr3` points to guest page tables, translated in guest-physical addresses; the hypervisor's EPT maps guest-physical to host-physical. A TLB miss then requires a **two-dimensional walk**: each of the guest's page-table pointers is itself a guest-physical address that must be translated through the EPT before it can be read.

::: theorem The cost of a nested walk {#thm-nested}
With an $n$-level guest page table and an $m$-level nested (EPT) table, and no caching of either, a TLB miss for one guest-virtual address requires $nm + n + m = (n+1)(m+1) - 1$ memory references to obtain the host-physical address.
:::

::: proof
The guest walk reads $n$ entries. The address of each of these guest page-table pages is guest-physical (the first from the guest's `%cr3`, the others from the entries above), so before each read an $m$-level EPT walk translates it: $n(m + 1)$ references for the guest walk. The guest walk ends with the guest-physical address of the data, which needs one more EPT walk of $m$ references. Total $n(m+1) + m = (n+1)(m+1) - 1$. With $n = m = 4$, this is $24$, against $4$ without virtualisation (the computation of [[operating-systems/address-spaces-paging]]'s nested-translation exercise).
:::

So TLB misses in a VM can cost six times as many references, and processors compensate with large TLBs, caches for the intermediate entries, tagged TLB entries per VM (**VPID** on Intel — the test machine's `vpid` flag — so that switching between VMs does not flush the TLB), and **huge pages** on both levels: with 1 GiB EPT pages, $m$ is effectively $2$ and the cost of the walk falls to $14$.

::: example Effective access time in a VM {#ex-nested-eat}
Memory references take $100$ ns, the TLB hit ratio is $99\%$, and TLB misses are served by uncached walks. Compare the effective access time natively (four-level tables) and in a VM (four-level guest and EPT tables), using [[operating-systems/address-spaces-paging#thm-eat]] with a lookup time of $0$.
::: solution
Natively a miss costs $4$ references: $\text{EAT} = 100 + 0.01 \times 4 \times 100 = 104$ ns. In the VM a miss costs $24$ ([[#thm-nested]]): $\text{EAT} = 100 + 0.01 \times 24 \times 100 = 124$ ns, about $19\%$ slower than native. With huge pages in the guest, the TLB's reach grows by a factor of $512$ and the hit ratio rises; with 2 MiB EPT pages the nested walk shortens to $n(m+1) + m = 4 \times 4 + 3 = 19$ references even on a miss. Memory-intensive workloads in VMs are therefore usually configured with huge pages on the host.
:::
:::

The hypervisor can also **overcommit** memory, promising VMs more in total than the host has. It reclaims memory from a guest with a **balloon driver** — a driver inside the guest that, at the hypervisor's request, allocates guest memory and hands the frames back, so that the guest's own page-replacement policy ([[operating-systems/page-replacement]]) decides what to give up — and it can share identical pages between VMs (VMware's transparent page sharing; Linux's KSM, *kernel same-page merging*), mapping them copy-on-write. Page sharing between VMs of different customers turned out to leak information through timing side channels (a write to a shared page is slow because it triggers a copy), and VMware disabled inter-VM sharing by default in 2014.

### Devices

Every device a guest sees is virtual too. A hypervisor can **emulate** a real device — a well-known network card or disk controller — by trapping every access to its registers, which works with any guest but costs one or more VM exits per register access. **Paravirtual** devices (virtio) use shared-memory rings of requests and completions, like NVMe's queues ([[operating-systems/storage-io]]), so that a whole batch of I/O costs one notification. **Device passthrough** gives a VM direct access to a real device; the IOMMU translates the device's DMA addresses through the VM's guest-physical mapping so that it can reach only that VM's memory, and **SR-IOV** lets one physical network card or SSD present many independent "virtual functions", one per VM.

::: quiz
Which statements about hardware-assisted virtualisation are true?
- [x] With VT-x, an unmodified guest kernel runs in ring $0$ of VMX non-root mode.
- [ ] With VT-x, every instruction the guest kernel executes causes a VM exit.
- [x] With nested paging, a guest can change its own page tables without causing a VM exit.
- [x] A TLB miss under nested paging can cost up to $24$ memory references with four-level tables.
::: solution
The guest kernel runs in non-root ring $0$, executing almost all its instructions directly; only the events and instructions configured in the VMCS cause exits. Nested paging lets the guest own its page tables entirely (they are translated by the EPT), which removes the faults that shadow paging needed, at the price of the two-dimensional walk of [[#thm-nested]].
:::
:::

## Containers

A virtual machine duplicates an entire computer, including a kernel, and boots it. Often what is wanted is less: running an application with its own libraries and configuration, isolated from other applications, on the *same* kernel. That is a **container**.

::: definition Container {#def-container}
A **container** is a group of processes running on the host's kernel, isolated from other processes by **namespaces**, which give it a private view of selected kernel resources, and limited in resource use by **control groups**; it typically has its own root file system, assembled from read-only image layers by a union file system.
:::

Linux has eight kinds of namespace (each process's are listed in `/proc/self/ns`):

| namespace | isolates | Linux version |
|---|---|---|
| mount | the tree of mounted file systems | 2.4.19 (2002) |
| UTS | host name and domain name | 2.6.19 (2006) |
| IPC | System V IPC objects, POSIX message queues | 2.6.19 (2006) |
| PID | process IDs: the first process is PID 1 | 2.6.24 (2008) |
| network | interfaces, addresses, routing tables, ports, firewall rules | 2.6.29 (2009) |
| user | user and group IDs: root inside, unprivileged outside | 3.8 (2013) |
| cgroup | the view of the cgroup hierarchy | 4.6 (2016) |
| time | the boot-time and monotonic clocks | 5.6 (2020) |

The **user namespace** is what makes unprivileged containers possible: a process can create one and become `root` inside it — with full privileges over resources owned by that namespace, and none outside. With it, an ordinary user can create the other namespaces.

::: example Namespaces from the command line {#ex-unshare}
As an unprivileged user on the test machine, use the `unshare` command to give a shell its own host name, its own (empty) network and its own process-ID space, and check from inside and outside that each is separate.
::: solution

```console
$ unshare -Ur --uts sh -c 'hostname sandbox; hostname'; hostname
sandbox
f
$ unshare -Urn ip -br link
lo               DOWN           00:00:00:00:00:00 <LOOPBACK>
$ unshare -Ur --pid --fork sh -c 'echo "my PID inside: $$"; readlink /proc/self/ns/pid'
my PID inside: 1
pid:[4026534969]
$ readlink /proc/self/ns/pid
pid:[4026535092]
```

The first command changed the host name inside a new UTS namespace; outside, it is still `f`. The second created a network namespace, which contains only a loopback interface, down: no network at all until someone connects a virtual interface to it. The third created a PID namespace in which the shell is process $1$ — the `init` of its own little process tree — and the namespace identifiers differ inside and outside. (`-U -r` creates a user namespace and maps the caller to root in it.)
:::
:::

**Control groups** (cgroups, version 2 since Linux 4.5 in 2016) organise processes into a hierarchy, `/sys/fs/cgroup`, and apply **controllers** to each group: `cpu` (weights, like nice values, and hard quotas), `memory` (limits, with the OOM killer of [[operating-systems/page-replacement]] acting within the group), `io` (bandwidth and weights per device), `pids` (a limit on the number of processes, which stops fork bombs). On the test machine, systemd can create a group for a command and limit it to a quarter of a CPU — a quota of $25$ ms of CPU time in every $100$ ms period:

```console
$ systemd-run --user --scope -q -p CPUQuota=25% sh -c \
    'cat /sys/fs/cgroup$(cut -d: -f3 /proc/self/cgroup)/cpu.max; ./spin capped'
25000 100000
capped: 0.69 s of CPU in 3 s
```

`spin` is the busy loop of [[operating-systems/processes-scheduling#ex-nice]]. Uncapped it receives the whole of a core; in the group it received $0.69$ s in $3$ s, about $23\%$ (another run gave $0.77$ s; with a $50\%$ quota, $1.46$ s). The scheduler enforces the quota by **throttling**: once the group has used its $25$ ms in a period, its tasks are not run until the next period begins.

The remaining piece is the file system. A container image is a stack of read-only **layers** — a base distribution, then installed packages, then the application — combined by **overlayfs** into one tree, with a writable layer on top for the container's changes (copy-on-write at the level of whole files). A **mount namespace** and `pivot_root` then make that tree the container's `/`. Docker (2013) packaged these mechanisms, together with an image format and a registry, into a tool that made containers ubiquitous; the Open Container Initiative (2015) standardised the image and runtime formats, and orchestration systems such as Kubernetes schedule containers across clusters.

::: example Building a container by hand {#ex-container}
Which of the mechanisms above would you combine, and in which order, to run a web server as a container: its own root file system from an image, its own process tree and host name, a private network with one virtual interface, at most two CPUs and 1 GiB of memory, and no root privileges on the host?
::: solution
(1) Create a **user namespace** mapping container root to an unprivileged host user — first, because it lets the remaining namespaces be created without host privileges. (2) Create **mount, UTS, IPC, PID and network namespaces** (with `unshare` or a single `clone` with the corresponding flags). (3) Assemble the root file system with **overlayfs** — image layers read-only, an empty writable directory on top — mount it, mount a fresh `/proc` for the new PID namespace, and `pivot_root` into it so that the host's files are no longer visible. (4) Create a **veth** pair (two virtual interfaces joined like a cable), move one end into the container's network namespace and attach the other to a bridge on the host. (5) Create a **cgroup** with `cpu.max` set to `200000 100000` (two CPUs' worth of time per $100$ ms period) and `memory.max` set to `1G`, and move the container's first process into it. (6) Drop capabilities and install a **seccomp** filter restricting which system calls the server may make. (7) `execve` the server, which becomes PID $1$ inside. Container runtimes such as `runc` and `crun` perform essentially these steps from a configuration file.
:::
:::

## Isolation compared

| | process | container | virtual machine |
|---|---|---|---|
| kernel | shared | shared | separate guest kernel |
| what is virtualised | CPU, memory | + names: PIDs, mounts, network, users | the whole machine |
| start-up time | milliseconds | tens to hundreds of ms | seconds (microVMs: ~100 ms) |
| memory overhead | none | small | a whole guest OS |
| isolation boundary | system calls, permissions | system calls + namespaces + cgroups | hypervisor interface (VM exits) |

The decisive difference is the size of the boundary an attacker must cross. A container's processes make system calls directly to the host kernel — hundreds of them, implemented by millions of lines of code — so a single exploitable kernel bug lets code in a container take over the host and every other container. A VM's guest talks to the hypervisor through a much narrower interface: a few dozen kinds of VM exit and the virtual devices. Hypervisors have bugs too, especially in device emulation, but their attack surface is far smaller.

::: warning "Containers are lightweight virtual machines"
Containers feel like small VMs — their own `/`, their own `ps`, their own `root` — but they are processes on a shared kernel. Code running as root in a container without a user namespace *is* root as far as many kernel interfaces are concerned; kernel parameters, the system clock and kernel modules are shared; and a kernel vulnerability is a vulnerability of every container on the host. That is why public clouds run each customer's containers inside VMs, and why sandboxes such as gVisor (which intercepts a container's system calls with a user-space kernel) and **microVMs** such as Firecracker (2018, a minimal KVM-based VMM that boots a Linux guest in around a tenth of a second) exist: they combine the convenience of containers with the boundary of a hypervisor. Use containers for packaging and resource management; do not rely on them alone to separate mutually hostile tenants.
:::

::: history
IBM's CP-40 (1967) and CP-67, and the VM/370 operating system (1972), ran multiple copies of IBM's operating systems on one mainframe — the first hypervisors; the System/370 architecture was designed to be virtualisable. Gerald Popek and Robert Goldberg formalised the requirements in "Formal requirements for virtualizable third generation architectures" (*Communications of the ACM*, 1974). John Scott Robin and Cynthia Irvine showed in 2000 that the x86 violated them. Mendel Rosenblum and colleagues at Stanford (the Disco project, 1997) revived virtual machines on modern hardware and founded VMware, whose binary-translating Workstation shipped in 1999. Paul Barham and colleagues' "Xen and the art of virtualization" (2003) introduced paravirtualisation in its modern form. Intel VT-x (2005) and AMD-V (2006) brought hardware support, and Avi Kivity's KVM was merged into Linux in 2007. On the container side, Unix's `chroot` (1979) changed a process's root directory; FreeBSD jails (2000) and Solaris Zones (2004) added real isolation; Linux gained namespaces from 2002 and cgroups (from Paul Menage and Rohit Seth at Google) in 2008, LXC combined them in 2008, and Docker popularised containers from 2013.
:::

## Where this leads

Virtual machines and containers are the substrate of cloud computing and of the large-scale systems in [[distributed-systems]]: cluster schedulers place them on machines, live migration moves running VMs between hosts by copying their memory while they run, and serverless platforms start microVMs per request. The isolation boundaries of this chapter — and the side channels, such as shared caches and page sharing, that cross them — are central topics of [[security]]. Language virtual machines (the JVM, WebAssembly runtimes) virtualise a different interface, an instruction set designed for portability rather than a real processor ([[programming-languages]], [[compilers]]).

::: summary
- A **virtual machine** is an efficient, isolated duplicate of a real machine, created by a **hypervisor** that provides equivalence, resource control and efficiency ([[#def-vm]]); type 1 hypervisors run on the hardware, type 2 on a host OS, and KVM turns Linux into a hypervisor.
- **Trap-and-emulate** works if every sensitive instruction is privileged (**Popek–Goldberg**, [[#thm-popek]]). The x86 failed: `popf` silently ignores changes to IF in user mode, without trapping ([[#ex-popf]]).
- Solutions: **binary translation** (VMware), **paravirtualisation** (Xen, virtio), and **hardware support** (VT-x/AMD-V: root and non-root modes, VMCS, VM exits). Overhead is about (exits per second) × (cost per exit) ([[#prop-exits]]).
- Memory needs two translations; **shadow page tables** trap guest page-table writes, while **nested paging** (EPT/NPT) costs up to $(n+1)(m+1) - 1 = 24$ references per TLB miss ([[#thm-nested]]), mitigated by VPIDs and huge pages. Balloons and page sharing overcommit memory.
- **Containers** ([[#def-container]]) are processes isolated by **namespaces** (mount, UTS, IPC, PID, network, user, cgroup, time) and limited by **cgroups** (`cpu.max 25000 100000` capped a spinning process to about $25\%$), with layered root file systems.
- Containers share the host kernel, so their isolation is only as strong as the kernel's system-call interface; VMs have a much narrower boundary. MicroVMs and sandboxes combine the two.
:::

## Exercises

::: exercise Which technique? {level=1}
For each situation, name the virtualisation technique: (a) running unmodified Windows on a 2002 x86 desktop; (b) a Linux guest that calls the hypervisor to update its page tables; (c) an unmodified guest on a 2026 server whose processor lists `vmx` and `ept`; (d) running an ARM program on an x86 laptop.
::: solution
(a) Binary translation (VMware Workstation): the processor had no VT-x and Windows could not be modified. (b) Paravirtualisation (Xen's paravirtual guests): hypercalls replace sensitive instructions. (c) Hardware-assisted virtualisation with nested paging (KVM, Hyper-V, ESXi): VT-x for the CPU, EPT for memory. (d) Emulation (or dynamic binary translation across instruction sets, as QEMU's TCG does), since the instructions cannot run natively at all.
:::
:::

::: exercise Sensitive or not {level=1}
Classify each x86 instruction as innocuous, sensitive and privileged, or sensitive but unprivileged (on the 32-bit x86 before VT-x): (a) `add`; (b) `mov` to `%cr3`; (c) `popf`; (d) `hlt`; (e) `sgdt`, which stores the address of the global descriptor table into memory and is allowed in user mode.
::: solution
(a) Innocuous. (b) Sensitive (control: changes the mapping) and privileged: traps in user mode. (c) Sensitive (its effect on IF depends on the mode) but unprivileged: the problem of [[#ex-popf]]. (d) Sensitive and privileged. (e) Sensitive (behaviour: it reveals the real location of a control structure, which differs from the guest's virtual one) but unprivileged — a guest kernel using it would see the *host's* table address. Since 2017 some processors offer UMIP (user-mode instruction prevention), which makes `sgdt` and similar instructions fault in user mode.
:::
:::

::: exercise A cgroup quota {level=1 check="2"}
A cgroup's `cpu.max` contains `200000 100000`. At most how many CPUs' worth of time can the group's processes use? (Enter the number.)
::: solution
The group may use $200{,}000$ µs of CPU time in every $100{,}000$ µs period, that is $200/100 = 2$ CPUs' worth — for instance two threads running continuously on two cores, or four running half the time. With `50000 100000` it would be half a CPU, enforced even on an otherwise idle machine.
:::
:::

::: exercise Exit overhead {level=2 check="0.12"}
A VM's network driver causes $80{,}000$ VM exits per second, each costing $1.5$ µs to handle. What fraction of a virtual CPU is lost? (Enter the fraction.) A paravirtual driver batches $32$ packets per exit: what is the fraction then?
::: solution
By [[#prop-exits]], $nc = 80000 \times 1.5 \times 10^{-6} = 0.12$: $12\%$ of a CPU. Batching $32$ packets per exit reduces $n$ to $2500$ per second, and the loss to $0.00375$, under $0.4\%$ — the reasoning of [[operating-systems/os-structure#prop-amortise]] applied to VM exits.
:::
:::

::: exercise Nested walks with huge pages {level=2 check="14"}
A guest uses four-level page tables and the hypervisor maps guest memory with 1 GiB EPT pages, so each EPT walk takes $2$ references. How many references does an uncached TLB miss cost? (Enter the number.) What if the guest also uses 1 GiB pages (a two-level guest walk)?
::: solution
By the argument of [[#thm-nested]] with $n = 4$, $m = 2$: $(4 + 1)(2 + 1) - 1 = 14$. With $n = m = 2$: $(3)(3) - 1 = 8$. Natively with 1 GiB pages, a walk is $2$ references. Huge pages help virtualised workloads twice: they shorten each walk and they make misses rarer.
:::
:::

::: exercise Shadow paging costs {level=2}
Under shadow paging, a guest process calls `fork`, and the guest kernel marks $2000$ writable PTEs read-only for copy-on-write. Each guest write to a page-table page causes a fault to the VMM costing $3$ µs. How long does this part of the `fork` take, compared with about $2$ µs natively? Why does nested paging avoid this cost, and what does it cost instead?
::: solution
$2000$ trapped writes $\times\ 3$ µs $= 6$ ms, against about $2$ µs of real work natively (a few nanoseconds per PTE): three thousand times slower. VMMs batch and optimise (they may unprotect a page-table page being modified heavily and resynchronise the shadow later), but `fork`-heavy workloads such as shell scripts and build systems were the worst case of shadow paging. With nested paging the guest's page tables are ordinary guest memory translated by the EPT; the guest writes them at full speed, with no exits. The price is paid on TLB misses instead: the two-dimensional walk of up to $24$ references ([[#thm-nested]]).
:::
:::

::: exercise popf and a virtual interrupt {level=3}
A deprivileged guest kernel on a pre-VT-x x86 runs under pure trap-and-emulate. It executes `popf` to clear IF, updates a shared queue, and executes `popf` again to restore IF. Describe precisely what goes wrong, show that it violates the equivalence requirement of [[#def-vm]], and explain how VT-x prevents it.
::: solution
The guest kernel runs in user mode, so its first `popf` silently leaves IF set and does not trap ([[#ex-popf]]). The VMM's copy of the guest's virtual IF therefore still says "interrupts enabled". If a timer interrupt for the guest arrives while the guest is updating the queue, the VMM delivers a virtual interrupt — it jumps to the guest's interrupt handler — and the handler may itself access the queue, finding it half-updated. On a real machine, the cleared IF would have delayed the interrupt until the second `popf`. The program behaves differently from the real machine, violating equivalence, because a sensitive instruction executed without the VMM's knowledge. (A guest kernel could also read the flags with `pushf` and see the *real* IF and the real privilege level rather than its virtual ones — another behaviour-sensitive leak.) With VT-x the guest kernel runs in ring $0$ of non-root mode, where `popf` really does change IF — of the *guest's* processor state, saved and restored in the VMCS — and the hypervisor configures external interrupts to cause VM exits regardless of the guest's IF, then **injects** a virtual interrupt only when the guest's IF allows it (using an "interrupt-window exiting" control to be told when it does). The guest's view of IF is exact, and the hypervisor keeps control.
:::
:::

::: exercise What a container shares {level=3}
Starting from the `unshare` commands in the text, list five kernel resources that a process in a container with all eight namespaces still shares with the host, and for each say what could go wrong and what mitigates it.
::: solution
(1) **The kernel itself** — the same code, the same bugs: a kernel exploit from inside the container compromises the host. Mitigations: keep the kernel patched, restrict system calls with seccomp, run untrusted containers in VMs or gVisor. (2) **The system clock** (`CLOCK_REALTIME`): the time namespace virtualises only the monotonic and boot-time clocks, so a container allowed to set the time (`CAP_SYS_TIME`) changes it for everyone. Mitigation: drop the capability (the default in container runtimes). (3) **Kernel parameters** in `/proc/sys` that are not namespaced (many memory and scheduler settings): a privileged container could change them. Mitigation: mount `/proc/sys` read-only. (4) **Physical resources** — CPU caches, memory bandwidth, the disk: a noisy neighbour can slow others, and shared caches allow timing side channels. Mitigation: cgroup limits for bandwidth and quotas; for side channels, separate hosts or cores. (5) **Kernel memory and the page cache**: a container can fill kernel data structures (dentries, inodes) or the page cache. Mitigation: the memory cgroup charges kernel memory and page cache to the group. Also shared: loaded kernel modules, the kernel keyring in some configurations, and device drivers.
:::
:::
