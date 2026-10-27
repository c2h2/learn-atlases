Every red blood cell faces an apparently impossible task. In the lungs, where the partial pressure of oxygen is about $100\ \mathrm{Torr}$, it must load as much oxygen as it can carry; a few seconds later, in a working muscle where the pressure has fallen to $20\ \mathrm{Torr}$, it must let most of that oxygen go. A protein that binds oxygen tightly enough to fill up in the lungs would seem bound to hold on to it in the tissues, and a protein that releases it easily in the tissues would seem bound to load poorly in the lungs. Haemoglobin solves the problem by *changing its affinity as it fills*: the first oxygen molecule binds weakly, the last ones strongly, and the result is a sigmoid binding curve that switches from mostly empty to mostly full over exactly the range of pressures the body uses. Its single-chain cousin myoglobin, the oxygen store of muscle, cannot do this and binds with a simple hyperbola.

This chapter turns that story into chemistry. We begin with the equilibrium of a protein and a ligand — the fractional saturation and the dissociation constant — then meet the haem group and the two oxygen carriers, derive the Hill equation that measures cooperativity, and build the concerted (Monod–Wyman–Changeux) model of allostery, in which a protein switches between two shapes of different affinity. The same ideas explain how protons, carbon dioxide and 2,3-bisphosphoglycerate regulate oxygen delivery, why fetal blood takes oxygen from the mother's, and how one amino-acid substitution causes sickle-cell disease. They are also the foundation of enzyme regulation in [[biochemistry/enzymes]] and of drug binding in [[medicinal-chemistry/drug-binding]]. The structural vocabulary — helices, subunits, quaternary structure — is that of [[biochemistry/amino-acids-proteins]], and the equilibrium arithmetic is that of [[general-chemistry-2/chemical-equilibrium]].

## Binding equilibria

Most of what proteins do begins with binding: an antibody recognises an antigen, a receptor binds a hormone, a transporter grips its cargo, an enzyme holds its substrate. The binding partner, whatever its size, is called the **ligand**. The simplest case — one protein molecule P with one binding site and a ligand L — is an ordinary chemical equilibrium,
$$
\mathrm{P} + \mathrm{L} \rightleftharpoons \mathrm{PL},
$$
and two numbers describe it completely.

