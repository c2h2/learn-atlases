One particle in a given force field is an initial-value problem of the kind solved in [[computation/integrating-motion]]. Two particles reduce to one by the centre-of-mass trick. Three or more do not reduce, and once there are thirty, or a hundred, or a hundred thousand, nobody expects a formula. What remains is to integrate Newton's equations for all of them at once and to ask what the numbers mean. That is **molecular dynamics** when the particles are atoms and an **$N$-body simulation** when they are stars. The two fields share an integrator, a cost problem and a set of habits.

The force on each particle is a sum over all the others, and evaluating that sum is almost the whole cost. We start with gravity, where every pair interacts, and show how softening, a symplectic step and a tree keep the cost and the energy under control. Then we turn to a liquid of Lennard-Jones atoms in a periodic box, and from a run of $108$ argon-like atoms read off a temperature, a pressure and the radial distribution function, each with an error bar.

The integrator is velocity Verlet, [[computation/integrating-motion#alg-verlet]], applied to every particle. The statistical meaning of a time average is the subject of [[statistical-mechanics/canonical]] and [[statistical-mechanics/classical-gas]]. Error bars for correlated data were introduced in [[computation/random-sampling#ex-metro]]. Every number below was produced by a program run for this page, under CPython 3.14 with only the standard library; the two main programs are printed in full. Random numbers come from `random.Random(seed)`, and the seed is stated each time.

## Many bodies, one force law {#direct}

::: definition The classical $N$-body problem {#def-nbody}
Given $N$ point particles with masses $m_i$, positions $\mathbf r_i$ and velocities $\mathbf v_i$, interacting through a pair potential $u(r)$ that depends only on separation, the **$N$-body problem** is the initial-value problem

$$
m_i \ddot{\mathbf r}_i = \sum_{j \neq i} \mathbf F_{ij}, \qquad \mathbf F_{ij} = -u'(r_{ij})\,\frac{\mathbf r_{ij}}{r_{ij}}, \qquad \mathbf r_{ij} = \mathbf r_i - \mathbf r_j,
$$ {#eq-nbody}

for $i = 1, \dots, N$. The total energy is $E = \sum_i \frac12 m_i v_i^2 + \sum_{i<j} u(r_{ij})$.
:::

The force $\mathbf F_{ij}$ is the force on $i$ due to $j$. Newton's third law, $\mathbf F_{ji} = -\mathbf F_{ij}$, is built into the formula, because exchanging $i$ and $j$ reverses $\mathbf r_{ij}$. A program should exploit that: compute each pair once and add the force to one particle and subtract it from the other. There are $N(N-1)/2$ pairs, so the cost of one force evaluation by **direct summation** grows like $N^2$.

::: proposition Exact momentum conservation {#prop-momentum}
If the forces of [[#eq-nbody]] are accumulated pair by pair with $\mathbf F_{ji} = -\mathbf F_{ij}$, then one velocity-Verlet step changes the total momentum $\mathbf P = \sum_i m_i \mathbf v_i$ by zero, apart from rounding.
::: proof
The velocity-Verlet step changes each velocity twice, by $\frac{h}{2m_i}\sum_j \mathbf F_{ij}$ evaluated at the old positions and by the same expression at the new positions. The change in $\mathbf P$ from one such kick is

$$
\frac{h}{2}\sum_i \sum_{j \neq i} \mathbf F_{ij} = \frac{h}{2}\sum_{i<j}\bigl(\mathbf F_{ij} + \mathbf F_{ji}\bigr) = \mathbf 0.
$$

The position update does not change any velocity. Both kicks therefore leave $\mathbf P$ unchanged. The argument uses only the antisymmetry of the pair forces, so it holds for any pair potential, with or without the periodic images introduced later, as long as the same separation vector is used for both members of a pair.
:::
:::

The energy is a different matter. Verlet does not conserve it exactly, but it keeps it in a band whose width shrinks as $h^2$, as on the single oscillator. Momentum and energy are the two diagnostics of every run in this chapter.

::: example What direct summation costs {#ex-cost}
The function `accel` in the next section computes all pair forces for a cluster. Timing three calls of it on one machine gave

| $N$ | pairs $N(N-1)/2$ | seconds per evaluation |
| --- | --- | --- |
| $64$ | $2016$ | $0.0025$ |
| $128$ | $8128$ | $0.0098$ |
| $256$ | $32640$ | $0.0388$ |
| $512$ | $130816$ | $0.1591$ |

Estimate the time for $N = 10^5$, and for $1000$ steps of a run at $N = 512$.
::: solution
Each doubling of $N$ multiplied the time by $3.9$, $4.0$ and $4.1$, the factor $2^2$ expected from $N^2$ pairs. The time per pair is about $0.1591/130816 = 1.2 \times 10^{-6}$ s. For $N = 10^5$ there are $5.0 \times 10^9$ pairs, so one evaluation would take about $6 \times 10^3$ s, nearly two hours. At $N = 512$, a thousand steps cost about $160$ s. The absolute numbers belong to the machine and the language. The ratio $4$ per doubling does not.
:::
:::

## Gravity and softening {#gravity}

For gravity $u(r) = -Gm_im_j/r$, and the force grows without bound as two bodies approach. A close encounter would demand a time step far shorter than the one that suits everyone else. Collisionless simulations, of galaxies or dark matter, do not try to follow such encounters: their particles sample a smooth mass distribution. The standard remedy is to blunt the potential at short distance.

::: definition Plummer softening {#def-softening}
The **softened** gravitational pair potential with softening length $\varepsilon > 0$ is

$$
u_\varepsilon(r) = -\frac{G m_i m_j}{\sqrt{r^2 + \varepsilon^2}},
\qquad
\mathbf F_{ij} = -\frac{G m_i m_j\,\mathbf r_{ij}}{\bigl(r_{ij}^2 + \varepsilon^2\bigr)^{3/2}}.
$$ {#eq-soft}

For $r \gg \varepsilon$ it is Newtonian gravity. At $r = 0$ it is finite, and the force vanishes.
:::

The softened force is what the program integrates, so the softened energy is the one it should conserve. It is a different, smoother model, which differs from Newtonian gravity on scales below $\varepsilon$.

::: widget plot
f: -1/x; -1/sqrt(x^2 + e^2)
x: 0.01, 2
y: -12, 0
sliders: e=0.1:0.01:0.5:0.01
labels: Newtonian −1/r; softened −1/√(r² + ε²)
caption: The Newtonian potential and the Plummer-softened one, with $G m_i m_j = 1$. Drag $\varepsilon$. For $r$ greater than a few $\varepsilon$ the curves coincide; inside, the softened well has a flat bottom at $-1/\varepsilon$. The slope at the bottom, which is the force, goes to zero, so a close pair no longer forces a tiny time step.
:::

The listing below builds a cluster of $32$ equal masses, total mass $1$, placed uniformly in the unit ball with Gaussian velocities of standard deviation $0.3$ per component, all from `random.Random(1)`. Units have $G = 1$. It integrates to $t = 10$, which is about five crossing times $\sim(G\rho)^{-1/2} \approx 2$, with forward Euler and with velocity Verlet, and prints the largest relative energy error seen during the run.

```python
import math, random

def accel(pos, m, eps2):                      # direct sum over pairs, G = 1
    n = len(pos); acc = [[0.0]*3 for _ in range(n)]; pot = 0.0
    for i in range(n):
        for j in range(i + 1, n):
            d = [pos[j][k] - pos[i][k] for k in range(3)]
            r2 = d[0]*d[0] + d[1]*d[1] + d[2]*d[2] + eps2
            inv = 1/math.sqrt(r2); inv3 = inv/r2
            pot -= m[i]*m[j]*inv
            for k in range(3):
                acc[i][k] += m[j]*d[k]*inv3; acc[j][k] -= m[i]*d[k]*inv3
    return acc, pot

def kinetic(vel, m):
    return 0.5*sum(mi*(v[0]**2 + v[1]**2 + v[2]**2) for mi, v in zip(m, vel))

def cluster(n, seed):
    rng = random.Random(seed); pos = []
    while len(pos) < n:                       # uniform in the unit ball
        p = [rng.uniform(-1, 1) for _ in range(3)]
        if sum(c*c for c in p) < 1: pos.append(p)
    vel = [[rng.gauss(0, 0.3) for _ in range(3)] for _ in range(n)]
    for k in range(3):                        # centre of mass at rest
        vc = sum(v[k] for v in vel)/n
        for v in vel: v[k] -= vc
    return pos, vel, [1/n]*n

def run(method, h, n=32, T=10, eps=0.05, seed=1):
    pos, vel, m = cluster(n, seed); eps2 = eps*eps
    acc, pot = accel(pos, m, eps2); E0 = kinetic(vel, m) + pot; worst = 0
    for s in range(round(T/h)):
        if method == "euler":
            for p, v, a in zip(pos, vel, acc):
                for k in range(3): p[k] += h*v[k]; v[k] += h*a[k]
            acc, pot = accel(pos, m, eps2)
        else:                                 # velocity Verlet: kick, drift, kick
            for p, v, a in zip(pos, vel, acc):
                for k in range(3): v[k] += 0.5*h*a[k]; p[k] += h*v[k]
            acc, pot = accel(pos, m, eps2)
            for v, a in zip(vel, acc):
                for k in range(3): v[k] += 0.5*h*a[k]
        worst = max(worst, abs(kinetic(vel, m) + pot - E0)/abs(E0))
    return E0, kinetic(vel, m) + pot, worst

for method in ("euler", "verlet"):
    for h in (0.01, 0.005):
        E0, E, w = run(method, h)
        print("%-6s h=%.3f  E0=%.6f  E(10)=%.6f  max|dE/E0|=%.2e" % (method, h, E0, E, w))
```

Output (about $4$ s):

```
euler  h=0.010  E0=-0.418622  E(10)=-0.185106  max|dE/E0|=5.58e-01
euler  h=0.005  E0=-0.418622  E(10)=-0.238792  max|dE/E0|=4.30e-01
verlet h=0.010  E0=-0.418622  E(10)=-0.418714  max|dE/E0|=1.57e-03
verlet h=0.005  E0=-0.418622  E(10)=-0.418703  max|dE/E0|=3.74e-04
```

The kinetic and potential energies at $t = 0$ are $0.1499$ and $-0.5686$, so $2K/\lvert U\rvert = 0.53$. A cluster in virial equilibrium would have this ratio equal to $1$. This one starts too cold and collapses before it settles, which is a hard test: the particles come close together and speed up during the collapse.

::: example Reading the energy column {#ex-nbody-energy}
Interpret the four lines of output. Which method is usable, and does halving the step behave as the order predicts?
::: solution
Forward Euler has lost more than half of the binding energy by $t = 10$: the total energy rose from $-0.4186$ to $-0.1851$. The integrator, not any physics, heated the cluster, and halving the step only reduced the worst error from $56\%$ to $43\%$.

Verlet's worst relative error is $1.57 \times 10^{-3}$ at $h = 0.01$ and $3.74 \times 10^{-4}$ at $h = 0.005$. The ratio is $4.2$, close to the factor $4$ of a second-order method. The final energies, $-0.418714$ and $-0.418703$, are within $2 \times 10^{-4}$ of the start. Both methods evaluate the forces once per step, so Verlet's advantage costs nothing.
:::
:::

Softening has to be matched to the step. Rerunning Verlet at $h = 0.01$ while changing only $\varepsilon$ gave:

| $\varepsilon$ | $E_0$ | max relative energy error |
| --- | --- | --- |
| $0.2$ | $-0.388076$ | $6.97 \times 10^{-5}$ |
| $0.05$ | $-0.418622$ | $1.57 \times 10^{-3}$ |
| $0.01$ | $-0.421528$ | $8.57 \times 10^{-1}$ |
| $0.002$ | $-0.421650$ | $7.55$ |

::: example A step that is too long for the softening {#ex-soften}
Explain why the energy error explodes for $\varepsilon \le 0.01$, and estimate a step that would cure it.
::: solution
The shortest time scale in a close encounter is the time to cross the softened core, about $\varepsilon/v$, with relative speeds of order $1$ during the collapse. At $\varepsilon = 0.05$ that is about $0.05$, several steps of $h = 0.01$. At $\varepsilon = 0.01$ it is a single step: a pair can jump through the core in one kick and come out with the wrong energy. A step several times shorter than $\varepsilon/v$ is needed. A run at $h = 0.001$ with $\varepsilon = 0.01$ gave a worst relative error of $2.44 \times 10^{-3}$, comparable with the $\varepsilon = 0.05$ run. The cost of a small softening is in the step.
:::
:::

::: warning Conserving the wrong energy, or the right one badly
A softened simulation conserves the softened energy. Comparing its output with Newtonian two-body orbits at separations comparable with $\varepsilon$ tests a model the program does not contain. The opposite mistake is to shrink $\varepsilon$ "for accuracy" without shrinking $h$. The table shows the result: a cluster whose energy changes by a factor of several. Choose $\varepsilon$ from the physics, typically a fraction of the mean interparticle spacing for a collisionless system, then choose $h$ from $\varepsilon$ and the speeds, and then check the energy.
:::

## Trees: Barnes–Hut {#tree}

A distant group of stars pulls on a given star almost as a single point mass at the group's centre of mass would. The error of that replacement is the quadrupole term of the multipole expansion of [[math-methods/green-functions]], of relative size about $(s/d)^2$ for a group of size $s$ at distance $d$. Barnes and Hut turned that observation into an algorithm whose cost grows like $N\log N$ rather than $N^2$.

::: algorithm Barnes–Hut force evaluation {#alg-bh}
1. Enclose all particles in a cube. Divide any cube that contains more than one particle into eight children, recursively, until every leaf holds at most one particle. This is an **octree**.
2. Store in every cell its total mass and its centre of mass, computed from its children.
3. To find the force on particle $i$, start at the root. For a cell of side $s$ whose centre of mass lies at distance $d$ from $i$: if $s/d < \theta$, add the force of a point mass at the centre of mass and stop; otherwise open the cell and treat its children in the same way. A leaf holding one other particle is always used directly.

The **opening angle** $\theta$ controls the accuracy. $\theta = 0$ opens every cell and reproduces direct summation.
:::

For roughly uniform distributions the tree has depth about $\log_8 N$, and a particle interacts with a bounded number of cells on each level. Hence each force costs order $\log N$ interactions, and the whole evaluation $N\log N$. A short Python octree (not printed; about sixty lines) was tested on $N$ equal masses uniform in the unit ball, seeded with `random.Random(7)`, softening $\varepsilon = 0.01$. For $50$ test particles the tree force was compared with the direct sum:

| $N$ | $\theta$ | interactions per particle | direct | median relative force error |
| --- | --- | --- | --- | --- |
| $1000$ | $0.5$ | $214$ | $999$ | $6.0 \times 10^{-3}$ |
| $4000$ | $0.5$ | $375$ | $3999$ | $4.9 \times 10^{-3}$ |
| $16000$ | $0.5$ | $497$ | $15999$ | $5.0 \times 10^{-3}$ |
| $16000$ | $0.3$ | $1450$ | $15999$ | $9.7 \times 10^{-4}$ |
| $16000$ | $0.8$ | $183$ | $15999$ | $1.6 \times 10^{-2}$ |

::: example How much the tree saves {#ex-bh}
From the table, by what factor does the tree reduce the work at $N = 16000$ and $\theta = 0.5$? How does the saving grow with $N$?
::: solution
Direct summation needs $15999$ interactions per particle, the tree $497$, a factor of $32$. At $N = 1000$ the factor was $999/214 = 4.7$, and at $N = 4000$ it was $3999/375 = 10.7$. Each fourfold increase in $N$ multiplied the tree work only by $1.75$ and then $1.33$, the slow growth of a logarithm, while the accuracy, set by $\theta$, stayed near $5 \times 10^{-3}$. Lowering $\theta$ to $0.3$ bought a factor of five in accuracy for three times the work.
:::
:::

A half-per-cent force error is acceptable for a collisionless system because the errors are nearly random from particle to particle, and the particles are themselves a noisy sampling of a smooth density. It would not be acceptable for the planets, where a handful of bodies are followed for billions of orbits and direct summation is cheap anyway. The fast multipole method of Greengard and Rokhlin (1987) carries the expansion to higher order and interacts cells with cells, reaching a cost proportional to $N$.

## The Lennard-Jones fluid {#lj}

Atoms of a noble gas attract each other weakly at long range, through the van der Waals (dispersion) interaction that falls off as $r^{-6}$, and repel strongly when their electron clouds overlap. The simplest model with both features is the 12–6 potential.

::: definition Lennard-Jones potential and reduced units {#def-lj}
The **Lennard-Jones potential** is

$$
u(r) = 4\epsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right],
$$ {#eq-lj}

with a minimum of depth $-\epsilon$ at $r_\mathrm{min} = 2^{1/6}\sigma \approx 1.122\,\sigma$ and a zero at $r = \sigma$. In **reduced units** lengths are measured in $\sigma$, energies in $\epsilon$, masses in the atomic mass $m$, and therefore time in $\tau = \sigma\sqrt{m/\epsilon}$. Temperature is $T^* = k_BT/\epsilon$, number density $\rho^* = \rho\sigma^3$, and pressure $P^* = P\sigma^3/\epsilon$.
:::

The $r^{-12}$ wall has no deep justification; it is cheap, being the square of $r^{-6}$. What the model gets right is the scaling: in reduced units every Lennard-Jones substance is the same substance, and one run describes argon, krypton or xenon, approximately, depending on which $\sigma$, $\epsilon$ and $m$ you put back in. That is the classical law of corresponding states.

::: example Argon in ordinary units {#ex-argon}
For argon take $\sigma = 3.405\,\text{Å}$, $\epsilon/k_B = 119.8\,\mathrm K$ and $m = 39.948\,\mathrm u$. Convert the state point $T^* = 0.728$, $\rho^* = 0.8442$, and the time step $h = 0.005\,\tau$, into SI units.
::: solution
The temperature is $T = 0.728 \times 119.8\,\mathrm K = 87.2\,\mathrm K$, just below the normal boiling point of argon, $87.3\,\mathrm K$. The energy unit is $\epsilon = 119.8 \times 1.380649 \times 10^{-23}\,\mathrm J = 1.654 \times 10^{-21}\,\mathrm J$, and $m = 39.948 \times 1.66054 \times 10^{-27}\,\mathrm{kg} = 6.634 \times 10^{-26}\,\mathrm{kg}$. Then

$$
\tau = \sigma\sqrt{m/\epsilon} = 3.405 \times 10^{-10}\,\mathrm m \times \sqrt{\frac{6.634 \times 10^{-26}}{1.654 \times 10^{-21}}}\,\mathrm{s/m} = 2.156 \times 10^{-12}\,\mathrm s,
$$

so $h = 0.005\,\tau = 1.08 \times 10^{-14}\,\mathrm s$, about $11$ femtoseconds. The number density is $0.8442/\sigma^3 = 2.138 \times 10^{28}\,\mathrm m^{-3}$, and the mass density is that times $m$, $1419\,\mathrm{kg/m^3}$, close to that of liquid argon at its boiling point. The pressure unit is $\epsilon/\sigma^3 = 4.19 \times 10^{7}\,\mathrm{Pa}$, about $419$ bar, so a reduced pressure of $0.03$ is about $13$ bar.
:::
:::

The potential is short-ranged: at $r = 2.5\sigma$ it is $-0.0163\,\epsilon$, under $2\%$ of the well depth. Simulations therefore cut it off. Truncating it abruptly at $r_c$ would put a step in $u$, and a particle crossing $r_c$ would change the total energy by the size of the step. The **truncated and shifted** potential

$$
u_\mathrm{sh}(r) = \begin{cases} u(r) - u(r_c), & r < r_c, \\ 0, & r \ge r_c, \end{cases}
$$ {#eq-shift}

is continuous, has the same force inside $r_c$, and keeps Verlet's energy band intact. Its force still jumps at $r_c$, by $u'(r_c)$, but the jump is small and only the energy, not the dynamics inside the cut-off, is affected by the shift.

::: widget plot
f: 4*(x^-12 - x^-6); (4*(x^-12 - x^-6) - 4*(c^-12 - c^-6))*heaviside(c - x); 24*(2*x^-13 - x^-7)
x: 0.9, 3
y: -2.5, 3
sliders: c=2.5:1.2:3:0.05
labels: u(r); truncated and shifted at r_c; force −u′(r)
caption: The Lennard-Jones potential in reduced units, the version cut off and shifted at $r_c$, and the force. The force changes sign at $r = 2^{1/6} \approx 1.12$, the bottom of the well. Drag $r_c$ down towards $1.2$ and watch the shifted well become shallower: a short cut-off changes the model, not only the cost. At $r_c = 2.5$ the shifted and unshifted curves are almost indistinguishable at this scale.
:::

## A box without walls {#periodic}

A cube of $108$ atoms with walls would have a large fraction of its atoms next to a wall, and the surface would dominate a sample meant to imitate a bulk liquid. The remedy is to replace the walls by copies of the box.

::: definition Periodic boundaries and the minimum image {#def-minimage}
In a cubic box of side $L$ with **periodic boundary conditions**, the box is surrounded by infinitely many translated copies of itself, displaced by $L\mathbf n$ for every integer vector $\mathbf n$. A particle leaving through one face re-enters through the opposite face. In the **minimum-image convention** the separation used for the pair $(i, j)$ is the shortest among the vectors $\mathbf r_i - \mathbf r_j + L\mathbf n$. Component by component,

$$
\Delta x \;\mapsto\; \Delta x - L\,\operatorname{round}(\Delta x / L),
$$

which places each component in $[-L/2, L/2]$.
:::

The minimum image is only a correct implementation of a cut-off potential if no particle can interact with two images of the same partner. That requires $r_c \le L/2$. For $108$ atoms at $\rho^* = 0.8442$, $L = (108/0.8442)^{1/3} = 5.0388$, so $L/2 = 2.519$ and $r_c = 2.5$ barely fits. A larger cut-off on that box would need a larger box, which is why a cut-off and a particle number are chosen together.

::: quiz
A program uses $N = 108$ atoms in a box of side $L = 5.04$ with the minimum-image convention and a cut-off $r_c = 3.0$. What is wrong?
- [ ] Nothing; a longer cut-off is always more accurate.
- [x] The cut-off sphere no longer fits in the box: pairs between $L/2$ and $3.0$ are counted for some orientations and missed for others.
- [ ] The energy is no longer conserved, because momentum conservation fails with periodic boundaries.
- [ ] The minimum image counts each pair twice.
::: solution
The minimum image keeps only the nearest copy of each partner. Along an axis it never returns more than $L/2 = 2.52$, while along a body diagonal separations up to $\sqrt3\,L/2 \approx 4.4$ occur, so some pairs between $2.52$ and $3.0$ are included and others are not. Momentum is still conserved, by [[#prop-momentum]]. The repair is $r_c \le L/2$.
:::
:::

Testing every pair against the cut-off still costs $N^2/2$ operations, even though each atom has only a few dozen neighbours within $r_c$. Verlet's 1967 paper introduced the remedy.

::: algorithm Verlet neighbour list {#alg-nlist}
Choose a **skin** $\delta > 0$. For every atom, store the list of partners within $r_c + \delta$. Compute forces only over the listed pairs. Record the positions at the time the list was built. When any atom has moved more than $\delta/2$ since then, rebuild the list.
:::

The rebuild rule is safe because two atoms that were farther than $r_c + \delta$ apart can only come within $r_c$ if their combined displacement exceeds $\delta$, which needs one of them to have moved more than $\delta/2$. Building the list over all pairs is itself $O(N^2)$, but it is done only occasionally. **Cell lists**, which bin the atoms in cubes of side at least $r_c + \delta$ and look only in neighbouring cubes, make the build $O(N)$ as well.

::: example When a neighbour list pays {#ex-nlist}
On a perfect fcc lattice at $\rho^* = 0.8442$, with $r_c = 2.5$ and $\delta = 0.3$, one evaluation of the cut-off force over all pairs and over the listed pairs gave

| $N$ | $L/2$ | all pairs | listed pairs | time, all | time, list |
| --- | --- | --- | --- | --- | --- |
| $108$ | $2.519$ | $5778$ | $3564$ | $0.006$ s | $0.004$ s |
| $256$ | $3.359$ | $32640$ | $9984$ | $0.031$ s | $0.011$ s |
| $500$ | $4.199$ | $124750$ | $19500$ | $0.103$ s | $0.023$ s |
| $864$ | $5.039$ | $372816$ | $33696$ | $0.303$ s | $0.041$ s |

Explain the number of listed pairs per atom and why the list hardly helps at $N = 108$.
::: solution
Each atom has, on average, the number of atoms inside a sphere of radius $r_c + \delta = 2.8$, which is $\frac43\pi(2.8)^3\rho^* = 77.6$. Each pair is listed once, so the expected number of pairs per atom is half that, $38.8$. The table gives $19500/500 = 39.0$ and $33696/864 = 39.0$, the lattice value. That number does not depend on $N$, so the list makes the force cost linear in $N$.

At $N = 108$ the list sphere of radius $2.8$ reaches beyond half the box, $2.519$, so it encloses most of the box, and the list keeps $62\%$ of all pairs. For $108$ atoms the plain double loop is the honest choice. At $864$ atoms, Verlet's own system size, the list is seven times faster.
:::
:::

## A run of 108 atoms {#run}

The listing below is a complete molecular-dynamics program. It starts $108$ atoms on an fcc lattice at $\rho^* = 0.8442$ with Gaussian velocities from `random.Random(2023)`, total momentum removed, and integrates with velocity Verlet at $h = 0.005$. For $500$ steps the velocities are rescaled to $T^* = 0.728$ every tenth step while the lattice melts. The last $1500$ steps run at constant energy and record temperature, pressure, energy, and every twentieth step a histogram of pair separations.

```python
import math, random
ncell, rho, T0, h, rc = 3, 0.8442, 0.728, 0.005, 2.5
N = 4*ncell**3; L = (N/rho)**(1/3); V = L**3
ecut = 4*(rc**-12 - rc**-6)                     # shift so that U(rc) = 0
a = L/ncell; cell = [(0,0,0), (.5,.5,0), (.5,0,.5), (0,.5,.5)]
pos = [[(i+b[0])*a, (j+b[1])*a, (k+b[2])*a] for i in range(ncell)
       for j in range(ncell) for k in range(ncell) for b in cell]   # fcc start
rng = random.Random(2023)
vel = [[rng.gauss(0, 1) for _ in range(3)] for _ in range(N)]
for k in range(3):                              # zero total momentum
    vc = sum(v[k] for v in vel)/N
    for v in vel: v[k] -= vc

def temperature():                              # 3N - 3 degrees of freedom
    return sum(c*c for v in vel for c in v)/(3*(N-1))

def rescale(T):
    s = math.sqrt(T/temperature())
    for v in vel: v[0] *= s; v[1] *= s; v[2] *= s

def forces():
    f = [[0.0]*3 for _ in range(N)]; U = W = 0.0
    for i in range(N):
        for j in range(i+1, N):
            d = [pos[i][k] - pos[j][k] for k in range(3)]
            d = [x - L*round(x/L) for x in d]   # minimum image
            r2 = d[0]*d[0] + d[1]*d[1] + d[2]*d[2]
            if r2 < rc*rc:
                s6 = 1/r2**3
                U += 4*s6*(s6 - 1) - ecut
                rF = 24*s6*(2*s6 - 1)           # r times the force magnitude
                W += rF
                for k in range(3):
                    f[i][k] += rF/r2*d[k]; f[j][k] -= rF/r2*d[k]
    return f, U, W

nbin = 50; dr = (L/2)/nbin; hist = [0]*nbin; nsamp = 0
def sample_gr():
    for i in range(N):
        for j in range(i+1, N):
            d = [x - L*round(x/L) for x in (pos[i][k] - pos[j][k] for k in range(3))]
            b = int(math.sqrt(d[0]*d[0] + d[1]*d[1] + d[2]*d[2])/dr)
            if b < nbin: hist[b] += 2

rescale(T0); f, U, W = forces(); Ts, Ps, Es = [], [], []
for n in range(2000):
    for p, v, F in zip(pos, vel, f):            # velocity Verlet, m = 1
        for k in range(3):
            v[k] += 0.5*h*F[k]; p[k] += h*v[k]
    f, U, W = forces()
    for v, F in zip(vel, f):
        for k in range(3): v[k] += 0.5*h*F[k]
    if n < 500:
        if n % 10 == 9: rescale(T0)             # equilibration only
        continue
    T = temperature(); K = 1.5*(N-1)*T
    Ts.append(T); Es.append((K + U)/N); Ps.append(rho*T + W/(3*V))
    if n % 20 == 0: sample_gr(); nsamp += 1

mean = lambda x: sum(x)/len(x)
def block_error(x, nb=10):
    m = len(x)//nb; b = [mean(x[i*m:(i+1)*m]) for i in range(nb)]
    return math.sqrt(sum((y - mean(b))**2 for y in b)/(nb*(nb - 1)))
Ptail = 16/3*math.pi*rho**2*(2/3*rc**-9 - rc**-3)
print("N = %d, L = %.4f, production steps = %d" % (N, L, len(Ts)))
print("T = %.4f +- %.4f" % (mean(Ts), block_error(Ts)))
print("P = %.4f +- %.4f (cut-off), tail = %.4f, P + tail = %.4f" % (mean(Ps), block_error(Ps), Ptail, mean(Ps) + Ptail))
print("E/N: first %.6f, last %.6f, max - min %.2e" % (Es[0], Es[-1], max(Es) - min(Es)))
g = [hist[b]/(nsamp*N*rho*4/3*math.pi*dr**3*((b+1)**3 - b**3)) for b in range(nbin)]
print("g(r) = 0 for r < %.2f" % (dr*min(b for b in range(nbin) if hist[b])))
for b in range(19, nbin, 2): print("r = %.3f  g = %.3f" % ((b + 0.5)*dr, g[b]))
```

Output (about $19$ s):

```
N = 108, L = 5.0388, production steps = 1500
T = 0.7002 +- 0.0039
P = 0.7912 +- 0.0325 (cut-off), tail = -0.7621, P + tail = 0.0291
E/N: first -4.158347, last -4.157962, max - min 1.15e-03
g(r) = 0 for r < 0.91
r = 0.983  g = 0.753
r = 1.083  g = 2.997
r = 1.184  g = 2.010
r = 1.285  g = 1.106
r = 1.386  g = 0.739
r = 1.486  g = 0.592
r = 1.587  g = 0.604
r = 1.688  g = 0.692
r = 1.789  g = 0.875
r = 1.890  g = 1.076
r = 1.990  g = 1.220
r = 2.091  g = 1.282
r = 2.192  g = 1.205
r = 2.293  g = 1.031
r = 2.393  g = 0.907
r = 2.494  g = 0.817
```

::: example Checking the run before believing it {#ex-run-check}
Before reading physics from the output, check the energy and the temperature. Is the energy conserved well enough? Why is the mean temperature $0.700$ and not the $0.728$ that the thermostat imposed?
::: solution
During the $1500$ constant-energy steps the energy per atom stayed within a band of width $1.15 \times 10^{-3}$, from a mean near $-4.158$. That is $0.03\%$, about $0.1\%$ of the kinetic energy per atom, and the first and last values differ by only $3.9 \times 10^{-4}$: no visible drift.

The temperature is a different story. Rescaling stopped at step $500$, after only $2.5\tau$, while the system was still turning lattice order into liquid disorder and raising its potential energy. At fixed total energy that is paid for out of the kinetic energy, so the temperature settled near $0.700 \pm 0.004$. The run is a valid constant-energy simulation at $T^* = 0.700$, not at $0.728$. A careful study would equilibrate until the potential energy stopped drifting.
:::
:::

How large is the energy band, and does it behave as a second-order method should? A separate experiment restarted three constant-energy runs, each covering $2\tau$, from the same equilibrated state, changing only the step:

| $h$ | steps | standard deviation of $E/N$ |
| --- | --- | --- |
| $0.01$ | $200$ | $7.63 \times 10^{-4}$ |
| $0.005$ | $400$ | $1.92 \times 10^{-4}$ |
| $0.0025$ | $800$ | $4.57 \times 10^{-5}$ |

Each halving divided the fluctuation by $3.97$ and then $4.20$, the factor $4$ of [[computation/integrating-motion#alg-verlet]]. A working rule is to keep them small next to the fluctuations of the kinetic energy itself.

## What the run measures {#measure}

A run produces a trajectory; physics comes from averages over it. If the dynamics is ergodic, a time average at fixed energy equals an average over the microcanonical ensemble of [[statistical-mechanics/microcanonical]]. For large $N$ that is indistinguishable from a canonical average at the corresponding temperature.

::: definition Kinetic temperature {#def-kintemp}
The **instantaneous kinetic temperature** of $N$ atoms whose total momentum is fixed at zero is

$$
T_\mathrm{kin} = \frac{2K}{N_f k_B}, \qquad K = \sum_i \tfrac12 m_i v_i^2, \qquad N_f = 3N - 3.
$$

The **temperature** of the run is its time average.
:::

The count $N_f = 3N - 3$ follows from equipartition, $\frac12 k_BT$ per quadratic degree of freedom: fixing the three components of the total momentum removes three of them. With $N = 108$ the difference between $3N$ and $3N - 3$ is about $1\%$, a third of the temperature drop in [[#ex-run-check]]. The instantaneous value fluctuates. In the production run it ranged from $0.595$ to $0.823$, with a standard deviation of $0.038$, which is why only an average with an error bar is a temperature.

The pressure cannot be read from collisions with a wall, because there is no wall. It comes from the virial.

::: theorem Virial pressure {#thm-virial}
For $N$ particles with pair forces $\mathbf F_{ij}$ in a container of volume $V$, in a stationary state,

$$
PV = N k_BT + \frac13 \Bigl\langle \sum_{i<j} \mathbf r_{ij}\cdot\mathbf F_{ij} \Bigr\rangle,
$$ {#eq-virial}

where $T$ is the kinetic temperature defined with $N_f = 3N$ and the angle brackets denote a time average.
:::

::: proof
Consider $G = \sum_i \mathbf r_i\cdot\mathbf p_i$. For bounded motion $G$ is bounded, so its time derivative averages to zero over a long time:

$$
0 = \Bigl\langle \frac{\dd G}{\dd t} \Bigr\rangle = \Bigl\langle \sum_i \frac{p_i^2}{m_i} \Bigr\rangle + \Bigl\langle \sum_i \mathbf r_i\cdot\mathbf F_i \Bigr\rangle = 2\langle K\rangle + \Bigl\langle \sum_i \mathbf r_i\cdot\mathbf F_i \Bigr\rangle .
$$

The total force $\mathbf F_i$ on particle $i$ is the sum of the forces from other particles and the force from the wall. For the pair forces, grouping each pair and using $\mathbf F_{ji} = -\mathbf F_{ij}$,

$$
\sum_i \sum_{j\neq i} \mathbf r_i\cdot\mathbf F_{ij} = \sum_{i<j} (\mathbf r_i - \mathbf r_j)\cdot\mathbf F_{ij} = \sum_{i<j}\mathbf r_{ij}\cdot\mathbf F_{ij}.
$$

On average the wall exerts on the gas a force $-P\,\hat{\mathbf n}\,\dd A$ on each surface element, with $\hat{\mathbf n}$ the outward normal. Its contribution is, by the divergence theorem,

$$
-P \oint \mathbf r\cdot\hat{\mathbf n}\,\dd A = -P\int_V \nabla\cdot\mathbf r\,\dd V = -3PV.
$$

Collecting the terms gives $0 = 2\langle K\rangle + \langle\sum_{i<j}\mathbf r_{ij}\cdot\mathbf F_{ij}\rangle - 3PV$. With $2\langle K\rangle = 3Nk_BT$ this is [[#eq-virial]].
:::

The proof needs a wall, and a periodic box has none. The same formula holds in a periodic system, provided $\mathbf r_{ij}$ is the minimum-image separation that was used to compute $\mathbf F_{ij}$; the derivation is in chapter 2 of Allen and Tildesley, *Computer Simulation of Liquids*. In the program, `rF` is $\mathbf r_{ij}\cdot\mathbf F_{ij} = -r\,u'(r) = 24 r^{-6}(2r^{-6} - 1)$ in reduced units, and the instantaneous pressure is `rho*T + W/(3*V)`.

::: example The pressure and its tail {#ex-pressure}
The cut-off pressure is $0.791 \pm 0.033$, and the program adds a tail correction of $-0.762$. Where does the correction come from, and what is the pressure of the full Lennard-Jones liquid?
::: solution
The forces from pairs beyond $r_c$ were left out. If the liquid is structureless at those distances, $g(r) = 1$ for $r > r_c$, and the missing virial per unit volume is

$$
P_\mathrm{tail} = -\frac{2\pi\rho^2}{3}\int_{r_c}^\infty r^3 u'(r)\,\dd r = \frac{16\pi\rho^2}{3}\left[\frac23 r_c^{-9} - r_c^{-3}\right]
$$

in reduced units; [[#exr-tail]] derives it. At $\rho = 0.8442$ and $r_c = 2.5$ this is $-0.7621$, as printed. The corrected pressure is $0.791 - 0.762 = 0.029$, with the same error bar $\pm 0.033$, so it is zero within one error bar. In ordinary units that is $12 \pm 14$ bar for argon. A pressure near zero is expected, because the state is close to the Lennard-Jones triple point, where the liquid coexists with a vapour of negligible pressure. The lesson is the size of the correction: a tail under $2\%$ of the well depth changes the pressure by more than the whole answer, because the number of distant neighbours grows as $r^2$.
:::
:::

The error bars in the output are block errors. The $1500$ values were split into $10$ consecutive blocks and the standard error computed from the block means. The naive standard error of the pressure, from the standard deviation $0.264$ of all $1500$ values divided by $\sqrt{1500}$, would be $0.0068$, nearly five times too small, because consecutive steps are strongly correlated. The same correction for correlation was measured on a Metropolis chain in [[computation/random-sampling#ex-metro]]. Blocks of $0.75\tau$ are only just long enough; the remedy is more steps.

::: definition Radial distribution function {#def-gr}
In a homogeneous fluid of number density $\rho$, the **radial distribution function** $g(r)$ is defined so that the mean number of atoms in a thin shell at distance between $r$ and $r + \dd r$ from a given atom is $\rho\, g(r)\, 4\pi r^2\,\dd r$. In an ideal gas $g = 1$. In a simulation it is estimated by a histogram of pair separations divided by the ideal-gas count for each shell.
:::

The program counts each pair twice in `hist`, once from each end, and divides by $N$ (atoms at the centre), by the number of samples, and by $\rho$ times the shell volume. The output shows the structure of a dense liquid:

- $g(r) = 0$ for $r < 0.91$: the repulsive wall forbids close approach.
- A sharp first peak of about $3.0$ near $r = 1.08$, just inside the potential minimum at $1.12$: the first shell of neighbours.
- A minimum of about $0.59$ near $r = 1.5$, then a broader second peak of about $1.28$ near $r = 2.1$.
- Oscillations decaying towards $1$, still $0.2$ away at $r = 2.5$, so a box of half-width $2.52$ is barely large enough, and the tail correction's assumption $g = 1$ is approximate.

There is no long-range order. A crystal would show sharp, separate peaks at the fcc neighbour distances $a/\sqrt2$, $a$, $\sqrt{3/2}\,a$, with $g = 0$ between them. The structure factor measured by neutron or X-ray scattering on liquid argon is, up to a Fourier transform, the same function, which is how Rahman and Verlet compared their simulations with experiment.

::: quiz
In [[#ex-run-check]] the temperature fell from $0.728$ to $0.700$ after the thermostat was switched off, while the energy was conserved to $0.03\%$. What does this show?
- [ ] The integrator is losing energy and the step must be reduced.
- [x] The system had not finished equilibrating; potential energy was still rising at the expense of kinetic energy.
- [ ] The kinetic temperature should be computed with $3N$ rather than $3N - 3$ degrees of freedom.
- [ ] Velocity rescaling breaks momentum conservation.
::: solution
A constant energy rules out the first answer. The temperature formula was the same throughout, so it cannot cause a fall, and uniform rescaling keeps a zero momentum zero. The melting lattice was converting kinetic energy into potential energy after the thermostat stopped replacing it.
:::
:::

## Thermostats {#thermostats}

Newton's equations conserve energy, so molecular dynamics naturally samples the microcanonical ensemble, while experiments are usually done at fixed temperature. A **thermostat** modifies the equations of motion so that the system exchanges energy with an imagined heat bath.

The crudest choice is the one in the listing: multiply all velocities by $\sqrt{T_0/T_\mathrm{kin}}$ from time to time. It suppresses the natural fluctuations of $K$, so its states are not a canonical sample; it is for equilibration only. The Berendsen thermostat (1984) relaxes $T_\mathrm{kin}$ towards $T_0$ gently and has the same defect. The Andersen thermostat (1980) now and then gives a random atom a fresh Maxwell–Boltzmann velocity; it samples the canonical ensemble, but the random collisions spoil transport coefficients. The Nosé–Hoover thermostat (Nosé 1984, Hoover 1985) adds one dynamical friction variable that grows when the system is too hot and goes negative when it is too cold. The extended dynamics is deterministic and time-reversible and, if ergodic, samples the canonical distribution.

::: remark Which ensemble, and does it matter?
For averages such as $P$ or $g(r)$ the ensembles differ by corrections of order $1/N$. For fluctuations, such as a heat capacity from the variance of the energy, the formula must match the ensemble sampled. For dynamical quantities, such as diffusion, measure at constant energy or with a thermostat that disturbs the dynamics weakly.
:::

::: application Monte Carlo or molecular dynamics?
The Metropolis method of [[computation/random-sampling]], applied to the same potential, gives the same static averages; the 1953 paper used it on hard disks. It gives no time correlations, because its sequence of states is not a trajectory. The Metropolis Ising run in [[statistical-mechanics/phase-transitions]] is the lattice version. Molecular dynamics follows real time and so measures transport.
:::

## History and where this leads {#leads}

::: history From MANIAC to argon
In 1955 Enrico Fermi, John Pasta, Stanislaw Ulam and Mary Tsingou integrated chains of up to $64$ masses joined by weakly nonlinear springs on the Los Alamos MANIAC. The energy placed in the lowest mode did not spread over all modes as expected; it returned almost entirely to the starting mode. Tsingou wrote the program, though her name was not on the report, and the problem now carries all four names.

Berni Alder and Thomas Wainwright, in 1957, followed the collisions of $32$ and $108$ hard spheres and found a fluid–solid transition. Aneesur Rahman, in 1964, simulated $864$ Lennard-Jones atoms with argon parameters and compared pair correlations and diffusion with experiment. Loup Verlet, in 1967, used the integrator and neighbour list that carry his name to compute the equation of state and $g(r)$ of the Lennard-Jones fluid. Josh Barnes and Piet Hut published their $O(N\log N)$ tree algorithm in *Nature* in 1986.
:::

The averages here are statistical mechanics in the sense of [[statistical-mechanics/classical-gas]], and the dense-fluid equation of state is what [[thermodynamics/kinetic-theory]] could only approximate. Tree and mesh codes for galaxies and cosmic structure connect to [[gravitation/cosmology]]; the same equations at low temperature give the phonons of [[condensed-matter/lattice-vibrations]]. The next chapter, [[computation/chaos-and-data]], asks why two runs that differ in the last bit of their initial data end in different microstates while their averages agree.

::: summary
- Direct summation costs $N(N-1)/2$ pair interactions per step; doubling $N$ multiplied the time by $4$. Accumulating each pair once with $\mathbf F_{ji} = -\mathbf F_{ij}$ conserves momentum exactly.
- Plummer softening removes the singularity of gravity, and the step must then resolve $\varepsilon/v$. On a collapsing cluster Verlet's energy error fell by $4.2$ when $h$ was halved; Euler lost half the binding energy.
- Barnes–Hut at $\theta = 0.5$ gave a $0.5\%$ force error with $497$ interactions per particle at $N = 16000$, instead of $15999$.
- Reduced Lennard-Jones units describe every noble gas at once. For argon $T^* = 0.728$ is $87.2\,\mathrm K$ and $\tau = 2.16\,\mathrm{ps}$.
- Periodic boundaries with the minimum image need $r_c \le L/2$. Neighbour lists make the cost linear in $N$ once the box is several cut-offs wide.
- Temperature comes from $K$ with $3N - 3$ degrees of freedom, pressure from the virial plus a tail correction, structure from $g(r)$. For $108$ atoms: $T = 0.700 \pm 0.004$ and $P = 0.03 \pm 0.03$.
- Error bars need block averages. A thermostat used for equilibration must be switched off, or chosen to sample the right ensemble, before measuring.
:::

## Exercises {#exercises}

::: exercise Counting pairs {level=1 check="5778"}
How many distinct pairs does direct summation visit for $N = 108$ atoms?
::: solution
$N(N-1)/2 = 108 \times 107/2 = 5778$. That is the number in the first row of the table in [[#ex-nlist]].
:::
:::

::: exercise Argon temperature {level=1 check="87.2"}
With $\epsilon/k_B = 119.8\,\mathrm K$ for argon, what temperature in kelvin is $T^* = 0.728$? Give one decimal place.
::: solution
$T = T^*\,\epsilon/k_B = 0.728 \times 119.8\,\mathrm K = 87.2\,\mathrm K$.
:::
:::

::: exercise A minimum image {level=1 check="-0.5388"}
In a box of side $L = 5.0388$, two atoms have $x$-coordinates differing by $\Delta x = 4.5$. What $x$-separation does the minimum-image convention use?
::: solution
$\Delta x/L = 0.893$, which rounds to $1$. The minimum-image separation is $4.5 - 5.0388 = -0.5388$. The partner is close, through the face of the box.
:::
:::

::: exercise The shift constant {level=1 check="-0.0163"}
For the truncated and shifted potential [[#eq-shift]] with $r_c = 2.5$, compute $u(r_c)$ in reduced units to three significant figures.
::: solution
$2.5^{-6} = 4.096 \times 10^{-3}$ and $2.5^{-12} = 1.678 \times 10^{-5}$. So $u(2.5) = 4(1.678 \times 10^{-5} - 4.096 \times 10^{-3}) = -0.0163$. Every pair inside the cut-off has $0.0163$ added to its energy.
:::
:::

::: exercise The bottom of the well {level=2 check="2^(1/6)"}
Find the separation, in units of $\sigma$, at which the Lennard-Jones force vanishes, and the value of $u$ there.
::: solution
$u'(r) = 4(-12r^{-13} + 6r^{-7}) = 0$ gives $r^6 = 2$, so $r = 2^{1/6} \approx 1.1225$. There $r^{-6} = \frac12$ and $u = 4(\frac14 - \frac12) = -1$, the well depth $-\epsilon$.
:::
:::

::: exercise Predicting the energy band {level=2 check="4.8e-5"}
At $h = 0.005$ the standard deviation of $E/N$ was $1.92 \times 10^{-4}$. Assuming second-order scaling, predict it at $h = 0.0025$, and compare with the measured value.
::: solution
Halving $h$ divides it by $4$: $1.92 \times 10^{-4}/4 = 4.8 \times 10^{-5}$. The measured value was $4.57 \times 10^{-5}$, about $5\%$ lower. Short runs from one state give band widths that are themselves fluctuating numbers; the scaling is confirmed, not the third digit.
:::
:::

::: exercise Neighbours in the list {level=2 check="38.8"}
At $\rho^* = 0.8442$, with $r_c = 2.5$ and skin $0.3$, estimate the number of listed pairs per atom, assuming a uniform density. Give one decimal place.
::: solution
The list sphere has radius $2.8$ and contains on average $\frac43\pi(2.8)^3 \times 0.8442 = 77.6$ other atoms. Each pair is stored once, so the number per atom is $77.6/2 = 38.8$. The lattice in [[#ex-nlist]] gave $39.0$.
:::
:::

::: exercise Momentum and the minimum image {level=3}
Prove that the velocity-Verlet program of this chapter conserves the total momentum exactly in exact arithmetic, even though positions are compared through the minimum image. Then explain why a program that applies the minimum image only when computing the force on $i$, and recomputes the separation independently when computing the force on $j$, might not.
::: hint
[[#prop-momentum]] needs $\mathbf F_{ji} = -\mathbf F_{ij}$, with the same vector on both sides.
:::
::: solution
In the listing the separation $\mathbf d$ of a pair is computed once, the force vector $(rF/r^2)\,\mathbf d$ is added to atom $i$ and the same vector is subtracted from atom $j$. Hence $\mathbf F_{ji} = -\mathbf F_{ij}$ exactly, and [[#prop-momentum]] applies: each kick changes $\mathbf P$ by $\frac h2\sum_{i<j}(\mathbf F_{ij} + \mathbf F_{ji}) = \mathbf 0$. The drift changes positions only, and wrapping a position by $L$ (which this listing does not even need to do) changes no velocity.

Now suppose the second atom's separation is recomputed with its own rounding. With the convention $\operatorname{round}(y) = \lfloor y + \frac12\rfloor$, a tie $\Delta x/L = \frac12$ gives the image $-\frac12 L$, and the reversed pair, $\Delta x/L = -\frac12$, also keeps $-\frac12 L$. Both atoms see their partner on the same side, the forces do not cancel, and $\mathbf P$ jumps. Computing each pair once avoids this by construction.
:::
:::

::: exercise The tail correction {#exr-tail level=3}
Assume $g(r) = 1$ for $r > r_c$. Starting from [[#eq-virial]], show that the pairs beyond the cut-off contribute

$$
P_\mathrm{tail} = \frac{16\pi\rho^2}{3}\left[\frac23 r_c^{-9} - r_c^{-3}\right]
$$

in reduced units, and evaluate it for $\rho = 0.8442$, $r_c = 2.5$.
::: hint
The mean number of pairs with separation in $[r, r + \dd r]$ is $\frac12 N\rho\,g(r)\,4\pi r^2\,\dd r$, and each contributes $\mathbf r\cdot\mathbf F = -r\,u'(r)$.
:::
::: solution
The missing term in $PV$ is $\frac13$ of the average of $\sum \mathbf r_{ij}\cdot\mathbf F_{ij}$ over pairs beyond $r_c$:

$$
P_\mathrm{tail}V = \frac13 \cdot \frac12 N\rho \int_{r_c}^\infty 4\pi r^2\,\bigl(-r\,u'(r)\bigr)\,\dd r .
$$

Divide by $V$ and use $N/V = \rho$: $P_\mathrm{tail} = -\frac{2\pi\rho^2}{3}\int_{r_c}^\infty r^3u'(r)\,\dd r$. With $u = 4(r^{-12} - r^{-6})$, $r^3u'(r) = -48r^{-10} + 24r^{-4}$, and

$$
\int_{r_c}^\infty\bigl(-48r^{-10} + 24r^{-4}\bigr)\dd r = -\frac{48}{9}r_c^{-9} + 8r_c^{-3}.
$$

Hence $P_\mathrm{tail} = -\frac{2\pi\rho^2}{3}\bigl(8r_c^{-3} - \frac{16}{3}r_c^{-9}\bigr) = \frac{16\pi\rho^2}{3}\bigl(\frac23 r_c^{-9} - r_c^{-3}\bigr)$. At $\rho = 0.8442$ and $r_c = 2.5$: $r_c^{-3} = 0.064$ and $\frac23 r_c^{-9} = 1.75 \times 10^{-4}$, so $P_\mathrm{tail} = \frac{16\pi}{3}(0.71267)(-0.063825) = -0.762$, matching the program.
:::
:::
