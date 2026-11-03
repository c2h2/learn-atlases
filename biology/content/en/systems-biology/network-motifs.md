The transcription network of *Escherichia coli* — which transcription factors regulate which genes — contains a few hundred regulators and thousands of interactions. Drawn on paper it looks like a tangle. Yet in 2002 Uri Alon's group found that it is built largely from a handful of small, recurring wiring patterns, each occurring far more often than chance would predict. The same patterns turned up in the networks of yeast, of plants and animals, and in neuronal wiring. Because evolution can easily lose or gain individual regulatory interactions — a few mutations in a promoter suffice — patterns that are preserved in great excess are candidates for **design principles**: circuits that do a particular job well.

This chapter treats transcription networks as directed graphs, defines **network motifs** statistically, and analyses the dynamics of the most important ones: the **feed-forward loop** in its coherent and incoherent forms, the **single-input module**, and **feedback loops**. It builds on the input functions, response times and autoregulation of [[systems-biology/gene-expression-dynamics]], whose notation we keep: a transcription factor X with activity $X^*$, production rates $\beta$, removal rate constants $\alpha$, and activation thresholds $K$. Graph-theoretic vocabulary (directed graphs, degree) is introduced in [graphs](/learn/maths/lesson.php?c=discrete&l=graphs) in Maths Atlas.

## Transcription networks as graphs

