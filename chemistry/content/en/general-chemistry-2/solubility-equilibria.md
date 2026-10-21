A kidney stone is a few grams of crystalline calcium oxalate or calcium phosphate that the body failed to keep dissolved; tooth enamel is hydroxyapatite, $\mathrm{Ca_5(PO_4)_3OH}$, which your saliva would slowly dissolve were it not for a mineral so sparingly soluble that its solubility product is of the order of $10^{-58}$; and a bottle of milk of magnesia relieves heartburn precisely because magnesium hydroxide will *not* dissolve beyond about $10^{-4}\ \mathrm{mol\,dm^{-3}}$ and so cannot deliver a damaging blast of hydroxide. "Insoluble" salts are not absent from solution — they are present at a concentration fixed by an equilibrium constant, and that constant answers every question about them: will this mixture cloud, will this precipitate redissolve in acid or in ammonia, can two ions be separated by raising a single reagent concentration. This chapter is the equilibrium calculus of the slightly-dissolved, and its one theme is that solubility is not a property of a salt but of a salt *in a particular solution*.

## The solubility product

::: definition The solubility product {#def-solubility-product}
A **sparingly soluble** ionic solid $\mathrm{M_{a}X_{b}(s)}$ establishes equilibrium with its ions in solution,
$$
\mathrm{M_{a}X_{b}(s) \rightleftharpoons a\,M^{b+}(aq) + b\,X^{a-}(aq)}
\qquad
K_\mathrm{sp} = \left[\mathrm{M^{b+}}\right]^{a}\left[\mathrm{X^{a-}}\right]^{b},
$$
the **solubility product** $K_\mathrm{sp}$ — the equilibrium constant of the dissolution, with the solid omitted (its activity is that of the pure phase, 1) and the concentrations those of a saturated solution at equilibrium. For silver chloride, $K_\mathrm{sp} = [\mathrm{Ag^+}][\mathrm{Cl^-}] = 1.8\times10^{-10}$ at $\mathrm{25\,^\circ C}$; for magnesium hydroxide, $K_\mathrm{sp} = [\mathrm{Mg^{2+}}][\mathrm{OH^-}]^2 = 5.6\times10^{-12}$. All $K_\mathrm{sp}$ values in this chapter are representative tabulated data at $\mathrm{25\,^\circ C}$ unless stated otherwise.
:::

The word "product" is literal: it is the *product* of the ion concentrations, each raised to its stoichiometric power, and it is this multiplication that makes a trace of one ion so expensive in terms of the other. The **molar solubility** $s$ is the amount of solid (in $\mathrm{mol\,dm^{-3}}$) that dissolves; it is related to $K_\mathrm{sp}$ by the stoichiometry of dissolution, and converting between the two is the first technique of the subject.

::: proof Molar solubility from $K_\mathrm{sp}$ {#proof-solubility-formula}
For a salt $\mathrm{MX}$ (1:1 stoichiometry, e.g. $\mathrm{AgCl}$), dissolution gives $[\mathrm{M^{+}}]=[\mathrm{X^{-}}]=s$, so $K_\mathrm{sp} = s^2$ and $s = \sqrt{K_\mathrm{sp}}$. For $\mathrm{MX_2}$ (e.g. $\mathrm{CaF_2}$, $\mathrm{Mg(OH)_2}$), one formula unit gives one cation and two anions: $[\mathrm{M^{2+}}]=s$, $[\mathrm{X^-}]=2s$, and
$$
K_\mathrm{sp} = (s)(2s)^2 = 4s^3
\qquad\Longrightarrow\qquad
s = \sqrt[3]{K_\mathrm{sp}/4}.
$$
For $\mathrm{M_2X_3}$ (e.g. $\mathrm{Fe_2S_3}$-type salts, or $\mathrm{Ca_3(PO_4)_2}$ with $K_\mathrm{sp} = (3s)^3(2s)^2$), the general rule is $K_\mathrm{sp} = a^{a} b^{b}\, s^{\,a+b}$ for $\mathrm{M_aX_b}$: each ion concentration is its coefficient times $s$, and the exponents add. For $\mathrm{Fe(OH)_3}$, $K_\mathrm{sp} = (s)(3s)^3 = 27s^4$, so $s = (K_\mathrm{sp}/27)^{1/4}$.
:::

::: warning $K_\mathrm{sp}$ is constant; solubility is not — and $K_\mathrm{sp}$ values do not rank solubilities {#warn-compare-ksp}
Three confusions to keep apart. First, $K_\mathrm{sp}$ depends only on temperature (and ionic strength, which we ignore at this level); the *solubility* changes whenever anything else in the solution changes — a common ion, an acid, a complexing ligand. Second, you may compare molar solubilities directly by $K_\mathrm{sp}$ **only between salts of the same stoichiometry**: $\mathrm{Ag_2CrO_4}$ has $K_\mathrm{sp} = 1.1\times10^{-12}$, a hundred times *smaller* than $\mathrm{AgCl}$'s $1.8\times10^{-10}$, yet it is the *more* soluble salt in pure water ($6.5\times10^{-5}$ against $1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$), because the factor $4s^3$ versus $s^2$ reorders the ranking. Convert to $s$ before you compare. Third, the reaction quotient $Q$, formed from the ion concentrations *as they are*, not from those of a saturated solution, decides direction: $Q > K_\mathrm{sp}$ precipitation, $Q < K_\mathrm{sp}$ dissolution (more below).
:::

::: proposition The ion product and the criterion for precipitation {#prop-ionic-product}
Form the **ion product** $Q_\mathrm{sp}$ by substituting the current ion concentrations into the $K_\mathrm{sp}$ expression. If $Q_\mathrm{sp} > K_\mathrm{sp}$ the solution is **supersaturated** and a precipitate forms until $Q_\mathrm{sp} = K_\mathrm{sp}$; if $Q_\mathrm{sp} < K_\mathrm{sp}$ the solution is **unsaturated** and no precipitate appears (added solid dissolves); if $Q_\mathrm{sp} = K_\mathrm{sp}$ the solution is saturated and at equilibrium. Because precipitation begins the instant $Q_\mathrm{sp}$ crosses $K_\mathrm{sp}$, the concentration of one ion at which precipitation of the other *starts* is obtained by setting $Q_\mathrm{sp} = K_\mathrm{sp}$ and solving — the calculation behind every separation in this chapter.
:::

::: example Molar solubility of silver chloride, with and without common ion {#ex-agcl-common-ion}
Find the molar solubility of $\mathrm{AgCl}$ ($K_\mathrm{sp} = 1.8\times10^{-10}$) in (a) pure water; (b) $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaCl}$.
::: solution
(a) $s = \sqrt{K_\mathrm{sp}} = \sqrt{1.8\times10^{-10}} = 1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ — the "insoluble" salt is present at thirteen micromolar, which is why distilled water left in a silver vessel is not silver-free.
(b) Now $\mathrm{Cl^-}$ comes mostly from the sodium chloride: $[\mathrm{Cl^-}] = 0.10 + s \approx 0.10$, so $[\mathrm{Ag^+}] = K_\mathrm{sp}/0.10 = 1.8\times10^{-9}\ \mathrm{mol\,dm^{-3}}$, and every silver ion that dissolves is a silver ion that came from solid, so $s = 1.8\times10^{-9}\ \mathrm{mol\,dm^{-3}}$. The common ion has cut the solubility by a factor of $7400$ while leaving $K_\mathrm{sp}$ exactly $1.8\times10^{-10}$: the product $[\mathrm{Ag^+}][\mathrm{Cl^-}]$ is restored by *shrinking* the scarce ion. This is the **common-ion effect**, and it is one reason a precipitate is washed with dilute electrolyte rather than pure water; the other face of it appears in the hard-water bath, where calcium and magnesium ions drive the fatty-acid anions of soap past their own $K_\mathrm{sp}$ and leave the film known as soap scum.
:::
:::

::: example The chromate trap: which silver salt is more soluble? {#ex-chromate-trap}
$K_\mathrm{sp}(\mathrm{AgCl}) = 1.8\times10^{-10}$ and $K_\mathrm{sp}(\mathrm{Ag_2CrO_4}) = 1.1\times10^{-12}$. Which salt dissolves more of itself in pure water, and by what factor?
::: solution
Different stoichiometries, so convert: $\mathrm{AgCl}$: $s = \sqrt{1.8\times10^{-10}} = 1.34\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. $\mathrm{Ag_2CrO_4}$: $s = (K_\mathrm{sp}/4)^{1/3} = (2.75\times10^{-13})^{1/3} = 6.5\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. The salt with the *smaller* $K_\mathrm{sp}$ is five times the *more* soluble — the cube root of $K_\mathrm{sp}/4$ simply does not follow the square root of $K_\mathrm{sp}$. (Their silver-ion concentrations at saturation, $1.3\times10^{-4}$ against $1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, differ for the same reason.) The lesson generalises: never rank solubilities across stoichiometry types without converting to $s$.
:::
:::

::: quiz The common-ion effect at the molecular level {#quiz-common-ion}
A saturated solution of $\mathrm{AgCl}$ with a little solid at the bottom is in equilibrium. You add a few drops of concentrated $\mathrm{NaCl}$ and wait. Which single statement is true?
- [x] $[\mathrm{Cl^-}]$ rises, $Q_\mathrm{sp} > K_\mathrm{sp}$, some $\mathrm{AgCl}$ precipitates, and the new $[\mathrm{Ag^+}]$ is lower while $K_\mathrm{sp}$ is unchanged.
- [ ] $K_\mathrm{sp}$ decreases because there is now more chloride in the solution.
- [ ] $[\mathrm{Ag^+}]$ is unchanged; only the amount of solid changes.
- [ ] The added $\mathrm{Na^+}$ is the common ion, so nothing happens to $[\mathrm{Ag^+}]$.
::: solution
The first. The product $[\mathrm{Ag^+}][\mathrm{Cl^-}]$ is momentarily pushed above $1.8\times10^{-10}$, so the solution is supersaturated and solid forms until the product returns to $K_\mathrm{sp}$ — which, with $[\mathrm{Cl^-}]$ now larger, forces $[\mathrm{Ag^+}]$ smaller. $K_\mathrm{sp}$ is a constant at fixed temperature and does not "know" what you added; sodium is not the common ion, chloride is.
:::
:::

## pH: the solubility of bases is a dial you can turn

For any salt whose anion is a base — hydroxides, sulfides, carbonates, phosphates, fluorides — the dissolving equilibrium is coupled to the proton equilibrium, and $[\mathrm{H_3O^+}]$ becomes a control knob. The coupling is again just multiplication of constants.

::: proof pH dependence of hydroxide solubility {#proof-ph-dependence}
For $\mathrm{M(OH)_{n}}$, $K_\mathrm{sp} = [\mathrm{M^{n+}}][\mathrm{OH^-}]^n$. If the pH is fixed by a buffer (so $[\mathrm{OH^-}]$ is a known constant, not $ns$), then
$$
s = \left[\mathrm{M^{n+}}\right] = \frac{K_\mathrm{sp}}{\left[\mathrm{OH^-}\right]^{n}}
= \frac{K_\mathrm{sp}}{\left(K_\mathrm{w}/\left[\mathrm{H_3O^+}\right]\right)^{n}},
$$
so the solubility grows as the $n$-th power of the acidity: lowering the pH by one unit multiplies the solubility of a hydroxide by $10^{n}$. For $\mathrm{Fe(OH)_3}$ that is a factor of $1000$ per pH unit — which is why iron(III) rust chemistry and iron(III) removal are pH stories. The formula fails only when it predicts a solubility larger than the amount of solid present or larger than the solvent can hold: then the solid simply dissolves completely, and the honest conclusion is "no saturated solution is possible at this pH".
:::

::: example Separating iron(III) from magnesium by pH {#ex-fe-mg-separation}
A solution contains $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Fe^{3+}}$ and $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Mg^{2+}}$. Using $K_\mathrm{sp}(\mathrm{Fe(OH)_3}) = 2.8\times10^{-39}$ and $K_\mathrm{sp}(\mathrm{Mg(OH)_2}) = 5.6\times10^{-12}$, find the pH at which $\mathrm{Fe^{3+}}$ begins to precipitate, the pH at which it is 99.9 % removed, and the pH at which $\mathrm{Mg^{2+}}$ begins to precipitate. Can the two be separated by pH alone?
::: solution
$\mathrm{Fe(OH)_3}$ begins when $[\mathrm{OH^-}] = (K_\mathrm{sp}/0.010)^{1/3} = (2.8\times10^{-37})^{1/3} = 6.5\times10^{-13}\ \mathrm{mol\,dm^{-3}}$, i.e. $\mathrm{pH} = 1.82$. It is 99.9 % gone ($[\mathrm{Fe^{3+}}] = 1.0\times10^{-5}$) when $[\mathrm{OH^-}] = (2.8\times10^{-39}/10^{-5})^{1/3} = 6.5\times10^{-12}$, $\mathrm{pH} = 2.82$. $\mathrm{Mg(OH)_2}$ begins when $[\mathrm{OH^-}] = (5.6\times10^{-12}/0.010)^{1/2} = 2.4\times10^{-5}$, $\mathrm{pH} = 9.37$. The windows do not touch: raising the pH to about $3$–$4$ precipitates the iron completely while the magnesium stays in solution a full six pH units below its own precipitation point. This is exactly how qualitative analysis schemes and hydrometallurgical plants strip iron out of acidic leach solutions ("precipitation of iron by lime to pH 4"), and it rests on nothing but the $10^{n}$ leverage of the proof above.
:::
:::

::: widget plot
f: 100*2.8e-39/((10^(x-14))^3*0.01)
x: 1, 4
y: 0, 100
caption: The percentage of an initial $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Fe^{3+}}$ concentration left in solution as a function of pH, from $K_\mathrm{sp} = 2.8\times10^{-39}$: the curve is $100\,K_\mathrm{sp}/\left([\mathrm{OH^-}]^3 \times 0.010\right)$ with $[\mathrm{OH^-}] = K_\mathrm{w}/10^{-\mathrm{pH}}$. It crosses 100 % at $\mathrm{pH} = 1.8$ (precipitation begins), falls to $28\ \%$ at $\mathrm{pH}\ 2$, and to $0.028\ \%$ by $\mathrm{pH}\ 3$ — the cubic term in $[\mathrm{OH^-}]$ makes hydroxide precipitation brutally steep in pH. Compare with magnesium, whose curve would not even begin until $\mathrm{pH}\ 9.4$.
:::

The same leverage works on salts of weak acids, with the proton acting on the anion. Fluoride is basic ($\mathrm{F^- + H_3O^+ \rightleftharpoons HF + H_2O}$), so acid dissolves $\mathrm{CaF_2}$ twice over: it removes $\mathrm{F^-}$ from the solubility product *and* drags more solid into solution.

::: example Calcium fluoride in acidic solution {#ex-caf2-ph}
$K_\mathrm{sp}(\mathrm{CaF_2}) = 3.9\times10^{-11}$, $K_\mathrm{a}(\mathrm{HF}) = 6.8\times10^{-4}$. Find the molar solubility of $\mathrm{CaF_2}$ in (a) pure water, (b) a buffer at $\mathrm{pH}\ 3.00$.
::: solution
(a) $s = (K_\mathrm{sp}/4)^{1/3} = 2.1\times10^{-4}\ \mathrm{mol\,dm^{-3}}$.
(b) At fixed pH the fluoride balance is $2s = [\mathrm{F^-}] + [\mathrm{HF}]$, and the acid equilibrium fixes the fraction of fluoride that remains free: $\alpha = K_\mathrm{a}/(K_\mathrm{a} + [\mathrm{H_3O^+}]) = 6.8\times10^{-4}/(6.8\times10^{-4} + 1.0\times10^{-3}) = 0.40$, so $[\mathrm{F^-}] = 0.40 \times 2s$ and $K_\mathrm{sp} = s\,(0.81s)^2 = 0.66\,s^3$, giving $s = 3.9\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ — nearly double. At $\mathrm{pH}\ 2$ the same calculation ($\alpha = 0.064$) gives $1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, six times the pure-water value. This is why toothpaste carries fluoride but a soda-soaked tooth does not stay sound: enamel's apatite dissolves in acid exactly as $\mathrm{CaF_2}$ does, and saliva's buffer is what puts the equilibrium back.
:::
:::

::: widget newton
f: 4*x^3*(6.8e-4/(6.8e-4+1e-3))^2 - 3.9e-11
method: newton
x0: 0.0005
caption: Newton's method solving the buffered-solubility equation $4\alpha^2 s^3 = K_\mathrm{sp}$ for $s$, the molar solubility of $\mathrm{CaF_2}$ at $\mathrm{pH}\ 3.00$, with $\alpha = K_\mathrm{a}/(K_\mathrm{a}+[\mathrm{H_3O^+}]) = 0.405$ built into the function. The iteration converges on $s = 3.9\times10^{-4}\ \mathrm{mol\,dm^{-3}}$; the pure-water answer $2.1\times10^{-4}$ is the same equation with $\alpha = 1$.
:::

::: example Sulfide by pH: the acid–base logic of qualitative analysis {#ex-sulfide-grouping}
Saturated aqueous $\mathrm{H_2S}$ is about $0.10\ \mathrm{mol\,dm^{-3}}$, and with modern dissociation constants the sulfide concentration obeys $[\mathrm{H^+}]^2[\mathrm{S^{2-}}] \approx 1\times10^{-27}$ (representative values: $K_{\mathrm{a}1}K_{\mathrm{a}2}[\mathrm{H_2S}]$). Take $K_\mathrm{sp}(\mathrm{CuS}) = 6\times10^{-37}$, $K_\mathrm{sp}(\mathrm{ZnS}) = 2\times10^{-25}$, $K_\mathrm{sp}(\mathrm{MnS}) = 3\times10^{-14}$ (sulfide $K_\mathrm{sp}$ values vary by orders of magnitude with the solid's form — treat these as representative). For each, decide whether the 0.010 M ion precipitates as the sulfide (i) in $0.5\ \mathrm{mol\,dm^{-3}}$ acid, (ii) at $\mathrm{pH}\ 9$.
::: solution
At $0.5\ \mathrm{mol\,dm^{-3}}$ acid, $[\mathrm{S^{2-}}] = 1\times10^{-27}/0.25 = 4\times10^{-27}$, so $Q = 0.010 \times 4\times10^{-27} = 4\times10^{-29}$: this exceeds $K_\mathrm{sp}(\mathrm{CuS})$ — copper precipitates even in strong acid — but falls below $K_\mathrm{sp}(\mathrm{ZnS})$ and far below $K_\mathrm{sp}(\mathrm{MnS})$: no zinc, no manganese. At $\mathrm{pH}\ 9$, $[\mathrm{S^{2-}}] = 1\times10^{-27}/10^{-18} = 1\times10^{-9}$ and $Q = 1\times10^{-11}$, which exceeds both $2\times10^{-25}$ and $3\times10^{-14}$: zinc and manganese now precipitate. The onset pH for the 0.010 M ions follows from $[\mathrm{S^{2-}}] = K_\mathrm{sp}/0.010$: zinc begins at $\mathrm{pH}\ 2.2$, manganese only at $\mathrm{pH}\ 7.7$. This single calculation *is* the classical separation of the hydrogen-sulfide groups — group II (Cu, Pb, Hg, Bi: precipitated in acid) from group IV (Zn, Mn, Ni, Co: precipitated in ammoniacal solution) — done with two multiplications. Practical note: $\mathrm{H_2S}$ is acutely toxic and flammable, which is why teaching schemes now use safer sulfur sources; the equilibrium logic is unchanged.
:::
:::

## Complex ions: the precipitate that redissolves

A cation that meets a suitable ligand does not merely sit in solution — it binds, sometimes so strongly that complex formation empties the solution of the free ion and a precipitate that "should" be there cannot survive.

::: definition Complex ions and formation constants {#def-complex-ion}
A **complex ion** is a central metal ion bound to a set of ligands (molecules or anions with lone pairs: $\mathrm{NH_3}$, $\mathrm{CN^-}$, $\mathrm{Cl^-}$, $\mathrm{OH^-}$, water). The equilibrium $\mathrm{Ag^+ + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+}$ has a **formation constant** $K_\mathrm{f} = \left[\mathrm{Ag(NH_3)_2^+}\right]/\left([\mathrm{Ag^+}][\mathrm{NH_3}]^2\right) = 1.6\times10^{7}$: large $K_\mathrm{f}$ means the complex is the dominant species. Ligands that bind through two or more donor atoms (the chelate effect — EDTA, oxalate) give still larger effective stabilities. Complex formation is the Lewis acid–base chemistry of the metals, and it is the reason "insoluble" chlorides dissolve in ammonia, "insoluble" hydroxides dissolve in excess base, and silver dissolves in cyanide.
:::

::: proposition Coupled equilibria add as multiplied constants {#prop-coupling}
If two equations are added to give a third, the equilibrium constant of the third is the *product* of the two. Dissolving $\mathrm{AgCl}$ in ammonia is the sum of $\mathrm{AgCl(s) \rightleftharpoons Ag^+ + Cl^-}$ ($K_\mathrm{sp}$) and $\mathrm{Ag^+ + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+}$ ($K_\mathrm{f}$):
$$
\mathrm{AgCl(s) + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+ + Cl^-}
\qquad K = K_\mathrm{sp}\,K_\mathrm{f}.
$$
The same rule governs acid dissolution ($K = K_\mathrm{sp}/(K_{\mathrm{a}1}K_{\mathrm{a}2})$ for carbonates, $K = K_\mathrm{sp}/K_\mathrm{w}^n$-type for hydroxides) and is the general mechanism by which any side reaction — protonation, complexation, redox — increases solubility: it removes a product of the dissolution, and the product $Q_\mathrm{sp}$ can never reach $K_\mathrm{sp}$.
:::

::: example Dissolving silver chloride in ammonia {#ex-ammonia-dissolution}
How much $\mathrm{AgCl}$ dissolves in $1.0\ \mathrm{mol\,dm^{-3}}$ aqueous ammonia? $K_\mathrm{sp} = 1.8\times10^{-10}$, $K_\mathrm{f}(\mathrm{Ag(NH_3)_2^+}) = 1.6\times10^{7}$.
::: solution
The overall constant is $K = K_\mathrm{sp}K_\mathrm{f} = 2.9\times10^{-3}$. With $s$ the solubility, $[\mathrm{Ag(NH_3)_2^+}] = [\mathrm{Cl^-}] = s$ and $[\mathrm{NH_3}] = 1.0 - 2s$, so $s^2/(1.0-2s)^2 = 2.9\times10^{-3}$, $s/(1-2s) = 0.054$, and $s = 0.048\ \mathrm{mol\,dm^{-3}}$ — three thousand times the solubility in water. That is why a rinse of dilute ammonia clears photographic film of unexposed $\mathrm{AgBr}$-type halide, and why the old qualitative-analysis flow chart separates $\mathrm{AgCl}$ (dissolves in ammonia) from $\mathrm{AgBr}$ (only partly) and $\mathrm{AgI}$ (not at all): the same $K_\mathrm{sp}K_\mathrm{f}$ arithmetic, different numbers.
:::
:::

Complexation competes with precipitation on the same ion pair, and when the ligand is the precipitating ion itself — chloride on silver — the two effects fight and solubility passes through a minimum.

::: widget plot
f: 1.8e-10/10^x + 1.8e-10*1.8e5*10^x
x: -4, 0
y: 0, 3.5e-5
caption: The molar solubility of $\mathrm{AgCl}$, $s = K_\mathrm{sp}/[\mathrm{Cl^-}] + K_\mathrm{sp}\beta_2\,[\mathrm{Cl^-}]$ with $\beta_2 \approx 1.8\times10^{5}$ for $\mathrm{AgCl_2^-}$, plotted against $\log_{10}[\mathrm{Cl^-}]$. From the left, added chloride is a common ion and the solubility falls as $K_\mathrm{sp}/[\mathrm{Cl^-}]$; past the minimum at $[\mathrm{Cl^-}] = 1/\sqrt{\beta_2} = 2.4\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ the complexation term takes over and the solubility climbs again — concentrated chloride redissolves the precipitate. The practical rule: wash a chloride precipitate with dilute, *not* concentrated, electrolyte, and never chase a "salting out" so hard you salt it back in.
:::

## Selective precipitation: one reagent, two ions

::: example Halide separation: silver chloride before silver bromide {#ex-halide-selectivity}
A solution is $0.010\ \mathrm{mol\,dm^{-3}}$ in both $\mathrm{Cl^-}$ and $\mathrm{Br^-}$. Solid $\mathrm{AgNO_3}$ raises $[\mathrm{Ag^+}]$ slowly (volume change negligible). Which halide precipitates first, what is $[\mathrm{Ag^+}]$ when the second begins, and what fraction of the first remains then? $K_\mathrm{sp}(\mathrm{AgCl}) = 1.8\times10^{-10}$, $K_\mathrm{sp}(\mathrm{AgBr}) = 5.4\times10^{-13}$.
::: solution
$\mathrm{AgBr}$ needs $[\mathrm{Ag^+}] = 5.4\times10^{-13}/0.010 = 5.4\times10^{-11}\ \mathrm{mol\,dm^{-3}}$ to begin; $\mathrm{AgCl}$ needs $1.8\times10^{-8}$ — three hundred times more silver, so bromide precipitates first. When $[\mathrm{Ag^+}]$ reaches $1.8\times10^{-8}$ and silver chloride starts, the bromide left is $[\mathrm{Br^-}] = 5.4\times10^{-13}/1.8\times10^{-8} = 3.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, i.e. $0.3\ \%$ of the original — $99.7\ \%$ of the bromide is out before the first crystal of $\mathrm{AgCl}$ appears. The ratio $[\mathrm{Cl^-}]/[\mathrm{Br^-}] = K_\mathrm{sp}(\mathrm{AgCl})/K_\mathrm{sp}(\mathrm{AgBr}) = 333$ holds throughout the co-precipitation zone and is the general result: two ions sharing one precipitating ion are separated in proportion to the ratio of their $K_\mathrm{sp}$ values, and a separation is "complete" (the classical criterion: 99.9 %) when that ratio is large enough.
:::
:::

::: history
The arithmetic of this chapter was older than its theory. The classical wet-analysis flow chart — group by group, precipitate by precipitate, $\mathrm{H_2S}$ in acid then in ammonia — was fixed in Karl Remigius Fresenius's *Handbuch der qualitativen chemischen Analyse* (1841) and its companion on quantitative analysis soon after, long before anyone could write a $K_\mathrm{sp}$. Friedrich Mohr turned precipitation into volumetric analysis in 1855 with the chromate-indicator titration of chloride that still bears his name; Jacob Volhard's iron-indicator back-titration of silver followed in 1874. The equilibrium-constant interpretation arrived with the ionic theory of Arrhenius and the heterogeneous-equilibrium thermodynamics of the 1890s–1900s, which explained in one stroke why the old recipes worked and exactly how far they could be pushed — a rare case of a craft tradition waiting two generations for its theory and finding it immediately useful.
:::

::: warning "Insoluble" never means zero — and the constants have fine print {#warn-insoluble}
A "precipitate" leaves the rest of its ions in solution at $K_\mathrm{sp}$-governed concentrations: filtering a saturated $\mathrm{AgCl}$ solution still costs $1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ of silver, which matters when silver is the analyte you are trying to save (hence the washings in gravimetric analysis) and matters ecologically when the precipitate is a waste brine. Two pieces of fine print: first, the formula $s = (K_\mathrm{sp}/27)^{1/4}$ for $\mathrm{Fe(OH)_3}$ assumes the only source of hydroxide is the solid; at $s \sim 10^{-10}$ that is false — water's own $10^{-7}\ \mathrm{mol\,dm^{-3}}$ hydroxide dominates and the true solubility is higher (and the solid's surface chemistry takes over). Use the buffered-solubility formula, where pH is set externally, not the pure-water one, when the computed $ns$ falls near $10^{-7}$. Second, precipitation is a kinetic event: a solution can sit supersaturated (a cloud-free bottle of sodium ethanoate trihydrate hand-warmer is exactly that) until a seed crystal or a scratch starts the solid. $Q_\mathrm{sp} > K_\mathrm{sp}$ says a precipitate *may* form, not that one *will*, instantly.
:::

::: quiz One reagent, two cations {#quiz-selective}
A solution contains $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na^+}$ and $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ag^+}$. You add dilute $\mathrm{HCl}$. What happens?
- [x] $\mathrm{AgCl}$ precipitates while $\mathrm{NaCl}$ stays dissolved, because $Q_\mathrm{sp}$ for silver chloride crosses $K_\mathrm{sp}$ long before sodium chloride could ever saturate.
- [ ] Both chlorides precipitate together, since both are "chlorides".
- [ ] $\mathrm{NaCl}$ precipitates first because sodium is the more abundant ion.
- [ ] Nothing precipitates until both ions reach $0.10\ \mathrm{mol\,dm^{-3}}$ chloride.
::: solution
The first. $K_\mathrm{sp}$ exists for $\mathrm{AgCl}$ because silver chloride is sparingly soluble; sodium chloride is a *soluble* salt — it saturates near $6\ \mathrm{mol\,dm^{-3}}$, eight orders of magnitude of ion product beyond anything here, so it never clouds. Selective precipitation works because $K_\mathrm{sp}$ values span dozens of orders of magnitude across salts, while concentrations do not.
:::
:::

## Where this leads

Solubility equilibria are the mass-action machinery of [[general-chemistry-2/chemical-equilibrium]] applied to a solid phase; the pH dependence is the acid–base chemistry of [[general-chemistry-2/acids-bases]] read backwards; the buffers that hold iron and magnesium apart are those of [[general-chemistry-2/buffers-titrations]]. The ion concentrations set here feed the electrode potentials of [[general-chemistry-2/electrochemistry-intro]] — a sparingly soluble electrode like $\mathrm{Ag/AgCl}$ is a $K_\mathrm{sp}$ in disguise — and the naming of the complex ions belongs to [[general-chemistry-1/formulas-nomenclature]]. The full analytical treatment, with activities and the group-separation schemes, is in [[analytical-chemistry/classical-analysis]] and [[analytical-chemistry/equilibria-in-analysis]].

::: summary
- A "sparingly soluble" salt dissolves to a concentration fixed by $K_\mathrm{sp}$, the equilibrium constant of dissolution with the solid omitted; $K_\mathrm{sp}$ is constant at fixed temperature, solubility is not.
- Convert $K_\mathrm{sp}$ to molar solubility through the stoichiometry ($s = \sqrt{K_\mathrm{sp}}$, $\sqrt[3]{K_\mathrm{sp}/4}$, $\sqrt[4]{K_\mathrm{sp}/27}$); never rank solubilities across stoichiometries by $K_\mathrm{sp}$ alone.
- $Q_\mathrm{sp}$ versus $K_\mathrm{sp}$ decides direction: supersaturated precipitates, unsaturated dissolves; precipitation thresholds come from setting $Q_\mathrm{sp} = K_\mathrm{sp}$.
- Common ions suppress solubility by the product rule; a buffer at fixed pH raises the solubility of any salt of a basic anion by $10^{n}$ per pH unit.
- Complex formation multiplies onto $K_\mathrm{sp}$ ($K = K_\mathrm{sp}K_\mathrm{f}$) and can redissolve a precipitate entirely; when the ligand is the precipitating ion, solubility passes through a minimum.
- Two ions sharing a precipitant separate in proportion to the ratio of their $K_\mathrm{sp}$ values — the basis of fractional precipitation, the sulfide groups, and the Mohr and Volhard titrations.
- Every side reaction that removes a dissolution product (protonation, complexation, redox) increases solubility; coupling equilibria by multiplying constants is the universal technique.
:::

## Exercises

::: exercise Molar solubility of calcium carbonate {level=1 check="5.8"}
$K_\mathrm{sp}(\mathrm{CaCO_3}) = 3.4\times10^{-9}$. Find the molar solubility of calcite in pure water. (Enter the molar solubility in units of $10^{-5}\ \mathrm{mol\,dm^{-3}}$.)
::: solution
$s = \sqrt{K_\mathrm{sp}} = \sqrt{3.4\times10^{-9}} = 5.8\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ — about $6\ \mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$, which is enough to scale a kettle over a year of hard water.
:::
:::

::: exercise pH of milk of magnesia {level=1 check="10.35"}
$K_\mathrm{sp}(\mathrm{Mg(OH)_2}) = 5.6\times10^{-12}$. Find the pH of a saturated solution of magnesium hydroxide in pure water. (Enter the pH.)
::: solution
$s = (K_\mathrm{sp}/4)^{1/3} = 1.1\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, so $[\mathrm{OH^-}] = 2s = 2.2\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = 3.65$, $\mathrm{pH} = 10.35$. A saturated suspension is mildly basic — safe as an antacid in a way a clear sodium hydroxide solution of the same pH would not be: the undissolved solid caps the hydroxide supply, so the pH cannot rise above $10.35$ however much milk of magnesia is swallowed.
:::
:::

::: exercise Will it cloud? {level=1}
Equal volumes of $2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{BaCl_2}$ and $2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$ are mixed. Does barium sulfate precipitate? $K_\mathrm{sp}(\mathrm{BaSO_4}) = 1.1\times10^{-10}$.
::: solution
Mixing halves both concentrations: $[\mathrm{Ba^{2+}}] = [\mathrm{SO_4^{2-}}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, so $Q_\mathrm{sp} = 1.0\times10^{-8} > 1.1\times10^{-10}$. Yes — supersaturated by a factor of ninety, and $\mathrm{BaSO_4}$ clouds the mixture (this is the classic test for sulfate, and the reason barium "meal" for X-rays is sulfate, not the soluble chloride: the sulfate never dissolves).
:::
:::

::: exercise Silver chloride in calcium chloride {level=2 check="4.5"}
Find the molar solubility of $\mathrm{AgCl}$ ($K_\mathrm{sp} = 1.8\times10^{-10}$) in $0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{CaCl_2}$. (Enter the molar solubility in units of $10^{-9}\ \mathrm{mol\,dm^{-3}}$.)
::: solution
$[\mathrm{Cl^-}] = 2 \times 0.020 = 0.040\ \mathrm{mol\,dm^{-3}}$ (the calcium salt delivers two chlorides — the slip this exercise exists to catch), so $s = K_\mathrm{sp}/0.040 = 4.5\times10^{-9}\ \mathrm{mol\,dm^{-3}}$.
:::
:::

::: exercise Residual barium after mixing {level=2 check="1.0"}
Equal volumes of $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{BaCl_2}$ and $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$ are mixed and the precipitate allowed to settle. What is $[\mathrm{Ba^{2+}}]$ in the clear liquid? $K_\mathrm{sp}(\mathrm{BaSO_4}) = 1.1\times10^{-10}$. (Enter the concentration in units of $10^{-5}\ \mathrm{mol\,dm^{-3}}$.)
::: solution
The mixture starts at $0.0010\ \mathrm{mol\,dm^{-3}}$ each and $Q_\mathrm{sp} = 1.0\times10^{-6} \gg K_\mathrm{sp}$, so precipitation is nearly complete and leaves equal barium and sulfate: $[\mathrm{Ba^{2+}}] = \sqrt{K_\mathrm{sp}} = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. Ninety-nine per cent of the barium has precipitated, yet the liquid is still far from barium-free — gravimetric analysts wash with dilute sulfate, not pure water, to push this lower without peptising the solid.
:::
:::

::: exercise Precipitating magnesium {level=2 check="10.87"}
A solution is $0.010\ \mathrm{mol\,dm^{-3}}$ in $\mathrm{Mg^{2+}}$. To what minimum pH must it be raised to precipitate 99.9 % of the magnesium as the hydroxide? $K_\mathrm{sp}(\mathrm{Mg(OH)_2}) = 5.6\times10^{-12}$. (Enter the pH.)
::: solution
99.9 % removed leaves $[\mathrm{Mg^{2+}}] = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, so $[\mathrm{OH^-}] = \sqrt{5.6\times10^{-12}/10^{-5}} = 2.4\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = 3.13$, $\mathrm{pH} = 10.87$. Note the asymmetry with the iron example: magnesium needs a pH near 11 for the same job iron finished at pH 2.8, a seven-unit gap that is pure $K_\mathrm{sp}$ leverage.
:::
:::

::: exercise The Mohr determination {level=3 check="0.0054"}
In the Mohr titration of chloride, the indicator is chromate at $1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ and the solution is $0.10\ \mathrm{mol\,dm^{-3}}$ in $\mathrm{Cl^-}$. Using $K_\mathrm{sp}(\mathrm{AgCl}) = 1.8\times10^{-10}$ and $K_\mathrm{sp}(\mathrm{Ag_2CrO_4}) = 1.1\times10^{-12}$, find the percentage of chloride still in solution at the instant the red silver chromate first appears. (Enter the percentage.)
::: solution
Silver chromate begins when $[\mathrm{Ag^+}] = \sqrt{1.1\times10^{-12}/1.0\times10^{-3}} = 3.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. At that silver concentration the chloride held in solution is $[\mathrm{Cl^-}] = 1.8\times10^{-10}/3.3\times10^{-5} = 5.4\times10^{-6}\ \mathrm{mol\,dm^{-3}}$, i.e. $5.4\times10^{-6}/0.10 = 0.0054\ \%$ of the original. The chloride is 99.99 % precipitated at the endpoint — which is why the method works — but the same arithmetic shows the indicator must not be too concentrated, or the chromate signal arrives before the equivalence point.
:::
:::

::: exercise Magnesium hydroxide in a buffer {level=3 check="5.6"}
Find the molar solubility of $\mathrm{Mg(OH)_2}$ ($K_\mathrm{sp} = 5.6\times10^{-12}$) in a buffer at $\mathrm{pH}\ 10.00$. (Enter the molar solubility in units of $10^{-4}\ \mathrm{mol\,dm^{-3}}$.)
::: solution
At $\mathrm{pH}\ 10.00$, $[\mathrm{OH^-}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ is fixed by the buffer, so $s = K_\mathrm{sp}/[\mathrm{OH^-}]^2 = 5.6\times10^{-12}/10^{-8} = 5.6\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ — five times the pure-water solubility, because the buffer soaks up the hydroxide the solid releases. At $\mathrm{pH}\ 7.4$ the same formula gives $89\ \mathrm{mol\,dm^{-3}}$, an absurdity that means what it says: no saturated solution can exist there, and any reasonable amount of solid dissolves completely.
:::
:::

::: exercise The general solubility formula {level=3}
Derive $K_\mathrm{sp} = a^{a}b^{b}s^{\,a+b}$ for $\mathrm{M_aX_b}$, and use it to explain why the pure-water formula for $\mathrm{Fe(OH)_3}$ must be treated with suspicion while the buffered formula is safe.
::: solution
$\mathrm{M_aX_b \rightleftharpoons a\,M^{b+} + b\,X^{a-}}$ with $[\mathrm{M^{b+}}] = as$, $[\mathrm{X^{a-}}] = bs$ gives $K_\mathrm{sp} = (as)^a(bs)^b = a^ab^bs^{a+b}$. For $\mathrm{Fe(OH)_3}$: $K_\mathrm{sp} = 27s^4$, $s = 1.0\times10^{-10}\ \mathrm{mol\,dm^{-3}}$, which predicts $[\mathrm{OH^-}] = 3s = 3\times10^{-10}$ — *below* the $10^{-7}\ \mathrm{mol\,dm^{-3}}$ water itself supplies. The assumption "all hydroxide comes from the solid" fails, so the pure-water formula underestimates the solubility (and real $\mathrm{Fe(OH)_3}$, being a gelatinous hydrous oxide, is a surface-chemistry problem anyway). The buffered formula $s = K_\mathrm{sp}/[\mathrm{OH^-}]^3$ assumes only that $[\mathrm{OH^-}]$ is externally fixed, which a buffer guarantees — it is safe precisely because it never asks the solid to account for the hydroxide.
:::
:::
