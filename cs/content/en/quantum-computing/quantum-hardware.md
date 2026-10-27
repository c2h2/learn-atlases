Everything so far has been mathematics: unit vectors, unitaries, projectors. A quantum computer is a physical object in which those abstractions are approximated by real systems — superconducting circuits cooled to a hundredth of a degree above absolute zero, single ions held in electric fields, atoms trapped in focused laser beams, single photons in waveguides — and every approximation leaks. This chapter asks what it takes to build a qubit, compares the main hardware platforms by the numbers that matter (error rates, coherence times, gate speeds, connectivity, scale), describes the **noisy intermediate-scale** era and its algorithms, and summarises the state of the field **as of 2026**: what has been demonstrated, what has been claimed and contested, and how far the field is from running Shor's algorithm on a cryptographically relevant number.

Two cautions. First, hardware changes quickly, and figures quoted here are orders of magnitude for the best published devices in the mid-2020s, not specifications of any product; anything that changes is dated. Second, quantum computing attracts more hype than most fields. We describe experiments by what their authors and their critics have published, and we keep the distinction between a *demonstration* (a measured result on a device) and a *projection* (a roadmap, a resource estimate) explicit. The physics of the individual systems is in the [Physics Atlas](/learn/physics/lesson.php?c=quantum-1&l=spin) and, for photons, the [Electrical Engineering Atlas: optical fibres](/learn/ee/lesson.php?c=photonics&l=optical-fibres).

## What a qubit needs

In 2000 David DiVincenzo listed the requirements that any physical implementation must meet.