::: definition Transcription network {#def-network}
A **transcription network** is a directed graph whose nodes are genes (or operons) and whose edges $X \to Y$ mean that the protein product of X is a transcription factor that directly regulates the transcription of Y. Each edge carries a **sign** — activation ($+$, drawn $X \to Y$) or repression ($-$, drawn $X \dashv Y$) — and implicitly a threshold $K_{XY}$ and an input function. The **out-degree** of a node is the number of genes it regulates and its **in-degree** the number of regulators of its promoter.
:::

Transcription networks are maps of physical interactions, reconstructed from genetic experiments, binding assays (chromatin immunoprecipitation) and expression data, and curated in databases such as RegulonDB for *E. coli* and YEASTRACT for *Saccharomyces cerevisiae*. They are incomplete and contain errors, and most of their edges are known only qualitatively. Even so, their structure is informative.

Three statistical features stand out. Networks are **sparse**: the number of edges is of the same order as the number of nodes, far below the maximum $N^2$. The distribution of out-degrees is broad: most transcription factors regulate a few genes, while a few **global regulators** (CRP, FNR, IHF and ArcA in *E. coli*) regulate hundreds. In-degrees are narrow: a typical promoter has one to a few regulators. And the network contains many more copies of certain small subgraphs than a random graph with the same degrees would have.

### Motifs: patterns that occur more than chance

To decide whether a pattern is over-represented we need a null model — a way of making "random" networks that resemble the real one in its basic statistics but are otherwise unstructured.

::: definition Network motif {#def-motif}
A **network motif** is a small subgraph (a pattern of nodes and directed edges) that occurs in a real network significantly more often than in an ensemble of randomised networks. Over-representation is measured by the **z-score**

$$
z = \frac{N_\mathrm{real} - \langle N_\mathrm{rand}\rangle}{\sigma_\mathrm{rand}},
$$ {#eq-zscore}

where $N_\mathrm{real}$ is the number of occurrences in the real network and $\langle N_\mathrm{rand}\rangle$ and $\sigma_\mathrm{rand}$ are the mean and standard deviation over the random ensemble. The standard ensemble preserves every node's in-degree and out-degree, randomising only which nodes are connected.
:::

The simplest null model, the **Erdős–Rényi** random graph, places each of the $N^2$ possible directed edges independently with probability $p = E/N^2$, where $E$ is the number of edges. It gives quick estimates.

::: proposition Expected subgraph counts in a random graph {#prop-er}
In an Erdős–Rényi directed graph with $N$ nodes and $E$ edges ($p = E/N^2$, $N \gg 1$), the expected number of **self-edges** is $Np = E/N$, and the expected number of copies of a particular **three-node, three-edge pattern** such as the feed-forward loop is approximately $N^3p^3 = (E/N)^3 = \lambda^3$, where $\lambda = E/N$ is the mean number of edges per node. In general a pattern with $n$ nodes and $g$ edges is expected about $N^np^g = \lambda^gN^{n-g}$ times.
:::

::: proof
Each of the $N$ nodes carries a self-edge with probability $p$, giving $Np$. A feed-forward loop needs an ordered triple of distinct nodes $(X, Y, Z)$ — there are $N(N-1)(N-2) \approx N^3$ of them — with the three edges $X \to Y$, $Y \to Z$ and $X \to Z$ present, which happens with probability $p^3$ because edges are independent. So the expected count is about $N^3p^3$. The general case is the same argument with $N^n$ ordered choices of nodes and $g$ required edges. (Strictly, one should also count the absence of the other possible edges among the nodes, but with $p$ small this changes the estimate negligibly.)
:::

The striking consequence is that in a sparse network, patterns with as many edges as nodes ($g = n$: self-loops, feed-forward loops, and cycles) are expected only $\lambda^n$ times — a number of order one — **whatever the size of the network**. If a real network contains dozens of them, chance cannot explain it.

::: example How many feed-forward loops would chance produce? {#ex-er}
An illustrative transcription network has $N = 400$ genes and $E = 500$ regulatory interactions. How many self-edges and feed-forward loops would an Erdős–Rényi graph of this size contain? Suppose the real network contains 40 negatively autoregulated genes and 40 feed-forward loops.
::: solution
$\lambda = E/N = 1.25$. The expected number of self-edges is $E/N = 1.25$, with a standard deviation of about $\sqrt{1.25} \approx 1.1$ (the count is approximately Poisson). The expected number of feed-forward loops is $\lambda^3 = 1.95$, also with a Poisson-like standard deviation of about 1.4. Forty self-edges is then $(40 - 1.25)/1.1 \approx 35$ standard deviations above expectation, and forty feed-forward loops about 27 standard deviations. Numbers of this kind — tens of autoregulated genes and feed-forward loops in networks of a few hundred nodes — are what Shai Shen-Orr, Ron Milo, Shmoolik Mangan and Uri Alon reported for *E. coli* in 2002, with the more stringent degree-preserving null model of [[#def-motif]] confirming the excess.
:::
:::

The following program counts feed-forward loops in a small toy network and compares it with an ensemble of degree-preserving randomisations, in which pairs of edges $A \to B$, $C \to D$ are repeatedly swapped to $A \to D$, $C \to B$.

```python
import random

def count_ffl(edges):
    """Number of feed-forward loops X->Y, Y->Z, X->Z (X, Y, Z distinct)."""
    E = set(edges)
    out = {}
    for a, b in E:
        out.setdefault(a, set()).add(b)
    n = 0
    for x, ys in out.items():
        for y in ys:
            if y == x:
                continue
            for z in out.get(y, ()):
                if z not in (x, y) and z in ys:
                    n += 1
    return n

def rewire(edges, rng, swaps=10):
    """Degree-preserving randomisation: swap targets of random edge pairs."""
    E = list(edges)
    S = set(E)
    for _ in range(swaps * len(E)):
        i, j = rng.randrange(len(E)), rng.randrange(len(E))
        (a, b), (c, d) = E[i], E[j]
        if a == d or c == b or (a, d) in S or (c, b) in S:
            continue                      # would create a self-loop or duplicate
        S -= {(a, b), (c, d)}
        S |= {(a, d), (c, b)}
        E[i], E[j] = (a, d), (c, b)
    return E

# a toy network: 3 master regulators, each feeding forward onto 4 sub-regulators
edges = []
for m in range(3):                       # masters 0, 1, 2
    subs = [10 + 4*m + k for k in range(4)]
    for s in subs:
        edges.append((m, s))
        for t in range(3):               # each sub-regulator has 3 targets
            target = 100 + 12*m + 3*(s - subs[0]) + t
            edges.append((s, target))
            edges.append((m, target))    # the master also regulates the target
edges += [(100 + k, 200 + k) for k in range(20)]   # some unrelated edges

rng = random.Random(1)
real = count_ffl(edges)
rand = [count_ffl(rewire(edges, rng)) for _ in range(200)]
mean = sum(rand) / len(rand)
sd = (sum((r - mean)**2 for r in rand) / (len(rand) - 1)) ** 0.5
print(f"edges = {len(edges)}, FFLs in network = {real}")
print(f"random: mean = {mean:.1f}, sd = {sd:.1f}, z = {(real - mean)/sd:.1f}")
# edges = 104, FFLs in network = 36
# random: mean = 4.3, sd = 2.1, z = 15.1
```

Notice that the degree-preserving ensemble still contains some feed-forward loops (about four on average): when hubs regulate many genes, a few loops arise by chance. This is why the choice of null model matters, and why claims of over-representation should always state it.

::: warning "A motif is over-represented, so it must have a function"
Statistical over-representation is a clue, not a proof of function. Motifs can be enriched for non-adaptive reasons — for example, gene duplication copies a regulator together with its targets and so multiplies existing patterns, and the physical constraints of promoters may favour some arrangements. Results also depend on the null model: Yael Artzy-Randrup and colleagues showed in 2004 that some patterns judged significant against one randomisation were not against another. The case for a motif's function rests on what follows in this chapter: a mathematical analysis that predicts a specific dynamical behaviour, and experiments in living cells that test it.
:::

## The feed-forward loop

::: definition Feed-forward loop {#def-ffl}
A **feed-forward loop** (FFL) consists of a transcription factor X that regulates a second transcription factor Y, with both X and Y regulating a target gene Z. Each of the three edges can be activating or repressing, giving eight types. The FFL is **coherent** if the sign of the direct path $X \to Z$ equals the overall sign of the indirect path $X \to Y \to Z$ (the product of its two signs), and **incoherent** if they are opposite. The two inputs to Z are combined by an input function, typically AND-like or OR-like.
:::

Of the eight types, two dominate the transcription networks of *E. coli* and yeast: the **type-1 coherent FFL** (C1-FFL), in which all three edges are activating, and the **type-1 incoherent FFL** (I1-FFL), in which X activates Y and Z but Y represses Z. We analyse both in the logic approximation of [[systems-biology/gene-expression-dynamics]], treating each input function as a step at its threshold. Each transcription factor is active only in the presence of its signal: X becomes active ($X^*$) when its inducer $S_x$ appears, and similarly for Y with $S_y$; for simplicity we suppose $S_y$ is always present.

### The coherent FFL with AND logic: a sign-sensitive delay

In the C1-FFL with an AND gate, Z is transcribed only when both $X^*$ and $Y^*$ are above their thresholds. When $S_x$ appears at $t = 0$, X becomes active at once and Y begins to be made. Z must wait until Y accumulates past the threshold $K_{YZ}$.

::: proposition Delay in the C1-FFL with AND logic {#prop-c1-delay}
In the logic approximation, after an ON step of $S_x$ the target Z of an AND-gated C1-FFL starts to be produced after a delay

$$
T_\mathrm{on} = \frac{1}{\alpha_Y}\ln\frac{1}{1 - K_{YZ}/Y_\mathrm{st}},
$$ {#eq-ffl-delay}

where $\alpha_Y$ is the removal rate constant of Y and $Y_\mathrm{st} = \beta_Y/\alpha_Y$ its steady state. After an OFF step of $S_x$, Z production stops at once, with no delay. Consequently, **pulses of $S_x$ shorter than about $T_\mathrm{on}$ do not activate Z.** **Assumptions:** step-like input functions, $X^*$ responds instantly to $S_x$, $K_{YZ} < Y_\mathrm{st}$.
:::

::: proof
After the ON step, Y obeys $dY/dt = \beta_Y - \alpha_Y Y$ from $Y = 0$, so $Y(t) = Y_\mathrm{st}(1 - e^{-\alpha_Y t})$. Z is produced only when $Y > K_{YZ}$; solving $Y_\mathrm{st}(1 - e^{-\alpha_Y T}) = K_{YZ}$ gives [[#eq-ffl-delay]]. After an OFF step $X^*$ vanishes, the AND gate closes immediately, and Z production stops whatever the level of Y. If the pulse of $S_x$ ends before $T_\mathrm{on}$, Y never reached $K_{YZ}$, and Z was never produced.
:::

The C1-FFL with AND logic therefore acts as a **persistence detector**: it ignores brief, possibly spurious, signals but responds to sustained ones, and it shuts off immediately when the signal goes. The delay is tunable through the threshold $K_{YZ}$ and the stability of Y. Simple regulation by X alone has no such filtering: Z would begin to be made the moment X became active.

::: widget plot
f: 1 - exp(-a*x); max(0, 1 - exp(-(x - ln(1/(1 - K))/a))); 1 - exp(-x)
x: 0, 6
y: 0, 1.05
sliders: a=1:0.3:3:0.05; K=0.5:0.05:0.95:0.01
labels: Y/Y_\mathrm{st}; Z\ \text{(C1-FFL, AND)}; Z\ \text{(simple regulation by X)}
caption: Response to an ON step of the signal at $t = 0$, with time in units of $1/\alpha_Z$ and each protein as a fraction of its steady state. Y (blue) rises with rate $a = \alpha_Y/\alpha_Z$; the target Z of the coherent feed-forward loop (orange) starts only once Y crosses the threshold $K = K_{YZ}/Y_\mathrm{st}$, after the delay of [[#eq-ffl-delay]]; the third curve is Z under simple regulation by X alone. Raise $K$ or lower $a$ to lengthen the delay. Any signal pulse shorter than the delay would leave Z at zero.
:::

::: example Designing a persistence detector {#ex-c1}
In cells dividing every 60 min, Y is a stable protein and its activation threshold for Z is $K_{YZ} = 0.3\,Y_\mathrm{st}$. (a) What is the delay $T_\mathrm{on}$? (b) What threshold would give a delay of 60 min?
::: solution
(a) $\alpha_Y = \ln2/60 = 0.01155$ min⁻¹, so $T_\mathrm{on} = \ln(1/0.7)/0.01155 = 0.357/0.01155 = 31$ min. Pulses of the signal shorter than about half an hour are filtered out.

(b) We need $\ln(1/(1 - k)) = 0.01155\times60 = \ln2$, so $1 - k = 1/2$ and $k = K_{YZ}/Y_\mathrm{st} = 0.5$. In general, a threshold at half the steady state gives a delay of one response time of Y, i.e. one cell cycle for a stable Y. Delays much longer than a cell cycle need thresholds very close to $Y_\mathrm{st}$, which makes them sensitive to fluctuations in Y.
:::
:::

The prediction was tested in the **arabinose** utilisation system of *E. coli* (Shmoolik Mangan, Alon Zaslaver and Uri Alon, 2003). Here X is CRP, which is active when bound to cAMP (a signal of glucose starvation), Y is AraC, active in the presence of arabinose, and Z is the *araBAD* operon encoding the arabinose-catabolic enzymes; CRP activates *araC*, and both CRP and AraC are needed for *araBAD* transcription. When cAMP was added in the presence of arabinose, *araBAD* expression began only after a delay of some tens of minutes relative to a promoter regulated by CRP alone, whereas removing cAMP shut both off without delay — the sign-sensitive delay predicted by [[#prop-c1-delay]]. A plausible function: cAMP levels fluctuate briefly as cells shift between nutrients, and building the arabinose machinery is worthwhile only if glucose is genuinely gone.

With **OR** logic instead of AND, the roles of the ON and OFF steps are reversed: Z switches on immediately (X alone suffices) but, when $S_x$ is removed, stays on until Y has decayed below its threshold. Such a C1-FFL protects against brief *losses* of signal. Shiraz Kalir, Shmoolik Mangan and Uri Alon (2005) found exactly this behaviour in the *E. coli* flagellar system, where the master regulator FlhDC activates the sigma factor FliA, and both activate the late flagellar genes with an OR-like (summed) input function: flagellar gene expression continued for a measurable delay after FlhDC activity fell, so that a brief interruption of the signal did not abort the costly construction of flagella.

### The incoherent FFL: pulses and acceleration

In the I1-FFL, X activates Z directly and also activates Y, which represses Z. After an ON step, Z is at first produced at its full rate $\beta_Z$; once Y has accumulated past its repression threshold $K_{YZ}$, Z production falls to a lower rate $\beta_Z'$. Write $F = \beta_Z/\beta_Z'$ for the **repression factor**.

::: proposition Dynamics of the I1-FFL {#prop-i1}
In the logic approximation, after an ON step at $t = 0$ the target Z of an I1-FFL rises as in simple regulation, $Z(t) = (\beta_Z/\alpha_Z)(1 - e^{-\alpha_Z t})$, until Y crosses its threshold at the time $T_\mathrm{rep}$ given by [[#eq-ffl-delay]]; thereafter it relaxes towards the lower steady state $Z_\mathrm{st} = \beta_Z'/\alpha_Z$. If $Z(T_\mathrm{rep}) > Z_\mathrm{st}$, Z shows a **pulse**. Provided repression starts after Z has passed $Z_\mathrm{st}/2$, the response time — the time to reach half of the final steady state — is

$$
T_{1/2}^\mathrm{I1} = \frac{1}{\alpha_Z}\ln\frac{1}{1 - 1/(2F)},
$$ {#eq-i1-speed}

shorter than the $\ln 2/\alpha_Z$ of a simply regulated gene with the same steady state.
:::

::: proof
Before repression begins, Z obeys $dZ/dt = \beta_Z - \alpha_ZZ$. The final steady state is $\beta_Z'/\alpha_Z = (\beta_Z/\alpha_Z)/F$, and half of it is reached when $(\beta_Z/\alpha_Z)(1 - e^{-\alpha_Z t}) = (\beta_Z/\alpha_Z)/(2F)$, i.e. $1 - e^{-\alpha_Z t} = 1/(2F)$, which gives [[#eq-i1-speed]] provided this happens before $T_\mathrm{rep}$. After $T_\mathrm{rep}$ the production rate is $\beta_Z'$, and Z relaxes exponentially from $Z(T_\mathrm{rep})$ to $\beta_Z'/\alpha_Z$ — downwards, producing a pulse, if $Z(T_\mathrm{rep})$ is above it.
:::

The I1-FFL thus achieves the same trick as negative autoregulation — a strong initial drive followed by braking — but for a target gene that need not be a transcription factor itself, and with the brake applied by a separate repressor. For strong repression, $F = 5$, [[#eq-i1-speed]] gives $T_{1/2} = \ln(1/0.9)/\alpha_Z = 0.105/\alpha_Z$, more than six times faster than simple regulation. The **galactose** system of *E. coli* is an example: CRP activates both *galS* and the *galETK* operon, and the repressor GalS represses *galETK*; Mangan and colleagues showed in 2006 that the *gal* genes respond several times faster when the I1-FFL is intact than when the GalS edge is removed.

::: widget plot
f: if(x < ln(1/(1 - K))/a, 1 - exp(-x), (1 - exp(-ln(1/(1 - K))/a))*exp(-(x - ln(1/(1 - K))/a)) + (1 - exp(-(x - ln(1/(1 - K))/a)))/F); (1 - exp(-x))/F
x: 0, 6
y: 0, 1.05
sliders: F=5:1:10:0.5; K=0.5:0.05:0.95:0.01; a=1:0.3:3:0.05
labels: Z\ \text{(I1-FFL)}; Z\ \text{(simple, same steady state)}
caption: Response of the target Z to an ON step, with time in units of $1/\alpha_Z$ and Z in units of its unrepressed steady state $\beta_Z/\alpha_Z$. In the incoherent feed-forward loop (blue) Z rises at the full rate until the repressor Y crosses its threshold, then falls to the repressed steady state $1/F$ — a pulse. The second curve is a simply regulated gene with the same final level, which takes $\ln 2$ time units to get halfway. Lower $K$ or raise $a$ so that repression arrives earlier: the pulse shrinks but the response stays fast. With $F = 1$ (no repression) the motif does nothing.
:::

::: example Acceleration by an incoherent FFL {#ex-i1}
A target gene is regulated by an I1-FFL with repression factor $F = 4$. Its protein is stable in cells dividing every 90 min. (a) What is its response time? (b) For comparison, what response time would simple regulation give? (c) What is the peak of the pulse if repression starts at $T_\mathrm{rep} = 45$ min?
::: solution
$\alpha_Z = \ln2/90 = 0.0077$ min⁻¹.

(a) $T_{1/2} = \ln(1/(1 - 1/8))/0.0077 = 0.1335/0.0077 = 17$ min. (Check the proviso: repression must start after 17 min, which holds in part (c).)

(b) $\ln2/\alpha_Z = 90$ min, more than five times slower.

(c) At $T_\mathrm{rep} = 45$ min, $Z = (\beta_Z/\alpha_Z)(1 - e^{-0.0077\times45}) = 0.29\,\beta_Z/\alpha_Z$, while the final steady state is $0.25\,\beta_Z/\alpha_Z$. The pulse overshoots by about 17 %. With earlier repression the overshoot disappears; with later repression it grows.
:::
:::

Incoherent feed-forward loops have further capabilities beyond acceleration. With suitable parameters, the amplitude of the pulse depends on the *fold change* in the input signal rather than its absolute level — Lea Goentoro, Oren Shoval, Marc Kirschner and Uri Alon proposed in 2009 that this **fold-change detection** helps cells respond reliably to signals whose baseline varies from cell to cell, as in the Wnt pathway, where the fold change in β-catenin is more consistent across cells than its absolute level. In signal transduction, incoherent feed-forward loops are a common route to **adaptation**, a theme of [[systems-biology/signalling-robustness]].

::: quiz
In a type-1 coherent FFL with an OR input function, what happens when the input signal $S_x$ is suddenly removed after a long exposure?
- [ ] Z stops being produced immediately
- [x] Z continues to be produced until Y decays below its threshold, then stops
- [ ] Z is produced in a pulse and then stops
- [ ] Nothing — the OR gate keeps Z on permanently
::: solution
With OR logic, either X or Y suffices to activate Z. When $S_x$ is removed, $X^*$ vanishes at once, but Y, which had accumulated, takes time to be diluted or degraded below $K_{YZ}$; until then it keeps Z on. This is the delay after an OFF step that protects the flagellar program against brief signal losses. With AND logic, by contrast, Z stops immediately.
:::
:::

## Single-input modules and temporal programs

::: definition Single-input module {#def-sim}
A **single-input module** (SIM) is a set of genes all regulated by one transcription factor X and by no other transcription factor in the set; usually X also regulates itself (often negatively).
:::

SIMs control groups of genes that act together — the enzymes of one biosynthetic pathway, the components of a molecular machine. Their dynamical function arises from differences in **thresholds**. When X activity rises gradually, each target $Z_i$ turns on when $X^*$ crosses its threshold $K_i$: genes with low thresholds first, those with high thresholds later. When X activity falls, the order reverses — last in, first out. A single regulator thereby generates a **temporal program** of expression without any additional wiring.

Alon Zaslaver and colleagues (2004) measured promoter activities in the **arginine** biosynthesis pathway of *E. coli*, whose enzyme genes are all repressed by the repressor ArgR. When arginine was removed, the promoters switched on in a sequence spaced by a few minutes, and the order largely matched the order of the enzymes in the pathway — a "just-in-time" program in which each enzyme appears roughly when it is needed. Similar ordering appears in the assembly of flagella, where the genes for the basal body, hook and filament are expressed in the order of construction.

::: example Timing of a single-input module {#ex-sim}
In a SIM, the activity of X rises after a signal as $X^*(t) = X_\mathrm{st}(1 - e^{-t/\tau})$ with $\tau = 20$ min. Three target genes have activation thresholds $K_1 = 0.2X_\mathrm{st}$, $K_2 = 0.4X_\mathrm{st}$ and $K_3 = 0.6X_\mathrm{st}$. At what times do they switch on, and what are the intervals between them?
::: solution
Gene $i$ switches on at $t_i = \tau\ln\bigl(1/(1 - K_i/X_\mathrm{st})\bigr)$: $t_1 = 20\ln(1/0.8) = 4.5$ min, $t_2 = 20\ln(1/0.6) = 10.2$ min, $t_3 = 20\ln(1/0.4) = 18.3$ min. The intervals, 5.7 and 8.1 min, lengthen because X approaches its plateau ever more slowly; evenly spaced thresholds do not give evenly spaced times. A threshold above $X_\mathrm{st}$ would never be reached, and that gene would stay off.
:::
:::

## Feedback loops

Feed-forward loops and single-input modules contain no cycles. Cycles — **feedback loops** — are rarer in bacterial transcription networks, apart from autoregulation, perhaps because transcriptional feedback is slow (a cycle through two transcription factors takes at least two response times). They are common, however, in developmental networks and in **mixed networks** combining transcriptional regulation with fast protein interactions. The sign of a feedback loop — the product of the signs of its edges — determines its character.

- **Positive feedback** loops (all activating, or containing an even number of repressions) reinforce deviations. The two-gene **double-negative** loop, in which X and Y repress each other, and the **double-positive** loop, in which they activate each other, can make a system **bistable**: it locks into one of two states and stays there after the signal is gone. Such loops implement irreversible decisions in development — a cell committing to one fate and shutting off the other — and the genetic memory devices of synthetic biology.
- **Negative feedback** loops (an odd number of repressions) oppose deviations. A short, fast loop stabilises a level, as negative autoregulation does; a long or delayed loop overshoots and can **oscillate**. Combining a fast transcriptional or post-translational negative loop with slow steps underlies the cell cycle, the circadian clock and the oscillations of the p53 and NF-κB signalling systems.

Whether a feedback loop actually produces bistability or oscillations depends on its parameters — the cooperativity of its input functions, the balance of production and removal, the delay around the loop. The analysis requires the phase-plane methods of [[systems-biology/switches-oscillators]].

::: intuition Motifs as filters and amplifiers
It helps to think of motifs as electronic components. Negative autoregulation is a fast-settling, stabilised amplifier. The AND-gated coherent FFL is a low-pass filter for ON signals — it ignores high-frequency flicker. The incoherent FFL is a differentiator: it responds to *changes* in input and then adapts back. A single-input module is a sequencer, and positive feedback is a latch. The analogy is imperfect — biological components are noisy, slow and leaky — but it captures why a small library of motifs can be combined into networks that compute.
:::

::: application Motifs in synthetic biology
Synthetic biologists have built most of these motifs from well-characterised parts — repressors such as LacI, TetR and the phage λ repressor cI, with their promoters — to test the theory and to make useful devices. Synthetic incoherent FFLs have been used to make gene expression insensitive to gene copy number, a long-standing problem when circuits are moved between plasmids or chromosomal sites, and to build band-pass filters that respond only to an intermediate range of inducer concentration. Engineered motifs also appear in prototype cell therapies and biosensors. The design and its biosafety framework are treated in [[biotechnology/synthetic-biology]].
:::

::: history
The idea that complex networks are built from recurring subcircuits came from Uri Alon's group at the Weizmann Institute. Shai Shen-Orr, Ron Milo, Shmoolik Mangan and Alon reported in *Nature Genetics* in 2002 that the transcription network of *E. coli*, compiled largely from RegulonDB, was dominated by three motifs — the feed-forward loop, the single-input module and dense overlapping regulons — and Milo and colleagues showed in *Science* the same year that motifs are found in networks as different as food webs, neuronal connectivity in *Caenorhabditis elegans* and electronic circuits, each type of network with its own characteristic set. A series of experimental papers from the same group (2003–2005) then tested the predicted functions of the C1-FFL and I1-FFL in the arabinose, galactose and flagellar systems. Similar motifs were found in the transcription network of budding yeast by Tong Ihn Lee, Richard Young and colleagues in 2002, using genome-wide chromatin immunoprecipitation.
:::

::: summary
- A transcription network is a sparse directed graph with signed edges; out-degrees are broad (a few global regulators), in-degrees narrow.
- Network motifs are subgraphs over-represented relative to randomised networks (usually degree-preserving), measured by a z-score; in a sparse random graph, patterns with as many edges as nodes are expected only $\lambda^n$ times, $\lambda = E/N$.
- Over-representation suggests but does not prove function; the case rests on dynamical analysis and experiments.
- The C1-FFL with AND logic is a sign-sensitive delay: Z turns on after $T_\mathrm{on} = \alpha_Y^{-1}\ln[1/(1 - K_{YZ}/Y_\mathrm{st})]$ and off at once, filtering brief ON pulses (arabinose system). With OR logic the delay is at the OFF step (flagella).
- The I1-FFL produces pulses and accelerates responses, with $T_{1/2} = \alpha_Z^{-1}\ln[1/(1 - 1/(2F))]$ (galactose system); it can also detect fold changes.
- Single-input modules create temporal programs through ordered thresholds (last in, first out).
- Positive feedback loops can make bistable memories; negative feedback loops stabilise or, with delays, oscillate.
:::

## Exercises

::: exercise Expected self-edges {level=1 check="2"}
A random directed network has 300 nodes and 600 edges. How many self-edges are expected?
::: solution
$E/N = 600/300 = 2$.
:::
:::

::: exercise Counting FFL types {level=1}
Write down the eight types of feed-forward loop by the signs of the edges $(X\to Y, Y\to Z, X\to Z)$, and classify each as coherent or incoherent.
::: solution
The FFL is coherent when the sign of $X\to Z$ equals (sign of $X\to Y$) × (sign of $Y\to Z$). Coherent: $(+,+,+)$, $(-,-,+)$, $(+,-,-)$, $(-,+,-)$. Incoherent: $(+,-,+)$, $(-,+,+)$, $(+,+,-)$, $(-,-,-)$. The type-1 coherent loop is $(+,+,+)$ and the type-1 incoherent loop $(+,-,+)$.
:::
:::

::: exercise A z-score {level=1 check="12"}
A motif occurs 50 times in a real network. In 1,000 degree-preserving randomisations it occurs on average 14 times with standard deviation 3. What is its z-score?
::: solution
$z = (50 - 14)/3 = 12$.
:::
:::

::: exercise Delay of a coherent FFL {level=2 check="46"}
In an AND-gated C1-FFL, Y is stable in cells dividing every 40 min and its threshold for activating Z is $0.55\,Y_\mathrm{st}$. What is the delay $T_\mathrm{on}$, to the nearest minute? How would the delay change if the threshold were $0.8\,Y_\mathrm{st}$?
::: solution
$\alpha_Y = \ln2/40 = 0.01733$ min⁻¹, and $1 - K_{YZ}/Y_\mathrm{st} = 0.45$, so $T_\mathrm{on} = \ln(1/0.45)/0.01733 = 0.799/0.01733 = 46$ min. With a threshold of $0.8\,Y_\mathrm{st}$, $T_\mathrm{on} = \ln5/0.01733 = 93$ min, more than two cell cycles: the delay grows steeply as the threshold approaches the steady state.
:::
:::

::: exercise Persistence detection with pulses {level=2}
In the arabinose C1-FFL, suppose cAMP pulses of 10, 20 and 40 min occur, and $T_\mathrm{on} = 25$ min. Which pulses produce *araBAD* expression, and for how long? What would happen if the cell were exposed to a train of 20-min pulses separated by 5-min gaps, assuming AraC decays only slowly?
::: solution
Only the 40-min pulse exceeds $T_\mathrm{on}$; it produces *araBAD* expression for the last $40 - 25 = 15$ min, which stops as soon as cAMP falls. The 10- and 20-min pulses produce none. With 20-min pulses and 5-min gaps, AraC accumulates during each pulse and decays only a little in each gap (during which the AND gate is closed anyway, since CRP is inactive), so it ratchets upwards. Once AraC has crossed its threshold — part-way through the second pulse — every subsequent pulse produces *araBAD* expression for its whole duration. The filter rejects isolated brief pulses but not frequent ones: it measures the persistence of the signal integrated over the lifetime of Y.
:::
:::

::: exercise Pulse or no pulse {level=2}
For an I1-FFL with $F = 3$, at what minimum value of $\alpha_Z T_\mathrm{rep}$ (the time at which repression begins, in units of the response time scale of Z) does Z overshoot its final steady state?
::: solution
Overshoot occurs if $Z(T_\mathrm{rep}) > Z_\mathrm{st}$, i.e. $1 - e^{-\alpha_ZT_\mathrm{rep}} > 1/F = 1/3$. So $e^{-\alpha_ZT_\mathrm{rep}} < 2/3$, $\alpha_ZT_\mathrm{rep} > \ln1.5 = 0.405$. If repression begins later than $0.405/\alpha_Z$, Z shows a pulse; earlier, Z rises monotonically to its steady state.
:::
:::

::: exercise Interpreting a knock-out {level=2}
A gene Z is activated by X and by Y, which is itself activated by X. When the *Y* gene is deleted, the steady-state level of Z in the presence of the signal falls to 30 %, and Z now turns on immediately after the signal appears instead of after a 20-min delay. What input function at the Z promoter and what FFL type are consistent with this, and what does the result predict for the wild type's response to a 10-min pulse of signal?
::: solution
In the wild type Z needs Y (it turns on only after Y has had time to accumulate), so the loop is a type-1 coherent FFL. In the deletion, Z is still expressed at 30 % from X alone, so the input function is not a strict AND gate but AND-like with some activity from X alone — a mixed or "leaky AND" function, in which full expression needs both inputs. In the wild type, a 10-min pulse would therefore produce only the small X-alone level of expression (Y never reaches its threshold), rather than nothing — the filter is imperfect, attenuating brief pulses to about 30 % rather than eliminating them.
:::
:::

::: exercise Why are long transcriptional cycles rare? {level=3}
Bacterial transcription networks contain many feed-forward loops but few feedback cycles through two or more transcription factors. Give a dynamical argument, using response times, for why such cycles would be slow, and explain why cycles are more common in networks that mix transcription with protein phosphorylation.
::: solution
A transcriptional edge transmits a change on the time scale of the target's response time, which for stable proteins is about one cell cycle (tens of minutes to hours). A feedback cycle through two transcription factors must traverse two such edges, so the earliest the loop can respond to its own output is a couple of cell cycles — too slow to regulate most physiological variables, though adequate for slow processes such as developmental commitments. It would also be prone to oscillation if negative, because the delay is comparable to the time scale of the variables it controls. Phosphorylation, binding and degradation act in seconds to minutes, so feedback loops containing protein-level edges can operate fast — hence their abundance in signalling, metabolism and the cell cycle. Self-loops are an exception: negative autoregulation acts within one response time, and it is the most common motif of all.
:::
:::

::: exercise Degree preservation matters {level=3}
Explain why a network with a few hub regulators, each regulating many genes, can contain many feed-forward loops in a degree-preserving randomisation even though an Erdős–Rényi graph with the same $N$ and $E$ has almost none. Use the code above (or reason qualitatively) to say how the z-score of a real network would change if it were computed against an Erdős–Rényi ensemble instead.
::: solution
An FFL needs one node with two outputs (X), one with one input and one output (Y) and one with two inputs (Z). If hubs have large out-degree and their targets include other transcription factors, then by chance a hub X will often regulate both a transcription factor Y and one of Y's targets: the number of such coincidences grows roughly with the sum over nodes of (out-degree)² — a quantity that is large when degrees are broad, even with the same total number of edges. The Erdős–Rényi graph has a narrow (Poisson) degree distribution and so very few. Computed against an Erdős–Rényi ensemble, the expected count would be much smaller (about $\lambda^3$), so the z-score would be inflated; motifs might appear significant merely because the network has hubs. The degree-preserving ensemble controls for this, which is why it is the standard.
:::
:::