::: definition Dissociation constant and fractional saturation {#def-saturation}
For the equilibrium $\mathrm{PL} \rightleftharpoons \mathrm{P} + \mathrm{L}$ in dilute solution, the **dissociation constant** is
$$
K_\mathrm{d} = \frac{[\mathrm{P}][\mathrm{L}]}{[\mathrm{PL}]},
$$
with units of concentration (its reciprocal $K_\mathrm{a} = 1/K_\mathrm{d}$ is the association constant). The **fractional saturation** $\theta$ (for oxygen carriers usually written $Y$) is the fraction of binding sites occupied:
$$
\theta = \frac{[\mathrm{PL}]}{[\mathrm{P}] + [\mathrm{PL}]} = \frac{[\mathrm{L}]}{K_\mathrm{d} + [\mathrm{L}]},
$$ {#eq-hyperbola}
where $[\mathrm{L}]$ is the concentration of *free* ligand. For a gas such as $\mathrm{O_2}$ the dissolved concentration is proportional to its partial pressure (Henry's law), so the same equation reads $Y = p_{\mathrm{O_2}}/(P_{50} + p_{\mathrm{O_2}})$, where $P_{50}$ is the partial pressure at which half the sites are filled. A small $K_\mathrm{d}$ or $P_{50}$ means high affinity.
:::

The hyperbola [[#eq-hyperbola]] follows by dividing numerator and denominator of the first expression by $[\mathrm{PL}]$ and using $[\mathrm{P}]/[\mathrm{PL}] = K_\mathrm{d}/[\mathrm{L}]$. It describes a rectangular hyperbola. Three facts about it are worth knowing by heart. First, $\theta = \tfrac12$ exactly when $[\mathrm{L}] = K_\mathrm{d}$: *the dissociation constant is the ligand concentration that half-saturates the protein*. Second, the curve is slow to finish: going from $10\ \%$ to $90\ \%$ saturation needs an 81-fold increase in ligand concentration ($[\mathrm{L}] = K_\mathrm{d}/9$ to $9K_\mathrm{d}$). Third, the standard Gibbs energy of binding is
$$
\Delta_\mathrm{bind}G^\circ = -RT\ln K_\mathrm{a} = RT\ln\frac{K_\mathrm{d}}{c^\circ},
$$
with $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, so each factor of ten in affinity is worth $RT\ln 10 = 5.7\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$ — a single hydrogen bond, more or less. The origins of that free energy in hydrogen bonds, electrostatics and the hydrophobic effect are those of [[biochemistry/water-noncovalent#def-hydrophobic]].

::: example A nanomolar binder {#ex-nanomolar}
A protein binds its ligand with $K_\mathrm{d} = 10\ \mathrm{nmol\,dm^{-3}}$ at $298\ \mathrm{K}$. Calculate $\Delta_\mathrm{bind}G^\circ$ and the fractional saturation when the free ligand concentration is $10\ \mathrm{nmol\,dm^{-3}}$, $100\ \mathrm{nmol\,dm^{-3}}$ and $1\ \mu\mathrm{mol\,dm^{-3}}$.
::: solution
$$
\Delta_\mathrm{bind}G^\circ = RT\ln\frac{K_\mathrm{d}}{c^\circ} = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})\ln(1.0\times10^{-8}) = -45.7\ \mathrm{kJ\,mol^{-1}}.
$$
From [[#eq-hyperbola]]: at $[\mathrm{L}] = K_\mathrm{d}$, $\theta = 0.50$; at $10K_\mathrm{d}$, $\theta = 10/11 = 0.909$; at $100K_\mathrm{d}$, $\theta = 100/101 = 0.990$. Even with a hundredfold excess of free ligand over $K_\mathrm{d}$, one site in a hundred is empty. Note the word *free*: if the protein concentration is comparable to $K_\mathrm{d}$, binding depletes the ligand and the total ligand added is not the free concentration — [[#exr-depletion]] treats that case.
:::
:::

## Myoglobin, haemoglobin and the haem group

Oxygen is a poor ligand for a protein. It is small, nonpolar and has no hydrogen-bonding groups, and no amino-acid side chain binds it reversibly. Nature therefore uses a metal: the **haem** group, a protoporphyrin IX ring holding an iron(II) ion by its four pyrrole nitrogens. In both myoglobin and haemoglobin the iron is five-coordinate in the deoxy state — four porphyrin nitrogens and the imidazole of the **proximal histidine** (His F8, the eighth residue of helix F) — and $\mathrm{O_2}$ binds at the sixth, open position. A second histidine, the **distal histidine** (His E7), sits on the far side and hydrogen-bonds to the bound oxygen.

The protein matters as much as the metal. Free haem in water is oxidised in seconds: two haems and an $\mathrm{O_2}$ form a μ-peroxo bridge, and the iron ends as $\mathrm{Fe^{3+}}$, which no longer binds oxygen. Buried in the hydrophobic pocket of the globin, the haem cannot meet a partner, so it binds $\mathrm{O_2}$ reversibly as $\mathrm{Fe(II){-}O_2}$ (often described as $\mathrm{Fe(III){-}O_2^{-}}$, a superoxide-like adduct, which is why the distal histidine's hydrogen bond helps). Slow oxidation still happens in red cells, giving **methaemoglobin**, and an enzyme (methaemoglobin reductase) returns the iron to $\mathrm{Fe^{2+}}$. The pocket also discriminates against carbon monoxide: free haem binds CO about 20 000 times more strongly than $\mathrm{O_2}$, but in the globins the preference falls to roughly 200 times, partly because the distal histidine hydrogen-bonds bound $\mathrm{O_2}$ but not CO. Carbon monoxide is toxic because even this reduced preference lets it occupy haem sites and, by the cooperativity described below, makes the remaining oxygen harder to release.

**Myoglobin** (Mb) is a single polypeptide of 153 residues, folded into eight α helices (A–H) around one haem. It stores oxygen in muscle and speeds its diffusion, and it binds $\mathrm{O_2}$ with a hyperbolic curve and $P_{50} \approx 2.8\ \mathrm{Torr}$ ($0.37\ \mathrm{kPa}$). **Haemoglobin** (Hb) is a tetramer, $\alpha_2\beta_2$, of two kinds of chain (141 and 146 residues) each folded like myoglobin and each carrying a haem; in red cells at $\mathrm{pH}$ 7.4 it has $P_{50} \approx 26\ \mathrm{Torr}$ ($3.5\ \mathrm{kPa}$) and a sigmoid curve. (Values from Berg, Tymoczko, Gatto and Stryer, 9th ed.; $1\ \mathrm{Torr} = 1\ \mathrm{mmHg} = 133.3\ \mathrm{Pa}$.) The tetramer is best thought of as a dimer of $\alpha\beta$ dimers: the $\alpha_1\beta_1$ contact is extensive and rigid, while the $\alpha_1\beta_2$ contact, where the two dimers meet, is where the action of cooperativity happens.

::: example Why blood needs haemoglobin {#ex-capacity}
Human blood contains about $150\ \mathrm{g\,dm^{-3}}$ of haemoglobin ($M \approx 64\,500\ \mathrm{g\,mol^{-1}}$ for the tetramer). The solubility of $\mathrm{O_2}$ in plasma at $37\ \mathrm{^\circ C}$ is about $1.3\ \mu\mathrm{mol\,dm^{-3}}$ per Torr. Compare the oxygen carried by fully saturated haemoglobin with that dissolved at $p_{\mathrm{O_2}} = 100\ \mathrm{Torr}$.
::: solution
The tetramer concentration is $150/64\,500 = 2.33\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, and with four haems each there are $9.30\ \mathrm{mmol\,dm^{-3}}$ of oxygen sites. Dissolved oxygen at $100\ \mathrm{Torr}$ is $100 \times 1.3\ \mu\mathrm{mol\,dm^{-3}} = 0.13\ \mathrm{mmol\,dm^{-3}}$. The ratio is $9.30/0.13 \approx 72$: haemoglobin multiplies the oxygen-carrying capacity of blood about seventyfold. In volume terms, $9.30\ \mathrm{mmol}$ of $\mathrm{O_2}$ per litre is about $0.21\ \mathrm{dm^3}$ measured at $0\ \mathrm{^\circ C}$ and $1\ \mathrm{atm}$ ($22.4\ \mathrm{dm^3\,mol^{-1}}$) — the familiar "20 mL of oxygen per 100 mL of blood". Without a carrier the heart would have to pump some seventy times faster.
:::
:::

## Cooperativity and the Hill equation

Plot the saturation of myoglobin and of haemoglobin against $p_{\mathrm{O_2}}$ and the difference is unmistakable: myoglobin rises steeply and is $90\ \%$ full by $25\ \mathrm{Torr}$; haemoglobin starts slowly, as if reluctant, then rises steeply around $20$–$40\ \mathrm{Torr}$ and levels off. The S shape means that binding at one haem increases the affinity of the others: **positive cooperativity**. A simple way to quantify it was proposed by Archibald Hill in 1910, before anyone knew that haemoglobin had four sites.

::: proposition The Hill equation {#prop-hill}
Suppose a protein with $n$ sites binds ligand in an all-or-none manner, so that only the empty form $\mathrm{P}$ and the fully loaded form $\mathrm{PL}_n$ are present in appreciable amounts: $\mathrm{P} + n\,\mathrm{L} \rightleftharpoons \mathrm{PL}_n$. Then the fractional saturation is
$$
Y = \frac{[\mathrm{L}]^{n}}{K_{0.5}^{\,n} + [\mathrm{L}]^{n}}, \qquad \log\frac{Y}{1 - Y} = n\log[\mathrm{L}] - n\log K_{0.5},
$$ {#eq-hill}
where $K_{0.5}$ is the ligand concentration (or $P_{50}$, the partial pressure) at half-saturation. For real proteins the all-or-none assumption is never exact; the equation is then used empirically with $n$ replaced by the **Hill coefficient** $n_\mathrm{H}$, defined as the slope of the **Hill plot** of $\log[Y/(1-Y)]$ against $\log[\mathrm{L}]$ at $Y = \tfrac12$. For a protein with $n$ identical sites, $n_\mathrm{H} = 1$ means no cooperativity, $1 < n_\mathrm{H} \le n$ positive cooperativity and $n_\mathrm{H} < 1$ negative cooperativity (or a mixture of sites of different affinity).
:::

::: proof Derivation from the all-or-none equilibrium
Write the overall dissociation constant $K = [\mathrm{P}][\mathrm{L}]^n/[\mathrm{PL}_n]$, which has units of concentration to the power $n$; define $K_{0.5}$ by $K = K_{0.5}^{\,n}$. The fraction of sites occupied is the number of occupied sites, $n[\mathrm{PL}_n]$, divided by the total number of sites, $n([\mathrm{P}] + [\mathrm{PL}_n])$:
$$
Y = \frac{[\mathrm{PL}_n]}{[\mathrm{P}] + [\mathrm{PL}_n]} = \frac{[\mathrm{L}]^n/K}{1 + [\mathrm{L}]^n/K} = \frac{[\mathrm{L}]^n}{K_{0.5}^{\,n} + [\mathrm{L}]^n}.
$$
At $[\mathrm{L}] = K_{0.5}$ the two terms in the denominator are equal and $Y = \tfrac12$, which justifies the name. Dividing $Y$ by $1 - Y = K_{0.5}^{\,n}/(K_{0.5}^{\,n} + [\mathrm{L}]^n)$ gives $Y/(1-Y) = ([\mathrm{L}]/K_{0.5})^n$, and taking logarithms gives the straight line of [[#eq-hill]] with slope $n$. For $n = 1$ the equation reduces to the hyperbola [[#eq-hyperbola]]. Because intermediate forms $\mathrm{PL}, \mathrm{PL}_2, \dots$ always exist in some amount, real binding is less abrupt than all-or-none, and the measured slope is smaller than the number of sites; it can be shown (Cornish-Bowden, *Fundamentals of Enzyme Kinetics*) that for positive cooperativity it can never exceed $n$.
:::

Human haemoglobin has $n_\mathrm{H} \approx 2.8$, well short of four: it is strongly but not perfectly cooperative. Hill plots of haemoglobin are in fact straight only in the middle; at very low and very high saturation their slope returns to 1, because there binding is to an almost pure population of one conformation. The two asymptotes, displaced from each other, measure the affinities of the low- and high-affinity states — a direct picture of the two-state model of the next section.

A Hill plot is easy to make from data. The figure shows synthetic haemoglobin data from the central region of the curve; the least-squares slope is the Hill coefficient and the $x$-intercept is $\log_{10}P_{50}$.

::: widget regression
points: 0.903,-1.40; 1.079,-0.95; 1.255,-0.43; 1.415,0.02; 1.556,0.38; 1.699,0.81; 1.875,1.27
degree: 1
residuals: true
caption: Hill plot of synthetic haemoglobin data: $y = \log_{10}[Y/(1-Y)]$ against $x = \log_{10}(p_{\mathrm{O_2}}/\mathrm{Torr})$, generated from $n_\mathrm{H} = 2.8$ and $P_{50} = 26\ \mathrm{Torr}$ with small perturbations. The fitted slope is $n_\mathrm{H}$ and the line crosses zero at $\log_{10}P_{50} \approx 1.41$. Drag points to see how measurement error at the extremes of saturation, where $Y/(1-Y)$ is most sensitive, moves the slope.
:::

The figure compares the three curves that matter: myoglobin, haemoglobin, and an imaginary *non-cooperative* haemoglobin with the same $P_{50}$. Change $P_{50}$ and $n$ to see what the S shape buys.

::: widget plot
f: x/(x + 2.8); x^n/(x^n + p^n); x/(x + p)
x: 0, 110
y: 0, 1.05
sliders: p=26:5:60:1; n=2.8:1:4:0.1
labels: \text{myoglobin}; \text{haemoglobin (Hill)}; \text{non-cooperative, same } P_{50}
vlines: 20; 40; 100
caption: Oxygen saturation $Y$ against $p_{\mathrm{O_2}}$ (the $x$ axis, in Torr). Myoglobin is a hyperbola with $P_{50} = 2.8\ \mathrm{Torr}$; haemoglobin is drawn with the Hill equation, $P_{50} = p$ and Hill coefficient $n$ (defaults $26\ \mathrm{Torr}$ and $2.8$); the third curve is a hyperbola with the same $P_{50}$. The vertical lines mark exercising muscle ($20$), resting tissue ($40$) and the lungs ($100\ \mathrm{Torr}$). Raise $p$ to mimic the Bohr effect or 2,3-BPG; set $n = 1$ and the sigmoid curve collapses onto the hyperbola and delivers far less oxygen between $100$ and $20\ \mathrm{Torr}$.
:::

::: example Oxygen delivery to resting and working muscle {#ex-o2-delivery}
Using the Hill equation with $P_{50} = 26\ \mathrm{Torr}$ and $n_\mathrm{H} = 2.8$ for haemoglobin, and a hyperbola with $P_{50} = 2.8\ \mathrm{Torr}$ for myoglobin, calculate the fraction of its capacity that each protein releases between the lungs ($100\ \mathrm{Torr}$) and (a) resting tissue ($40\ \mathrm{Torr}$), (b) exercising muscle ($20\ \mathrm{Torr}$). Compare with a hypothetical non-cooperative protein with $P_{50} = 26\ \mathrm{Torr}$.
::: solution
**Haemoglobin.** $Y(100) = 100^{2.8}/(100^{2.8} + 26^{2.8})$. With $\log(100/26) = 0.585$, $(100/26)^{2.8} = 10^{1.638} = 43.5$, so $Y = 43.5/44.5 = 0.978$. At $40\ \mathrm{Torr}$, $(40/26)^{2.8} = 3.34$ and $Y = 0.770$; at $20\ \mathrm{Torr}$, $(20/26)^{2.8} = 0.480$ and $Y = 0.324$. Released: (a) $0.978 - 0.770 = 0.21$; (b) $0.978 - 0.324 = 0.65$.

**Non-cooperative protein, $P_{50} = 26\ \mathrm{Torr}$.** $Y(100) = 100/126 = 0.794$, $Y(40) = 40/66 = 0.606$, $Y(20) = 20/46 = 0.435$. Released: (a) $0.19$; (b) $0.36$.

**Myoglobin.** $Y(100) = 100/102.8 = 0.973$ and $Y(20) = 20/22.8 = 0.877$: it would release less than $0.10$ of its oxygen even to working muscle.

The cooperative carrier loads almost completely in the lungs *and* gives up two-thirds of its load to working muscle, nearly twice what the non-cooperative protein manages; and it keeps a large reserve at rest (only a fifth is released at $40\ \mathrm{Torr}$) that becomes available exactly when the tissue $p_{\mathrm{O_2}}$ falls. Myoglobin's high affinity is the opposite design: it holds oxygen in muscle and gives it up only when the cell is nearly anoxic, which is what a store should do — and oxygen therefore flows downhill from haemoglobin to myoglobin.
:::
:::

::: warning The Hill coefficient is not the number of binding sites {#warn-hill}
It is tempting to read $n_\mathrm{H} = 2.8$ as "haemoglobin binds 2.8 oxygen molecules" or to use the Hill equation as a mechanism. Both are wrong. Haemoglobin binds four $\mathrm{O_2}$; the Hill coefficient is a *measure of cooperativity* — the steepness of the binding curve at half-saturation — and its maximum possible value is the number of sites, reached only in the unphysical all-or-none limit. A protein with $n_\mathrm{H} = 1$ may still have several sites (independent ones), and $n_\mathrm{H} < 1$ can arise from heterogeneous sites rather than true negative cooperativity. Nor is $K_{0.5}$ a dissociation constant of any individual step: it is the half-saturation concentration of the whole binding curve. To learn what each step does you need a model with explicit states, such as the one that follows.
:::

## Allostery: the concerted and sequential models

**Allostery** (Greek *allos*, other, and *stereos*, solid) is the regulation of a protein's activity at one site by binding at another, spatially distinct site, transmitted through a change of conformation. Cooperativity is the special case in which the ligand regulates its own binding (a **homotropic** effect); regulation by a different molecule — protons, $\mathrm{CO_2}$ and 2,3-BPG for haemoglobin, or the end product of a pathway for an enzyme — is a **heterotropic** effect. The structural basis in haemoglobin was found by Max Perutz: the deoxy tetramer has a **T** (tense) quaternary structure, constrained by salt bridges between subunits, and the oxy tetramer an **R** (relaxed) structure, in which one $\alpha\beta$ dimer has rotated by about $15^\circ$ relative to the other.

How does binding of $\mathrm{O_2}$ flip the switch? In deoxyhaemoglobin the high-spin $\mathrm{Fe^{2+}}$ ion is too large to sit in the porphyrin plane and lies about $0.4\ \text{Å}$ out of it towards the proximal histidine, and the porphyrin is domed. On binding oxygen the iron becomes low-spin, smaller, and moves into the plane, pulling His F8 and the whole F helix with it. That movement is transmitted to the $\alpha_1\beta_2$ interface, where the T structure's salt bridges are strained and eventually broken. Once enough subunits have bound oxygen, the T structure is no longer the more stable one and the whole tetramer snaps into R — in which the remaining empty haems, released from the constraints, have a higher affinity.

::: proposition The Monod–Wyman–Changeux (concerted) model {#prop-mwc}
Assume that an oligomeric protein of $n$ identical subunits exists in two conformations, R and T, in which **all subunits change together** (symmetry is conserved); that each site binds ligand independently with dissociation constant $K_\mathrm{R}$ in the R state and $K_\mathrm{T}$ in the T state; and that in the absence of ligand the two are in equilibrium with $L = [\mathrm{T}_0]/[\mathrm{R}_0]$ (the **allosteric constant**). With $\alpha = [\mathrm{L}]/K_\mathrm{R}$ and $c = K_\mathrm{R}/K_\mathrm{T}$,
$$
Y = \frac{\alpha(1 + \alpha)^{n-1} + Lc\alpha(1 + c\alpha)^{n-1}}{(1 + \alpha)^n + L(1 + c\alpha)^n},
$$ {#eq-mwc}
and the fraction of molecules in the R state is $(1 + \alpha)^n/[(1 + \alpha)^n + L(1 + c\alpha)^n]$. Binding is cooperative when $L \gg 1$ and $c \ll 1$: the protein starts mostly in the low-affinity T state and is pulled into the high-affinity R state by its ligand. Heterotropic activators act by lowering $L$, inhibitors by raising it.
:::

::: proof Counting states with a binding polynomial
Let $\mathrm{R}_i$ be the R conformer with $i$ ligands bound. Each site binds independently, and there are $\binom{n}{i}$ ways to choose which $i$ sites are filled, so the equilibria give $[\mathrm{R}_i] = [\mathrm{R}_0]\binom{n}{i}\alpha^i$, where each microscopic binding contributes a factor $[\mathrm{L}]/K_\mathrm{R} = \alpha$. Likewise $[\mathrm{T}_i] = [\mathrm{T}_0]\binom{n}{i}(c\alpha)^i = L[\mathrm{R}_0]\binom{n}{i}(c\alpha)^i$. By the binomial theorem, the total protein is
$$
\sum_i\bigl([\mathrm{R}_i] + [\mathrm{T}_i]\bigr) = [\mathrm{R}_0]\bigl[(1 + \alpha)^n + L(1 + c\alpha)^n\bigr] = [\mathrm{R}_0]\,Z(\alpha),
$$
which defines the **binding polynomial** $Z$. The number of occupied sites is $\sum_i i\,([\mathrm{R}_i] + [\mathrm{T}_i])$, and since $\sum_i i\binom{n}{i}x^i = x\,\mathrm{d}(1 + x)^n/\mathrm{d}x = nx(1 + x)^{n-1}$, it equals $[\mathrm{R}_0]\,n[\alpha(1 + \alpha)^{n-1} + Lc\alpha(1 + c\alpha)^{n-1}]$. Dividing by the total number of sites, $n[\mathrm{R}_0]Z$, gives [[#eq-mwc]]. (Equivalently, $Y = (\alpha/n)\,\mathrm{d}\ln Z/\mathrm{d}\alpha$, the general rule for any binding polynomial.) The R fraction is the R part of $Z$ divided by $Z$. As checks: $L = 0$ gives $Y = \alpha/(1 + \alpha)$, a hyperbola with $K_\mathrm{R}$; $L \to \infty$ gives a hyperbola with $K_\mathrm{T}$; $c = 1$ (equal affinities) gives a hyperbola whatever $L$ is — cooperativity requires the two states to differ in affinity.
:::

::: example An MWC tetramer {#ex-mwc}
For a tetramer with $L = 1.0\times10^4$ and $c = 0.010$, find the fraction of molecules in the R state and the saturation $Y$ at $\alpha = 0$, $1$, $10$ and $100$. What is the free-energy difference between binding to an R site and to a T site at $298\ \mathrm{K}$?
::: solution
With $Z = (1 + \alpha)^4 + 10^4(1 + 0.01\alpha)^4$:

- $\alpha = 0$: $Z = 1 + 10^4$; R fraction $= 1/10\,001 = 1.0\times10^{-4}$; $Y = 0$.
- $\alpha = 1$: $(2)^4 = 16$ and $10^4(1.01)^4 = 10\,406$; R fraction $= 16/10\,422 = 1.5\times10^{-3}$; the numerator of [[#eq-mwc]] is $1\cdot 2^3 + 10^4(0.01)(1.01)^3 = 8 + 103.0 = 111.0$, so $Y = 111.0/10\,422 = 0.011$.
- $\alpha = 10$: $11^4 = 14\,641$ and $10^4(1.1)^4 = 14\,641$ — equal; R fraction $= 0.50$; numerator $= 10(1331) + 10^4(0.01)(10)(1.331) = 13\,310 + 1331 = 14\,641$, so $Y = 14\,641/29\,282 = 0.50$.
- $\alpha = 100$: $101^4 = 1.0406\times10^8$ and $10^4(2)^4 = 1.6\times10^5$; R fraction $= 0.998$; $Y = 0.989$.

At $\alpha = 1$, where a non-cooperative R-state protein would be half full, this tetramer is only $1\ \%$ full, because nearly all molecules are in T; by $\alpha = 100$ it is $99\ \%$ full and almost all R. Half-saturation needs $[\mathrm{L}] = 10K_\mathrm{R}$, which happens because these numbers satisfy $Lc^{n/2} = 1$ ([[#exr-mwc-symmetry]]), and a numerical slope of the Hill plot there gives $n_\mathrm{H} = 3.0$. The per-site affinity ratio $c = K_\mathrm{R}/K_\mathrm{T} = 0.01$ corresponds to $\Delta\Delta G^\circ = -RT\ln c = (8.314)(298.15)\ln 100 = 11.4\ \mathrm{kJ\,mol^{-1}}$ more favourable binding to R. Each ligand bound shifts the conformational balance by a factor of $1/c$ per site — after two ligands, $L c^2 = 1$ and R and T are equally populated.
:::
:::

The figure plots [[#eq-mwc]] with the two pure-state hyperbolas. Raising $L$ (adding an inhibitor) moves the curve right and steepens it; lowering $L$ moves it left towards the R hyperbola.

::: widget plot
f: (x*(1 + x)^3 + 10^l*c*x*(1 + c*x)^3)/((1 + x)^4 + 10^l*(1 + c*x)^4); x/(1 + x); c*x/(1 + c*x)
x: 0, 80
y: 0, 1.05
sliders: l=4:0:6:0.25; c=0.01:0.001:0.2:0.001
labels: \text{MWC tetramer}; \text{pure R}; \text{pure T}
hlines: 0.5
caption: The concerted model for a tetramer: saturation $Y$ against $\alpha = [\mathrm{L}]/K_\mathrm{R}$ (the $x$ axis), with $\log_{10}L = l$ and $c = K_\mathrm{R}/K_\mathrm{T}$ set by the sliders (defaults $L = 10^4$, $c = 0.01$, the values of the worked example, which half-saturate at $\alpha = 10$). The other two curves are the hyperbolas of pure R and pure T, between which the MWC curve crosses as the ligand drives T into R. Set $l = 0$ and the protein starts half in R, so binding looks nearly hyperbolic; raise $c$ towards 1 and cooperativity disappears whatever $L$ is.
:::

The concerted model has a rival. In the **sequential model** of Daniel Koshland, George Némethy and David Filmer (1966), each subunit changes conformation individually when it binds ligand (induced fit), and the changed subunit alters the affinity of its neighbours through their interfaces; mixed tetramers with some subunits in each shape are allowed. The sequential model can produce negative as well as positive cooperativity, which the concerted model cannot, whereas the concerted model explains with few parameters how heterotropic effectors act on the whole oligomer. Haemoglobin behaves largely in a concerted way at the level of quaternary structure, with sequential, tertiary changes within each conformation; many enzymes, such as aspartate transcarbamoylase (inhibited by CTP and activated by ATP), fit the concerted model well, and some show the negative cooperativity only the sequential model allows.

## Regulators of oxygen binding

The oxygen affinity of haemoglobin is not a fixed property; it is tuned continuously by heterotropic effectors, all of which bind preferentially to the T state and so raise $P_{50}$ (a "right shift" of the curve).

**Protons and the Bohr effect.** Lowering the pH lowers the oxygen affinity of haemoglobin. In the T state several groups — notably His146 at the C-terminus of each β chain, whose imidazolium forms a salt bridge with Asp94, and the α-chain N-terminal amino groups — have higher $\mathrm{p}K_\mathrm{a}$ values than in R, because their positive charge is stabilised by nearby negative groups. Protons therefore bind T more strongly than R, and by the linkage principle (if A favours B, then B favours A), oxygen binding releases protons:
$$
\mathrm{HHb^{+}} + \mathrm{O_2} \rightleftharpoons \mathrm{HbO_2} + \mathrm{H^+}
$$
(written per haem, with about 0.5 proton released per $\mathrm{O_2}$ bound under physiological conditions). For human blood the Bohr coefficient $\Delta\log P_{50}/\Delta\mathrm{pH}$ is about $-0.48$. Metabolically active tissue produces acid (lactic acid, and carbonic acid from $\mathrm{CO_2}$), so exactly where oxygen is needed it is released more readily; in the lungs the reverse happens.

**Carbon dioxide.** Most $\mathrm{CO_2}$ travels as bicarbonate, made by carbonic anhydrase in red cells, $\mathrm{CO_2 + H_2O \rightleftharpoons HCO_3^- + H^+}$, and its protons contribute to the Bohr effect; the bicarbonate buffer itself is treated in [[biochemistry/water-noncovalent#ex-bicarbonate]]. A further part reacts directly with the uncharged N-terminal amino groups of the globin chains to form **carbamates**,
$$
\mathrm{R{-}NH_2 + CO_2 \rightleftharpoons R{-}NH{-}COO^- + H^+},
$$
the lone pair of the amine attacking the electrophilic carbon of $\mathrm{CO_2}$. The negatively charged carbamate forms additional salt bridges that stabilise T, so $\mathrm{CO_2}$ lowers the oxygen affinity by itself as well as through its protons.

**2,3-Bisphosphoglycerate.** Haemoglobin stripped of all effectors binds oxygen almost as tightly as myoglobin ($P_{50}$ about $1\ \mathrm{Torr}$, Berg et al.). Red cells contain 2,3-bisphosphoglycerate (2,3-BPG), a by-product of glycolysis, at a concentration similar to that of haemoglobin. One molecule, carrying about five negative charges, binds in the central cavity of the T tetramer between the two β chains, where it is held by a ring of positive groups (His2, Lys82 and His143 of each β chain); in R the cavity is too narrow to accommodate it. By stabilising T, 2,3-BPG raises $P_{50}$ to the observed $26\ \mathrm{Torr}$. Its level rises during adaptation to high altitude, shifting the curve to the right and favouring unloading.

**Fetal haemoglobin.** Fetal haemoglobin, $\alpha_2\gamma_2$, has serine in place of His143 in the γ chains, removing two positive charges from the BPG site. It binds 2,3-BPG more weakly, is less stabilised in T and so has a higher oxygen affinity ($P_{50}$ about $19\ \mathrm{Torr}$ in fetal blood) — which is how the fetus draws oxygen from its mother's blood across the placenta ([[#exr-fetal]]).

::: example The Bohr effect in working muscle {#ex-bohr}
In working muscle the capillary pH falls from $7.4$ to about $7.2$. Using a Bohr coefficient of $-0.48$, find the new $P_{50}$ and the fraction of capacity released between the lungs ($100\ \mathrm{Torr}$, pH $7.4$, $P_{50} = 26\ \mathrm{Torr}$) and the muscle ($20\ \mathrm{Torr}$, pH $7.2$), keeping $n_\mathrm{H} = 2.8$.
::: solution
$\Delta\log P_{50} = (-0.48)(7.2 - 7.4) = +0.096$, so $P_{50} = 26 \times 10^{0.096} = 32.4\ \mathrm{Torr}$. At the muscle, $(20/32.4)^{2.8} = 0.258$ and $Y = 0.258/1.258 = 0.205$. The blood arrives with $Y = 0.978$ (from [[#ex-o2-delivery]]), so it releases $0.978 - 0.205 = 0.77$ of its capacity, compared with $0.65$ at constant pH. A pH change of only 0.2 units increases oxygen delivery by a fifth, without any change in the oxygen pressure gradient: the allosteric effector reads the metabolic state of the tissue and adjusts the carrier.
:::
:::

::: quiz
Which change shifts the oxygen-binding curve of haemoglobin to the *left* (higher affinity, lower $P_{50}$)?
- [ ] Adding 2,3-bisphosphoglycerate
- [ ] Lowering the pH from 7.4 to 7.2
- [ ] Raising the partial pressure of $\mathrm{CO_2}$
- [x] Raising the pH from 7.4 to 7.6
::: solution
Protons, $\mathrm{CO_2}$ (as carbamate and through its protons) and 2,3-BPG all bind preferentially to the T state, stabilise it and raise $P_{50}$ — right shifts. Raising the pH removes protons from the T-state salt bridges, favours R and lowers $P_{50}$, which is what happens to blood in the lungs as $\mathrm{CO_2}$ is exhaled.
:::
:::

## When the switch breaks: sickle-cell haemoglobin

The importance of every residue in an allosteric machine is shown most starkly by **sickle-cell disease**. In haemoglobin S, glutamate at position 6 of the β chain is replaced by valine (β Glu6Val), the result of a single base change in the β-globin gene ([[biochemistry/nucleic-acids#def-code]]). The new valine is on the surface, where it creates a hydrophobic patch. In the deoxy (T) state that patch fits into a complementary hydrophobic pocket (formed by Phe85 and Leu88 of the β chain) on a neighbouring tetramer, and deoxy-HbS polymerises into long fibres that distort red cells into the sickle shape, block capillaries and shorten the cells' life. Oxy-HbS does not polymerise, because in the R structure the pocket is hidden. The disease is thus a disorder of conformational equilibrium: anything that increases the fraction of deoxy haemoglobin in the cell favours polymerisation, and approaches that raise the oxygen affinity of HbS or increase fetal haemoglobin (which does not co-polymerise) aim to shift that equilibrium. Carriers of one copy of the gene (sickle-cell trait) are partially protected against *Plasmodium falciparum* malaria, which is why the allele is common where malaria has been endemic.

## Where this leads

The two pictures of this chapter — saturation curves and two-state switches — return throughout biochemistry. Enzymes that obey simple Michaelis–Menten kinetics have hyperbolic rate curves exactly like [[#eq-hyperbola]], with $K_\mathrm{M}$ in the role of $K_\mathrm{d}$, while allosteric enzymes have sigmoid curves analysed with the Hill and MWC equations ([[biochemistry/enzymes#prop-mm]] and the regulation section of [[biochemistry/enzymes]]). The irreversible steps of glycolysis and the citric acid cycle are controlled by allosteric effectors in [[biochemistry/glycolysis-citric-acid]], and 2,3-BPG itself is made by a side branch of glycolysis. Receptor occupancy, the logic of agonists and antagonists, and binding free energies in drug design are developed in [[medicinal-chemistry/drug-binding]]. The statistical-mechanical meaning of the binding polynomial — a partition function over ligation states — is the subject of [[statistical-thermodynamics/partition-function]], and the spin-state change of iron that triggers the T→R transition is the crystal-field chemistry of [[coordination-chemistry]].

::: history
The physiology came before the chemistry. In 1904 Christian Bohr, Karl Hasselbalch and August Krogh showed that carbon dioxide lowers the oxygen affinity of blood, the effect that bears Bohr's name. Archibald Vivian Hill proposed his empirical equation in 1910 to fit the sigmoid oxygen-binding curve, and in 1925 Gilbert Adair showed from osmotic-pressure measurements that haemoglobin is a tetramer of about $68\,000\ \mathrm{g\,mol^{-1}}$ and wrote the four-step binding equation that bears his name. Linus Pauling, Harvey Itano, S. Jonathan Singer and Ibert Wells showed in 1949 by electrophoresis that sickle-cell haemoglobin differs in charge from the normal protein, calling it a "molecular disease", and Vernon Ingram located the difference in 1956–57 as a single glutamate-to-valine change. Max Perutz, after more than twenty years of work, obtained the structure of horse oxyhaemoglobin at $5.5\ \text{Å}$ in 1960 (two years after John Kendrew's myoglobin), sharing the 1962 Nobel Prize in Chemistry with Kendrew; his 1970 stereochemical mechanism linked the movement of the iron to the change of quaternary structure. The concerted model of Jacques Monod, Jeffries Wyman and Jean-Pierre Changeux appeared in 1965, the sequential model of Koshland, Némethy and Filmer in 1966, and in 1967 Reinhold and Ruth Benesch, and independently Arnold Chanutin and Rosa Curnish, discovered that 2,3-BPG regulates the oxygen affinity of haemoglobin in red cells.
:::

::: summary
- A single-site binding equilibrium has $\theta = [\mathrm{L}]/(K_\mathrm{d} + [\mathrm{L}])$: half-saturation at $[\mathrm{L}] = K_\mathrm{d}$, an 81-fold range from 10 % to 90 %, and $\Delta_\mathrm{bind}G^\circ = RT\ln(K_\mathrm{d}/c^\circ)$, about $5.7\ \mathrm{kJ\,mol^{-1}}$ per factor of ten.
- Myoglobin and haemoglobin bind $\mathrm{O_2}$ at a five-coordinate $\mathrm{Fe^{2+}}$ haem held by the proximal histidine; the globin prevents oxidation and reduces the preference for CO.
- Myoglobin binds hyperbolically ($P_{50} \approx 2.8\ \mathrm{Torr}$); haemoglobin, an $\alpha_2\beta_2$ tetramer, binds cooperatively ($P_{50} \approx 26\ \mathrm{Torr}$, $n_\mathrm{H} \approx 2.8$) and delivers about twice as much oxygen to working muscle as a non-cooperative carrier would.
- The Hill coefficient measures the steepness of binding at half-saturation; it is at most the number of sites and is not a stoichiometry.
- In the MWC model a symmetric oligomer switches between T (low affinity) and R (high affinity); cooperativity needs $L \gg 1$ and $c \ll 1$, and heterotropic effectors act by changing $L$.
- Protons (Bohr effect), $\mathrm{CO_2}$ (bicarbonate and carbamates) and 2,3-BPG stabilise T and raise $P_{50}$, so oxygen is released where tissue is active; fetal haemoglobin binds 2,3-BPG weakly and has higher affinity.
- Sickle-cell haemoglobin (β Glu6Val) polymerises in the T state, a disease of conformational equilibrium.
:::

## Exercises

::: exercise Myoglobin saturation {level=1 check="0.915"}
Myoglobin has $P_{50} = 2.8\ \mathrm{Torr}$. What fraction of its sites are occupied at $p_{\mathrm{O_2}} = 30\ \mathrm{Torr}$? (Enter $Y$ to three significant figures.)
::: solution
$Y = p/(P_{50} + p) = 30/(2.8 + 30) = 30/32.8 = 0.915$. Myoglobin is over 90 % full even at a pressure where haemoglobin is only about 60 % full (next exercises), which is why oxygen passes from haemoglobin to myoglobin in muscle.
:::
:::

::: exercise Free energy of a micromolar binder {level=1 check="-34.2"}
A hormone binds its receptor with $K_\mathrm{d} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$ at $298.15\ \mathrm{K}$. Calculate the standard Gibbs energy of binding (standard concentration $1\ \mathrm{mol\,dm^{-3}}$). (Enter $\Delta_\mathrm{bind}G^\circ$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta_\mathrm{bind}G^\circ = RT\ln(K_\mathrm{d}/c^\circ) = (8.314)(298.15)\ln(1.0\times10^{-6}) = -34\,246\ \mathrm{J\,mol^{-1}} = -34.2\ \mathrm{kJ\,mol^{-1}}$. Compared with the nanomolar binder of [[#ex-nanomolar]] ($-45.7\ \mathrm{kJ\,mol^{-1}}$), the difference is $11.4\ \mathrm{kJ\,mol^{-1}} = 2 \times RT\ln 10$: going from $1\ \mu\mathrm{mol\,dm^{-3}}$ to $10\ \mathrm{nmol\,dm^{-3}}$ is a factor of 100 in affinity, two factors of ten at $5.71\ \mathrm{kJ\,mol^{-1}}$ each.
:::
:::

::: exercise Ninety per cent occupancy {level=1 check="45"}
A protein with a single site has $K_\mathrm{d} = 5.0\ \mu\mathrm{mol\,dm^{-3}}$. What free ligand concentration gives $\theta = 0.90$? (Enter the concentration in $\mu\mathrm{mol\,dm^{-3}}$.)
::: solution
Rearranging [[#eq-hyperbola]], $[\mathrm{L}] = K_\mathrm{d}\,\theta/(1 - \theta) = 5.0 \times 0.90/0.10 = 45\ \mu\mathrm{mol\,dm^{-3}}$, nine times $K_\mathrm{d}$. Likewise $\theta = 0.10$ needs $K_\mathrm{d}/9$, which is the 81-fold range quoted in the text.
:::
:::

::: exercise Haemoglobin at 30 Torr {level=2 check="0.599"}
Using the Hill equation with $P_{50} = 26\ \mathrm{Torr}$ and $n_\mathrm{H} = 2.8$, calculate the saturation of haemoglobin at $30\ \mathrm{Torr}$. (Enter $Y$ to three significant figures.)
::: solution
$(30/26)^{2.8} = \exp[2.8\ln(1.1538)] = \exp(0.4007) = 1.493$, so $Y = 1.493/2.493 = 0.599$. A pressure only $4\ \mathrm{Torr}$ above $P_{50}$ raises the saturation from 0.50 to 0.60; for a hyperbola with the same $P_{50}$ it would be $30/56 = 0.536$. The steepness near $P_{50}$ is what cooperativity means.
:::
:::

::: exercise The Hill coefficient from two points {level=2 check="2.83"}
A sample of haemoglobin is 20 % saturated at $15\ \mathrm{Torr}$ and 80 % saturated at $40\ \mathrm{Torr}$. Assuming the Hill equation holds between these points, find $n_\mathrm{H}$ and $P_{50}$. (Enter $n_\mathrm{H}$ to three significant figures.)
::: hint
Write $\log[Y/(1-Y)]$ at both points and subtract.
:::
::: solution
$Y/(1-Y)$ is $0.25$ at $15\ \mathrm{Torr}$ and $4$ at $40\ \mathrm{Torr}$. From [[#eq-hill]], $n_\mathrm{H} = \Delta\log[Y/(1-Y)]/\Delta\log p = \log(4/0.25)/\log(40/15) = 1.2041/0.4260 = 2.83$. Because the two points are symmetric about $Y = \tfrac12$ ($0.25 \times 4 = 1$), $P_{50}$ is their geometric mean: $\sqrt{15 \times 40} = 24.5\ \mathrm{Torr}$.
:::
:::

::: exercise Ligand depletion {level=2 #exr-depletion check="0.730"}
A protein with one site ($K_\mathrm{d} = 0.10\ \mu\mathrm{mol\,dm^{-3}}$) is mixed with its ligand, both at a *total* concentration of $1.0\ \mu\mathrm{mol\,dm^{-3}}$. Find the concentration of complex, and compare the fractional saturation with the value obtained by wrongly using total ligand in [[#eq-hyperbola]]. (Enter $[\mathrm{PL}]$ in $\mu\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: hint
Write $[\mathrm{P}] = P_\mathrm{t} - x$ and $[\mathrm{L}] = L_\mathrm{t} - x$ with $x = [\mathrm{PL}]$, and solve the quadratic.
:::
::: solution
$K_\mathrm{d} = (P_\mathrm{t} - x)(L_\mathrm{t} - x)/x$ gives $x^2 - (P_\mathrm{t} + L_\mathrm{t} + K_\mathrm{d})x + P_\mathrm{t}L_\mathrm{t} = 0$, whose physical root is
$$
x = \frac{(P_\mathrm{t} + L_\mathrm{t} + K_\mathrm{d}) - \sqrt{(P_\mathrm{t} + L_\mathrm{t} + K_\mathrm{d})^2 - 4P_\mathrm{t}L_\mathrm{t}}}{2} = \frac{2.10 - \sqrt{4.41 - 4.00}}{2} = \frac{2.10 - 0.6403}{2} = 0.730\ \mu\mathrm{mol\,dm^{-3}}.
$$
So $\theta = 0.73$, and the free ligand is only $0.27\ \mu\mathrm{mol\,dm^{-3}}$ (check: $0.27 \times 0.27/0.73 = 0.10$). Using total ligand in the hyperbola would give $1.0/1.1 = 0.91$, an overestimate, because a quarter of the ligand added has been pulled out of solution by the protein. The hyperbola holds only for *free* ligand, which equals total ligand only when $P_\mathrm{t} \ll K_\mathrm{d}$ or $L_\mathrm{t} \gg P_\mathrm{t}$; tight-binding measurements must use the quadratic.
:::
:::

::: exercise Fetal and maternal haemoglobin {level=3 #exr-fetal check="18.3"}
In the placenta, maternal and fetal blood exchange oxygen at about $30\ \mathrm{Torr}$. Take $P_{50} = 26\ \mathrm{Torr}$ for maternal and $19\ \mathrm{Torr}$ for fetal blood, both with $n_\mathrm{H} = 2.8$. (a) Calculate both saturations at $30\ \mathrm{Torr}$ and their difference in percentage points. (b) Explain the molecular origin of the difference. (c) Why would a fetal oxygen carrier that bound like myoglobin (hyperbolic, $P_{50} = 3\ \mathrm{Torr}$) be a poor design for the fetus? (Enter the difference in (a) in percentage points to three significant figures.)
::: hint
Use the Hill equation twice; for (c), think about unloading in fetal tissues.
:::
::: solution
(a) Maternal: $Y = 0.599$ (as in the previous Hill exercise). Fetal: $(30/19)^{2.8} = \exp[2.8\ln(1.5789)] = \exp(1.2785) = 3.591$, so $Y = 3.591/4.591 = 0.782$. The difference is $78.2 - 59.9 = 18.3$ percentage points: at the same oxygen pressure, fetal haemoglobin holds substantially more oxygen, so oxygen moves from the mother's haemoglobin to the fetus's until the pressures equalise.
(b) The γ chains of fetal haemoglobin ($\alpha_2\gamma_2$) carry serine instead of the β chains' His143 at the 2,3-BPG site. With two fewer positive charges in the central cavity, 2,3-BPG binds the T state more weakly, T is less stabilised relative to R ($L$ is effectively smaller), and the curve lies to the left. In the absence of 2,3-BPG the two haemoglobins have similar affinities: the difference is heterotropic regulation, not a different haem.
(c) Affinity is only useful if the oxygen can be released again. With a hyperbola and $P_{50} = 3\ \mathrm{Torr}$ the fetal carrier would load fully at the placenta but would still be about 85–90 % saturated at the $20$–$25\ \mathrm{Torr}$ of fetal tissues (compare myoglobin in [[#ex-o2-delivery]]) and deliver little. The real design is a modest left shift, enough to win the exchange at the placenta, with the sigmoid shape preserved so the oxygen is given up in the tissues.
:::
:::

::: exercise Half-saturation of a symmetric MWC protein {level=3 #exr-mwc-symmetry}
(a) Show from [[#eq-mwc]] that if $Lc^{n/2} = 1$ then the MWC protein is exactly half-saturated at $\alpha = c^{-1/2}$, and that at that point exactly half the molecules are in the R state. (b) Check this with $L = 10^4$, $c = 0.01$, $n = 4$. (c) Explain in words why a heterotropic inhibitor that raises $L$ shifts the half-saturation point to higher ligand concentration.
::: hint
Put $\alpha = c^{-1/2}$, so $c\alpha = c^{1/2}$, and compare $L(1 + c\alpha)^n$ with $(1 + \alpha)^n$ by factoring $c^{-n/2}$ out of the latter.
:::
::: solution
(a) With $\alpha = c^{-1/2}$, $1 + \alpha = c^{-1/2}(c^{1/2} + 1) = c^{-1/2}(1 + c\alpha)$. Hence $(1 + \alpha)^n = c^{-n/2}(1 + c\alpha)^n = L(1 + c\alpha)^n$ when $Lc^{n/2} = 1$: the R and T terms of the binding polynomial are equal, so half the molecules are R. For the numerator, $\alpha(1 + \alpha)^{n-1} = c^{-1/2}\cdot c^{-(n-1)/2}(1 + c\alpha)^{n-1} = c^{-n/2}(1 + c\alpha)^{n-1}$, while $Lc\alpha(1 + c\alpha)^{n-1} = c^{-n/2}\,c\,c^{-1/2}(1 + c\alpha)^{n-1} = c^{-n/2}c^{1/2}(1 + c\alpha)^{n-1}$. The numerator is therefore $c^{-n/2}(1 + c\alpha)^{n-1}(1 + c^{1/2})$ and the denominator $2c^{-n/2}(1 + c\alpha)^n = 2c^{-n/2}(1 + c\alpha)^{n-1}(1 + c^{1/2})$, so $Y = \tfrac12$.
(b) $Lc^{2} = 10^4 \times 10^{-4} = 1$ and $c^{-1/2} = 10$: half-saturation at $\alpha = 10$ with R fraction 0.50, as found in [[#ex-mwc]].
(c) An inhibitor that binds T preferentially increases the effective $L$, so more ligand molecules must be bound — each contributing a factor $1/c$ in favour of R — before the R and T populations balance. The curve therefore moves to higher ligand concentration (and, for moderate increases in $L$, becomes slightly steeper). This is how 2,3-BPG raises the $P_{50}$ of haemoglobin from about $1$ to $26\ \mathrm{Torr}$.
:::
:::

::: exercise Reading a Hill plot {level=2 check="2.8"}
The Hill-plot figure in the section on cooperativity shows synthetic data for haemoglobin in the central region of saturation. Read the slope of the least-squares line in the Hill-plot figure (drag a point to see how sensitive it is), and find $P_{50}$ from the $x$-intercept. (Enter $n_\mathrm{H}$ to one decimal place.)
::: solution
The fitted line has slope $2.77$, which rounds to $2.8$, and crosses $y = 0$ near $x = 1.41$; since $Y = \tfrac12$ makes $\log[Y/(1-Y)] = 0$, $\log_{10}P_{50} = 1.41$ and $P_{50} \approx 26\ \mathrm{Torr}$. (The data were generated from $n_\mathrm{H} = 2.8$, $P_{50} = 26\ \mathrm{Torr}$ with small perturbations.) Real haemoglobin data extend this line only over the middle of the curve; below about 5 % and above about 95 % saturation the slope bends back to 1, and fitting a straight line through the whole range would underestimate cooperativity.
:::
:::
