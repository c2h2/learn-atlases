Every quantum-chemical calculation on a molecule begins with two choices: a *method* (Hartree–Fock, MP2, coupled cluster, a density functional) and a *basis set* — the finite collection of functions in which the molecular orbitals are expanded. Output files and papers report both together, as in "B3LYP/6-31G*" or "CCSD(T)/cc-pVTZ", and the second choice matters as much as the first. A basis that is too small can produce errors larger than the difference between methods; one that is too large can make the calculation impossible. This lesson explains what basis functions are, why almost every program uses Gaussians even though they have the wrong shape, how basis sets are built up in a systematic hierarchy, how results are extrapolated to the complete-basis-set limit, and how to correct for a characteristic artefact of finite atom-centred bases, the basis-set superposition error.

## Why a basis, and what it must do

In [[computational-chemistry/hartree-fock#prop-roothaan]] the molecular orbitals were expanded as $\psi_i = \sum_\mu C_{\mu i}\phi_\mu$, converting the Hartree–Fock equations into the matrix problem $\mathbf{FC} = \mathbf{SC}\boldsymbol\varepsilon$. By the variation principle, enlarging the basis can only lower the energy, and in the limit of a *complete* basis the Hartree–Fock limit is reached. The same is true for correlated methods, where the basis must also describe the *virtual* orbitals into which electrons are excited. A good basis must therefore

1. describe the occupied orbitals well, especially their valence region where chemistry happens;
2. be flexible enough to let orbitals change size and shape as atoms bond (contract, expand and polarise);
3. for correlated methods, supply virtual orbitals that resemble the regions into which electron pairs correlate — which requires functions of higher angular momentum;
4. make the integrals — above all the $\sim K^{4}/8$ two-electron integrals — cheap to compute.

The last requirement turns out to dominate the design.

## Slater and Gaussian functions

The exact orbitals of the hydrogen atom decay as $e^{-Zr/n}$ and have a cusp at the nucleus. Functions of this form are the natural choice.

::: definition Slater-type and Gaussian-type orbitals {#def-sto-gto}
A **Slater-type orbital** (STO) centred on a nucleus has the form
$$
\phi^\mathrm{STO}_{\zeta,n,l,m}(r, \theta, \varphi) = N\,r^{n-1}e^{-\zeta r}\,Y_{lm}(\theta, \varphi),
$$
with exponent $\zeta$. A **Gaussian-type orbital** (GTO) in Cartesian form is
$$
\phi^\mathrm{GTO}_{\alpha,i,j,k}(\mathbf{r}) = N\,x^{i}y^{j}z^{k}e^{-\alpha r^{2}},
$$
with exponent $\alpha$, where $x, y, z$ are measured from the centre and $l = i + j + k$ is the angular momentum ($l = 0$: s; $1$: p; $2$: d). The normalised s-type Gaussian is $(2\alpha/\pi)^{3/4}e^{-\alpha r^{2}}$; the normalised $1s$ Slater function is $(\zeta^{3}/\pi)^{1/2}e^{-\zeta r}$. A d shell has six Cartesian components ($x^{2}, y^{2}, z^{2}, xy, xz, yz$) but only five *spherical* (pure) ones; the sixth Cartesian combination, $x^{2} + y^{2} + z^{2}$, is an s-type function. Programs differ in which they use by default.
:::

Slater functions have the correct cusp at the nucleus ($\mathrm{d}\psi/\mathrm{d}r = -Z\psi$ at $r = 0$, Kato's cusp condition) and the correct exponential decay at long range. Gaussians have neither: they are flat at the nucleus and fall off too fast. Their great advantage is mathematical.

::: proposition Gaussian product theorem {#prop-gpt}
The product of two s-type Gaussians centred at $\mathbf{A}$ and $\mathbf{B}$ is a single Gaussian centred at a point on the line between them:
$$
e^{-\alpha\lvert\mathbf{r}-\mathbf{A}\rvert^{2}}\,e^{-\beta\lvert\mathbf{r}-\mathbf{B}\rvert^{2}} = K_{AB}\,e^{-p\lvert\mathbf{r}-\mathbf{P}\rvert^{2}}, \qquad
p = \alpha + \beta, \quad \mathbf{P} = \frac{\alpha\mathbf{A} + \beta\mathbf{B}}{\alpha + \beta}, \quad K_{AB} = \exp\!\left(-\frac{\alpha\beta}{\alpha + \beta}\lvert\mathbf{A}-\mathbf{B}\rvert^{2}\right).
$$
Products of Gaussians with polynomial prefactors are likewise finite sums of Gaussians centred at $\mathbf{P}$.
:::

::: proof
The exponent is $-\alpha(\mathbf{r}-\mathbf{A})^{2} - \beta(\mathbf{r}-\mathbf{B})^{2} = -p\,r^{2} + 2\mathbf{r}\cdot(\alpha\mathbf{A} + \beta\mathbf{B}) - \alpha A^{2} - \beta B^{2}$. Completing the square in $\mathbf{r}$,
$$
-p\left(\mathbf{r} - \mathbf{P}\right)^{2} + p P^{2} - \alpha A^{2} - \beta B^{2},
$$
and the constant equals $\frac{(\alpha\mathbf{A} + \beta\mathbf{B})^{2}}{p} - \alpha A^{2} - \beta B^{2} = -\frac{\alpha\beta}{p}\left(A^{2} - 2\mathbf{A}\cdot\mathbf{B} + B^{2}\right) = -\frac{\alpha\beta}{p}\lvert\mathbf{A}-\mathbf{B}\rvert^{2}$. Each Cartesian factor $(x - A_x)^{i}$ can be written as $\left[(x - P_x) + (P_x - A_x)\right]^{i}$ and expanded binomially, so polynomial prefactors produce finite sums of Gaussians at $\mathbf{P}$.
:::

The theorem reduces every two-electron integral over four Gaussian centres to an integral over just *two* centres, $\mathbf{P}$ and $\mathbf{Q}$, which can be evaluated in closed form in terms of the Boys function $F_0(t) = \int_0^{1}e^{-tu^{2}}\,\mathrm{d}u = \tfrac{1}{2}\sqrt{\pi/t}\,\mathrm{erf}\sqrt{t}$ and its higher analogues. For Slater functions no such reduction exists and multicentre integrals require slow numerical quadrature. Boys proposed Gaussian basis functions in 1950 for exactly this reason. One integral over Slater functions is worth many over Gaussians, so the strategy is to use several Gaussians to imitate each Slater function — the gain in speed far outweighs the extra functions.

::: example The Gaussian product in $\mathrm{H_2}$ {#ex-gpt}
Two s Gaussians with $\alpha = \beta = 1.00\ a_0^{-2}$ sit on the two protons of $\mathrm{H_2}$, $R = 1.40\ a_0$ apart. Where is their product centred, what is its exponent, and what is the prefactor $K_{AB}$?
::: solution
$p = 2.00\ a_0^{-2}$, $\mathbf{P}$ is the bond midpoint (equal exponents), and $K_{AB} = \exp\left[-(1 \times 1/2)(1.40)^{2}\right] = e^{-0.98} = 0.375$. The product, which is the overlap density $\phi_\mathrm{A}\phi_\mathrm{B}$ that builds up bonding charge, is a single compact Gaussian in the middle of the bond. With unequal exponents the centre moves towards the tighter function. The prefactor decays as $e^{-\mu R^{2}}$, so integrals between distant, tight functions are negligible — the basis of integral screening.
:::
:::

### How bad is one Gaussian?

The hydrogen atom shows the cost of the wrong shape. With a single normalised s Gaussian $\phi = (2\alpha/\pi)^{3/4}e^{-\alpha r^{2}}$ the expectation values are $\langle T\rangle = 3\alpha/2$ and $\langle V\rangle = -2\sqrt{2\alpha/\pi}$ (in $\mathrm{E_h}$), so
$$
E(\alpha) = \frac{3\alpha}{2} - 2\sqrt{\frac{2\alpha}{\pi}} .
$$ {#eq-h-gaussian}

::: example The hydrogen atom with one Gaussian {#ex-h-one-gaussian}
Minimise [[#eq-h-gaussian]] and compare with the exact $-0.5\ \mathrm{E_h}$.
::: solution
$\mathrm{d}E/\mathrm{d}\alpha = \tfrac{3}{2} - \sqrt{2/\pi\alpha} = 0$ gives $\sqrt{\alpha} = \tfrac{2}{3}\sqrt{2/\pi}$, i.e. $\alpha^{*} = 8/9\pi = 0.2829\ a_0^{-2}$. Then $\langle T\rangle = 4/3\pi$ and $\langle V\rangle = -8/3\pi$ (the virial ratio $-V/T = 2$ is satisfied at the optimum, as it must be), and
$$
E^{*} = -\frac{4}{3\pi} = -0.4244\ \mathrm{E_h},
$$
too high by $0.0756\ \mathrm{E_h} = 2.06\ \mathrm{eV} = 198\ \mathrm{kJ\,mol^{-1}}$ — an error of $15\ \%$, from the cusp region (where the Gaussian has too little density) and the tail (where it decays too fast). Yet the overlap of this Gaussian with the exact $1s$ function is $0.978$: a wavefunction that looks almost right can still give a poor energy if it is wrong near the nucleus, where the potential energy is concentrated.
:::
:::

::: widget plot
f: exp(-x)/sqrt(pi); (2*a/pi)^(3/4)*exp(-a*x^2)
x: 0, 5
y: 0, 0.65
sliders: a=0.2829:0.05:1.5:0.001
labels: \text{Slater } 1s; \text{Gaussian } (2\alpha/\pi)^{3/4}e^{-\alpha r^2}
caption: The exact hydrogen $1s$ orbital (a Slater function with $\zeta = 1$) and a normalised s Gaussian against $r$ in bohr, starting at the energy-optimal exponent $\alpha = 0.2829$. The Gaussian has no cusp at $r = 0$ and decays too quickly beyond $r \approx 3$. Increase $\alpha$ to fit the inner region better and the tail gets worse; no single exponent fits both, which is why several Gaussians are combined.
:::

::: widget plot
f: 1.5*x - 2*sqrt(2*x/pi)
x: 0.02, 1.5
y: -0.55, 0.4
points: 0.2829, -0.4244
hlines: -0.5
labels: E(\alpha)/\mathrm{E_h}
caption: The variational energy of the hydrogen atom with one s Gaussian, $E(\alpha) = 3\alpha/2 - 2\sqrt{2\alpha/\pi}$, against the exponent $\alpha$ in $a_0^{-2}$. The minimum (marked) is $-4/3\pi = -0.4244\ \mathrm{E_h}$, well above the exact $-0.5\ \mathrm{E_h}$ (dashed line). The curve is flat near its minimum, so moderate errors in exponents cost little energy — the property that lets one fixed set of exponents serve many molecules.
:::

## Contracted Gaussians and minimal basis sets

Using many independent Gaussians per atomic orbital makes the basis large and the integral count grows as the fourth power. The compromise is **contraction**.

::: definition Contracted Gaussian functions {#def-contraction}
A **contracted Gaussian-type orbital** is a fixed linear combination of **primitive** Gaussians with the same centre and angular part:
$$
\phi^\mathrm{CGTO}_\mu(\mathbf{r}) = \sum_{p=1}^{L} d_{p\mu}\,g_p(\alpha_{p\mu}, \mathbf{r}),
$$
where the contraction coefficients $d_{p\mu}$ and exponents $\alpha_{p\mu}$ are fixed when the basis is designed; only the coefficients $C_{\mu i}$ of the contracted functions are varied in the SCF. The integrals are still evaluated over primitives (the cost grows with $L^{4}$), but the number of variational functions $K$ — and hence the cost of the linear algebra and, for correlated methods, of everything else — is set by the contracted functions.
:::

The simplest contracted basis is the **STO-$n$G** family (Hehre, Stewart and Pople, 1969): each Slater function is replaced by a least-squares fit with $n$ Gaussians. For a $1s$ Slater function of exponent $\zeta = 1$, STO-3G uses exponents $0.109818$, $0.405771$ and $2.22766\ a_0^{-2}$ with coefficients $0.444635$, $0.535328$ and $0.154329$ (multiplying normalised primitives). Because a Gaussian fit to $e^{-\zeta r}$ is related to a fit to $e^{-r}$ by scaling $r$, the exponents for any other $\zeta$ are those for $\zeta = 1$ multiplied by $\zeta^{2}$.

::: example How many Gaussians? {#ex-h-convergence}
The table gives the hydrogen-atom energy with $n$ s Gaussians whose exponents and coefficients are *all* optimised (uncontracted), together with the STO-$n$G values (exponents fixed by a least-squares fit to the Slater function rather than by energy minimisation). What is the error per added function, and what does the comparison show?

| $n$ | optimised $E/\mathrm{E_h}$ | error $/\mathrm{mE_h}$ | STO-$n$G $E/\mathrm{E_h}$ |
|---|---|---|---|
| $1$ | $-0.42441$ | $75.6$ | $-0.42422$ |
| $2$ | $-0.48581$ | $14.2$ | $-0.48116$ |
| $3$ | $-0.49698$ | $3.02$ | $-0.49491$ |
| $4$ | $-0.49928$ | $0.72$ | |
| $5$ | $-0.49981$ | $0.19$ | |
| $6$ | $-0.49995$ | $0.054$ | |
::: solution
The error falls by a factor of $4$–$5$ per added Gaussian ($75.6 \to 14.2 \to 3.0 \to 0.72 \to 0.19 \to 0.054\ \mathrm{mE_h}$): roughly exponential convergence, but slow by the standards of chemistry, where $1\ \mathrm{mE_h} = 2.6\ \mathrm{kJ\,mol^{-1}}$. Even six Gaussians leave $0.14\ \mathrm{kJ\,mol^{-1}}$ of error in the energy of one hydrogen atom, almost all from the cusp region. STO-3G is $5.1\ \mathrm{mE_h}$ ($13\ \mathrm{kJ\,mol^{-1}}$) above the exact energy, worse than the energy-optimised three-Gaussian set because its exponents were chosen to fit the *shape* of the Slater function, not to minimise the energy. In molecules these core-region errors largely cancel between reactants and products, which is why chemistry can tolerate them; but they explain why absolute energies from small basis sets are poor.
:::
:::

A **minimal basis** has one contracted function per occupied atomic orbital (with the full p set for elements with $2p$ occupation): one function for H and He, five for Li–Ne ($1s, 2s, 2p_x, 2p_y, 2p_z$). For molecular calculations the Slater exponents are optimised for molecules: hydrogen in STO-3G uses $\zeta = 1.24$ rather than the atomic $\zeta = 1$, because the orbital contracts in a bond. That choice raises the isolated-atom energy to $-0.46658\ \mathrm{E_h}$, an example of the compromises built into every basis.

## Split-valence, polarisation and diffuse functions

A minimal basis cannot change the *size* of an orbital: the $2p$ function on oxygen is the same in $\mathrm{O_2}$, in water and in hydroxide. Three enrichments repair this.

**Split valence.** Describe each valence orbital by two (or three) contracted functions, one tight and one loose; the SCF then mixes them to make the orbital larger or smaller as the bonding requires. Core orbitals, which change little, keep a single function. In **6-31G**, for example, each core orbital is one contraction of six primitives, and each valence orbital is split into an inner contraction of three primitives and a single outer primitive. "Double zeta" (DZ) and "triple zeta" (TZ) refer to two or three functions per valence orbital.

**Polarisation functions** are functions of higher angular momentum than any occupied orbital of the atom: d functions on carbon or oxygen, p functions on hydrogen. Mixing a p function into a hydrogen s orbital shifts its centre of charge along the bond; mixing d into p bends and polarises the p lobes. Polarisation functions are essential for accurate geometries (especially bond angles and the pyramidality of nitrogen), for hypervalent molecules such as $\mathrm{SF_6}$, and above all for correlated calculations. In Pople notation, 6-31G* (or 6-31G(d)) adds d functions to heavy atoms, and 6-31G** (6-31G(d,p)) adds p functions to hydrogen as well.

**Diffuse functions** are s and p functions with very small exponents, extending far from the nucleus. They are needed wherever electron density is loosely held: anions, excited and Rydberg states, hydrogen-bond acceptors, polarisabilities and long-range interactions. Pople's "+" (6-31+G*) adds them to heavy atoms and "++" to hydrogen as well; Dunning's "aug-" prefix adds one diffuse function of each angular momentum present.

::: example Counting basis functions {#ex-counting}
How many contracted basis functions does a water molecule have in STO-3G, 6-31G, 6-31G* (Cartesian d) and 6-31G**? How many primitive Gaussians in 6-31G?
::: solution
- STO-3G: O has $1s, 2s, 2p_{x,y,z}$ = $5$; each H has $1$; total $7$.
- 6-31G: O has $1$ core s + $2 \times$ ($2s$ + three $2p$) = $9$; each H has $2$ (split $1s$); total $13$.
- 6-31G*: add six Cartesian d functions on O: $15 + 2 + 2 = 19$.
- 6-31G**: add three p functions on each H: $19 + 6 = 25$.

Primitives in 6-31G: oxygen core $6$, inner valence $4 \times 3 = 12$ (the 2s and 2p share exponents), outer valence $4$, total $22$; each hydrogen $3 + 1 = 4$; molecule $30$. Going from STO-3G to 6-31G** multiplies $K$ by $25/7 = 3.6$ and the number of two-electron integrals by about $3.6^{4} \approx 160$.
:::
:::

::: warning Bigger is not automatically better, and the names hide differences {#warn-basis}
Three misconceptions are common. First, a "larger" basis is not always better *for a given method*: Hartree–Fock and DFT converge quickly with basis size and gain little beyond triple zeta, whereas correlated methods converge very slowly, and pairing a high-level correlated method with a small basis (say CCSD(T)/6-31G) wastes most of the method's accuracy. Second, Pople basis sets were optimised for Hartree–Fock and are not designed for systematic convergence of correlation energies; the cc-pV$X$Z sets are. Third, conventions hide in the labels: 6-31G* uses six Cartesian d functions by default in some programs and five spherical in others, giving different energies; "DZP" means different things in different papers. Always report the basis precisely and, when comparing with literature values, check which components were used.
:::

## Correlation-consistent basis sets and the basis-set limit

For correlated calculations Dunning introduced, in 1989, the **correlation-consistent** basis sets cc-pV$X$Z ("correlation-consistent polarised valence $X$-zeta", $X$ = D, T, Q, 5, 6 for cardinal numbers $2, 3, 4, 5, 6$). Their design principle is that functions are added in shells that each contribute similar amounts of correlation energy: cc-pVDZ for carbon is $[3s2p1d]$; cc-pVTZ adds one function of each type and one of higher angular momentum, $[4s3p2d1f]$; cc-pVQZ is $[5s4p3d2f1g]$. Each step adds a full layer, so energies converge smoothly and *systematically* with $X$.

| water | cc-pVDZ | cc-pVTZ | cc-pVQZ | cc-pV5Z |
|---|---|---|---|---|
| functions (spherical) | $24$ | $58$ | $115$ | $201$ |

The correlation energy converges slowly because the exact wavefunction has a **cusp** in the interelectronic coordinate: when two electrons meet, $\Psi$ depends linearly on $r_{12}$ (the electron–electron analogue of the nuclear cusp), and products of smooth one-electron functions represent this kink only with high angular momenta. Analysis of the helium atom and of second-order perturbation theory shows that the contribution of functions of angular momentum $l$ to the correlation energy falls off as $(l + \tfrac{1}{2})^{-4}$, so truncating at $l_\mathrm{max}$ leaves an error proportional to $l_\mathrm{max}^{-3}$. In cc-pV$X$Z, $l_\mathrm{max}$ grows with $X$, which suggests the following.

::: proposition Two-point extrapolation to the complete-basis-set limit {#prop-cbs}
If the correlation energy in a basis of cardinal number $X$ behaves as $E_X = E_\mathrm{CBS} + A\,X^{-3}$, then two calculations with cardinal numbers $X$ and $Y$ determine the limit:
$$
E_\mathrm{CBS} = \frac{X^{3}E_X - Y^{3}E_Y}{X^{3} - Y^{3}} .
$$
The formula is applied to the *correlation* energy only; the Hartree–Fock energy converges faster (roughly exponentially in $X$) and is usually taken from the largest basis or extrapolated separately. The $X^{-3}$ form is an asymptotic result and is reliable only for $X \geq 3$.
:::

::: proof
Writing $E_X = E_\mathrm{CBS} + A X^{-3}$ and $E_Y = E_\mathrm{CBS} + A Y^{-3}$, multiply the first by $X^{3}$ and the second by $Y^{3}$: $X^{3}E_X = X^{3}E_\mathrm{CBS} + A$ and $Y^{3}E_Y = Y^{3}E_\mathrm{CBS} + A$. Subtracting eliminates $A$: $X^{3}E_X - Y^{3}E_Y = (X^{3} - Y^{3})E_\mathrm{CBS}$, which gives the result. The $X^{-3}$ law itself follows from the $(l + \tfrac{1}{2})^{-4}$ partial-wave increments: $\sum_{l > L}(l + \tfrac{1}{2})^{-4} \approx \int_{L}^{\infty}(l + \tfrac{1}{2})^{-4}\,\mathrm{d}l \approx \tfrac{1}{3}L^{-3}$, and in cc-pV$X$Z the highest angular momentum for a first-row atom is $l_\mathrm{max} = X$.
:::

::: example Extrapolating a correlation energy {#ex-cbs}
Illustrative valence correlation energies for a small molecule, of the size typical for water at the CCSD(T) level, are $E_3 = -0.2850\ \mathrm{E_h}$ (cc-pVTZ) and $E_4 = -0.2960\ \mathrm{E_h}$ (cc-pVQZ). Estimate the CBS limit and the remaining error of the quadruple-zeta value.
::: solution
$$
E_\mathrm{CBS} = \frac{4^{3}(-0.2960) - 3^{3}(-0.2850)}{4^{3} - 3^{3}} = \frac{-18.944 + 7.695}{37} = -0.3040\ \mathrm{E_h}.
$$
The quadruple-zeta value is still $8.0\ \mathrm{mE_h} = 21\ \mathrm{kJ\,mol^{-1}}$ above the limit, and $A = (E_3 - E_\mathrm{CBS}) \times 27 = 0.514\ \mathrm{E_h}$. Absolute correlation energies converge painfully slowly; *relative* energies converge faster because much of the error comes from the core-like region near each nucleus and the short-range cusp, which change little in a reaction. Explicitly correlated (F12) methods, which put $r_{12}$ dependence into the wavefunction directly, reach near-CBS results with triple-zeta bases.
:::
:::

::: widget plot
f: E + A/x^3
x: 1.5, 7
y: -0.32, -0.22
sliders: E=-0.3040:-0.33:-0.28:0.0005; A=0.514:0.1:1.2:0.002
points: 2, -0.2350; 3, -0.2850; 4, -0.2960
hlines: -0.304
labels: E_X = E_\mathrm{CBS} + A X^{-3}
caption: The $X^{-3}$ model of basis-set convergence fitted through the illustrative triple- and quadruple-zeta points of [[#ex-cbs]]; the dashed line is the extrapolated limit. A double-zeta value is also shown: it lies off the curve, because $X = 2$ is not yet in the asymptotic regime — the reason extrapolations using double zeta are unreliable. Try fitting all three points with one curve by moving the sliders.
:::

## Basis-set superposition error

Finite atom-centred bases have one more consequence, important for weak interactions. In a complex $\mathrm{A\cdots B}$, the electrons of A can use the basis functions of B to improve their own description, and vice versa. The monomers, computed alone, have no such help. The interaction energy $\Delta E = E_\mathrm{AB} - E_\mathrm{A} - E_\mathrm{B}$ is therefore too negative — the complex is artificially stabilised. This is **basis-set superposition error** (BSSE). It vanishes in the complete-basis limit and is largest for small basis sets and weak interactions, where it can be a large fraction of the binding energy.

::: algorithm Counterpoise correction (Boys–Bernardi) {#alg-counterpoise}
1. Optimise or choose the geometry of the complex AB.
2. Compute $E_\mathrm{AB}^{\mathrm{AB}}$, the energy of the complex in the full basis.
3. Compute each monomer at its geometry *in the complex*, in the full dimer basis: $E_\mathrm{A}^{\mathrm{AB}}$ with the basis functions of B present as **ghost functions** (functions without nuclei or electrons), and likewise $E_\mathrm{B}^{\mathrm{AB}}$.
4. The counterpoise-corrected interaction energy is $\Delta E^\mathrm{CP} = E_\mathrm{AB}^{\mathrm{AB}} - E_\mathrm{A}^{\mathrm{AB}} - E_\mathrm{B}^{\mathrm{AB}}$.
5. If the binding energy relative to *relaxed* monomers is wanted, add the deformation energy: the energy of each monomer at its complex geometry minus that at its own optimised geometry, both in the monomer basis.
:::

::: example Counterpoise correction for a hydrogen-bonded dimer {#ex-bsse}
In an illustrative calculation on a water dimer with a double-zeta basis, the uncorrected interaction energy is $-25.0\ \mathrm{kJ\,mol^{-1}}$. With ghost functions present, the donor monomer's energy falls by $2.1\ \mathrm{kJ\,mol^{-1}}$ and the acceptor's by $1.6\ \mathrm{kJ\,mol^{-1}}$, relative to their energies in their own bases at the same geometries. What is the counterpoise-corrected interaction energy?
::: solution
The BSSE is the total lowering of the monomers in the dimer basis, $2.1 + 1.6 = 3.7\ \mathrm{kJ\,mol^{-1}}$. The corrected interaction energy is $\Delta E^\mathrm{CP} = -25.0 + 3.7 = -21.3\ \mathrm{kJ\,mol^{-1}}$. A $15\ \%$ correction is typical for a hydrogen bond with a double-zeta basis; for a dispersion-bound complex such as the benzene dimer it can exceed $50\ \%$ in small bases. Counterpoise corrections are sometimes argued to *over*-correct, because the occupied orbitals of the partner are not available to a monomer in the complex (Pauli exclusion) but are available as ghosts; in practice a large basis with the correction applied is the safe choice, and the uncorrected and corrected values should converge towards each other as the basis grows.
:::
:::

::: quiz
You need the binding energy of the fluoride ion to a water molecule. Which basis-set choice is most important to get right?
- [ ] A minimal basis is sufficient because the interaction is electrostatic.
- [x] Diffuse functions are essential, because the anion's electrons are loosely bound; and the result should be counterpoise-corrected or computed in a large basis.
- [ ] Only core functions matter, because fluoride is small.
- [ ] Basis-set choice is unimportant if a correlated method is used.
::: solution
Anions have weakly bound outer electrons whose density extends far from the nucleus; without diffuse functions the anion is described as too compact and its energy as too high, which corrupts the binding energy. Polarisation functions are also needed for the water's response, and BSSE must be controlled.
:::
:::

## Other basis families and practical choices

Beyond Pople and Dunning sets, widely used families include the **Karlsruhe** def2 sets of Weigend and Ahlrichs (def2-SVP, def2-TZVP, def2-QZVP, available consistently for most of the periodic table), Jensen's **polarisation-consistent** pc-$n$ sets optimised for DFT, and **effective core potentials** (ECPs, pseudopotentials) that replace the core electrons of heavy atoms by a fitted potential, which both reduces cost and builds in the main scalar relativistic effects. For solids, **plane waves** $e^{i\mathbf{k}\cdot\mathbf{r}}$ are natural: they are not atom-centred (so there is no BSSE and no Pulay force), their quality is controlled by a single energy cutoff, and they are combined with pseudopotentials because describing the core cusp would need enormous cutoffs.

A pragmatic guide for molecules:

| purpose | reasonable starting basis |
|---|---|
| DFT geometries and frequencies | def2-SVP or 6-31G* for screening; def2-TZVP for final structures |
| DFT reaction energies | def2-TZVP or larger, with diffuse functions for anions |
| MP2 or CCSD(T) energies | cc-pVTZ and cc-pVQZ with CBS extrapolation, or F12 methods with triple zeta |
| weak interactions | aug-cc-pVTZ or larger, counterpoise-corrected |
| heavy elements (beyond Kr) | def2 sets with their matched ECPs |

## Where this leads

Basis-set convergence is a recurring theme: correlated methods ([[computational-chemistry/electron-correlation]]) need much larger basis sets than Hartree–Fock and DFT ([[computational-chemistry/density-functional-theory]]), and the cost of each method is quoted as a power of the number of basis functions. The Pulay forces mentioned in [[computational-chemistry/potential-energy-surfaces]] arise because atom-centred basis functions move with the nuclei. For materials, plane-wave bases are standard ([[materials-chemistry]]).

::: history
John Slater proposed his simplified analytical atomic orbitals in 1930. In 1950 S. Francis Boys showed that Gaussian functions make all molecular integrals analytically tractable, the idea on which nearly every modern program rests. Warren Hehre, Robert Stewart and John Pople published the STO-$n$G minimal basis sets in 1969, followed by the split-valence 4-31G (1971) and 6-31G (1972) sets; polarisation functions were added in the 6-31G* sets of Hariharan and Pople (1973), and Krishnan, Binkley, Seeger and Pople published 6-311G** in 1980. Thom Dunning introduced the correlation-consistent cc-pV$X$Z family in 1989, and Rick Kendall, Dunning and Robert Harrison added the augmented sets in 1992. The counterpoise correction is due to Boys and Fernando Bernardi (1970). The $X^{-3}$ extrapolation was proposed by Trygve Helgaker, Wim Klopper, Henrik Koch and Jozef Noga in 1997, building on the partial-wave analysis of helium by Charles Schwartz (1962).
:::

::: summary
- Orbitals are expanded in a finite basis; the energy approaches the method's limit from above as the basis grows.
- Slater functions have the right cusp and decay; Gaussians do not, but the Gaussian product theorem makes all integrals analytic, so contracted Gaussians imitate Slater functions.
- One Gaussian gives the hydrogen atom $-4/3\pi = -0.4244\ \mathrm{E_h}$; each added Gaussian reduces the error by a factor of about four.
- Split-valence functions let orbitals change size; polarisation functions (d on C, N, O; p on H) let them change shape; diffuse functions describe anions and weak interactions.
- Correlation energies converge slowly, as $X^{-3}$ in cc-pV$X$Z, because of the electron–electron cusp; two-point extrapolation $E_\mathrm{CBS} = (X^{3}E_X - Y^{3}E_Y)/(X^{3} - Y^{3})$ estimates the limit.
- Basis-set superposition error over-stabilises complexes in finite bases; the Boys–Bernardi counterpoise correction computes monomers with ghost functions.
- Match the basis to the method and the property, and report it precisely.
:::

## Exercises

::: exercise Scaling exponents {level=1 check="0.6239"}
STO-3G exponents for $\zeta = 1$ are $0.109818$, $0.405771$ and $2.22766\ a_0^{-2}$. What is the middle exponent for hydrogen in molecules, $\zeta = 1.24$? (Enter it in $a_0^{-2}$ to four significant figures.)
::: solution
Exponents scale as $\zeta^{2}$: $0.405771 \times 1.24^{2} = 0.405771 \times 1.5376 = 0.6239\ a_0^{-2}$.
:::
:::

::: exercise Basis functions for benzene {level=1 check="114"}
cc-pVDZ has $[3s2p1d]$ (14 spherical functions) on carbon and $[2s1p]$ (5 functions) on hydrogen. How many basis functions does benzene have? (Enter the number.)
::: solution
$6 \times 14 + 6 \times 5 = 84 + 30 = 114$. In cc-pVTZ ($[4s3p2d1f]$ = 30 on C, $[3s2p1d]$ = 14 on H) it would be $264$, and the two-electron integral count rises by $(264/114)^{4} \approx 29$.
:::
:::

::: exercise The Gaussian product prefactor {level=1 check="0.375"}
Evaluate $K_{AB}$ for two s Gaussians with $\alpha = \beta = 1.00\ a_0^{-2}$ separated by $1.40\ a_0$. (Enter $K_{AB}$ to three significant figures.)
::: solution
$K_{AB} = \exp[-(\alpha\beta/(\alpha + \beta))R^{2}] = \exp(-0.5 \times 1.96) = e^{-0.98} = 0.375$.
:::
:::

::: exercise The optimal single Gaussian {level=2 check="0.2829"}
Show that the hydrogen-atom energy with one normalised s Gaussian, $E(\alpha) = 3\alpha/2 - 2\sqrt{2\alpha/\pi}$, is minimised at $\alpha^{*} = 8/9\pi$, and evaluate it. (Enter $\alpha^{*}$ in $a_0^{-2}$ to four significant figures.)
::: solution
$E'(\alpha) = \tfrac{3}{2} - \sqrt{2/\pi}\,\alpha^{-1/2} = 0$ gives $\alpha^{1/2} = \tfrac{2}{3}\sqrt{2/\pi}$, so $\alpha^{*} = \tfrac{4}{9} \times \tfrac{2}{\pi} = 8/9\pi = 0.2829\ a_0^{-2}$, and $E^{*} = 4/3\pi - 8/3\pi = -4/3\pi = -0.4244\ \mathrm{E_h}$.
:::
:::

::: exercise A two-point extrapolation {level=2 check="-0.3139"}
MP2 valence correlation energies of a molecule are $-0.2783\ \mathrm{E_h}$ with cc-pVTZ and $-0.2989\ \mathrm{E_h}$ with cc-pVQZ. Estimate the CBS limit with the $X^{-3}$ formula. (Enter $E_\mathrm{CBS}$ in $\mathrm{E_h}$ to four decimal places.)
::: solution
$E_\mathrm{CBS} = [64(-0.2989) - 27(-0.2783)]/37 = (-19.1296 + 7.5141)/37 = -11.6155/37 = -0.3139\ \mathrm{E_h}$.
:::
:::

::: exercise Counterpoise arithmetic {level=2 check="-14.6"}
For a complex AB in a medium-sized basis, $E_\mathrm{AB}^{\mathrm{AB}} = -230.418\,62\ \mathrm{E_h}$, $E_\mathrm{A}^{\mathrm{AB}} = -154.732\,18\ \mathrm{E_h}$ and $E_\mathrm{B}^{\mathrm{AB}} = -75.680\,88\ \mathrm{E_h}$ (both monomers at their complex geometries, with ghost functions). Compute the counterpoise-corrected interaction energy. (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta E^\mathrm{CP} = -230.41862 - (-154.73218 - 75.68088) = -230.41862 + 230.41306 = -0.00556\ \mathrm{E_h}$, and $-0.00556 \times 2625.50\ \mathrm{kJ\,mol^{-1}} = -14.6\ \mathrm{kJ\,mol^{-1}}$. Note how many digits the total energies need for a weak interaction: an interaction energy of a few $\mathrm{kJ\,mol^{-1}}$ is a difference in the sixth significant figure of the totals.
:::
:::

::: exercise Derive the one-Gaussian energy {level=3 check="-0.4244"}
For $\phi = (2\alpha/\pi)^{3/4}e^{-\alpha r^{2}}$, derive $\langle -\tfrac{1}{2}\nabla^{2}\rangle = 3\alpha/2$ and $\langle -1/r\rangle = -2\sqrt{2\alpha/\pi}$, and hence the minimum energy. Verify the virial theorem at the minimum. (Enter $E^{*}$ in $\mathrm{E_h}$ to four decimal places.)
::: hint
Use $\int_0^{\infty}r^{2n}e^{-a r^{2}}\,\mathrm{d}r = \frac{(2n-1)!!}{2^{n+1}a^{n}}\sqrt{\pi/a}$ and $\int_0^{\infty}r\,e^{-ar^{2}}\,\mathrm{d}r = 1/2a$. For the kinetic energy, $\langle T\rangle = \tfrac{1}{2}\int\lvert\nabla\phi\rvert^{2}\,\mathrm{d}\mathbf{r}$.
:::
::: solution
$\nabla\phi = -2\alpha\mathbf{r}\phi$, so $\langle T\rangle = \tfrac{1}{2}\int 4\alpha^{2}r^{2}\phi^{2}\,\mathrm{d}\mathbf{r} = 2\alpha^{2}\langle r^{2}\rangle$. With $\phi^{2} = (2\alpha/\pi)^{3/2}e^{-2\alpha r^{2}}$ (a Gaussian of exponent $2\alpha$), $\langle r^{2}\rangle = 3/(2 \cdot 2\alpha) = 3/4\alpha$, so $\langle T\rangle = 3\alpha/2$. The potential: $\langle 1/r\rangle = (2\alpha/\pi)^{3/2}\,4\pi\int_0^{\infty}r\,e^{-2\alpha r^{2}}\,\mathrm{d}r = (2\alpha/\pi)^{3/2}\,4\pi/(4\alpha) = 2\sqrt{2\alpha/\pi}$. Minimising gives $\alpha^{*} = 8/9\pi$, $\langle T\rangle = 4/3\pi$, $\langle V\rangle = -8/3\pi$, so $\langle V\rangle = -2\langle T\rangle$ (virial theorem for a Coulomb potential) and $E^{*} = -4/3\pi = -0.4244\ \mathrm{E_h}$.
:::
:::

::: exercise Helium Hartree–Fock with s Gaussians {level=3 check="4.41"}
Hartree–Fock energies of helium with $n$ fully optimised s Gaussians are $-2.30099$ ($n = 1$), $-2.74707$ ($n = 2$), $-2.83568$ ($n = 3$) and $-2.85516\ \mathrm{E_h}$ ($n = 4$); the Hartree–Fock limit is $-2.86168\ \mathrm{E_h}$. Compute the errors and the ratio of successive errors for $n = 2 \to 3$ and $n = 3 \to 4$, and compare with hydrogen ([[#ex-h-convergence]]). What does the result suggest about why basis sets for heavier atoms need more primitives in the core? (Enter the ratio of the $n = 2$ to the $n = 3$ error, to three significant figures.)
::: solution
Errors: $0.56069$, $0.11461$, $0.02600$, $0.00652\ \mathrm{E_h}$. Ratios: $0.11461/0.02600 = 4.41$ (the number to enter) and $0.02600/0.00652 = 3.99$. These are close to hydrogen's factors of $4$–$5$, but the absolute errors are several times larger (compare $0.0756\ \mathrm{E_h}$ for one-Gaussian hydrogen with $0.561\ \mathrm{E_h}$ for helium, a factor of $7.4$), because the cusp grows sharper and the energy more concentrated near the nucleus as the nuclear charge increases and the energy is concentrated near the nucleus. For a carbon or chlorine atom, an accurate core therefore needs six or more primitives, which is why 6-31G uses six for the core while the valence region, where chemistry happens, is given more *flexibility* (split contractions) rather than more primitives.
:::
:::