::: definition DiVincenzo criteria {#def-divincenzo}
A physical system can serve as a quantum computer if it has (1) a **scalable** physical system of well-characterised qubits; (2) the ability to **initialise** the qubits to a simple state such as $\ket{0\cdots0}$; (3) **coherence times** much longer than gate times; (4) a **universal set of gates**; and (5) a **qubit-specific measurement** capability. For quantum communication, add (6) the ability to convert between stationary and "flying" qubits (usually photons) and (7) to transmit flying qubits faithfully between locations.
:::

The criteria pull against each other. A qubit must be isolated from its environment to keep its coherence, yet strongly coupled to control fields and to other qubits to be manipulated and measured quickly. Every platform is a compromise between the two, and the figures of merit quantify it.

- **Gate fidelity** $F$ or **error rate** $\epsilon = 1 - F$ for one- and two-qubit gates, typically measured by **randomised benchmarking**: random sequences of Clifford gates whose ideal product is known, whose survival probability decays as $\approx(1 - \epsilon)^m$ with sequence length $m$. Two-qubit gates are almost always the worst.
- **Coherence times** $T_1$ (relaxation) and $T_2$ (dephasing), defined in [[quantum-computing/error-correction]]; what matters is their ratio to gate times.
- **State preparation and measurement (SPAM)** error, and measurement time.
- **Connectivity**: which pairs of qubits can interact directly. Limited connectivity forces SWAP gates (three CNOTs each, [[quantum-computing/quantum-circuits#ex-identities]]), which cost time and errors.
- **Scale and uniformity**: the number of qubits, and whether they behave alike, which determines whether the error rates measured on a few pairs hold across the chip.

::: example How many gates before decoherence? {#ex-gate-budget}
A qubit has $T_2 = 100$ µs and two-qubit gates take $50$ ns. How many sequential gates fit within $T_2$? If instead the gates have error $\epsilon = 10^{-3}$ each, what is the probability that a circuit of $5000$ two-qubit gates runs without any error?
::: solution
$100\,\mu\text{s}/50\text{ ns} = 2000$ gate times. But decoherence is not the only limit: with independent errors, $5000$ gates all succeed with probability $(1 - 10^{-3})^{5000} = e^{5000\ln(0.999)}\approx e^{-5.0}\approx 0.0067$. A circuit is useful without error correction only if the expected number of errors, here $\epsilon G = 5$, is well below $1$. So unencoded devices with error rates around $10^{-3}$ can run circuits of at most a few hundred to a thousand two-qubit gates with good fidelity — the essence of the **NISQ** regime below.
:::
:::

The arithmetic of the example is worth stating once, because it is used constantly to judge what a device can do.

::: proposition Success probability of an uncorrected circuit {#prop-budget}
If each of the $G$ gates of a circuit fails independently with probability $\epsilon$, and a circuit run counts as successful only when no gate fails, then
$$
1 - \epsilon G\ \le\ (1 - \epsilon)^G\ \le\ e^{-\epsilon G}.
$$
In particular the success probability is at least $1/2$ when $G\le 1/(2\epsilon)$ and at most $e^{-k}$ when $G\ge k/\epsilon$.
:::

::: proof
The middle expression is the probability that none of $G$ independent events of probability $\epsilon$ occurs. The left inequality is Bernoulli's inequality, $(1 - \epsilon)^G\ge1 - G\epsilon$ for $0\le\epsilon\le1$, proved by induction: $(1 - \epsilon)^{G+1}\ge(1 - G\epsilon)(1 - \epsilon) = 1 - (G+1)\epsilon + G\epsilon^2\ge1 - (G + 1)\epsilon$. The right inequality follows from $1 - \epsilon\le e^{-\epsilon}$ (the tangent line lies below the convex function $e^{-x}$) raised to the power $G$. The two consequences are immediate.
:::

Real errors are not all fatal — some hit qubits that are measured away, some cancel — so the bound is pessimistic for a particular circuit, but the scaling with $\epsilon G$ is right: without error correction, the useful size of a circuit is about $1/\epsilon$ gates.

## The main platforms

### Superconducting circuits

A superconducting qubit is an electrical circuit — capacitors, inductors and **Josephson junctions** (two superconductors separated by a nanometre-thin insulator) — made with lithography on a chip. The junction is a non-linear inductor, which makes the energy levels of the circuit unequally spaced, so its two lowest levels can be addressed as a qubit without exciting the third. The dominant design, the **transmon** (Koch and colleagues, 2007), has a transition frequency of a few gigahertz. To keep thermal excitations negligible the chip sits in a **dilution refrigerator** at about $10$–$20$ mK (see the exercise "Why so cold?" below). Single-qubit gates are microwave pulses of tens of nanoseconds; two-qubit gates use tunable couplers or frequency tuning and take tens to hundreds of nanoseconds; measurement uses a microwave resonator coupled to the qubit, and takes on the order of a microsecond.

*Strengths*: fast gates, fabrication with semiconductor-industry techniques, and a planar layout well suited to the surface code. *Weaknesses*: coherence times of order $100$ µs (the best transmons reach several hundred µs as of 2026), qubit-to-qubit variation from fabrication, nearest-neighbour connectivity, and the wiring and refrigeration needed for every qubit — one of the main obstacles to scaling to millions. The largest processors have from about a hundred to over a thousand qubits (IBM's Condor chip announced in 2023 had $1\,121$), with the best two-qubit error rates in the range $10^{-3}$ to a few $\times10^{-3}$. Groups at Google, IBM, the University of Science and Technology of China (USTC) and elsewhere use this platform; Google's 2019 sampling experiment and its 2024 error-correction experiment, discussed below, were both superconducting.

### Trapped ions

Ions of elements such as ytterbium, calcium or barium are held in a vacuum by oscillating electric fields (a Paul trap), in a line or in zones of a microfabricated trap. The qubit is two hyperfine or optical levels of each ion, with coherence times of seconds or longer — enormous compared with gate times. Gates use lasers (or microwaves with magnetic field gradients); two-qubit gates such as the Mølmer–Sørensen gate couple ions through their shared vibrational motion, which gives **all-to-all connectivity** within a chain. Cirac and Zoller proposed the first ion-trap quantum gate in 1995, and Wineland's group demonstrated a CNOT the same year.

*Strengths*: identical qubits (every ion of an isotope is the same), the highest published two-qubit fidelities (above $99.9\%$ in several experiments by 2024–2025), long coherence, and flexible connectivity. *Weaknesses*: slow gates (microseconds to hundreds of microseconds), so algorithms take far longer in wall-clock time; and scaling beyond a few dozen ions per chain, which requires shuttling ions between zones of a chip (the **QCCD** architecture proposed by Kielpinski, Monroe and Wineland in 2002) or linking traps by photons. Commercial systems from Quantinuum, IonQ and others had tens of qubits as of the mid-2020s (Quantinuum's H2 reached $56$ in 2024).

### Neutral atoms

Neutral atoms (rubidium, caesium, ytterbium, strontium) are trapped individually in **optical tweezers** — tightly focused laser beams — arranged in one- or two-dimensional arrays of hundreds to thousands of sites. Qubits are hyperfine or nuclear-spin states with long coherence. Two-qubit gates use the **Rydberg blockade** (Jaksch and colleagues, 2000): exciting one atom to a highly excited Rydberg state shifts the levels of its neighbours so that they cannot be excited too, which yields a controlled phase. Crucially, the tweezers can **move** atoms during a computation, so connectivity can be reconfigured. In December 2023 a Harvard–MIT–QuEra team (Bluvstein and colleagues) ran algorithms on up to $48$ logical qubits encoded in $280$ atoms, the largest logical-qubit demonstration at the time. *Weaknesses*: atom loss, slower cycle times than superconducting circuits, and two-qubit fidelities that reached $99.5\%$ only around 2023–2024.

### Photons

Photons hardly interact with their environment, so they decohere little and are the natural carriers for communication — but for the same reason they hardly interact with each other, which makes two-qubit gates hard. Knill, Laflamme and Milburn showed in 2001 that measurement and feed-forward can make linear optics universal, at a high cost in resources; modern proposals use **measurement-based** computation, in which a large entangled **cluster state** is prepared and the computation proceeds by single-photon measurements (Raussendorf and Briegel, 2001), or **fusion-based** variants. Photonic devices have run Gaussian boson-sampling experiments (USTC's Jiuzhang from 2020, Xanadu's Borealis in 2022) for the advantage claims of [[quantum-computing/quantum-complexity]]. Photon loss and the lack of deterministic single-photon sources are the main obstacles.

### Other approaches

**Spin qubits** in silicon or germanium quantum dots (Loss and DiVincenzo, 1998) or donor atoms (Kane, 1998) are tiny and could use semiconductor manufacturing directly; two-qubit fidelities above $99\%$ were reported by several groups in 2022, but devices remain small. **Topological qubits** would store information in non-local degrees of freedom — for example Majorana zero modes in superconductor–semiconductor nanowires — that are intrinsically protected from local noise. As of 2026 no topological qubit has been demonstrated unambiguously; an earlier claim of Majorana signatures was retracted in 2021, and Microsoft's 2025 announcement of a topological processor was accompanied by a paper whose editorial notes stated that it did not by itself establish topological modes, and has been debated. **Quantum annealers** (D-Wave) are analogue devices for optimisation with thousands of qubits; they are not universal gate-model computers, and no exponential speed-up from them has been established.

| platform | 2-qubit gate time | coherence | best 2-qubit error (mid-2020s) | connectivity | largest devices |
|---|---|---|---|---|---|
| superconducting | 10–500 ns | $\sim$0.1 ms | $\sim10^{-3}$ | nearest neighbour | $\sim$100–1000 qubits |
| trapped ions | 1–500 µs | s or longer | $<10^{-3}$ | all-to-all (per chain) | tens of qubits |
| neutral atoms | $\sim$0.1–1 µs | s | $\sim5\times10^{-3}$ | reconfigurable | hundreds–thousands of atoms |
| photons | — (measurement-based) | (loss-limited) | loss dominates | by design | specialised experiments |

The table is a rough guide to orders of magnitude as of 2026, not a ranking; each column changes yearly, and no platform leads on every row.

::: example The cost of limited connectivity {#ex-connectivity}
Qubits $1, \dots, n$ sit on a line, and two-qubit gates are allowed only between neighbours. How many CNOTs does a CNOT between qubits $1$ and $n$ cost, and how does this compare with an architecture with all-to-all connectivity?
::: solution
Move the state of qubit $1$ next to qubit $n$ by SWAPs with its neighbours: $n - 2$ SWAPs bring it to position $n - 1$. Apply the CNOT, then (if the layout must be restored) $n - 2$ SWAPs back. Each SWAP is three CNOTs ([[quantum-computing/quantum-circuits#ex-identities]]), so the total is $3(n - 2) + 1 + 3(n - 2) = 6n - 11$ CNOTs, or $3n - 5$ if the qubits may stay permuted. For $n = 20$ that is $109$ (or $55$) CNOTs instead of $1$, and with an error of $10^{-3}$ per CNOT it multiplies the error of that one operation by about $100$. Compilers mitigate this by choosing qubit layouts and routing cleverly, and two-dimensional grids reduce the distance to $O(\sqrt n)$; trapped-ion chains (all-to-all within a chain) and neutral atoms (which can be moved) avoid it, at the cost of slower gates. Surface codes need only nearest-neighbour gates on a grid, one reason they suit superconducting chips.
:::
:::

::: quiz
Which platform characteristic most directly determines the **wall-clock time** of running a fixed fault-tolerant algorithm, assuming all platforms reach the same logical error rate?
- [ ] the number of physical qubits on the largest chip
- [ ] the coherence time $T_2$
- [x] the time of one error-correction cycle (gate and measurement speed)
- [ ] the connectivity graph
::: solution
A fault-tolerant algorithm is a sequence of error-correction cycles; its duration is the number of cycles times the cycle time, which is set by gate and measurement speed — about a microsecond for superconducting qubits and up to milliseconds for trapped ions. Coherence matters through the error rate (which we fixed), connectivity through the overhead per logical gate, and qubit count through whether the algorithm fits at all. This is why the same factoring estimate can mean hours on one platform and months on another.
:::
:::

## The NISQ era

In 2018 John Preskill named the period we are in: **noisy intermediate-scale quantum** (NISQ) technology, with $50$ to a few hundred qubits, too noisy for error correction at scale, but too large to simulate easily. Without error correction, the usable circuit size is bounded by roughly $1/\epsilon$ gates ([[#prop-budget]]). Three ideas dominate this era.

- **Variational algorithms.** A short parameterised circuit prepares a state $\ket{\psi(\vec\theta)}$, the device estimates a cost such as the energy $\bra{\psi(\vec\theta)}H\ket{\psi(\vec\theta)}$ of a molecule (the **variational quantum eigensolver**, Peruzzo and colleagues, 2014) or the objective of an optimisation problem (**QAOA**, Farhi, Goldstone and Gutmann, 2014), and a classical optimiser adjusts $\vec\theta$. They are heuristics: no general speed-up is proven, the optimisation landscapes often have "barren plateaus" with exponentially small gradients (McClean and colleagues, 2018), and so far classical methods have matched them on the problems tried.
- **Error mitigation.** Instead of correcting errors, estimate and remove their average effect from measured expectation values — for example by running circuits at artificially amplified noise and extrapolating to zero noise (Temme, Bravyi and Gambetta, 2017). Mitigation needs no extra qubits but its sampling cost grows exponentially with circuit size times error rate, so it extends the NISQ regime rather than escaping it. A 2023 IBM experiment on $127$ qubits used it to estimate expectation values beyond brute-force simulation; classical approximation methods reproduced the results within weeks — the pattern of [[quantum-computing/quantum-complexity]].
- **Quantum simulation.** Analogue and digital simulations of many-body physics — spin models, lattice gauge theories, dynamics after a quench — are the most natural near-term application, and arguably where devices first deliver scientific results not easily obtained otherwise.

::: warning "A computer with $N$ qubits is $2^N$ times as powerful"
Qubit counts are the least informative number in a press release. A device's capability depends on error rates, connectivity and coherence at least as much: $1000$ qubits with $1\%$ two-qubit error can run only about a hundred gates reliably, while $50$ qubits at $10^{-4}$ could run thousands. Composite benchmarks such as IBM's **quantum volume** (Cross and colleagues, 2019) or application-level benchmarks try to capture this, but every benchmark can be optimised for. And no number of physical qubits makes a quantum computer useful for factoring until they are error-corrected: what matters for cryptography is the number of **logical** qubits and the logical error rate.
:::

## Error correction on real hardware

The threshold theorem ([[quantum-computing/error-correction#thm-threshold]]) is an asymptotic statement; the experimental question is whether real devices are below threshold, so that larger codes give smaller logical error rates. For the surface code the experiments are summarised by one number.

::: definition Error-suppression factor {#def-lambda}
For a family of codes of increasing distance $d$ run on the same hardware, with logical error rate per error-correction cycle $p_L(d)$, the **error-suppression factor** is $\Lambda = p_L(d)/p_L(d + 2)$. In the standard model of the surface code below threshold, with physical error rate $p$, threshold $p_{\mathrm{th}}$ and a constant $A$,
$$
p_L(d)\approx A\Bigl(\frac{p}{p_{\mathrm{th}}}\Bigr)^{(d+1)/2},\qquad \Lambda\approx\frac{p_{\mathrm{th}}}{p}.
$$ {#eq-lambda}
:::

The device is **below threshold** when $\Lambda > 1$: then each step of $2$ in distance divides the logical error by $\Lambda$, and the logical error falls exponentially in $d$ while the number of physical qubits, $2d^2 - 1$, grows only quadratically. When $\Lambda < 1$, larger codes are worse.

::: application Below threshold, 2023–2024
In 2023 a Google team reported that a distance-$5$ surface code on their Sycamore processor had a slightly lower logical error per cycle than distance $3$ ($\Lambda$ just above $1$). In December 2024 the same group reported, on its $105$-qubit **Willow** processor, surface-code memories of distances $3$, $5$ and $7$ with $\Lambda = 2.14\pm0.02$: each increase in distance roughly halved the logical error, reaching about $0.14\%$ per cycle at distance $7$, and the distance-$7$ logical qubit outlived the best physical qubit on the chip by a factor of about $2.4$. They also decoded a distance-$5$ code in real time. This was the first clear demonstration of the exponential suppression that the threshold theorem promises, in a quantum memory. It did not yet include a universal set of logical gates at these error rates, and logical error rates of $10^{-3}$ per cycle are still about ten orders of magnitude above what large algorithms need. Other groups have demonstrated logical qubits with trapped ions and neutral atoms (the $48$-logical-qubit experiment above), with smaller codes and post-selection or error detection in several cases.
:::

::: widget plot
f: log10(0.1*(1/L)^((x+1)/2))
x: 3, 51
y: -16, 0
sliders: L=2:1.1:20:0.1
labels: \log_{10} p_L(d)
hlines: -12
caption: The base-10 logarithm of the logical error per cycle as a function of the code distance $d$ (horizontal axis, odd values), in the model [[#eq-lambda]] with $A = 0.1$ and error-suppression factor $\Lambda$ (slider $L$). At $\Lambda = 2$, roughly the 2024 state of the art, reaching $10^{-12}$ (horizontal line) needs $d \approx 73$; at $\Lambda = 10$ (physical errors ten times below threshold) $d \approx 21$ suffices. The number of physical qubits grows as $2d^2$, so improving $\Lambda$ is worth far more than adding qubits.
:::

### How big must a useful machine be?

Resource estimates combine the algorithm's logical cost — number of logical qubits, of $T$ gates, of error-correction cycles — with a code, a decoder, a layout including **magic-state factories** for $T$ gates ([[quantum-computing/error-correction]]), and a physical error rate.

::: example A toy resource estimate {#ex-estimate}
Using [[#eq-lambda]] with $A = 0.1$ and $p_{\mathrm{th}} = 1\%$, estimate the code distance and the number of physical qubits for a hypothetical algorithm with $2000$ logical qubits running for $10^9$ error-correction cycles with total failure probability $10\%$, for physical error rates from $5\times10^{-3}$ to $10^{-4}$.
::: solution
The allowed logical error per qubit per cycle is $0.1/(2000\times10^9) = 5\times10^{-14}$. For each $p$, increase the (odd) distance until $p_L(d)$ falls below it, and count $2d^2 - 1$ physical qubits per logical qubit.

```python
# A toy surface-code resource model (illustrative only, not a real resource estimate):
#   logical error per qubit per cycle  p_L(d) = A * (p / p_th) ** ((d + 1) / 2)
#   physical qubits per logical qubit  2 d^2 - 1
A, p_th = 0.1, 1e-2

def distance_needed(p, target):
    d = 3
    while A * (p / p_th) ** ((d + 1) / 2) > target:
        d += 2                                   # surface-code distances are odd
    return d

logical_qubits, cycles = 2000, 1e9               # a hypothetical large algorithm
target = 0.1 / (logical_qubits * cycles)         # allow a 10% total failure chance
print(f"target logical error per qubit-cycle: {target:.1e}")
for p in (5e-3, 2e-3, 1e-3, 5e-4, 1e-4):
    d = distance_needed(p, target)
    per = 2 * d * d - 1
    print(f"p = {p:.0e}: Lambda = {p_th / p:5.1f}, distance {d:3}, "
          f"{per:6} physical per logical, {logical_qubits * per / 1e6:6.2f} million data+ancilla qubits")
```

```console
$ python3 estimate.py
target logical error per qubit-cycle: 5.0e-14
p = 5e-03: Lambda =   2.0, distance  81,  13121 physical per logical,  26.24 million data+ancilla qubits
p = 2e-03: Lambda =   5.0, distance  35,   2449 physical per logical,   4.90 million data+ancilla qubits
p = 1e-03: Lambda =  10.0, distance  25,   1249 physical per logical,   2.50 million data+ancilla qubits
p = 5e-04: Lambda =  20.0, distance  19,    721 physical per logical,   1.44 million data+ancilla qubits
p = 1e-04: Lambda = 100.0, distance  13,    337 physical per logical,   0.67 million data+ancilla qubits
```

At $p = 10^{-3}$ — the best two-qubit error rates of the mid-2020s — the model needs distance $25$ and about $2.5$ million physical qubits before counting magic-state factories and routing space, which typically add a comparable amount. Halving $p$ almost halves the machine. The model is crude (real estimates simulate specific circuits and decoders), but its conclusions match the published ones in order of magnitude.
:::
:::

For factoring, the published estimates have fallen steadily as algorithms and layouts improved. Gidney and Ekerå (2019, published 2021) estimated that a 2048-bit RSA modulus could be factored in about $8$ hours by about $20$ million noisy qubits with error rate $10^{-3}$. In 2025 Gidney estimated that fewer than a million such qubits could do it in under a week, using approximate arithmetic, more compact storage of idle logical qubits and cheaper magic-state preparation. These are projections for machines that do not exist: as of 2026 the largest devices have thousands of physical qubits at most and at best a few dozen logical qubits, with logical error rates far above what such algorithms require. How long the gap will take to close is genuinely uncertain, which is why the migration to post-quantum cryptography ([[cryptography/post-quantum]]) is already under way.

::: example Grover in practice {#ex-grover-practice}
A classical computer tests $10^9$ candidate keys per second. A fault-tolerant quantum computer executes one logical gate per microsecond, and one Grover iteration (oracle plus diffusion) costs $10^4$ sequential logical gates. For which search-space size $N$ does Grover's algorithm ([[quantum-computing/grover]]) take the same time as classical exhaustive search, and how long does that take?
::: solution
Classical time: $N/10^9$ s. Quantum time: $\frac\pi4\sqrt N$ iterations of $10^4\cdot10^{-6} = 10^{-2}$ s each, i.e. $7.85\times10^{-3}\sqrt N$ s. They are equal when $\sqrt N = 7.85\times10^{-3}\times10^9 = 7.85\times10^6$, i.e. $N\approx6.2\times10^{13}$, after about $6.2\times10^4$ s $\approx 17$ hours. For smaller searches the classical machine wins outright, and every factor of $100$ beyond that point gains the quantum computer only a factor of $10$. With parallel classical hardware (a thousand GPUs) the crossover moves to $10^6$ times larger $N$ and years of quantum running time. Quadratic speed-ups need fast logical gates to pay off; exponential ones, like Shor's, do not.
:::
:::

## The state of the field, as of 2026

Summarising only what is established in published, peer-reviewed or widely replicated work:

- **Beyond-classical demonstrations.** Random-circuit sampling (Google, 2019 and 2024; USTC, 2021) and Gaussian boson sampling (USTC from 2020; Xanadu, 2022) have produced outputs that the experimenters estimated to be very expensive to simulate classically. Several of the earlier claims were later matched by improved classical algorithms ([[quantum-computing/quantum-complexity]]); the most recent ones stand as of 2026, with the caveat that their classical hardness rests on conjectures, and the tasks have no known practical use.
- **Error correction.** Logical qubits whose error rate falls as the code grows have been demonstrated (Google's Willow, 2024), as have small logical circuits on ions and neutral atoms. Fault-tolerant execution of a useful algorithm has not.
- **Algorithms.** Shor's algorithm has been run only in compiled toy forms on numbers like $15$ and $21$ ([[quantum-computing/shor]]); no quantum computer has factored a number beyond the reach of a pocket calculator by Shor's method. No practical problem has been solved faster on a quantum computer than by the best classical methods, though quantum simulations of physical models are approaching that point.
- **Not established.** Topological qubits; any exponential speed-up for optimisation or machine learning on classical data; a timeline for cryptographically relevant machines.

::: history
Richard Feynman (1982) and David Deutsch (1985) proposed quantum computers; Peter Shor's 1994 algorithm made building one a goal. In 1995 Ignacio Cirac and Peter Zoller proposed the ion-trap quantum computer, and David Wineland's group at NIST demonstrated a two-qubit gate with trapped ions; Neil Gershenfeld and Isaac Chuang, and independently David Cory, Amr Fahmy and Timothy Havel, proposed liquid-state NMR quantum computing in 1997, used for the 2001 factoring of $15$. Yasunobu Nakamura, Yuri Pashkin and Jaw-Shen Tsai observed coherent oscillations of a superconducting qubit in 1999, and Robert Schoelkopf's group and colleagues introduced the transmon in 2007. David DiVincenzo published his criteria in 2000, and Emanuel Knill, Raymond Laflamme and Gerard Milburn their linear-optics scheme in 2001. Wineland and Serge Haroche received the 2012 Nobel Prize in Physics for methods of measuring and manipulating individual quantum systems. John Preskill coined "NISQ" in 2018. Google reported its Sycamore sampling experiment in 2019 and below-threshold surface-code memories on Willow in December 2024.
:::

## Where this leads

This is the last chapter of the course. The algorithms ([[quantum-computing/shor]], [[quantum-computing/grover]]) set the targets; error correction ([[quantum-computing/error-correction]]) says what is needed to reach them; and the complexity theory ([[quantum-computing/quantum-complexity]]) says what to expect and what not to. For the cryptographic consequences see [[cryptography/post-quantum]]; for the physics of the platforms, the quantum-mechanics courses of the [Physics Atlas](/learn/physics/lesson.php?c=quantum-1&l=formalism). Preskill's lecture notes and his 2018 NISQ paper are the best next reading for the physics-and-computing view, and Nielsen and Chuang remains the standard reference for everything in this course.

::: summary
- A useful quantum computer needs the **DiVincenzo criteria** ([[#def-divincenzo]]): scalable qubits, initialisation, coherence much longer than gates, universal gates and qubit-specific measurement.
- Platforms trade isolation against control: **superconducting** circuits (fast, planar, $\sim$0.1 ms coherence), **trapped ions** (highest fidelities, all-to-all connectivity, slow), **neutral atoms** (large reconfigurable arrays), **photons** (natural for communication, loss-limited) and others; none leads on every metric as of 2026.
- Without error correction, circuits are limited to about $1/\epsilon$ gates ([[#ex-gate-budget]]): the **NISQ** era of variational algorithms, error mitigation and simulation, with no proven practical advantage so far.
- The figure of merit for error correction is $\Lambda\approx p_{\mathrm{th}}/p$ ([[#eq-lambda]]); Google's Willow (2024) showed $\Lambda\approx2$ for surface-code memories up to distance $7$, the first clear below-threshold scaling.
- Resource estimates for RSA-2048 have fallen from about $20$ million (2019) to under a million (2025) noisy qubits; such machines do not yet exist, and their arrival date is uncertain.
- Treat qubit counts and advantage claims with care: what matters is logical qubits, logical error rates and the classical competition.
:::

## Exercises

::: exercise Gates per coherence time {level=1 check="2000"}
A qubit has $T_2 = 100$ µs and gates take $50$ ns. How many gate times fit within $T_2$? (Enter a number.)
::: solution
$100\times10^{-6}/(50\times10^{-9}) = 2000$, as in [[#ex-gate-budget]]. For a trapped ion with $T_2 = 1$ s and $100$ µs gates the ratio is $10^4$: slower gates, but more of them per coherence time.
:::
:::

::: exercise A NISQ circuit {level=1 check="0.999^5000"}
A circuit has $5000$ two-qubit gates, each failing independently with probability $10^{-3}$, and no other errors. What is the probability that it runs without any error? (Enter an exact expression or a decimal.)
::: solution
$(1 - 10^{-3})^{5000} = 0.999^{5000}\approx e^{-5}\approx 0.0067$. Error mitigation might still extract useful expectation values, but at a sampling cost that grows roughly like $e^{2\epsilon G} = e^{10}$ here.
:::
:::

::: exercise The DiVincenzo criteria in practice {level=1}
For each criterion of [[#def-divincenzo]], name a way in which superconducting qubits meet it and a difficulty they face.
::: solution
(1) Scalability: lithographic fabrication of many qubits on a chip; but wiring, refrigeration and fabrication variation limit growth. (2) Initialisation: cooling to $\sim$10 mK makes $\ket0$ the thermal state, and active reset with measurement speeds it up; residual excitation is a small error. (3) Coherence: $T_1, T_2\sim0.1$ ms against $\sim$50 ns gates; but two-level defects in materials cause fluctuations. (4) Universal gates: microwave single-qubit gates and tunable-coupler two-qubit gates; but cross-talk and leakage to the third level. (5) Measurement: dispersive readout through resonators in about a microsecond; but measurement is slower than gates and can disturb neighbours.
:::
:::

::: exercise Photon loss in fibre {level=1 check="0.01"}
Optical fibre attenuates light by about $0.2$ dB/km at telecom wavelengths. What fraction of photons survives $100$ km? (Enter a decimal.)
::: solution
$100\times0.2 = 20$ dB, a factor $10^{-20/10} = 10^{-2} = 0.01$. After $1000$ km it would be $10^{-20}$ — which is why long-distance quantum networks need repeaters (entanglement swapping, [[quantum-computing/entanglement]]) or satellites, since lost qubits cannot be amplified or copied.
:::
:::

::: exercise Measuring $\Lambda$ {level=2 check="2"}
A surface-code experiment measures logical errors per cycle of $0.8\%$, $0.4\%$ and $0.2\%$ at distances $3$, $5$ and $7$. What is $\Lambda$, and what does [[#eq-lambda]] predict for distance $11$? (Enter $\Lambda$.)
::: solution
$\Lambda = 0.8/0.4 = 0.4/0.2 = 2$. Distance $11$ is two further steps, so $0.2\%/4 = 0.05\%$ per cycle. By [[#eq-lambda]], $p\approx p_{\mathrm{th}}/2$: the device is a factor of two below threshold.
:::
:::

::: exercise Why so cold? {level=2 check="12"}
A transmon has transition frequency $f = 5$ GHz and sits at $T = 20$ mK. Compute $hf/(k_BT)$ to the nearest integer, and the thermal probability of finding the qubit excited, about $e^{-hf/k_BT}$. ($h = 6.626\times10^{-34}$ J s, $k_B = 1.381\times10^{-23}$ J/K.) (Enter the integer.)
::: solution
$hf = 6.626\times10^{-34}\times5\times10^9 = 3.31\times10^{-24}$ J and $k_BT = 1.381\times10^{-23}\times0.02 = 2.76\times10^{-25}$ J, so $hf/k_BT\approx12.0$, and the excited-state population is $e^{-12}\approx6\times10^{-6}$. At $T = 1$ K the ratio would be $0.24$ and the qubit would be nearly half excited: useless. (In practice the effective qubit temperature is often somewhat higher than the refrigerator's, giving residual populations around $10^{-3}$–$10^{-2}$ that active reset removes.)
:::
:::

::: exercise The quantum–classical crossover {level=2 check="(pi/4*10^4*10^-6*10^9)^2"}
In [[#ex-grover-practice]], find the crossover search-space size $N$ exactly in terms of the given numbers. (Enter an expression or a number.)
::: solution
Setting $N/10^9 = \frac\pi4\sqrt N\cdot10^4\cdot10^{-6}$ gives $\sqrt N = \frac\pi4\cdot10^4\cdot10^{-6}\cdot10^9$, so $N = (\frac\pi4\cdot10^{7})^2\approx6.17\times10^{13}$. A key search over $2^{46}\approx7\times10^{13}$ keys is at the crossover; a 128-bit key search is far beyond it in both cases, $2^{64}$ sequential Grover iterations taking about $6\times10^9$ years at these speeds.
:::
:::

::: exercise Where $\Lambda\approx p_{\mathrm{th}}/p$ comes from {level=3}
Derive [[#eq-lambda]] from the following picture: a distance-$d$ code fails in a cycle when at least $(d+1)/2$ faults occur along one of the "short" error chains that connect opposite boundaries, the number of such chains grows at most exponentially in $d$, and each location fails independently with probability $p$.
::: solution
A logical error requires an error chain of weight at least $t + 1 = (d+1)/2$ that the decoder mis-corrects. The probability of a particular set of $w$ locations all failing is $p^w$. Let the number of relevant sets of size $w = (d+1)/2$ be at most $N_d\le C\mu^{d}$ for constants $C$ and $\mu$ (chains on a lattice grow at most exponentially in length). Then $p_L(d)\lesssim C\mu^dp^{(d+1)/2} = C'(\mu^2p)^{(d+1)/2}$, which has the form $A(p/p_{\mathrm{th}})^{(d+1)/2}$ with $p_{\mathrm{th}} = 1/\mu^2$ — a threshold arising from the competition between the number of failure paths (entropy) and their probability (energy). Then $p_L(d)/p_L(d+2) = (p_{\mathrm{th}}/p)^{1} = \Lambda$. The argument also shows why the threshold depends on the noise model and the decoder: they determine which chains cause failures.
:::
:::

::: exercise Resource sensitivity {level=3}
Using the estimator of [[#ex-estimate]], find the distance needed at $p = 10^{-3}$ if the algorithm's length grows to $10^{12}$ cycles, and explain why the distance grows only logarithmically with the computation size.
::: solution
The target becomes $0.1/(2000\times10^{12}) = 5\times10^{-17}$. With $\Lambda = 10$, $p_L(d) = 0.1\cdot10^{-(d+1)/2}\le5\times10^{-17}$ requires $(d+1)/2\ge\log_{10}(2\times10^{15})\approx15.3$, so $(d + 1)/2 = 16$ and $d = 31$ (running `distance_needed(1e-3, 5e-17)` returns $31$), against $25$ before: $2\cdot31^2 - 1 = 1921$ physical qubits per logical instead of $1249$. A thousandfold longer computation increased the distance by $6$ and the qubit count by $54\%$, because $p_L$ falls exponentially in $d$, so $d$ only needs to grow like the logarithm of the computation size — the content of the threshold theorem ([[quantum-computing/error-correction#thm-threshold]]) in surface-code form.
:::
:::
