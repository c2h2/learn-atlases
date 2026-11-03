An embryo begins as a nearly uniform ball or sheet of cells, yet within hours or days it is divided into regions with distinct fates: head and tail, back and belly, the repeating segments of an insect, the stripes of a zebrafish, the regularly spaced digits of a hand. Where does the spatial information come from? Two great ideas, both expressible as mathematics, have shaped the answer. In the first, a localised source releases a signal — a **morphogen** — that spreads and decays to form a concentration gradient, and cells read their position from the local concentration, as from a ruler. In the second, introduced by Alan Turing in 1952, two interacting substances diffusing at different rates can create a periodic pattern spontaneously from an almost uniform state, with no ruler at all.

This chapter develops both. We derive the exponential gradient of the **synthesis–diffusion–degradation** model and ask how precisely and how robustly it specifies position, using the Bicoid gradient of the *Drosophila* embryo and the Dpp gradient of the wing as examples. We then analyse **reaction–diffusion** systems by linear stability, derive the conditions for a **Turing instability** — local activation and long-range inhibition — and survey the evidence that Turing-type mechanisms pattern skin, hair follicles and digits. The developmental biology is in [[developmental-biology/axis-formation]] and [[developmental-biology/segmentation-hox]]; the diffusion equation and Fourier modes are in [the heat equation](/learn/maths/lesson.php?c=pde&l=heat-equation) in Maths Atlas. Bistable switches from [[systems-biology/switches-oscillators]] reappear as the devices that turn graded signals into sharp boundaries.

## Positional information and morphogen gradients

Lewis Wolpert formalised the first idea in 1969 as **positional information**, with the image of the **French flag**: a line of cells must form a blue, a white and a red third. If a substance is made at one end and its concentration falls with distance, each cell can compare the local concentration with two thresholds and adopt the colour appropriate to its position. The pattern then scales with the gradient, and the same mechanism can be reused with different thresholds to make different patterns.

