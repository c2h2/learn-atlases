Werner could count chloride ions with silver nitrate only because cobalt(III) lets go of its ligands slowly ([[coordination-chemistry/coordination-compounds#ex-werner-silver]]). The water molecules bound to chromium(III) exchange with the solvent about once every few days; those bound to copper(II) exchange about a thousand million times a second. That is a range of fifteen powers of ten in rate between two ions of the same charge and almost the same size, and it is not explained by thermodynamics. $\mathrm{[Co(NH_3)_6]^{3+}}$ survives for days in acid although it is thermodynamically unstable there with respect to $\mathrm{[Co(H_2O)_6]^{3+}}$ and ammonium; $\mathrm{[Ni(CN)_4]^{2-}}$, with a formation constant of about $10^{30}$, exchanges its cyanide ligands with labelled cyanide in solution within seconds.

This chapter is about how complexes react: by **ligand substitution**, in which one ligand replaces another, and by **electron transfer**, in which the metal changes its oxidation state. It sorts substitution mechanisms into dissociative, associative and interchange types and shows how rate laws and activation volumes tell them apart; explains with ligand field theory why $d^3$ and low-spin $d^6$ complexes are inert; describes the associative chemistry of square-planar platinum(II) and the **trans effect** that chemists use to make cisplatin; and introduces Henry Taube's distinction between **inner-sphere** and **outer-sphere** electron transfer and the Marcus theory of the latter. The kinetic tools are those of [[kinetics/rate-laws]] and [[kinetics/transition-state-theory]].

## Inert and labile complexes

::: definition Labile and inert {#def-labile}
Following Henry Taube (1952), a complex is **labile** if its ligands are substituted with a half-life of less than about one minute at $25\ ^\circ\mathrm{C}$ and $0.1\ \mathrm{mol\,dm^{-3}}$ concentration, and **inert** if the reaction is slower. The terms are kinetic and refer to the rate of substitution, not to the equilibrium constant: an inert complex may be thermodynamically unstable, and a labile one very stable.
:::

The cleanest single measure of lability is the rate constant $k_\mathrm{ex}$ for exchange of coordinated water with bulk water, measured by $^{17}\mathrm{O}$ NMR line broadening or isotope labelling. Values at $298\ \mathrm{K}$ (from the review of Lothar Helm and André Merbach, 2005) are, in $\mathrm{s^{-1}}$ per coordinated water:

| ion | $d^n$ | $k_\mathrm{ex}$ | ion | $d^n$ | $k_\mathrm{ex}$ |
|---|---|---|---|---|---|
| $\mathrm{Cu^{2+}}$ | $d^9$ | $4.4\times10^9$ | $\mathrm{Fe^{3+}}$ | $d^5$ (HS) | $1.6\times10^2$ |
| $\mathrm{Mn^{2+}}$ | $d^5$ (HS) | $2.1\times10^7$ | $\mathrm{V^{2+}}$ | $d^3$ | $87$ |
| $\mathrm{Fe^{2+}}$ | $d^6$ (HS) | $4.4\times10^6$ | $\mathrm{Al^{3+}}$ | — | $1.3$ |
| $\mathrm{Co^{2+}}$ | $d^7$ (HS) | $3.2\times10^6$ | $\mathrm{Ru^{2+}}$ | $d^6$ (LS) | $1.8\times10^{-2}$ |
| $\mathrm{Mg^{2+}}$ | — | $6.7\times10^5$ | $\mathrm{Cr^{3+}}$ | $d^3$ | $2.4\times10^{-6}$ |
| $\mathrm{Ni^{2+}}$ | $d^8$ | $3.2\times10^4$ | $\mathrm{Rh^{3+}}$ | $d^6$ (LS) | $2.2\times10^{-9}$ |
| $\mathrm{Pd^{2+}}$ | $d^8$ (planar) | $5.6\times10^2$ | $\mathrm{Ir^{3+}}$ | $d^6$ (LS) | $1.1\times10^{-10}$ |

Four regularities stand out. Rates fall with increasing charge and decreasing size ($\mathrm{Mg^{2+}}$ against $\mathrm{Al^{3+}}$). They fall down a group for the same charge (Co, Rh, Ir). Ions with $e_g$ electrons, which are σ-antibonding, are labile, and $\mathrm{Cu^{2+}}$ and $\mathrm{Cr^{2+}}$ (Jahn–Teller distorted, with a very long, weak axial bond) most of all. And the slowest ions of each charge are $d^3$ ($\mathrm{V^{2+}}$, $\mathrm{Cr^{3+}}$) and low-spin $d^6$ ($\mathrm{Ru^{2+}}$, $\mathrm{Co^{3+}}$, $\mathrm{Rh^{3+}}$, $\mathrm{Ir^{3+}}$), the configurations with the largest crystal field stabilisation.

::: example How slow is slow? {#ex-half-lives}
Use the table to find the mean lifetime of a given coordinated water molecule on (a) $\mathrm{Cr^{3+}}$, (b) $\mathrm{Ni^{2+}}$, (c) $\mathrm{Ir^{3+}}$.
::: solution
For a first-order process the half-life is $t_{1/2} = \ln 2/k$ and the mean lifetime is $\tau = 1/k$. (a) $t_{1/2} = 0.693/(2.4\times10^{-6}\ \mathrm{s^{-1}}) = 2.9\times10^5\ \mathrm{s} = 80\ \mathrm{h}$, about three days. (b) $0.693/(3.2\times10^4) = 2.2\times10^{-5}\ \mathrm{s}$, $22\ \mu\mathrm{s}$. (c) $0.693/(1.1\times10^{-10}) = 6.3\times10^9\ \mathrm{s}$, about 200 years. A chromium(III) complex can be purified by chromatography; an iridium(III) aqua ligand would outlast the chemist; nickel(II) complexes in water re-equilibrate faster than they can be mixed by hand, which is why their isomers cannot be separated ([[coordination-chemistry/coordination-compounds#warn-isomers]]).
:::
:::

## Mechanisms of ligand substitution

::: definition Stoichiometric and intimate mechanisms {#def-mechanisms}
Following Cooper Langford and Harry Gray (1965), substitution $\mathrm{ML_nX + Y \rightarrow ML_nY + X}$ is classified by its **stoichiometric mechanism**:

- **dissociative (D)**: X leaves first, giving an intermediate of lower coordination number that is detectable in principle, $\mathrm{ML_nX \rightarrow ML_n + X}$, then $\mathrm{ML_n + Y \rightarrow ML_nY}$;
- **associative (A)**: Y enters first, giving an intermediate of higher coordination number, $\mathrm{ML_nX + Y \rightarrow ML_nXY}$, then X leaves;
- **interchange (I)**: X leaves and Y enters in a single step, with no intermediate.

Within interchange mechanisms the **intimate mechanism** is $\mathrm{I_d}$ (dissociatively activated: the rate is sensitive to the leaving group and insensitive to the entering group, and bond breaking is advanced in the transition state) or $\mathrm{I_a}$ (associatively activated: the rate depends strongly on the entering group, and bond making is advanced).
:::

Most substitutions of octahedral complexes are I or D; associative pathways are common for square-planar $d^8$ complexes, which have an open coordination site above and below the plane.

### The Eigen–Wilkins mechanism

When a labile aqua ion reacts with a ligand, the first step is a diffusion-controlled encounter that places the ligand in the second coordination sphere, next to a coordinated water. Manfred Eigen and Ralph Wilkins showed that the rates of many such reactions are set by this **outer-sphere complex** and the subsequent interchange.

::: proposition The Eigen–Wilkins rate law {#prop-eigen-wilkins}
For the scheme
$$
\mathrm{[M(H_2O)_6] + L} \underset{\text{fast}}{\rightleftharpoons} \mathrm{\{[M(H_2O)_6], L\}} \xrightarrow{k_\mathrm{i}} \mathrm{[M(H_2O)_5L] + H_2O},
$$
with outer-sphere association constant $K_\mathrm{os}$ and a rate-limiting interchange $k_\mathrm{i}$, the observed rate with the ligand in excess is $-\dd[\mathrm{M}]_\mathrm{tot}/\dd t = k_\mathrm{obs}[\mathrm{M}]_\mathrm{tot}$ with
$$
k_\mathrm{obs} = \frac{k_\mathrm{i}K_\mathrm{os}[\mathrm{L}]}{1 + K_\mathrm{os}[\mathrm{L}]} \;\approx\; k_\mathrm{i}K_\mathrm{os}[\mathrm{L}] \quad (K_\mathrm{os}[\mathrm{L}] \ll 1),
$$ {#eq-eigen}
so the second-order formation constant is $k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i}$. For an $\mathrm{I_d}$ mechanism, $k_\mathrm{i}$ is close to the water exchange rate constant $k_\mathrm{ex}$ (times a factor of order 1 for the probability that the departing water is the one next to L).
:::

::: proof
Let $[\mathrm{M}]_\mathrm{tot} = [\mathrm{M}] + [\mathrm{M}{\cdot}\mathrm{L}]$ be the total unreacted metal, with $\mathrm{M}{\cdot}\mathrm{L}$ the outer-sphere complex. Because the encounter equilibrium is established much faster than interchange, $[\mathrm{M}{\cdot}\mathrm{L}] = K_\mathrm{os}[\mathrm{M}][\mathrm{L}]$ at all times, so $[\mathrm{M}{\cdot}\mathrm{L}] = K_\mathrm{os}[\mathrm{L}][\mathrm{M}]_\mathrm{tot}/(1 + K_\mathrm{os}[\mathrm{L}])$. Product forms only from the outer-sphere complex, at rate $k_\mathrm{i}[\mathrm{M}{\cdot}\mathrm{L}]$, which gives [[#eq-eigen]]. With $[\mathrm{L}]$ in excess and constant, $k_\mathrm{obs}$ is a pseudo-first-order constant; it rises linearly at low $[\mathrm{L}]$ and saturates at $k_\mathrm{i}$ when $K_\mathrm{os}[\mathrm{L}] \gg 1$. In a dissociatively activated interchange the rate-determining event is loss of a water from the inner sphere, which does not depend on the identity of L; so $k_\mathrm{i} \approx k_\mathrm{ex}$, and $k_\mathrm{f}$ varies with L only through $K_\mathrm{os}$, which depends mainly on the charges.
:::

::: widget plot
f: k*K*x/(1 + K*x); k*K*x
x: 0, 10
y: 0, 1.2
sliders: k=1:0.2:2:0.05; K=0.5:0.05:3:0.05
labels: k_\mathrm{obs}; \text{low-concentration limit } k_\mathrm{i}K_\mathrm{os}[\mathrm{L}]
caption: Pseudo-first-order rate constant $k_\mathrm{obs}$ (in units of $k_\mathrm{i}$ when the slider $k = 1$) against ligand concentration $x$ in $\mathrm{mol\,dm^{-3}}$ for the Eigen–Wilkins mechanism, [[#eq-eigen]]. The slider $K$ is $K_\mathrm{os}$ in $\mathrm{dm^3\,mol^{-1}}$. At low concentration the dependence is linear, with slope $k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i}$; at high concentration the rate saturates at $k_\mathrm{i}$ because all the metal is already in the outer-sphere complex. For neutral or singly charged ligands $K_\mathrm{os}$ is small (0.1–2), and saturation can be reached only with very concentrated ligand solutions or with highly charged partners, so in practice the linear regime is the one measured.
:::

::: example Formation rates of nickel(II) complexes {#ex-eigen}
The rate constant for $\mathrm{[Ni(H_2O)_6]^{2+} + NH_3}$ is about $5\times10^3\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ at $25\ ^\circ\mathrm{C}$. With $K_\mathrm{os} \approx 0.15\ \mathrm{dm^3\,mol^{-1}}$ for a $2+$ ion and a neutral ligand, estimate $k_\mathrm{i}$ and compare it with $k_\mathrm{ex}$. What does this imply about the mechanism? Would you expect fluoride to react much faster?
::: solution
$k_\mathrm{i} = k_\mathrm{f}/K_\mathrm{os} = 5\times10^3/0.15 = 3\times10^4\ \mathrm{s^{-1}}$, essentially equal to the water exchange constant $3.2\times10^4\ \mathrm{s^{-1}}$. The interchange step happens at the rate at which nickel loses water whatever the entering group: an $\mathrm{I_d}$ mechanism. Fluoride, a $1-$ anion, has a larger $K_\mathrm{os}$ with a $2+$ cation (of order $1\ \mathrm{dm^3\,mol^{-1}}$), so its $k_\mathrm{f}$ should be larger by roughly the ratio of the outer-sphere constants, a factor of a few, but not by orders of magnitude; and that is what is observed for nickel(II) with a wide range of ligands. The same analysis predicts that $\mathrm{Co^{2+}}$ ($k_\mathrm{ex} = 3.2\times10^6\ \mathrm{s^{-1}}$) forms its ammine about a hundred times faster, $k_\mathrm{f} \approx 0.15 \times 3.2\times10^6 = 4.8\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$.
:::
:::

### Activation volumes

The most direct experimental test of mechanism is the effect of pressure. From transition state theory, $(\partial\ln k/\partial p)_T = -\Delta^\ddagger V/RT$, where $\Delta^\ddagger V$ is the **volume of activation**. A dissociative transition state, with a bond stretched or broken and a molecule partly released, is larger than the reactants: $\Delta^\ddagger V > 0$, and pressure slows the reaction. An associative one, with a molecule partly taken into the coordination sphere, is smaller: $\Delta^\ddagger V < 0$. For water exchange on the first-row dications, $\Delta^\ddagger V$ (in $\mathrm{cm^3\,mol^{-1}}$, Merbach's measurements) changes sign across the series: $\mathrm{V^{2+}}$ $-4.1$, $\mathrm{Mn^{2+}}$ $-5.4$, $\mathrm{Fe^{2+}}$ $+3.8$, $\mathrm{Co^{2+}}$ $+6.1$, $\mathrm{Ni^{2+}}$ $+7.2$. The early ions, with empty or half-empty $t_{2g}$ orbitals pointing between the ligands where a seventh ligand could approach, react by $\mathrm{I_a}$; the later ions, whose $t_{2g}$ set is full or nearly full and blocks that approach, react by $\mathrm{I_d}$.

## Ligand field effects on substitution

Why are $d^3$ and low-spin $d^6$ ions so slow? In a dissociative mechanism the octahedron loses a ligand on the way to the transition state, which resembles a square pyramid. If the CFSE of the five-coordinate structure is less than that of the octahedron, the difference adds to the activation energy.

::: proposition Crystal field activation energy {#prop-cfae}
Define the **crystal field activation energy** (CFAE) for a dissociative path as $\mathrm{CFSE}(\text{square pyramid}) - \mathrm{CFSE}(\text{octahedron})$. In the σ-only angular overlap model, with the same $e_\sigma$ for all ligands,
$$
\mathrm{CFAE} = +0.2\Delta_\mathrm{o}\ (d^3),\quad +0.4\Delta_\mathrm{o}\ (\text{low-spin } d^6),\quad +0.2\Delta_\mathrm{o}\ (d^8),\quad 0\ (d^0,\ \text{high-spin } d^5,\ d^{10}).
$$
These are also the values of the point-charge crystal field model ($2Dq$, $4Dq$ and $2Dq$). A positive CFAE slows dissociative substitution; it is largest for low-spin $d^6$, and it scales with $\Delta_\mathrm{o}$, so it is larger for higher charges and for $4d$ and $5d$ metals.
:::

::: proof
From [[coordination-chemistry/ligand-field-mo#prop-aom]] with σ interactions only: in the octahedron, $E(e_g) = 3e_\sigma$, $E(t_{2g}) = 0$, total $6e_\sigma$ over five orbitals, so the barycentre is at $1.2e_\sigma$ and the orbitals lie at $+1.8e_\sigma$ ($e_g$) and $-1.2e_\sigma$ ($t_{2g}$) relative to it, with $\Delta_\mathrm{o} = 3e_\sigma$. Remove the ligand on $-z$: the remaining axial ligand contributes $e_\sigma$ to $d_{z^2}$ and nothing else, so $E(d_{x^2-y^2}) = 3e_\sigma$, $E(d_{z^2}) = 1 + 1 = 2e_\sigma$, and $E(d_{xy}) = E(d_{xz}) = E(d_{yz}) = 0$. The total is $5e_\sigma$, the barycentre $e_\sigma$, and relative to it: $d_{x^2-y^2}$ $+2e_\sigma$, $d_{z^2}$ $+e_\sigma$, $t_{2g}$-type orbitals $-e_\sigma$. Now fill:

- $d^3$ ($t_{2g}^3$): octahedron $3(-1.2) = -3.6e_\sigma$; square pyramid $3(-1) = -3.0e_\sigma$. CFAE $= +0.6e_\sigma = +0.2\Delta_\mathrm{o}$.
- low-spin $d^6$ ($t_{2g}^6$): $-7.2e_\sigma$ against $-6.0e_\sigma$. CFAE $= +1.2e_\sigma = +0.4\Delta_\mathrm{o}$.
- $d^8$ ($t_{2g}^6e_g^2$, one electron in each upper orbital): octahedron $-7.2 + 2(1.8) = -3.6e_\sigma$; square pyramid $-6 + 1 + 2 = -3.0e_\sigma$. CFAE $= +0.2\Delta_\mathrm{o}$.
- high-spin $d^5$: octahedron $3(-1.2) + 2(1.8) = 0$; square pyramid $3(-1) + 1 + 2 = 0$. CFAE $= 0$; likewise for $d^0$ and $d^{10}$.

Relative CFSE is what matters because the barycentre energy (the total σ repulsion) is a property of the whole complex and is counted in the ordinary bond energy, not in the ligand field term.
:::

The CFAE explains the pattern, not the absolute rates. For chromium(III), $0.2\Delta_\mathrm{o} = 0.2 \times 17\,400 = 3480\ \mathrm{cm^{-1}} = 42\ \mathrm{kJ\,mol^{-1}}$, enough by itself to slow a reaction by $e^{-42\,000/RT} \approx 10^{-7}$ at room temperature. Nickel(II) has the same $0.2\Delta_\mathrm{o}$ but with $\Delta_\mathrm{o} = 8500\ \mathrm{cm^{-1}}$, only $20\ \mathrm{kJ\,mol^{-1}}$, and its lower charge makes the Ni–O bonds weaker anyway; it is moderately slow for a $2+$ ion but labile. For low-spin cobalt(III), $0.4 \times 18\,200\ \mathrm{cm^{-1}}$ is $87\ \mathrm{kJ\,mol^{-1}}$, which is why cobalt(III) chemistry, like Werner's, can be done at leisure.

::: warning Inert does not mean stable, and labile does not mean unstable {#warn-inert}
It is easy to conflate the two because both are often summarised as "strongly bound". They are different quantities: stability is $\Delta G^\circ$, the difference in free energy between reactants and products; lability is $\Delta^\ddagger G$, the height of the barrier between them. $\mathrm{[Co(NH_3)_6]^{3+}}$ in $1\ \mathrm{mol\,dm^{-3}}$ acid has an equilibrium constant for hydrolysis to $\mathrm{[Co(H_2O)_6]^{3+}} + 6\,\mathrm{NH_4^+}$ of the order of $10^{20}$ (from $\log\beta_6 \approx 35$ and the $\mathrm{p}K_\mathrm{a}$ of ammonium), yet a solution keeps for weeks; $\mathrm{[Ni(CN)_4]^{2-}}$ is extremely stable ($\beta_4 \approx 10^{30}$) yet exchanges labelled cyanide with a half-life of seconds, by an associative path open to a square-planar complex. A metal drug or MRI contrast agent must be designed for both: thermodynamically stable enough not to release the metal at equilibrium, and kinetically inert enough not to release it on the time scale of its use.
:::

## Substitution in square-planar complexes

Square-planar $d^8$ complexes of platinum(II), palladium(II), nickel(II) and gold(III) react by associative mechanisms. The entering ligand approaches along the vacant $z$ axis, and the transition state and (sometimes) intermediate is trigonal bipyramidal, with the entering group, the leaving group and the ligand originally *trans* to the leaving group in the trigonal plane. The rate law has two terms.

::: proposition The two-term rate law for square-planar substitution {#prop-square-planar}
For $\mathrm{[PtL_3X] + Y \rightarrow [PtL_3Y] + X}$ in a coordinating solvent S, with Y in large excess,
$$
-\frac{\dd[\mathrm{PtL_3X}]}{\dd t} = (k_1 + k_2[\mathrm{Y}])[\mathrm{PtL_3X}], \qquad k_\mathrm{obs} = k_1 + k_2[\mathrm{Y}].
$$ {#eq-two-term}
The $k_2$ term is direct associative attack by Y; the $k_1$ term is associative attack by the solvent (rate-determining), giving $\mathrm{[PtL_3S]}$, which then reacts rapidly with Y. Both pathways are associative.
:::

::: proof
Let the solvent path be $\mathrm{PtL_3X + S \xrightarrow{k_\mathrm{s}} PtL_3S + X}$ followed by fast $\mathrm{PtL_3S + Y \rightarrow PtL_3Y + S}$, and the direct path $\mathrm{PtL_3X + Y \xrightarrow{k_2} PtL_3Y + X}$. The solvent is present at constant, very high concentration $[\mathrm{S}]$, so the first path is pseudo-first order with $k_1 = k_\mathrm{s}[\mathrm{S}]$. If the solvento intermediate is consumed much faster than it forms, it reaches a negligible steady-state concentration and every molecule that enters this path becomes product. The two parallel paths then remove the substrate at total rate $(k_1 + k_2[\mathrm{Y}])[\mathrm{PtL_3X}]$. A plot of $k_\mathrm{obs}$ against $[\mathrm{Y}]$ is linear with slope $k_2$ and intercept $k_1$. The evidence that the $k_1$ path is associative and not dissociative is that $k_1$ depends on the solvent's nucleophilicity and that both paths have large negative entropies and volumes of activation.
:::

### The trans effect

In 1926 Ilya Chernyaev noticed that the ligand that leaves a square-planar platinum(II) complex is usually the one *trans* to the ligand with the greatest "trans-directing" ability. The **trans effect** is the effect of a coordinated ligand on the *rate* of substitution of the ligand opposite it. The empirical series is approximately
$$
\mathrm{H_2O \approx OH^- < NH_3 \approx py < Cl^- < Br^- < I^- \approx SCN^- \approx NO_2^- < C_6H_5^- < CH_3^- < PR_3 \approx H^- < CO \approx C_2H_4 \approx CN^-}.
$$
The effect has two components. Strong σ donors (H⁻, $\mathrm{CH_3^-}$, $\mathrm{PR_3}$) weaken the bond *trans* to themselves in the ground state, because the two *trans* ligands share the same metal $p_x$ and $d_{x^2-y^2}$ orbitals; this ground-state weakening is called the **trans influence** and is seen in bond lengths. Strong π acceptors (CO, $\mathrm{C_2H_4}$, $\mathrm{CN^-}$) stabilise the five-coordinate transition state, in which they can withdraw the extra electron density that the incoming ligand brings into the trigonal plane. Both lower the barrier for loss of the *trans* ligand.

::: example Making cisplatin and transplatin {#ex-cisplatin}
Use the trans effect ($\mathrm{Cl^-} > \mathrm{NH_3}$) to show that (a) the reaction of $\mathrm{[PtCl_4]^{2-}}$ with two equivalents of ammonia gives *cis*-$\mathrm{[PtCl_2(NH_3)_2]}$, and (b) the reaction of $\mathrm{[Pt(NH_3)_4]^{2+}}$ with two equivalents of chloride gives the *trans* isomer.
::: solution
(a) In $\mathrm{[PtCl_4]^{2-}}$ all four positions are equivalent, and the first ammonia replaces any chloride: $\mathrm{[PtCl_3(NH_3)]^-}$. This has two kinds of chloride: the one *trans* to $\mathrm{NH_3}$ and the two *trans* to each other (each *trans* to Cl). Because Cl⁻ has the larger trans effect, the chlorides *trans* to chloride are labilised, and the second ammonia replaces one of them. The two ammonias end up *cis*: cisplatin. (b) In $\mathrm{[Pt(NH_3)_4]^{2+}}$ the first chloride replaces any ammonia: $\mathrm{[PtCl(NH_3)_3]^+}$. Now the ammonia *trans* to the chloride is the labile one, and the second chloride enters *trans* to the first: transplatin. These are the routes worked out in the nineteenth century by Michele Peyrone (1844) and Jules Reiset, long before their structures were known, and they explain why the two isomers are made from different starting materials. In practice cisplatin is made from $\mathrm{K_2[PtCl_4]}$ via $\mathrm{K_2[PtI_4]}$, to exploit the even larger trans effect of iodide (exercise [[#exr-iodide-route]]). Platinum compounds of this kind are cytotoxic and sensitising and are handled only with appropriate containment.
:::
:::

::: quiz
For square-planar substitution, which observation would point most clearly to an associative mechanism?
- [ ] The rate depends strongly on the leaving group.
- [x] The rate constant $k_2$ varies by orders of magnitude with the entering nucleophile.
- [ ] The volume of activation is large and positive.
- [x] The rate constant and stereochemistry show retention of the relative positions of the other ligands.
::: solution
Associative reactions are sensitive to the entering group, because it is bonded in the transition state, and for square-planar complexes the trigonal bipyramidal intermediate delivers the entering ligand into the position of the leaving one, so the configuration of the other ligands is retained. Leaving-group sensitivity occurs for both mechanisms. A positive activation volume indicates a dissociative path.
:::
:::

## Electron transfer

Redox reactions between complexes are central to biology (cytochromes, iron–sulfur proteins, blue copper proteins) and to electrochemistry, and Henry Taube showed in the 1950s that they occur by two distinct mechanisms.

::: definition Outer-sphere and inner-sphere electron transfer {#def-et}
In an **outer-sphere** reaction the coordination spheres of both reactants stay intact; the electron tunnels between the metals in an encounter complex, and the rate is limited by the reorganisation of bond lengths and solvent that must accompany it. In an **inner-sphere** reaction a ligand of one reactant first binds to the other, forming a **bridged** binuclear intermediate, and the electron passes through the bridge; the bridging ligand is often transferred to the other metal in the process.
:::

Taube's classic test used the inertness of two ions. $\mathrm{[CoCl(NH_3)_5]^{2+}}$ (inert, cobalt(III)) was reduced by $\mathrm{[Cr(H_2O)_6]^{2+}}$ (labile, chromium(II)). The products were $\mathrm{Co^{2+}(aq)}$ and $\mathrm{[CrCl(H_2O)_5]^{2+}}$, with every chloride now on chromium and none in solution, even in the presence of radioactive chloride added to the solution. Chloride could only have reached the chromium from the cobalt through a bridged intermediate $\mathrm{[(NH_3)_5Co{-}Cl{-}Cr(H_2O)_5]^{4+}}$: the chromium(II) is labile enough to bind the chloride, the electron then passes to cobalt, and the products, labile cobalt(II) and inert chromium(III), keep the chloride where it now is. The experiment worked because the reactants and products differ in lability in exactly the right way.

### Marcus theory of outer-sphere reactions

For outer-sphere reactions Rudolph Marcus showed in 1956 that the activation free energy depends on the driving force and on a single parameter, the **reorganisation energy** $\lambda$: the energy that would be needed to distort the reactants and their surrounding solvent into the equilibrium structure of the products without transferring the electron.

::: proposition The Marcus equation {#prop-marcus}
If the free energy of the reactant and product states depends quadratically on a single reaction coordinate, with equal curvature, then
$$
\Delta^\ddagger G = \frac{\lambda}{4}\left(1 + \frac{\Delta_\mathrm{r}G^\circ}{\lambda}\right)^2,
$$ {#eq-marcus}
where $\Delta_\mathrm{r}G^\circ$ is the standard free energy of reaction (corrected for the work of bringing the reactants together). For a self-exchange reaction ($\Delta_\mathrm{r}G^\circ = 0$), $\Delta^\ddagger G = \lambda/4$. For a cross reaction between couples 1 and 2 with self-exchange rate constants $k_{11}$ and $k_{22}$ and equilibrium constant $K_{12}$,
$$
k_{12} \approx \sqrt{k_{11}k_{22}K_{12}f}, \qquad \log f = \frac{(\log K_{12})^2}{4\log(k_{11}k_{22}/Z^2)},
$$ {#eq-cross}
where $Z \approx 10^{11}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ is the collision frequency; $f \approx 1$ unless $K_{12}$ is very large.
:::

::: proof
Let the reactant free energy be $G_\mathrm{R}(q) = a q^2$ and the product free energy $G_\mathrm{P}(q) = a(q - q_0)^2 + \Delta_\mathrm{r}G^\circ$, two parabolas of equal curvature displaced along the reaction coordinate $q$. By definition $\lambda = G_\mathrm{P}(0) - \Delta_\mathrm{r}G^\circ = aq_0^2$: the energy of the product state at the reactant geometry, relative to its own minimum. Electron transfer is fastest at the crossing point (energy conserved, Franck–Condon principle), where $aq^2 = a(q - q_0)^2 + \Delta_\mathrm{r}G^\circ$, that is $2aqq_0 = aq_0^2 + \Delta_\mathrm{r}G^\circ$ and $q^* = (\lambda + \Delta_\mathrm{r}G^\circ)/2aq_0$. The barrier is
$$
\Delta^\ddagger G = a(q^*)^2 = \frac{(\lambda + \Delta_\mathrm{r}G^\circ)^2}{4aq_0^2} = \frac{(\lambda + \Delta_\mathrm{r}G^\circ)^2}{4\lambda},
$$
which is [[#eq-marcus]]. For the cross relation: the reorganisation energy of the cross reaction is, to a good approximation, the mean of the two self-exchange values, $\lambda_{12} = \tfrac12(\lambda_{11} + \lambda_{22})$, since each reactant reorganises as it does in its own self-exchange. Write $k = Z e^{-\Delta^\ddagger G/RT}$ for each reaction, expand [[#eq-marcus]] as $\Delta^\ddagger G_{12} = \tfrac{\lambda_{12}}{4} + \tfrac12\Delta_\mathrm{r}G^\circ_{12} + (\Delta_\mathrm{r}G^\circ_{12})^2/4\lambda_{12}$, and use $\lambda_{ii}/4 = -RT\ln(k_{ii}/Z)$ and $\Delta_\mathrm{r}G^\circ_{12} = -RT\ln K_{12}$. The first two terms give $k_{12} = \sqrt{k_{11}k_{22}K_{12}}$, and the quadratic term gives the factor $f$.
:::

::: widget plot
f: (l/4)*(1 + x/l)^2; l/4
x: -300, 100
y: 0, 120
sliders: l=100:20:250:5
labels: \Delta^\ddagger G; \lambda/4\ \text{(self-exchange)}
caption: Marcus activation free energy (in $\mathrm{kJ\,mol^{-1}}$) against the driving force $x = \Delta_\mathrm{r}G^\circ$ (in $\mathrm{kJ\,mol^{-1}}$) from [[#eq-marcus]], for reorganisation energy $\lambda$ set by the slider. Making the reaction more exergonic first lowers the barrier, as one would expect, and the barrier vanishes at $\Delta_\mathrm{r}G^\circ = -\lambda$. Beyond that point, in the **inverted region**, the barrier rises again and very exergonic reactions become *slower*. Marcus predicted this in 1960; it was confirmed experimentally by John Miller, Gerhard Closs and co-workers in 1984 using rigidly linked donor–acceptor molecules, and it is one reason why the charge-separated states of photosynthesis do not immediately recombine.
:::

::: example A Marcus cross-relation estimate {#ex-marcus}
The self-exchange rate constant of $\mathrm{[Fe(H_2O)_6]^{3+/2+}}$ is about $4\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. A hypothetical oxidant couple has self-exchange constant $1.0\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ and a standard potential $0.30\ \mathrm{V}$ higher than iron's. Estimate the rate constant for the oxidation of $\mathrm{Fe^{2+}(aq)}$ by this oxidant, taking $f = 1$.
::: solution
For a one-electron transfer, $\log K_{12} = \Delta E^\circ/0.05916 = 0.30/0.05916 = 5.07$, so $K_{12} = 1.18\times10^5$. Then $k_{12} = \sqrt{4.0 \times 1.0\times10^5 \times 1.18\times10^5} = \sqrt{4.7\times10^{10}} = 2.2\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. Checking $f$: $\log f = 5.07^2/[4\log(4\times10^5/10^{22})] = 25.7/(4 \times -16.4) = -0.39$, so $f = 0.41$ and $\sqrt f = 0.64$, lowering the estimate to about $1.4\times10^5$. The slowness of iron's own self-exchange (a large $\lambda$, because the Fe–O bonds change by about $13\ \mathrm{pm}$ between $\mathrm{Fe^{2+}}$ and $\mathrm{Fe^{3+}}$) is partly compensated by the fast partner and the driving force. Cross relations like this predict measured outer-sphere rate constants typically within a factor of ten, which is strong support for the theory.
:::
:::

Self-exchange rates span an enormous range and follow from the structural change on electron transfer. $\mathrm{[Ru(NH_3)_6]^{3+/2+}}$ and $\mathrm{[Fe(phen)_3]^{3+/2+}}$, where the electron enters a $t_{2g}$ orbital and the metal–ligand bonds hardly change, exchange rapidly. $\mathrm{[Co(NH_3)_6]^{3+/2+}}$ is extremely slow (of the order of $10^{-6}$ to $10^{-8}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$), because the electron goes from low-spin $t_{2g}^6$ to high-spin $t_{2g}^5e_g^2$, a change of spin state and a lengthening of every Co–N bond by about $15\ \mathrm{pm}$.

## Where this leads

The mechanisms of this chapter recur wherever metals are used. Associative 16-electron and dissociative 18-electron substitution are the first steps of the organometallic reactions of [[organometallics-catalysis/elementary-reactions]]. The trans effect directs the synthesis of platinum drugs, and inertness decides how long a platinum or gadolinium complex survives in the body ([[coordination-chemistry/bioinorganic]]). Marcus theory describes electron transfer at electrodes as well as in solution ([[electrochemistry/electrode-kinetics]]) and in proteins, where the protein matrix lowers $\lambda$ and controls the distance over which the electron tunnels. Thermodynamic stability and kinetic inertness, the two meanings of "strongly bound", are finally both quantified.

::: history
Kinetic studies of complexes began with Alfred Werner's isomerisation experiments, and Ilya Chernyaev formulated the trans effect in 1926 to explain the syntheses of platinum isomers. The modern subject was founded by Henry Taube. His 1952 review in *Chemical Reviews* related lability to $d$-electron configuration, and his 1953–54 experiments with Howard Myers and Robert Rich on chromium(II) and cobalt(III) ammines demonstrated inner-sphere electron transfer; he received the 1983 Nobel Prize in Chemistry. Fred Basolo and Ralph Pearson's *Mechanisms of Inorganic Reactions* (1958) systematised substitution chemistry, and Cooper Langford and Harry Gray introduced the D, A, I nomenclature in 1965. Manfred Eigen, who shared the 1967 Nobel Prize for relaxation methods for fast reactions, worked out with Ralph Wilkins the outer-sphere mechanism of complex formation in the 1960s. Rudolph Marcus published his theory of outer-sphere electron transfer in 1956 and the cross relation soon after, and received the 1992 Nobel Prize. André Merbach's high-pressure NMR measurements of activation volumes from the 1970s onwards settled the mechanism of water exchange across the periodic table.
:::

::: summary
- Labile complexes substitute in under a minute, inert ones more slowly; water exchange rates span about twenty orders of magnitude and fall with higher charge, smaller size and heavier metals.
- Substitution mechanisms are dissociative (D), associative (A) or interchange (I, with $\mathrm{I_d}$ and $\mathrm{I_a}$ variants); entering-group dependence and the sign of $\Delta^\ddagger V$ distinguish them.
- Complex formation by labile aqua ions follows the Eigen–Wilkins mechanism, $k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i}$ with $k_\mathrm{i} \approx k_\mathrm{ex}$ for $\mathrm{I_d}$.
- $d^3$ and low-spin $d^6$ ions are inert because a dissociative transition state loses CFSE (CFAE $0.2\Delta_\mathrm{o}$ and $0.4\Delta_\mathrm{o}$); $e_g$ electrons and Jahn–Teller distortion make ions labile.
- Square-planar $d^8$ complexes react associatively with $k_\mathrm{obs} = k_1 + k_2[\mathrm{Y}]$; the empirical trans effect, from σ trans influence and π stabilisation of the transition state, decides which ligand is replaced and is used to make *cis*- and *trans*-$\mathrm{[PtCl_2(NH_3)_2]}$.
- Electron transfer is inner sphere (bridged, often with ligand transfer, as Taube showed) or outer sphere; Marcus theory gives $\Delta^\ddagger G = (\lambda/4)(1 + \Delta_\mathrm{r}G^\circ/\lambda)^2$, the cross relation, and the inverted region.
- Kinetic inertness and thermodynamic stability are independent and must both be considered when complexes are used.
:::

## Exercises

::: exercise Inert or labile? {level=1}
Predict whether each complex is labile or inert, and explain: (a) $\mathrm{[Cr(NH_3)_6]^{3+}}$, (b) $\mathrm{[Fe(H_2O)_6]^{2+}}$, (c) $\mathrm{[Co(NH_3)_6]^{3+}}$, (d) $\mathrm{[Cu(NH_3)_4(H_2O)_2]^{2+}}$, (e) $\mathrm{[Rh(H_2O)_6]^{3+}}$, (f) $\mathrm{[V(H_2O)_6]^{3+}}$.
::: solution
(a) Inert: $d^3$, CFAE $0.2\Delta_\mathrm{o}$ with a large $\Delta_\mathrm{o}$, charge 3+. (b) Labile: high-spin $d^6$ with two $e_g$ electrons, charge 2+. (c) Inert: low-spin $d^6$. (d) Labile: $d^9$, Jahn–Teller elongated, with one electron in the antibonding $d_{x^2-y^2}$ and very weak axial bonds. (e) Very inert: low-spin $d^6$, second-row metal, 3+. (f) Moderately labile for a 3+ ion: $d^2$, no $e_g$ electrons but only a small CFAE, and an open $t_{2g}$ orbital allows associative attack ($k_\mathrm{ex} \approx 5\times10^2\ \mathrm{s^{-1}}$).
:::
:::

::: exercise A half-life {level=1 check="80.2"}
Calculate the half-life, in hours, for exchange of a given water molecule on $\mathrm{[Cr(H_2O)_6]^{3+}}$, $k_\mathrm{ex} = 2.4\times10^{-6}\ \mathrm{s^{-1}}$. (Enter the half-life in hours, to three significant figures.)
::: solution
$t_{1/2} = \ln2/k = 0.6931/(2.4\times10^{-6}\ \mathrm{s^{-1}}) = 2.888\times10^5\ \mathrm{s} = 80.2\ \mathrm{h}$.
:::
:::

::: exercise Trans-effect products {level=1}
Predict the product of (a) $\mathrm{[PtCl_3(NH_3)]^-} + \mathrm{NH_3}$, (b) $\mathrm{[PtCl_3(C_2H_4)]^-}$ (Zeise's anion) $+ \mathrm{NH_3}$, (c) $\mathrm{[PtCl(NH_3)_3]^+} + \mathrm{Cl^-}$.
::: solution
(a) The two mutually *trans* chlorides are labilised by each other; ammonia replaces one: *cis*-$\mathrm{[PtCl_2(NH_3)_2]}$. (b) Ethene has a much larger trans effect than chloride, so the chloride *trans* to ethene is replaced: *trans*-$\mathrm{[PtCl_2(C_2H_4)(NH_3)]}$. (c) The ammonia *trans* to Cl is replaced: *trans*-$\mathrm{[PtCl_2(NH_3)_2]}$.
:::
:::

::: exercise Eigen–Wilkins for cobalt(II) {level=2 check="4.8e5"}
Estimate the second-order rate constant for the formation of $\mathrm{[Co(NH_3)(H_2O)_5]^{2+}}$ from $\mathrm{[Co(H_2O)_6]^{2+}}$ ($k_\mathrm{ex} = 3.2\times10^6\ \mathrm{s^{-1}}$) and ammonia, taking $K_\mathrm{os} = 0.15\ \mathrm{dm^3\,mol^{-1}}$ and an $\mathrm{I_d}$ mechanism. (Enter $k_\mathrm{f}$ in $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$.)
::: solution
$k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i} \approx K_\mathrm{os}k_\mathrm{ex} = 0.15 \times 3.2\times10^6 = 4.8\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$, about a hundred times faster than the corresponding nickel(II) reaction, in proportion to the water exchange rates.
:::
:::

::: exercise Reading activation volumes {level=2}
Water exchange on $\mathrm{[Ti(H_2O)_6]^{3+}}$ has $\Delta^\ddagger V = -12.1\ \mathrm{cm^3\,mol^{-1}}$ and on $\mathrm{[Ga(H_2O)_6]^{3+}}$ $+5.0\ \mathrm{cm^3\,mol^{-1}}$. What do these values imply about the mechanisms, and how can the difference be related to the electron configurations?
::: solution
The large negative value for titanium(III) indicates an associatively activated mechanism ($\mathrm{I_a}$ or A): the transition state is more compact than the reactants because a seventh water is partly bonded. Titanium(III), $t_{2g}^1$, has two empty $t_{2g}$ orbitals pointing between the ligands, where an incoming water can approach without strong repulsion. Gallium(III), $d^{10}$, has a full $3d$ shell blocking that approach, and its positive activation volume indicates dissociative activation ($\mathrm{I_d}$). The same changeover is seen across the first-row dications from $\mathrm{V^{2+}}$ to $\mathrm{Ni^{2+}}$.
:::
:::

::: exercise A Marcus barrier {level=2 check="12.25"}
An outer-sphere reaction has $\lambda = 100\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}G^\circ = -30\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta^\ddagger G$, compare it with the self-exchange barrier, and find the driving force at which the reaction would be fastest. (Enter $\Delta^\ddagger G$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta^\ddagger G = (100/4)(1 - 30/100)^2 = 25 \times 0.49 = 12.25\ \mathrm{kJ\,mol^{-1}}$, half the self-exchange barrier of $\lambda/4 = 25\ \mathrm{kJ\,mol^{-1}}$. The rate is greatest, with zero barrier, when $\Delta_\mathrm{r}G^\circ = -\lambda = -100\ \mathrm{kJ\,mol^{-1}}$; more exergonic reactions lie in the inverted region and slow down again.
:::
:::

::: exercise Fitting a two-term rate law {level=3 check="4.00e-3"}
For substitution of a platinum(II) complex by pyridine in methanol at $25\ ^\circ\mathrm{C}$, the pseudo-first-order rate constants are $k_\mathrm{obs} = 0.61$, $0.99$, $1.41$, $1.79$ and $2.21 \times 10^{-4}\ \mathrm{s^{-1}}$ at $[\mathrm{py}] = 0.010$, $0.020$, $0.030$, $0.040$ and $0.050\ \mathrm{mol\,dm^{-3}}$. (a) Find $k_1$ and $k_2$ by least squares. (b) What fraction of the reaction goes by the solvent path at $[\mathrm{py}] = 0.020\ \mathrm{mol\,dm^{-3}}$? (Enter $k_2$ in $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$.)
::: hint
Fit $k_\mathrm{obs} = k_1 + k_2[\mathrm{py}]$ by linear regression: the mean of $[\mathrm{py}]$ is $0.030$ and the mean of $k_\mathrm{obs}$ is $1.402\times10^{-4}\ \mathrm{s^{-1}}$.
:::
::: solution
(a) With $\bar x = 0.030$ and $\bar y = 1.402\times10^{-4}$: $\sum(x - \bar x)^2 = (0.02^2 + 0.01^2) \times 2 = 1.0\times10^{-3}$, and $\sum(x - \bar x)(y - \bar y) = (-0.02)(-0.792) + (-0.01)(-0.412) + 0 + (0.01)(0.388) + (0.02)(0.808)$ (in units of $10^{-4}$) $= 0.01584 + 0.00412 + 0.00388 + 0.01616 = 0.0400\times10^{-4}$. So $k_2 = 0.0400\times10^{-4}/1.0\times10^{-3} = 4.00\times10^{-3}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ and $k_1 = \bar y - k_2\bar x = 1.402\times10^{-4} - 1.20\times10^{-4} = 2.0\times10^{-5}\ \mathrm{s^{-1}}$. (b) At $0.020\ \mathrm{mol\,dm^{-3}}$: $k_1/k_\mathrm{obs} = 2.0\times10^{-5}/(2.0\times10^{-5} + 8.0\times10^{-5}) = 0.20$: one-fifth of the reaction goes through the solvento complex.
:::
:::

::: exercise The iodide route to cisplatin {#exr-iodide-route level=3}
Commercial syntheses of cisplatin convert $\mathrm{K_2[PtCl_4]}$ into $\mathrm{K_2[PtI_4]}$, add two equivalents of ammonia to obtain *cis*-$\mathrm{[PtI_2(NH_3)_2]}$, and then replace the iodides by chlorides (via the aqua complex). (a) Use the trans effect to explain why the iodide intermediate gives a purer *cis* product than direct reaction of $\mathrm{[PtCl_4]^{2-}}$ with ammonia. (b) Why must iodide be removed rather than left in the final product? (c) Suggest why the *cis*-diiodo complex is a convenient intermediate even though $\mathrm{Pt{-}I}$ bonds are strong.
::: solution
(a) In the direct route the trans-effect difference between Cl⁻ and $\mathrm{NH_3}$ is modest, so some substitution *trans* to ammonia occurs and the product contains *trans* isomer and $\mathrm{[PtCl(NH_3)_3]^+}$ by over-substitution. Iodide has a much larger trans effect than ammonia; in $\mathrm{[PtI_3(NH_3)]^-}$ the iodides *trans* to iodide are very strongly labilised, so the second ammonia goes almost exclusively *cis* to the first. (b) The active drug is the dichlorido complex; iodide is a softer and more strongly bound ligand that would change the drug's activation in the body (it is hydrolysed to the active aqua species far more slowly). (c) *cis*-$\mathrm{[PtI_2(NH_3)_2]}$ is poorly soluble and precipitates in high purity. Silver nitrate then removes the iodides as insoluble AgI, which drives the reaction despite the strong Pt–I bonds, giving the diaqua complex; adding chloride converts it to cisplatin. This combines a kinetic tool (the trans effect) with a thermodynamic one (precipitation of AgI). The route uses toxic, sensitising platinum compounds and is carried out only under controlled conditions; the point here is the logic of the sequence.
:::
:::

::: exercise Base hydrolysis and the conjugate-base mechanism {level=3}
Hydrolysis of $\mathrm{[CoCl(NH_3)_5]^{2+}}$ in basic solution follows the rate law $-\dd[\mathrm{Co}]/\dd t = k_\mathrm{OH}[\mathrm{Co}][\mathrm{OH^-}]$ and is about $10^6$ times faster than the acid hydrolysis. The proposed **conjugate-base** ($\mathrm{S_N1CB}$, or $\mathrm{D_{cb}}$) mechanism is: fast pre-equilibrium deprotonation of an ammine, $\mathrm{[CoCl(NH_3)_5]^{2+} + OH^- \rightleftharpoons [CoCl(NH_2)(NH_3)_4]^+ + H_2O}$ ($K$), then rate-determining loss of chloride from the amido complex ($k$), then fast addition of water. (a) Derive the rate law and show that $k_\mathrm{OH} = kK$ when $K[\mathrm{OH^-}] \ll 1$. (b) Explain why the amido group accelerates chloride loss. (c) The complex $\mathrm{[CoCl(py)_4(CN)]^+}$ shows no such base acceleration. Why?
::: solution
(a) Let $C$ be the chlorido complex and $C_\mathrm{b}$ its conjugate base. The pre-equilibrium gives $[C_\mathrm{b}] = K[C][\mathrm{OH^-}]$ (water's activity taken as 1). The rate is $k[C_\mathrm{b}] = kK[C][\mathrm{OH^-}]$. With total cobalt $[C]_\mathrm{tot} = [C] + [C_\mathrm{b}] = [C](1 + K[\mathrm{OH^-}])$, the rate is $kK[\mathrm{OH^-}][C]_\mathrm{tot}/(1 + K[\mathrm{OH^-}])$, which reduces to $kK[\mathrm{OH^-}][C]_\mathrm{tot}$ when $K[\mathrm{OH^-}] \ll 1$. Since ammine ligands on cobalt(III) are extremely weak acids ($\mathrm{p}K_\mathrm{a} > 14$), this condition always holds in water, and the observed second-order rate law is reproduced with $k_\mathrm{OH} = kK$. Note that the rate law alone cannot distinguish this from direct attack by hydroxide; the evidence for the conjugate base comes from deuterium exchange of the ammine protons, which is much faster than hydrolysis, and from the requirement for an N–H bond. (b) $\mathrm{NH_2^-}$ is a strong π donor; its lone pair stabilises the five-coordinate intermediate $\mathrm{[Co(NH_2)(NH_3)_4]^{2+}}$ by donating into the empty orbital left by chloride, lowering the barrier to dissociation by many $\mathrm{kJ\,mol^{-1}}$. (c) With pyridine and cyanide as the other ligands there is no acidic N–H proton to remove, so the conjugate base cannot form, and only the slow, uncatalysed path remains, which is the decisive test of the mechanism.
:::
:::