::: definition Morphogen {#def-morphogen}
A **morphogen** is a signalling substance that is distributed in a concentration gradient across a field of cells and that specifies two or more distinct cell fates directly, at different concentration thresholds. The two parts matter: a molecule with a graded distribution that acts through a relay of secondary signals, or that elicits only one response, is not a morphogen in this strict sense.
:::

### The synthesis–diffusion–degradation model

Suppose a morphogen is produced at $x = 0$, diffuses with diffusion coefficient $D$ along a line of tissue ($x > 0$), and is degraded (or removed by uptake) with first-order rate constant $k$. Its concentration $c(x, t)$ obeys the reaction–diffusion equation

$$
\frac{\partial c}{\partial t} = D\frac{\partial^2c}{\partial x^2} - kc, \qquad x > 0,
$$ {#eq-sdd}

with a source that fixes the concentration $c(0) = c_0$ (or the flux $-D\,\partial c/\partial x$) at $x = 0$.

::: proposition The exponential gradient {#prop-gradient}
At steady state, on a domain much longer than the decay length, the solution of [[#eq-sdd]] is

$$
c(x) = c_0\,e^{-x/\lambda}, \qquad \lambda = \sqrt{\frac{D}{k}},
$$ {#eq-gradient}

with **decay length** $\lambda$, over which the concentration falls by the factor $e$. A cell that adopts a fate when $c$ exceeds a threshold $\theta$ forms a boundary at

$$
x_\theta = \lambda\ln\frac{c_0}{\theta}.
$$ {#eq-boundary}

The gradient is established, at a given position, over a time of the order of $1/k$ (more precisely, a time that grows with $x/\lambda$ and is a few times $1/k$ at $x$ of a few $\lambda$). **Assumptions:** constant $D$ and $k$, one spatial dimension, a source fixed in time, linear degradation, and a semi-infinite domain.
:::

::: proof
At steady state $Dc'' = kc$, whose general solution is $c = Ae^{-x/\lambda} + Be^{x/\lambda}$ with $\lambda^2 = D/k$. Boundedness as $x\to\infty$ requires $B = 0$, and $c(0) = c_0$ gives $A = c_0$. Setting $c(x_\theta) = \theta$ gives $e^{-x_\theta/\lambda} = \theta/c_0$, which is [[#eq-boundary]]. For the time scale, the time-dependent solution relaxes to steady state as the slowest decaying mode, which decays at least as fast as $e^{-kt}$ (degradation alone removes material at rate $k$, and diffusion only adds to the relaxation).
:::

[[#eq-boundary]] shows that the boundary moves **logarithmically** with the source strength: doubling $c_0$ shifts every boundary by $\lambda\ln 2 \approx 0.7\lambda$ away from the source. And it moves **linearly** with $\lambda$: a gradient twice as long puts every boundary twice as far away.

::: widget plot
f: c*exp(-x/l); 1
x: 0, 500
y: 0, 15
sliders: c=12:2:24:0.5; l=100:40:200:5
labels: c(x) = c_0 e^{-x/\lambda}; \text{threshold } \theta
caption: An exponential morphogen gradient along an embryo 500 μm long (position $x$ in μm, concentration in units of the threshold $\theta$). Cells to the left of the crossing point exceed the threshold and adopt the anterior fate. With $c_0 = 12$ and $\lambda = 100$ μm the boundary lies at about 250 μm, half-way along. Double $c_0$ to 24 and the boundary moves by only $\lambda\ln 2 \approx 69$ μm; change $\lambda$ and every boundary moves in proportion.
:::

### Bicoid and Dpp

The best-studied morphogen gradient is that of **Bicoid** in the early *Drosophila melanogaster* embryo. *bicoid* mRNA is deposited by the mother at the anterior pole of the egg; it is translated after fertilisation, and the protein spreads through the syncytial embryo — a single cytoplasm with many nuclei — forming an exponential gradient with a decay length of about 20 % of the egg length, roughly 100 μm (Wolfgang Driever and Christiane Nüsslein-Volhard, 1988; Bahram Houchmandzadeh, Eric Wieschaus and Stanislas Leibler, 2002). Bicoid is a transcription factor; among its targets, the gap gene *hunchback* is activated where Bicoid exceeds a threshold, forming a sharp boundary near the middle of the embryo. Driever and Nüsslein-Volhard showed that changing the number of copies of *bicoid* in the mother shifts the pattern along the embryo in the direction predicted by [[#eq-boundary]], making Bicoid the first morphogen to be identified molecularly.

::: example Reading a gradient {#ex-bicoid}
Take a Bicoid-like gradient with $\lambda = 100$ μm in an embryo 500 μm long, and a target gene activated where $c > \theta$ with its boundary at mid-embryo. (a) What is $c_0/\theta$? (b) By how much does the boundary move if the mother has twice the normal *bicoid* dosage, so that $c_0$ doubles? Express the shift as a fraction of egg length. (c) Nuclei in the cortex at this stage are about 8 μm apart. How precisely, in terms of concentration, must cells read the gradient to place the boundary within one nuclear spacing?
::: solution
(a) $x_\theta = 250$ μm, so $\ln(c_0/\theta) = 2.5$ and $c_0/\theta = e^{2.5} = 12.2$.

(b) The shift is $\lambda\ln 2 = 69$ μm, 14 % of the egg length, posteriorly. Experiments altering *bicoid* dosage do shift the boundaries posteriorly, though often by less than this simple model predicts — evidence for additional mechanisms that buffer the pattern.

(c) A shift $\delta x$ corresponds to a relative change in concentration $\delta c/c = \delta x/\lambda$. For $\delta x = 8$ μm, $\delta c/c = 0.08$: each nucleus must distinguish concentrations differing by about 8 %. Thomas Gregor, David Tank, Eric Wieschaus and William Bialek found in 2007 that the *hunchback* boundary is indeed positioned to within about one nuclear spacing, implying that nuclei read Bicoid with roughly 10 % precision — close to the limit set by the random arrival of the few molecules that a nucleus can sense in the time available.
:::
:::

How fast must Bicoid spread? With $\lambda = \sqrt{D/k}$, a given decay length can be produced by fast diffusion with fast degradation or slow diffusion with slow degradation, and the time to establish the gradient is of order $1/k = \lambda^2/D$. Gregor and colleagues measured Bicoid diffusion by fluorescence recovery after photobleaching in 2007 and obtained $D \approx 0.3\ \mu\text{m}^2\,\text{s}^{-1}$, which gives $1/k = (100\ \mu\text{m})^2/0.3\ \mu\text{m}^2\,\text{s}^{-1} \approx 9$ hours — far longer than the roughly 2–3 hours over which the gradient forms and is read. Fluorescence correlation spectroscopy later gave values around $7\ \mu\text{m}^2\,\text{s}^{-1}$ (Abu-Arish and colleagues, 2010), which give $1/k$ of under half an hour; the difference probably reflects fast and slow populations of Bicoid molecules, and other contributions — such as a gradient of *bicoid* mRNA itself — have been proposed. This "Bicoid diffusion problem" illustrates how a simple model turns qualitative descriptions into sharp, testable numbers.

In the wing imaginal disc of *Drosophila*, the BMP-family ligand **Dpp** is secreted by a stripe of cells along the anterior–posterior compartment boundary and spreads through the epithelium in both directions. Anna Kicheva, Marcos González-Gaitán and colleagues (2007) measured its diffusion coefficient as about $0.1\ \mu\text{m}^2\,\text{s}^{-1}$ and its decay length as about 20 μm, consistent with [[#eq-gradient]]; the gradient grows as the disc grows, keeping proportions — a property called **scaling** that the simple model does not explain and that remains an active research topic.

::: example What a measured gradient implies {#ex-dpp}
(a) From the Dpp measurements, $D \approx 0.1\ \mu\text{m}^2\,\text{s}^{-1}$ and $\lambda \approx 20$ μm, infer the degradation rate constant and the half-life of Dpp in the tissue. (b) Two related species of fly have eggs of 400 μm and 800 μm. If both had a Bicoid gradient with the same $\lambda = 100$ μm and the same $c_0/\theta = 12.2$ for a target gene, where would the boundary lie in each, as a fraction of egg length? What would be required for the pattern to scale?
::: solution
(a) $k = D/\lambda^2 = 0.1/400 = 2.5\times10^{-4}$ s⁻¹, a half-life of $\ln2/k = 2{,}770$ s, about 46 min. The gradient would take an hour or two to approach steady state, comparable to the time over which the wing disc is patterned.

(b) In both, $x_\theta = \lambda\ln12.2 = 250$ μm: 62.5 % of the small egg but only 31 % of the large one. The body plan would be grossly distorted. For the pattern to scale, $\lambda$ (or $c_0/\theta$) must change in proportion to egg length. Thomas Gregor and colleagues compared fly species with eggs of different sizes in 2005 and found that the Bicoid decay length does scale with egg length, so some property of the gradient — production, diffusion or degradation — must be adjusted between species.
:::
:::

### Robust gradients

A gradient set by [[#eq-boundary]] is sensitive to the source: a twofold change in $c_0$ moves boundaries by $0.7\lambda$. Avigdor Eldar, Naama Barkai, Ben-Zion Shilo and colleagues showed in 2003 that if the morphogen promotes its own degradation — degradation rate increasing with concentration, as when a ligand upregulates its own receptor and is internalised with it — the gradient approaches a power law far from the source, and boundary positions become much less sensitive to the production rate. This **self-enhanced degradation** is an example of the robustness principles of [[systems-biology/signalling-robustness]] applied in space.

## Turing patterns

Gradients need a pre-existing asymmetry: a localised source. Turing's 1952 paper "The chemical basis of morphogenesis" asked whether a pattern could arise in a tissue with no asymmetry at all. His answer was surprising: diffusion, normally a homogenising process, can **destabilise** a uniform steady state when it acts on two chemicals that react with each other.

::: definition Reaction–diffusion system {#def-rd}
A two-species **reaction–diffusion system** for concentrations $u(x, t)$ and $v(x, t)$ is

$$
\frac{\partial u}{\partial t} = f(u, v) + D_u\nabla^2u, \qquad \frac{\partial v}{\partial t} = g(u, v) + D_v\nabla^2v,
$$ {#eq-rd}

where $f$ and $g$ describe local reactions and $D_u$, $D_v$ are the diffusion coefficients. A **Turing instability** (diffusion-driven instability) occurs when a spatially uniform steady state that is stable in the absence of diffusion becomes unstable to spatially periodic perturbations when diffusion is included.
:::

To analyse it, let $(u^*, v^*)$ be a uniform steady state, $f(u^*, v^*) = g(u^*, v^*) = 0$, with Jacobian

$$
J = \begin{pmatrix} f_u & f_v \\ g_u & g_v \end{pmatrix}
$$

evaluated there. Small perturbations can be decomposed into Fourier modes $e^{ikx}$ of wavenumber $k$ (wavelength $2\pi/k$), each of which evolves independently in the linearised system: since $\nabla^2e^{ikx} = -k^2e^{ikx}$, a mode grows or decays according to the eigenvalues of

$$
J_k = J - k^2\begin{pmatrix} D_u & 0 \\ 0 & D_v \end{pmatrix}.
$$ {#eq-jk}

::: theorem Conditions for a Turing instability {#thm-turing}
The uniform steady state of [[#eq-rd]] is stable without diffusion and unstable to some spatial mode if and only if

$$
\begin{aligned}
&\text{(i)}\quad f_u + g_v < 0, \qquad \text{(ii)}\quad f_ug_v - f_vg_u > 0, \\
&\text{(iii)}\quad D_vf_u + D_ug_v > 2\sqrt{D_uD_v\,(f_ug_v - f_vg_u)}.
\end{aligned}
$$ {#eq-turing}

Condition (iii) implies $D_vf_u + D_ug_v > 0$; together with (i) this requires $f_u$ and $g_v$ to have opposite signs and the diffusion coefficients to differ. If $u$ is the self-enhancing species ($f_u > 0$, an **activator**) then $g_v < 0$ and $D_v > D_u$: the **inhibitor must diffuse faster than the activator**. The first mode to become unstable has wavenumber

$$
k_c^2 = \sqrt{\frac{f_ug_v - f_vg_u}{D_uD_v}}.
$$ {#eq-kc}
:::

::: proof
Without diffusion ($k = 0$), stability of a two-variable linear system requires negative trace and positive determinant of $J$: conditions (i) and (ii). For $k > 0$, the trace of $J_k$ is $f_u + g_v - k^2(D_u + D_v)$, which is even more negative, so instability can arise only through the determinant becoming negative (a real eigenvalue crossing zero). The determinant is

$$
h(k^2) = D_uD_vk^4 - (D_vf_u + D_ug_v)k^2 + (f_ug_v - f_vg_u),
$$

a quadratic in $q = k^2$ with positive leading coefficient and positive value at $q = 0$. It becomes negative for some $q > 0$ if and only if its minimum is negative. The minimum is at $q_c = (D_vf_u + D_ug_v)/(2D_uD_v)$, which must be positive, and the minimum value is $\det J - (D_vf_u + D_ug_v)^2/(4D_uD_v)$, which is negative exactly when (iii) holds. At the threshold of instability (equality in (iii)), $q_c = \sqrt{\det J/(D_uD_v)}$, which is [[#eq-kc]]. If $f_u > 0$ then (i) forces $g_v < -f_u < 0$, and $D_vf_u + D_ug_v > 0$ then needs $D_v/D_u > -g_v/f_u > 1$.
:::

The physical picture is **local activation and long-range inhibition**, the formulation given by Alfred Gierer and Hans Meinhardt in 1972. A small local excess of activator enhances its own production and that of the inhibitor. The activator stays put, so the peak grows; the inhibitor spreads out and suppresses activator production in the surroundings, creating troughs. Neighbouring peaks form at a distance set by the range of the inhibitor, so the pattern has a characteristic wavelength independent of the size of the tissue. Turing himself noted that the same mathematics also covers a second arrangement, in which $u$ and $v$ deplete each other's substrate (activator–substrate depletion models).

::: intuition Fires and firebreaks
Imagine a dry forest in which fires break out spontaneously, and fire crews respond to any fire by flying out to cut firebreaks around it. If the crews travel faster than the fire spreads, each fire burns a patch but is soon ringed by cleared land; another fire can establish itself only beyond the cleared ring. The forest ends up with burnt patches regularly spaced at a distance set by how far the crews range. Fire is the activator (it spreads itself, slowly); the crews are the inhibitor (they are activated by fire and travel fast). If the crews were slow, they could never contain the fire, and it would burn everything — a uniform state.
:::

::: example A Turing analysis {#ex-turing}
A linearised activator–inhibitor system has $f_u = 1$, $f_v = -2$, $g_u = 3$, $g_v = -4$ (in units where $D_u = 1$). (a) Check that the uniform state is stable without diffusion. (b) Find the smallest ratio $d = D_v/D_u$ for a Turing instability. (c) For $d = 20$, find the band of unstable wavenumbers and the critical wavelength.
::: solution
(a) Trace $= 1 - 4 = -3 < 0$, determinant $= (1)(-4) - (-2)(3) = 2 > 0$: stable.

(b) Condition (iii): $d\cdot1 - 4 > 2\sqrt{2d}$. Squaring (both sides positive for $d > 4$): $d^2 - 8d + 16 > 8d$, i.e. $d^2 - 16d + 16 > 0$, whose larger root is $d = 8 + \sqrt{48} = 14.9$. The inhibitor must diffuse about 15 times faster than the activator.

(c) With $d = 20$, $h(q) = 20q^2 - 16q + 2 < 0$ for $q$ between $(16 \pm \sqrt{256 - 160})/40$, i.e. $0.155 < k^2 < 0.645$. At the threshold the critical wavenumber would be $k_c^2 = \sqrt{2/20} = 0.316$; near it, the pattern has wavelength $2\pi/\sqrt{0.316} = 11.2$ length units. A tissue 100 units long would develop about nine peaks.
:::
:::

::: widget plot
f: if((-0.2 - (1 + d)*x)^2 - 4*((0.8 - x)*(-1 - d*x) + 1.8) >= 0, ((-0.2 - (1 + d)*x) + sqrt((-0.2 - (1 + d)*x)^2 - 4*((0.8 - x)*(-1 - d*x) + 1.8)))/2, (-0.2 - (1 + d)*x)/2)
x: 0, 1
y: -1, 0.5
sliders: d=20:1:40:0.5
hlines: 0
labels: \text{growth rate } \operatorname{Re}\lambda(k^2)
caption: The dispersion relation of the Schnakenberg reaction–diffusion model (with $a = 0.1$, $b = 0.9$, so $f_u = 0.8$, $f_v = 1$, $g_u = -1.8$, $g_v = -1$): the growth rate of a perturbation of wavenumber $k$ (largest real part of the eigenvalues of $J_k$) against $k^2$, for diffusion ratio $d = D_v/D_u$. Where the curve is above zero, perturbations with those wavelengths grow and a pattern forms. At $d = 20$ unstable modes lie between $k^2 \approx 0.07$ and $0.68$, with the fastest near $k^2 \approx 0.24$ (wavelength about 13). Lower $d$ below about 8.6 and the band vanishes: the uniform state is stable at all wavelengths.
:::

::: example Spacing as the tissue grows {#ex-spacing}
A Turing system with an intrinsic wavelength of 12 units patterns a tissue that grows from 50 to 150 units in length. How many peaks would you expect at each size? Contrast this with a pattern made by reading thresholds of a gradient that scales with the tissue.
::: solution
The number of peaks is about the length divided by the wavelength: roughly 4 at 50 units and 12 at 150 units. As the tissue grows, new peaks are inserted (by peak splitting or by new peaks appearing in widening gaps) so that the spacing stays near 12 — the signature seen in growing angelfish, whose stripes split and multiply while keeping their spacing. A scaling gradient read by fixed thresholds would instead keep the same number of regions, each growing in proportion to the tissue.
:::
:::

The linear analysis predicts *which* wavelengths grow, but not the final pattern, which is shaped by the nonlinear terms. A numerical simulation shows both. The program below integrates the Schnakenberg model — the system whose dispersion relation is plotted above — on a ring of 100 cells starting from the uniform state plus tiny random noise.

```python
import math, random

# Schnakenberg reaction-diffusion model on a ring of N cells (dimensionless):
#   du/dt = a - u + u^2 v + Du * Laplacian(u)
#   dv/dt = b - u^2 v     + Dv * Laplacian(v)
a, b, Du, Dv = 0.1, 0.9, 1.0, 20.0
N, dx, dt, T = 100, 1.0, 0.01, 500.0
u0, v0 = a + b, b / (a + b)**2            # uniform steady state
rng = random.Random(3)
u = [u0 + 0.01 * (rng.random() - 0.5) for _ in range(N)]   # tiny random noise
v = [v0] * N

for step in range(int(T / dt)):
    lap_u = [(u[i-1] - 2*u[i] + u[(i+1) % N]) / dx**2 for i in range(N)]
    lap_v = [(v[i-1] - 2*v[i] + v[(i+1) % N]) / dx**2 for i in range(N)]
    u, v = ([u[i] + dt*(a - u[i] + u[i]**2*v[i] + Du*lap_u[i]) for i in range(N)],
            [v[i] + dt*(b - u[i]**2*v[i] + Dv*lap_v[i]) for i in range(N)])

peaks = sum(1 for i in range(N) if u[i] > u[i-1] and u[i] >= u[(i+1) % N])
print(f"u ranges from {min(u):.2f} to {max(u):.2f}; {peaks} peaks, "
      f"wavelength about {N*dx/peaks:.1f}")
# u ranges from 0.25 to 2.10; 8 peaks, wavelength about 12.5
```

From an almost featureless start the activator self-organises into eight evenly spaced peaks, a wavelength of 12.5 cells — close to the fastest-growing wavelength of about 13 predicted by the linear analysis. (Here $u$ is the self-enhancing species: $f_u = 0.8 > 0$. In this "substrate-depletion" model $v$ is consumed by the autocatalysis rather than produced by it, which is why $g_u < 0$; the conditions of [[#thm-turing]] still apply.) In two dimensions, the same equations produce spots, stripes or labyrinths depending on the parameters.

::: warning "A periodic pattern proves a Turing mechanism"
Regularly spaced structures can be made in other ways: by a clock and a wavefront (as in vertebrate somites, where a segmentation clock oscillates in cells that are swept by a receding gradient), by sequential addition at a growing edge, by mechanical buckling or cell sorting, or by reading several thresholds of a gradient (as the *Drosophila* pair-rule stripes are read from gap gene expression). To show that a pattern is Turing-like one needs evidence of its signatures: a wavelength intrinsic to the system rather than tied to tissue size, changes in spacing when diffusion or reaction rates are altered, the appearance of new peaks by splitting or insertion as tissue grows, and the identification of a self-enhancing short-range component and a longer-range inhibitor.
:::

### Turing patterns in biology

For decades Turing's mechanism was admired but unproven in living systems. The first chemical Turing pattern was made only in 1990, by Vincent Castets, Patrick De Kepper and colleagues in the chlorite–iodide–malonic acid (CIMA) reaction in a gel, where the gel slowed the diffusion of the activator. Biological evidence has accumulated since:

- **Fish skin.** Shigeru Kondo and Rihito Asai showed in 1995 that the stripes of the marine angelfish *Pomacanthus* rearrange as the fish grows — stripes split and branch in the ways a reaction–diffusion model predicts — and later work in zebrafish (*Danio rerio*) traced the interactions to pigment cells signalling at short and long range.
- **Hair follicles.** Stefanie Sick, Thomas Schlake and colleagues (2006) presented evidence that the spacing of mouse hair follicles is set by WNT signalling acting as an activator and its secreted inhibitor DKK as a longer-range inhibitor.
- **Digits.** Rushikesh Sheth, Marian Ros and colleagues (2012) found that reducing the dosage of distal *Hox* genes in mouse limbs increased the number of digits while reducing their spacing, as expected if Hox proteins tune the wavelength of a Turing-type mechanism; Jelena Raspopovic, James Sharpe and colleagues (2014) proposed a three-component BMP–SOX9–WNT network for digit patterning and supported it with experiments on mouse limb buds.
- **Palatal ridges** in the mouse mouth (Andrew Economou, Jeremy Green and colleagues, 2012), feather buds, and the spacing of teeth show similar behaviour.

In many of these cases the "morphogens" are not freely diffusing molecules but signalling pathways, cell movements and mechanical forces, and the long-range inhibitor can be replaced by other forms of long-range coupling. The mathematics of [[#thm-turing]] is general enough to cover them: what matters is local self-enhancement and longer-range inhibition, whatever the molecular means.

::: quiz
In an activator–inhibitor reaction–diffusion system that is stable without diffusion, which change could create a Turing pattern?
- [ ] Making the activator diffuse faster than the inhibitor
- [x] Making the inhibitor diffuse much faster than the activator
- [ ] Making both diffuse equally fast but faster than before
- [ ] Removing the inhibitor's dependence on the activator
::: solution
By [[#thm-turing]] a Turing instability requires $D_vf_u + D_ug_v > 0$ with $f_u > 0 > g_v$, which demands $D_v > D_u$ — in practice substantially greater. With equal diffusion coefficients the condition cannot be met. Removing the activation of the inhibitor ($g_u = 0$) leaves no coupling through which the inhibitor can follow and contain the activator.
:::
:::

::: application Engineering patterns
Synthetic biologists have used these principles to make bacteria and mammalian cells form patterns on their own. Engineered *E. coli* that sense a diffusing signal and respond in an incoherent feed-forward manner form bullseye rings around a source (Subhayu Basu, Ron Weiss and colleagues, 2005), an implementation of the band-detection circuits of [[systems-biology/network-motifs]]; in 2018 David Karig, Ron Weiss and colleagues reported a synthetic circuit designed to produce Turing-type patterns in *E. coli* populations. In tissue engineering, understanding the spacing of follicles and glands is relevant to growing skin and other organs in culture. Morphogen signalling pathways (Wnt, BMP, Hedgehog) are also implicated in developmental disorders and cancers — topics treated in Medicine Atlas.
:::

::: history
Turing's paper "The chemical basis of morphogenesis", published in the *Philosophical Transactions of the Royal Society* in 1952, introduced the word "morphogen" and the theory of diffusion-driven instability; it was one of his last works. Lewis Wolpert's positional information (1969) and Francis Crick's 1970 calculation that diffusion could establish gradients over tens of cell diameters within hours made gradients plausible. Gierer and Meinhardt's 1972 paper gave the activator–inhibitor formulation used today. The molecular era began in 1988, when Driever and Nüsslein-Volhard identified Bicoid as a morphogen gradient in *Drosophila*, following Nüsslein-Volhard and Wieschaus's genetic screens for patterning genes (Nobel Prize in Physiology or Medicine, 1995, with Edward Lewis). Experimental evidence for biological Turing patterns followed from 1995 onwards, led by Kondo's work on fish skin.
:::

::: summary
- A morphogen is a graded signal that specifies several fates at different thresholds; Wolpert's French flag model treats it as positional information.
- Synthesis, diffusion and degradation give an exponential gradient $c_0e^{-x/\lambda}$ with $\lambda = \sqrt{D/k}$, established over a time of order $1/k$; a threshold $\theta$ places a boundary at $\lambda\ln(c_0/\theta)$, which shifts by $0.7\lambda$ when the source doubles.
- Bicoid in *Drosophila* has $\lambda \approx 100$ μm and is read with about 10 % precision; its diffusion coefficient is debated. Self-enhanced degradation makes gradients robust to source strength.
- In a reaction–diffusion system, a uniform state stable without diffusion becomes unstable to periodic modes when $D_vf_u + D_ug_v > 2\sqrt{D_uD_v\det J}$ (Turing instability), which requires local activation and a faster-diffusing inhibitor; the critical wavenumber is $k_c^2 = \sqrt{\det J/(D_uD_v)}$.
- Turing-type mechanisms are supported for fish pigmentation, hair follicles, digits and palatal ridges, but periodic patterns can also arise in other ways.
:::

## Exercises

::: exercise Decay length {level=1 check="20"}
A morphogen has diffusion coefficient $D = 0.1\ \mu\text{m}^2\,\text{s}^{-1}$ and degradation rate constant $k = 2.5\times10^{-4}$ s⁻¹. What is its decay length in μm?
::: solution
$\lambda = \sqrt{D/k} = \sqrt{0.1/2.5\times10^{-4}} = \sqrt{400} = 20$ μm.
:::
:::

::: exercise A boundary position {level=1 check="92.1"}
A gradient with $\lambda = 40$ μm has $c_0 = 10\theta$. Where is the threshold boundary, in μm (to one decimal place)?
::: solution
$x_\theta = 40\ln10 = 40\times2.3026 = 92.1$ μm.
:::
:::

::: exercise Checking Turing conditions {level=1}
For $f_u = 2$, $f_v = -1$, $g_u = 5$, $g_v = -3$, is the uniform state stable without diffusion? Can it undergo a Turing instability for some ratio $D_v/D_u$?
::: solution
Trace $= -1 < 0$, determinant $= -6 + 5 = -1 < 0$: the state is a saddle and already unstable without diffusion, so the premise of a Turing instability (stability in the absence of diffusion) fails. Any pattern would not be a Turing pattern in the strict sense.
:::
:::

::: exercise Time to form a gradient {level=2}
A gradient must form within 2 hours over a decay length of 50 μm. If its establishment takes about $3/k$, what minimal diffusion coefficient is required?
::: solution
$3/k \le 7200$ s gives $k \ge 4.2\times10^{-4}$ s⁻¹. Then $D = k\lambda^2 \ge 4.2\times10^{-4}\times2500 = 1.04\ \mu\text{m}^2\,\text{s}^{-1}$. A slowly diffusing extracellular protein ($0.1\ \mu\text{m}^2\,\text{s}^{-1}$) could not do it; a freely diffusing protein in cytoplasm (several μm² s⁻¹) easily could.
:::
:::

::: exercise Two thresholds, French flag {level=2}
A gradient with $\lambda = 100$ μm is read by two thresholds, $\theta_1$ (blue above it) and $\theta_2 < \theta_1$ (white between, red below). The tissue is 300 μm long with the source at one end, and the three regions should be equal. Find $c_0/\theta_1$ and $c_0/\theta_2$. If $c_0$ falls by 30 %, how much do the region boundaries move?
::: solution
Boundaries at 100 and 200 μm: $\ln(c_0/\theta_1) = 1$ and $\ln(c_0/\theta_2) = 2$, so $c_0/\theta_1 = e = 2.72$ and $c_0/\theta_2 = e^2 = 7.39$. If $c_0$ falls to $0.7c_0$, both boundaries move towards the source by $\lambda\ln(1/0.7) = 100\times0.357 = 36$ μm: the blue region shrinks to 64 μm and the red region grows to 136 μm. The pattern does not scale; robust patterning needs other mechanisms.
:::
:::

::: exercise A Turing threshold {level=2 check="8.57"}
For the Schnakenberg Jacobian $f_u = 0.8$, $f_v = 1$, $g_u = -1.8$, $g_v = -1$, find the smallest diffusion ratio $d = D_v/D_u$ for a Turing instability (three significant figures).
::: hint
Write condition (iii) as $0.8d - 1 > 2\sqrt{d}$ and solve the quadratic in $s = \sqrt d$.
:::
::: solution
$\det J = -0.8 + 1.8 = 1$. Condition (iii) with $D_u = 1$: $0.8d - 1 > 2\sqrt d$. With $s = \sqrt d$, $0.8s^2 - 2s - 1 > 0$, whose positive root is $s = (2 + \sqrt{4 + 3.2})/1.6 = (2 + 2.683)/1.6 = 2.927$. So $d > 2.927^2 = 8.57$.
:::
:::

::: exercise Interpreting digit experiments {level=3}
In mouse limb buds with progressively reduced dosage of distal *Hox* genes, the number of digits increases (polydactyly) while each digit becomes thinner, and the limb bud is not larger. Explain why this supports a Turing-type mechanism rather than a gradient read by fixed thresholds, and predict what would happen to digit number in a limb bud that is experimentally enlarged without changing *Hox* dosage.
::: solution
In a Turing mechanism, the wavelength is set by the reaction and diffusion parameters, not by tissue size; changing a parameter (here, via *Hox* dosage) changes the spacing, so more, thinner digits fit in the same bud. In a threshold model with a gradient spanning the bud, the number of regions is fixed by the number of thresholds and does not increase smoothly with a change in a regulator — reducing a regulator would shift boundaries, not add periodic elements. The Turing prediction for an enlarged bud with unchanged parameters is that the wavelength stays the same, so more digits form (as more wavelengths fit), whereas a scaling gradient model would predict the same number of larger digits.
:::
:::

::: exercise Why can't one species make a pattern? {level=3}
Show that a single reacting and diffusing species, $\partial u/\partial t = f(u) + D\,\partial^2u/\partial x^2$, cannot undergo a Turing instability: if the uniform state is stable without diffusion, it is stable to every Fourier mode.
::: solution
Linearising about $u^*$ with $f'(u^*) < 0$ (stable without diffusion), a mode $e^{ikx}$ grows at rate $f'(u^*) - Dk^2$, which is even more negative for every $k \ne 0$. Diffusion in a single species can only smooth out perturbations. The second species is essential: in two dimensions of state space, diffusion can make the determinant of $J_k$ negative by weakening the inhibitor's local effect (it spreads away) while barely affecting the activator's self-enhancement — something impossible with one variable.
:::
:::

::: exercise Gradient precision {level=3}
Show that the positional error $\delta x$ of a threshold boundary in an exponential gradient is $\lambda\,\delta c/c$, independent of position, and explain why this suggests that cells far from the source cannot be patterned more precisely by a steeper threshold response.
::: solution
From $c = c_0e^{-x/\lambda}$, $dc/dx = -c/\lambda$, so a concentration error $\delta c$ at the boundary corresponds to $\delta x = \lambda\,\delta c/c$. If the relative error $\delta c/c$ of reading the concentration were constant, positional error would be the same everywhere. But the relative error of sensing grows at low concentration (fewer molecules, so counting noise $\delta c/c \propto 1/\sqrt{c}$), so precision deteriorates far from the source. A steeper response of the target gene (higher Hill coefficient) sharpens the boundary's *profile* but cannot remove the uncertainty in the input itself: the boundary's *position* is still uncertain by $\lambda\,\delta c/c$. Improving precision requires averaging the input over longer times or over neighbouring nuclei, or combining several gradients.
:::
:::
