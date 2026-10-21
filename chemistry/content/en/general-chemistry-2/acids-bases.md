Unpolluted rain is acidic — pH $5.6$, sour enough to sting the eye — and that is before any factory adds anything to it; the acidity is simply carbon dioxide dissolved from the air. Your blood, by contrast, is held between $7.35$ and $7.45$ against every acid your muscles pour into it, and a deviation of a few hundredths is a medical emergency. A swimming pool at pH $6.8$ fails to kill, at pH $7.8$ it clouds with calcium carbonate, and swimmers' eyes complain at both. Acids and bases are the most quantitative of everyday chemistry, and this chapter is where equilibrium thinking — the machinery of the previous chapter — is turned onto the proton. You will meet two definitions of "acid", one number ($K_\mathrm{w}$) that quietly governs every aqueous solution, a handful of approximations whose validity you must always check, and the structural reasons why one molecule hands over a proton while its cousin refuses.

## Acids and bases: two definitions

::: definition Brønsted–Lowry acids and bases {#def-broensted}
A **Brønsted–Lowry acid** is a species that donates a proton ($\mathrm{H^+}$), and a **Brønsted–Lowry base** is a species that accepts one. Acid and base are therefore roles in a reaction, not properties of a bottle: every proton transfer involves an acid on one side of the equation and a base on the other, and both are consumed together. The species left behind when an acid loses its proton is its **conjugate base**, and the species formed when a base gains a proton is its **conjugate acid**; an acid and its conjugate base differ by exactly one $\mathrm{H^+}$:
$$
\mathrm{HA + B \rightleftharpoons A^- + HB^+}
\qquad
\begin{cases}
\mathrm{HA/A^-} & \text{conjugate acid–base pair}\\
\mathrm{HB^+/B} & \text{conjugate acid–base pair.}
\end{cases}
$$
A species that can both donate and accept a proton — water above all, but also the hydrogen carbonate ion $\mathrm{HCO_3^-}$ — is called **amphiprotic** (amphoteric in the broader sense).
:::

The power of the definition is the way it organises the whole subject into pairs. In $\mathrm{HCl + H_2O \rightarrow H_3O^+ + Cl^-}$ water behaves as a base; in $\mathrm{NH_3 + H_2O \rightleftharpoons NH_4^+ + OH^-}$ the same water behaves as an acid. "Acid" has been replaced by a cleaner question: given two partners, which one wins the proton? — and that question has a numerical answer, an equilibrium constant.

::: definition Lewis acids and bases {#def-lewis}
A **Lewis acid** is an acceptor of an electron pair and a **Lewis base** a donor of one; the product of their reaction is an **adduct** held by a coordinate (dative) bond. Boron trifluoride, with its incomplete octet, and aluminium chloride, $\mathrm{AlCl_3}$, are classic Lewis acids; ammonia, amines and hydroxide are Lewis bases:
$$
\mathrm{F_3B(g) + {:}NH_3(g) \rightarrow F_3B{\leftarrow}NH_3(s)}
$$
Every Brønsted acid–base reaction is a Lewis reaction in which the base's electron pair goes to a proton, so the Brønsted picture sits inside the Lewis picture as a special case; Lewis's definition additionally covers reactions with no hydrogen at all — the dissolving of $\mathrm{AgCl}$ in aqueous ammonia, the catalysis of Friedel–Crafts alkylations by $\mathrm{AlCl_3}$, the binding of ligands to metal ions.
:::

::: history
Svante Arrhenius defined acids as substances producing $\mathrm{H^+}$ in water and bases as producing $\mathrm{OH^-}$ (1887) — a definition that explained neutralisation but stumbled over ammonia and over non-aqueous solvents. In 1909 the Danish biochemist S. P. L. Sørensen, studying beer and enzyme solutions in Copenhagen, introduced the pH notation as a shorthand for hydrogen-ion concentration. In 1923 the Dane Johannes Nicolaus Brønsted and the Englishman Martin Johannes Lowry, independently and within months of each other, proposed the proton-transfer definition, and in the same year Gilbert N. Lewis published his electron-pair generalisation. The 1923 definitions have held ever since: Brønsted acidity organises aqueous solution chemistry, and Lewis acidity — sharpened later by Ralph Pearson's hard-and-soft principle — organises catalysis and the chemistry of the metals.
:::

## Water, pH and pOH

Pure water conducts electricity faintly, which it could not do if it were entirely molecular: two water molecules proton-transfer to each other in the **autoionisation** (self-ionisation) of water, and the equilibrium, though tiny, is the foundation of everything that follows.

::: proposition The ion-product of water {#prop-kw}
Water undergoes the proton self-transfer
$$
\mathrm{2\,H_2O(l) \rightleftharpoons H_3O^+(aq) + OH^-(aq)}
\qquad
K_\mathrm{w} = [\mathrm{H_3O^+}][\mathrm{OH^-}].
$$
At $\mathrm{25\,^\circ C}$, $K_\mathrm{w} = 1.0\times10^{-14}$, so in any dilute aqueous solution — acid, base or neutral — the product $[\mathrm{H_3O^+}][\mathrm{OH^-}]$ is $1.0\times10^{-14}$: whatever one concentration does, the other must undo. In pure water both are $\sqrt{K_\mathrm{w}} = 1.0\times10^{-7}\ \mathrm{mol\,dm^{-3}}$. $K_\mathrm{w}$ is strongly temperature-dependent (the ionisation is endothermic): it rises to about $2.4\times10^{-14}$ at body temperature, $\mathrm{37\,^\circ C}$.
:::

::: definition pH and pOH {#def-ph}
The **pH** of a solution is $-\log_{10}$ of the hydronium concentration, and the **pOH** is defined identically for the hydroxide concentration:
$$
\mathrm{pH} = -\log_{10}\left[\mathrm{H_3O^+}\right],
\qquad
\mathrm{pOH} = -\log_{10}\left[\mathrm{OH^-}\right],
\qquad
\mathrm{pH} + \mathrm{pOH} = \mathrm{p}K_\mathrm{w} = 14.00\ (\mathrm{25\,^\circ C}).
$$
The scale is logarithmic: a fall of one pH unit means ten times the hydronium concentration. By convention the number of decimal places in a pH equals the number of significant figures in the concentration it encodes: $[\mathrm{H_3O^+}] = 2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ (two figures) gives $\mathrm{pH} = 3.70$ (two decimals). A solution is **neutral** when $[\mathrm{H_3O^+}] = [\mathrm{OH^-}]$, **acidic** when the hydronium concentration is larger, **basic** when the hydroxide is.
:::

::: example Strong acids and bases {#ex-strong}
Strong acids ($\mathrm{HCl}$, $\mathrm{HBr}$, $\mathrm{HNO_3}$, $\mathrm{HClO_4}$) and strong bases ($\mathrm{NaOH}$, $\mathrm{KOH}$) are fully ionised in dilute solution, so their stoichiometry is the answer. Find the pH at $\mathrm{25\,^\circ C}$ of (a) $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$; (b) $0.0050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ba(OH)_2}$; (c) $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$.
::: solution
(a) $[\mathrm{H_3O^+}] = 2.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, so $\mathrm{pH} = -\log_{10}(2.0\times10^{-3}) = 2.70$.
(b) Each barium hydroxide gives two hydroxides: $[\mathrm{OH^-}] = 0.010\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = 2.00$, $\mathrm{pH} = 14.00 - 2.00 = 12.00$.
(c) Sulfuric acid is strong in its first ionisation but only moderately strong in its second ($K_{\mathrm{a}2} = 1.2\times10^{-2}$): the first proton gives $[\mathrm{H_3O^+}] = 0.010$ and $[\mathrm{HSO_4^-}] = 0.010$, and the second ionisation $\mathrm{HSO_4^- + H_2O \rightleftharpoons H_3O^+ + SO_4^{2-}}$ adds $x$, where
$$
\frac{(0.010 + x)\,x}{0.010 - x} = 1.2\times10^{-2}
\quad\Longrightarrow\quad x = 0.0045\ \mathrm{mol\,dm^{-3}}.
$$
So $[\mathrm{H_3O^+}] = 0.0145\ \mathrm{mol\,dm^{-3}}$ and $\mathrm{pH} = 1.84$ — not the $1.70$ of two full protons, and not the $2.00$ of one. At this concentration the second proton is only $45\ \%$ ionised; "strong diprotic acid" is a shorthand that fails when you look closely.
:::
:::

::: warning pH 7 is not neutral at all temperatures {#warn-ph7}
Neutral means $[\mathrm{H_3O^+}] = [\mathrm{OH^-}]$, nothing more and nothing less; the pH at which that happens is $\tfrac{1}{2}\mathrm{p}K_\mathrm{w}$ and moves with temperature because $K_\mathrm{w}$ does. Pure water is neutral at $\mathrm{pH}\ 7.47$ at $\mathrm{0\,^\circ C}$, $7.00$ at $\mathrm{25\,^\circ C}$, $6.81$ at $\mathrm{37\,^\circ C}$ and $6.63$ at $\mathrm{50\,^\circ C}$ — blood at $\mathrm{pH}\ 7.40$ is mildly *basic* relative to the neutral point of water at body temperature, and that is exactly as it should be. "pH 7 = neutral" is a $\mathrm{25\,^\circ C}$ slogan, not a definition.
:::

::: quiz
Which one of the following is a Lewis acid but **not** a Brønsted acid?
- [x] $\mathrm{BF_3}$, which accepts an electron pair but has no proton to donate.
- [ ] $\mathrm{HCl}$, which ionises completely in water.
- [ ] $\mathrm{NH_4^+}$, which transfers a proton to water.
- [ ] $\mathrm{OH^-}$, which binds protons strongly.
::: solution
$\mathrm{BF_3}$ is electron-deficient at boron and forms adducts such as $\mathrm{F_3B{\leftarrow}NH_3}$ without any hydrogen chemistry — a Lewis acid only. $\mathrm{HCl}$ and $\mathrm{NH_4^+}$ are Brønsted acids (and so, through their proton, Lewis acids too); $\mathrm{OH^-}$ is a base in both languages.
:::
:::

## Weak acids and the acid dissociation constant

::: definition The acid dissociation constant Ka {#def-ka}
A **weak acid** is one that is only partially ionised at equilibrium — not because it is dilute, but because the proton-transfer equilibrium lies well to the left. For $\mathrm{HA + H_2O \rightleftharpoons H_3O^+ + A^-}$ the **acid dissociation constant** is
$$
K_\mathrm{a} = \frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}
$$
(water omitted, its concentration absorbed into the constant). The larger $K_\mathrm{a}$, the stronger the acid; $\mathrm{p}K_\mathrm{a} = -\log_{10} K_\mathrm{a}$ is quoted instead, so a *smaller* $\mathrm{p}K_\mathrm{a}$ means a *stronger* acid. Standard tabulated values at $\mathrm{25\,^\circ C}$ include ethanoic acid (acetic acid) $K_\mathrm{a} = 1.8\times10^{-5}$ ($\mathrm{p}K_\mathrm{a} = 4.76$), hydrofluoric acid $\mathrm{HF}$ $K_\mathrm{a} = 6.8\times10^{-4}$ ($3.17$), methanoic acid $1.8\times10^{-4}$ ($3.75$), hydrocyanic acid $\mathrm{HCN}$ $6.2\times10^{-10}$ ($9.21$). Bases carry the analogous **base dissociation constant** $K_\mathrm{b}$: ammonia $K_\mathrm{b} = 1.8\times10^{-5}$ ($\mathrm{p}K_\mathrm{b} = 4.74$).
:::

::: proposition The weak-acid approximation {#prop-sqrt-approx}
For a solution of a weak acid of analytical concentration $C$ with $K_\mathrm{a} \ll C$, the equilibrium hydronium concentration is
$$
\left[\mathrm{H_3O^+}\right] \approx \sqrt{K_\mathrm{a}\,C},
\qquad\text{valid when}\quad \frac{C}{K_\mathrm{a}} \ge 100,
$$
and the fraction dissociated is $\alpha = [\mathrm{H_3O^+}]/C \approx \sqrt{K_\mathrm{a}/C}$: **the more dilute the acid, the greater the fraction ionised** (the percent ionisation rises as the square root of the dilution), even as the hydronium concentration itself falls.
:::

::: proof The square-root law and its domain {#proof-sqrt}
Tabulate the ionisation of $\mathrm{HA}$, writing $h = [\mathrm{H_3O^+}]$ produced (the $10^{-7}\ \mathrm{mol\,dm^{-3}}$ from water is negligible while $h \gg 10^{-6}$):
$$
\begin{array}{c|ccc}
& \mathrm{HA} & \mathrm{H_3O^+} & \mathrm{A^-}\\ \hline
\text{initial} & C & \approx 0 & 0\\
\text{change} & -h & +h & +h\\
\text{equilibrium} & C - h & h & h
\end{array}
\qquad\Longrightarrow\qquad
K_\mathrm{a} = \frac{h^2}{C - h}.
$$
If $h \ll C$ the denominator may be replaced by $C$, giving $h^2 = K_\mathrm{a} C$. When is the replacement honest? The approximation demands $h/C = \sqrt{K_\mathrm{a}/C} \ll 1$, i.e. $C/K_\mathrm{a} \gg 1$; at the boundary $C/K_\mathrm{a} = 100$ the acid is $10\ \%$ ionised and the square-root formula overestimates $h$ by about $5\ \%$, which is the usual tolerance. Below that boundary the quadratic $h^2 + K_\mathrm{a} h - K_\mathrm{a} C = 0$ must be solved exactly:
$$
h = \frac{-K_\mathrm{a} + \sqrt{K_\mathrm{a}^2 + 4K_\mathrm{a} C}}{2}. \qquad\blacksquare
$$
:::

::: proof Ka times Kb equals Kw {#proof-ka-kb}
Let $\mathrm{HA}$ and $\mathrm{A^-}$ be a conjugate pair. Multiply the two equilibrium constants, writing each in full:
$$
K_\mathrm{a}\,K_\mathrm{b}
= \frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}
\times
\frac{[\mathrm{HA}][\mathrm{OH^-}]}{[\mathrm{A^-}]}
= [\mathrm{H_3O^+}][\mathrm{OH^-}] = K_\mathrm{w}.
$$
Everything cancels except water's ion product, so for any conjugate pair at $\mathrm{25\,^\circ C}$, $\mathrm{p}K_\mathrm{a} + \mathrm{p}K_\mathrm{b} = 14.00$. The chemistry in the line: a strong acid has a weak conjugate base and vice versa, *quantitatively* — the conjugate base of ethanoic acid, $\mathrm{CH_3COO^-}$, has $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$, while the chloride ion, conjugate of a strong acid, has $K_\mathrm{b} \approx 10^{-21}$ and is no base at all in water. $\qquad\blacksquare$
:::

::: example pH of a weak acid: ethanoic acid {#ex-ethanoic}
Find the pH and the fraction ionised of $0.10\ \mathrm{mol\,dm^{-3}}$ ethanoic acid, $K_\mathrm{a} = 1.8\times10^{-5}$.
::: solution
Check the approximation first: $C/K_\mathrm{a} = 0.10 / 1.8\times10^{-5} = 5600 \gg 100$, so the square root is safe:
$$
\left[\mathrm{H_3O^+}\right] = \sqrt{1.8\times10^{-5} \times 0.10} = \sqrt{1.8\times10^{-6}} = 1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}},
\qquad \mathrm{pH} = 2.87.
$$
The fraction ionised is $1.3\times10^{-3}/0.10 = 1.3\ \%$: nine hundred and eighty-seven molecules in every thousand remain protonated. The exact quadratic gives $1.34\times10^{-3}$ and the same pH to two decimals — the approximation earned its keep. Note the verdict of the numbers: a $0.10\ \mathrm{mol\,dm^{-3}}$ solution of a weak acid is two pH units more acidic than pure water but a hundred times less acidic than the strong acid of the same concentration.
:::
:::

::: example When the approximation fails: hydrofluoric acid {#ex-hf}
Find the pH of $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HF}$, $K_\mathrm{a} = 6.8\times10^{-4}$.
::: solution
Here $C/K_\mathrm{a} = 147$ — only just past the boundary, so try both. The square root gives $h = \sqrt{6.8\times10^{-5}} = 8.2\times10^{-3}$ ($\mathrm{pH}\ 2.08$); the exact quadratic gives
$$
h = \frac{-6.8\times10^{-4} + \sqrt{(6.8\times10^{-4})^2 + 4 \times 6.8\times10^{-4} \times 0.10}}{2} = 7.9\times10^{-3}\ \mathrm{mol\,dm^{-3}},
\qquad \mathrm{pH} = 2.10.
$$
The approximation overestimates $h$ by $4\ \%$ and, worse, the implied fraction ionised ($8.2\ \%$) is far from negligible against $C$, which is exactly what the $C/K_\mathrm{a} \ge 100$ test is for. $\mathrm{HF}$ is a strange animal among the hydrogen halides — weak, despite fluorine's electronegativity, because the $\mathrm{H-F}$ bond is exceptionally short and strong and the small fluoride ion holds its proton tightly (its very strong hydration partly, not wholly, compensates). $\mathrm{HCl}$, $\mathrm{HBr}$ and $\mathrm{HI}$ are strong and get stronger down the group as the bond weakens: bond strength, not electronegativity, controls acidity in a column.
:::
:::

::: widget plot
f: 1/(1+10^(x-pKa)); 1/(1+10^(pKa-x))
x: 0, 14
y: 0, 1.05
sliders: pKa=4.76:0:14:0.1
labels: \text{HA}; \text{A}^-
caption: The fraction of a weak acid present as $\mathrm{HA}$ and as its conjugate base $\mathrm{A^-}$ as a function of pH, for $\mathrm{p}K_\mathrm{a}$ set by the slider. The two curves cross at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, where the pair is half and half, and each dominates within about two pH units of the crossing — the reason a buffer works only within $\mathrm{pH} = \mathrm{p}K_\mathrm{a} \pm 1$ and the reason the shape of a titration curve remembers the $\mathrm{p}K_\mathrm{a}$ it passes through. Slide from ethanoic acid ($4.76$) to hydrocyanic acid ($9.21$) and watch the whole picture walk across the scale.
:::

::: widget newton
f: x^2 + 6.8e-4*x - 6.8e-4*0.1
method: newton
x0: 0.01
caption: Newton's method solving the exact weak-acid equation $x^2 + K_\mathrm{a} x - K_\mathrm{a} C = 0$ for $x = [\mathrm{H_3O^+}]$ in $0.10\ \mathrm{mol\,dm^{-3}}$ hydrofluoric acid ($K_\mathrm{a} = 6.8\times10^{-4}$), starting from $x_0 = 0.01$. The iteration table shows the successive approximations converging on the positive root $x = 7.9\times10^{-3}\ \mathrm{mol\,dm^{-3}}$. Compare with the square-root estimate $\sqrt{K_\mathrm{a} C} = 8.2\times10^{-3}$: the $4\ \%$ gap is the failure of the approximation you proved you should expect at $C/K_\mathrm{a} = 147$.
:::

## How strong is strong? Structure decides

Acid strengths are not arbitrary; four structural rules, all consequences of one idea — *the stronger the base holds the proton, and the more stable the deprotonated form, the weaker the acid* — cover almost everything in this course.

**Across a row, electronegativity rules.** For the binary hydrides $\mathrm{CH_4}$, $\mathrm{NH_3}$, $\mathrm{H_2O}$, $\mathrm{HF}$, acidity rises steeply left to right ($\mathrm{p}K_\mathrm{a}$ roughly $50$, $38$, $15.7$, $3.2$): the more electronegative atom polarises the $\mathrm{E-H}$ bond and stabilises the negative charge left behind. Methane is not an acid in water at all; ammonia is a base precisely because nitrogen holds its lone pair and its protons.

**Down a column, bond strength rules.** $\mathrm{HF}$ is weak but $\mathrm{HCl}$, $\mathrm{HBr}$, $\mathrm{HI}$ are strong and increasingly so: down the group the bond lengthens and weakens faster than electronegativity falls, so the proton is easier to lose. The same ordering puts $\mathrm{H_2S}$ ($\mathrm{p}K_\mathrm{a1} = 7.0$) far above water as an acid, and makes sulfide and thiolate far weaker bases than oxide and hydroxide.

**Oxoacids: count the oxygens, then the electronegativity.** Along the chlorine series hypochlorous, chlorous, chloric and perchloric acid, $\mathrm{HClO}$, $\mathrm{HClO_2}$, $\mathrm{HClO_3}$, $\mathrm{HClO_4}$ ($\mathrm{p}K_\mathrm{a} \approx 7.5$, $1.8$, $-1$, $-10$), each extra terminal oxygen is an electron-withdrawing $\mathrm{=O}$ that spreads the negative charge of the anion over more atoms; acidity rises with the oxidation number of the central atom. At equal oxygen count, a more electronegative central atom wins: $\mathrm{HClO > HBrO > HIO}$.

**Carboxylic acids: resonance, and induction that fades with distance.** The carboxylate anion $\mathrm{RCOO^-}$ shares its charge over two equivalent oxygens by resonance, which is why carboxylic acids ($\mathrm{p}K_\mathrm{a} \approx 4.8$) beat alcohols ($\approx 16$) by ten billion to one. Pull electrons through the chain and the acid strengthens, fast at first and then barely at all — standard tabulated $\mathrm{p}K_\mathrm{a}$ values at $\mathrm{25\,^\circ C}$:

| acid | $\mathrm{p}K_\mathrm{a}$ | acid | $\mathrm{p}K_\mathrm{a}$ |
|---|---|---|---|
| ethanoic acid $\mathrm{CH_3COOH}$ | $4.76$ | 3-chloropropanoic acid | $4.0$ |
| chloroethanoic acid $\mathrm{ClCH_2COOH}$ | $2.87$ | propanoic acid | $4.87$ |
| dichloroethanoic acid | $1.30$ | methanoic acid | $3.75$ |
| trichloroethanoic acid | $0.70$ | 3-hydroxypropanoic acid | $4.5$ |

One chlorine three bonds away is worth about one $\mathrm{p}K_\mathrm{a}$ unit; the same chlorine one bond closer is worth two more. Inductive effects die quickly with distance — a fact you will use again when predicting which of two protons leaves first.

::: example Why unpolluted rain has pH 5.6 {#ex-rain}
Rain water is in open equilibrium with atmospheric carbon dioxide at a partial pressure of $4.2\times10^{-4}\ \mathrm{atm}$; Henry's law gives $[\mathrm{CO_2(aq)}] = 3.4\times10^{-2}\ \mathrm{mol\,dm^{-3}\,atm^{-1}} \times 4.2\times10^{-4}\ \mathrm{atm} = 1.4\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. Treating the dissolved gas as a monoprotic weak acid with the effective $K_\mathrm{a} = 4.3\times10^{-7}$, find the pH.
::: solution
$C/K_\mathrm{a} = 1.4\times10^{-5}/4.3\times10^{-7} = 33$, below the boundary, so the square root is only an estimate: $h \approx \sqrt{4.3\times10^{-7} \times 1.4\times10^{-5}} = 2.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pH} = 5.61$. The check that matters here is a different one: $h = 2.5\times10^{-6}$ is more than twenty times $10^{-7}$, so water's own hydronium is indeed negligible. Solving the quadratic exactly gives $h = 2.3\times10^{-6}$ and $\mathrm{pH} = 5.64$ — the square root overestimates the hydronium by about $9\ \%$ (the acid is $16\ \%$ ionised), but the conclusion, that natural rain sits at about $\mathrm{pH}\ 5.6$, is unchanged. Natural rain is carbonic acid, and "acid rain" begins where sulfur and nitrogen oxides push it below about $5.0$.
:::
:::

::: warning Weak is not dilute, and dilute is not weak {#warn-weak-dilute}
"Weak" describes an equilibrium position (small $K_\mathrm{a}$); "dilute" describes a concentration (small $C$). They are independent axes: $10\ \mathrm{mol\,dm^{-3}}$ ethanoic acid is concentrated *and* weak, and its hydronium concentration, $\sqrt{1.8\times10^{-5} \times 10} \approx 0.013\ \mathrm{mol\,dm^{-3}}$, is a thousand times that of $10^{-5}\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid, which is dilute *and* strong. Vinegar is $5\ \%$ of a weak acid and still sours milk; battery acid is dilute sulfuric and still dissolves skin. Never infer one word from the other.
:::

## Polyprotic acids

::: definition Polyprotic acids {#def-polyprotic}
A **polyprotic acid** can donate more than one proton, and does so stepwise with a distinct constant for each step: for phosphoric acid,
$$
\mathrm{H_3PO_4 \rightleftharpoons H_2PO_4^- \rightleftharpoons HPO_4^{2-} \rightleftharpoons PO_4^{3-}}
\qquad
\mathrm{p}K_\mathrm{a} = 2.15,\ 7.20,\ 12.35 .
$$
Successive constants always fall far apart — typically by $10^{3}$–$10^{6}$ — for two reasons: it is harder to pull a proton from a negative ion than from a neutral molecule, and the extra negative charge left behind stabilises the protonated form. Carbonic acid (the dissolved-$\mathrm{CO_2}$ convention) has $\mathrm{p}K_\mathrm{a1} = 6.35$, $\mathrm{p}K_\mathrm{a2} = 10.33$; sulfurous acid $1.8$, $7.2$; oxalic acid $1.25$, $4.27$.
:::

Because $\mathrm{p}K_\mathrm{a2} \gg \mathrm{p}K_\mathrm{a1}$, two working rules follow. First, **the pH of a polyprotic acid solution comes from the first ionisation alone** — the second contributes a hydronium concentration of order $K_\mathrm{a2}$, utterly swamped. Second, **the fully deprotonated species sits at a concentration of order $K_\mathrm{a2}$ (for diprotic) or $K_\mathrm{a3}$ (for triprotic)** in the acid solution itself: for $\mathrm{H_2A}$, since $[\mathrm{H_3O^+}] \approx [\mathrm{HA^-}]$, the second equilibrium $K_\mathrm{a2} = [\mathrm{H_3O^+}][\mathrm{A^{2-}}]/[\mathrm{HA^-}]$ collapses to $[\mathrm{A^{2-}}] \approx K_\mathrm{a2}$.

::: example Phosphoric acid, all three steps {#ex-h3po4}
Find the pH and the principal species concentrations in $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_3PO_4}$, given $\mathrm{p}K_\mathrm{a} = 2.15,\ 7.20,\ 12.35$.
::: solution
$C/K_{\mathrm{a}1} = 0.10/7.1\times10^{-3} = 14$: the square root would err badly, so solve the quadratic for the first step, $h^2 + 7.1\times10^{-3} h - 7.1\times10^{-4} = 0$:
$$
h = [\mathrm{H_3O^+}] = 0.023\ \mathrm{mol\,dm^{-3}}, \qquad \mathrm{pH} = 1.63,
$$
and $23\ \%$ of the acid has lost its first proton: $[\mathrm{H_2PO_4^-}] \approx 0.023$, $[\mathrm{H_3PO_4}] \approx 0.077\ \mathrm{mol\,dm^{-3}}$. The second step gives $[\mathrm{HPO_4^{2-}}] \approx K_{\mathrm{a}2} = 6.3\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ (check: $[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = K_{\mathrm{a}2}/h = 2.7\times10^{-6}$), and the third step is negligible: $[\mathrm{PO_4^{3-}}] \approx K_{\mathrm{a}3} = 4.2\times10^{-13}\ \mathrm{mol\,dm^{-3}}$ — in $\mathrm{0.10\ mol\,dm^{-3}}$ phosphoric acid, phosphate ion does not exist. Charge balance closes the books: $[\mathrm{H_3O^+}] \approx [\mathrm{H_2PO_4^-}]$, as the single-step treatment assumed.
:::
:::

::: quiz
Phosphoric acid has three protons, yet a $0.10\ \mathrm{mol\,dm^{-3}}$ solution has $\mathrm{pH}\ 1.63$ rather than something near $0.5$. Which statement explains this best?
- [x] Only the first ionisation contributes hydronium to any appreciable extent, and even it is only $23\ \%$ complete.
- [ ] All three ionisations run to about $23\ \%$ each.
- [ ] The second and third protons are too heavy to leave quickly.
- [ ] The three $K_\mathrm{a}$ values add, making the acid effectively weaker.
::: solution
$\mathrm{p}K_\mathrm{a1} = 2.15$ makes the first step a moderately weak equilibrium ($23\ \%$ ionised at this concentration), and $\mathrm{p}K_\mathrm{a2} = 7.20$ means the second step adds only about $6\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ of extra hydronium. Equilibrium constants do not add; each step is its own equilibrium, and the weakest steps simply do not participate.
:::
:::

## Salts in water: who hydrolyses?

A salt is not a neutral bystander: its ions are conjugate partners, and each may fight water for a proton. The rule is mechanical — *an ion can react with water only if it is the conjugate of a weak partner; the stronger that weak partner, the more it reacts* — and the four cases are:

| salt type | example | ion reacting | solution |
|---|---|---|---|
| strong-acid cation + strong-acid anion | $\mathrm{NaCl}$ | neither | neutral, $\mathrm{pH}\ 7$ |
| conjugate acid of a weak base | $\mathrm{NH_4Cl}$ | $\mathrm{NH_4^+}$ donates | acidic |
| conjugate base of a weak acid | $\mathrm{CH_3COONa}$ | $\mathrm{CH_3COO^-}$ accepts | basic |
| both ions weak | $\mathrm{NH_4CH_3COO}$ | both | compare $K_\mathrm{a}(\text{cation})$ with $K_\mathrm{b}(\text{anion})$ |

::: example Salt solutions: ammonium chloride and sodium ethanoate {#ex-salts}
Find the pH of $0.10\ \mathrm{mol\,dm^{-3}}$ (a) $\mathrm{NH_4Cl}$ and (b) $\mathrm{CH_3COONa}$ at $\mathrm{25\,^\circ C}$; $K_\mathrm{b}(\mathrm{NH_3}) = 1.8\times10^{-5}$, $K_\mathrm{a}(\mathrm{CH_3COOH}) = 1.8\times10^{-5}$.
::: solution
(a) Chloride is the conjugate base of a strong acid and does nothing; ammonium is the conjugate acid of a weak base and is a weak acid with $K_\mathrm{a} = K_\mathrm{w}/K_\mathrm{b} = 5.6\times10^{-10}$ ($\mathrm{p}K_\mathrm{a} = 9.25$). With $C/K_\mathrm{a} = 1.8\times10^{8}$ the square root is superb:
$$
\left[\mathrm{H_3O^+}\right] = \sqrt{5.6\times10^{-10} \times 0.10} = 7.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}, \qquad \mathrm{pH} = 5.13 .
$$
(b) Sodium does nothing; ethanoate is a weak base with $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$, and by the identical arithmetic $[\mathrm{OH^-}] = 7.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = 5.13$, $\mathrm{pH} = 8.87$. The two salts are mirror images: the same $K$ computed through $K_\mathrm{w}$ lands the same distance on the other side of $7$.
:::
:::

::: warning Below about 10⁻⁶ mol dm⁻³, water takes over {#warn-water}
The recipe "strong acid of concentration $C$ has $\mathrm{pH} = -\log C$" silently assumes the acid's hydronium dwarfs water's $10^{-7}$. At $C = 10^{-6}$ the error is already $10\ \%$; at $C = 10^{-7}$ the recipe predicts $\mathrm{pH} = 7.00$ for an *acid*, which is absurd — adding acid cannot make water basic. The cure is to keep water's equilibrium in the bookkeeping: with $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H_3O^+}]$ and charge balance $[\mathrm{H_3O^+}] = C + [\mathrm{OH^-}]$,
$$
\left[\mathrm{H_3O^+}\right]^2 - C\left[\mathrm{H_3O^+}\right] - K_\mathrm{w} = 0,
$$
which returns $1.17\times10^{-7}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pH}\ 6.93$, for $10^{-7.5}\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid — acidic, as it must be, and only just.
:::

::: example Ammonium ethanoate: both ions weak {#ex-nh4oac}
Predict the pH of $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NH_4CH_3COO}$, given $K_\mathrm{a}(\mathrm{CH_3COOH}) = 1.8\times10^{-5}$ and $K_\mathrm{b}(\mathrm{NH_3}) = 1.8\times10^{-5}$.
::: solution
Both ions hydrolyse, and both do so with the same strength: $K_\mathrm{a}(\mathrm{NH_4^+}) = 5.6\times10^{-10} = K_\mathrm{b}(\mathrm{CH_3COO^-})$. The ammonium makes hydronium, the ethanoate makes hydroxide, in equal amounts, and they annihilate each other through $K_\mathrm{w}$; the solution comes out essentially neutral, $\mathrm{pH} = 7.01$ (the tiny shift from $7.00$ reflects only the tabulated $K_\mathrm{a}(\text{ethanoic}) = 1.75\times10^{-5}$ versus $K_\mathrm{b}(\text{ammonia}) = 1.8\times10^{-5}$). The general result for a salt of weak acid $\mathrm{HA}$ and weak base $\mathrm{B}$ is $\mathrm{pH} = 7 + \tfrac{1}{2}(\mathrm{p}K_\mathrm{a}(\mathrm{HA}) - \mathrm{p}K_\mathrm{b}(\mathrm{B}))$, independent of concentration to this approximation — you will derive it in the exercises.
:::
:::

## Where this leads

Acid–base equilibria are the template for every later equilibrium in the atlas. The next chapter, [[general-chemistry-2/buffers-titrations]], adds the conjugate pair *together* in solution and derives the Henderson–Hasselbalch equation from the same $K_\mathrm{a}$ you used here; [[general-chemistry-2/solubility-equilibria]] shows hydroxide, sulfide and carbonate — all bases — making solubility pH-dependent; [[general-chemistry-2/chemical-equilibrium]] is the general machinery underneath, and [[general-chemistry-2/entropy-free-energy]] explains why $K_\mathrm{a}$ has the value it does. The activity corrections we have skipped (concentrations for activities, ionic strength) are treated in [[thermodynamics/ions-in-solution]], and the full apparatus of acid–base titrimetry, indicators and the pH stat of the analytical laboratory is in [[analytical-chemistry/equilibria-in-analysis]].

::: summary
- A Brønsted–Lowry acid donates a proton and a base accepts one; the reaction always pairs an acid with the base on the other side, and conjugate pairs differ by exactly $\mathrm{H^+}$. Lewis's definition (electron-pair acceptor/donor) contains Brønsted's and covers $\mathrm{BF_3}$, $\mathrm{AlCl_3}$ and metal–ligand chemistry.
- Water autoionises: $K_\mathrm{w} = [\mathrm{H_3O^+}][\mathrm{OH^-}] = 1.0\times10^{-14}$ at $\mathrm{25\,^\circ C}$, so $K_\mathrm{w}$ couples every concentration pair; $\mathrm{pH} + \mathrm{pOH} = 14.00$ at $\mathrm{25\,^\circ C}$ only.
- Neutral means equal hydronium and hydroxide; the neutral pH falls with temperature ($7.47$ at $\mathrm{0\,^\circ C}$, $6.81$ at $\mathrm{37\,^\circ C}$) because $K_\mathrm{w}$ rises.
- Weak acids obey $K_\mathrm{a} = [\mathrm{H_3O^+}][\mathrm{A^-}]/[\mathrm{HA}]$; the square-root formula $[\mathrm{H_3O^+}] = \sqrt{K_\mathrm{a} C}$ is valid for $C/K_\mathrm{a} \ge 100$ and must be replaced by the quadratic below it.
- For any conjugate pair $K_\mathrm{a} K_\mathrm{b} = K_\mathrm{w}$: strong acid, weak conjugate base, quantitatively.
- Structure decides strength: electronegativity across a row, bond strength down a column, oxygen count and electronegativity for oxoacids, resonance plus short-range induction for carboxylic acids.
- Polyprotic acids ionise stepwise with $\mathrm{p}K_\mathrm{a}$ values $3$–$6$ units apart: the first step sets the pH, and the fully deprotonated species sits near $K_\mathrm{a2}$ (or $K_\mathrm{a3}$) in the acid's own solution.
- Salt solutions follow the conjugates: weak-acid anions make base, weak-base cations make acid, and below $10^{-6}\ \mathrm{mol\,dm^{-3}}$ water's own ionisation must be kept in the equations.
:::

## Exercises

::: exercise pH of a strong base {level=1 check="12.30"}
Find the pH of $0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ at $\mathrm{25\,^\circ C}$. (Enter the pH.)
::: solution
$[\mathrm{OH^-}] = 0.020\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = -\log_{10}(0.020) = 1.70$, $\mathrm{pH} = 14.00 - 1.70 = 12.30$.
:::
:::

::: exercise pH of a strong acid {level=1 check="2.70"}
Find the pH of $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ at $\mathrm{25\,^\circ C}$. (Enter the pH.)
::: solution
Complete ionisation: $[\mathrm{H_3O^+}] = 2.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pH} = 2.70$. Two decimal places because the concentration has two significant figures.
:::
:::

::: exercise pH of a strong diprotic base {level=1 check="12.00"}
Find the pH of $0.0050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ba(OH)_2}$ at $\mathrm{25\,^\circ C}$. (Enter the pH.)
::: solution
Barium hydroxide delivers two hydroxides per formula unit: $[\mathrm{OH^-}] = 0.010\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = 2.00$, $\mathrm{pH} = 12.00$. Forgetting the factor of two is the classic slip; it costs $0.30$ pH units.
:::
:::

::: exercise Weak acid I: pH and ionisation {level=2 check="2.87"}
Find the pH of $0.10\ \mathrm{mol\,dm^{-3}}$ ethanoic acid, $K_\mathrm{a} = 1.8\times10^{-5}$. (Enter the pH.)
::: solution
$C/K_\mathrm{a} = 5600 \ge 100$, so $[\mathrm{H_3O^+}] = \sqrt{1.8\times10^{-5} \times 0.10} = 1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ and $\mathrm{pH} = 2.87$ (fraction ionised $1.3\ \%$).
:::
:::

::: exercise Weak base {level=2 check="10.98"}
Find the pH of $0.050\ \mathrm{mol\,dm^{-3}}$ aqueous ammonia, $K_\mathrm{b} = 1.8\times10^{-5}$. (Enter the pH.)
::: solution
$[\mathrm{OH^-}] = \sqrt{1.8\times10^{-5} \times 0.050} = 9.5\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ ($C/K_\mathrm{b} = 2800$, safe), $\mathrm{pOH} = 3.02$, $\mathrm{pH} = 14.00 - 3.02 = 10.98$. Household ammonia is basic for exactly this square-root reason.
:::
:::

::: exercise Salt of a weak acid {level=2 check="8.87"}
Find the pH of $0.10\ \mathrm{mol\,dm^{-3}}$ sodium ethanoate, $K_\mathrm{a}(\mathrm{CH_3COOH}) = 1.8\times10^{-5}$. (Enter the pH.)
::: solution
Ethanoate is a weak base, $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$: $[\mathrm{OH^-}] = \sqrt{5.6\times10^{-10} \times 0.10} = 7.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pOH} = 5.13$, $\mathrm{pH} = 8.87$. Sodium salts of weak acids are basic — this is why "soap solution is mildly alkaline" on the label.
:::
:::

::: exercise Very dilute strong acid {level=3 check="6.93"}
Find the pH of $1.0\times10^{-7.5}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ at $\mathrm{25\,^\circ C}$, keeping water's autoionisation in the bookkeeping. (Enter the pH.)
::: solution
Charge balance $[\mathrm{H_3O^+}] = C + [\mathrm{OH^-}]$ with $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H_3O^+}]$ gives $[\mathrm{H_3O^+}]^2 - C[\mathrm{H_3O^+}] - K_\mathrm{w} = 0$, so
$$
\left[\mathrm{H_3O^+}\right] = \frac{C + \sqrt{C^2 + 4K_\mathrm{w}}}{2}
= \frac{3.16\times10^{-8} + \sqrt{1.0\times10^{-15} + 4.0\times10^{-14}}}{2}
= 1.17\times10^{-7}\ \mathrm{mol\,dm^{-3}},
$$
$\mathrm{pH} = 6.93$. The naive $-\log C = 7.50$ would make the acid basic; the water term is not optional at this dilution.
:::
:::

::: exercise The amphiprotic anion {level=3 check="8.34"}
The hydrogen carbonate ion is amphiprotic: it can donate a proton ($\mathrm{p}K_\mathrm{a2} = 10.33$) or accept one ($\mathrm{p}K_\mathrm{a1} = 6.35$). For a salt $\mathrm{NaHA}$ of a diprotic acid $\mathrm{H_2A}$, show that $[\mathrm{H_3O^+}] \approx \sqrt{K_\mathrm{a1} K_\mathrm{a2}}$ and hence find the pH of $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaHCO_3}$. (Enter the pH.)
::: solution
Add the two equilibria written for $\mathrm{HA^-}$: as an acid, $K_{\mathrm{a}2} = [\mathrm{H_3O^+}][\mathrm{A^{2-}}]/[\mathrm{HA^-}]$; as a base, $K_\mathrm{b} = K_\mathrm{w}/K_{\mathrm{a}1} = [\mathrm{H_2A}][\mathrm{OH^-}]/[\mathrm{HA^-}]$. In solution the dominant reaction is proton transfer between two $\mathrm{HA^-}$ (dismutation), which makes $[\mathrm{H_2A}] \approx [\mathrm{A^{2-}}]$; dividing the first equilibrium by the second and setting the two equal leaves
$$
\left[\mathrm{H_3O^+}\right]^2 \approx K_\mathrm{a1} K_\mathrm{a2}
\qquad\Longrightarrow\qquad
\mathrm{pH} = \tfrac{1}{2}\!\left(\mathrm{p}K_\mathrm{a1} + \mathrm{p}K_\mathrm{a2}\right),
$$
independent of concentration. For carbonate: $\mathrm{pH} = \tfrac{1}{2}(6.35 + 10.33) = 8.34$ — baking soda solution is mildly basic, and the same formula gives $\mathrm{pH} = 4.67$ for $\mathrm{NaH_2PO_4}$, mildly acidic. An amphiprotic species is neither; it averages.
:::
:::

::: exercise Salt of weak acid and weak base {level=3 check="7.01"}
For a salt of a weak acid $\mathrm{HA}$ ($K_\mathrm{a}$) and a weak base $\mathrm{B}$ ($K_\mathrm{b}$), both ions hydrolyse. Assuming the hydrolysis fractions are small and equal, derive $\mathrm{pH} = 7.00 + \tfrac{1}{2}(\mathrm{p}K_\mathrm{a} - \mathrm{p}K_\mathrm{b})$ from the two hydrolysis equilibria and $K_\mathrm{w}$, and evaluate it for ammonium ethanoate ($K_\mathrm{a} = 1.75\times10^{-5}$, $K_\mathrm{b} = 1.8\times10^{-5}$). (Enter the pH.)
::: solution
The cation hydrolysis gives $[\mathrm{H_3O^+}] = K_\mathrm{a}(\mathrm{BH^+})[\mathrm{BH^+}]/[\mathrm{B}]$ and the anion's gives $[\mathrm{OH^-}] = K_\mathrm{b}(\mathrm{A^-})[\mathrm{A^-}]/[\mathrm{HA}]$; with equal hydrolysis $[\mathrm{BH^+}]/[\mathrm{B}] \approx [\mathrm{A^-}]/[\mathrm{HA}]$, so the ratio cancels when we divide the two expressions:
$$
K_\mathrm{w} = [\mathrm{H_3O^+}][\mathrm{OH^-}]
\approx K_\mathrm{a}K_\mathrm{b}\,\frac{[\mathrm{H_3O^+}]}{[\mathrm{OH^-}]}
\quad\Longrightarrow\quad
\left[\mathrm{H_3O^+}\right] = \sqrt{\frac{K_\mathrm{w}\,K_\mathrm{a}}{K_\mathrm{b}}}.
$$
Taking $-\tfrac{1}{2}\log$: $\mathrm{pH} = 7.00 + \tfrac{1}{2}(\mathrm{p}K_\mathrm{a} - \mathrm{p}K_\mathrm{b})$. Numerically, $[\mathrm{H_3O^+}] = \sqrt{10^{-14} \times 1.75\times10^{-5}/1.8\times10^{-5}} = 9.9\times10^{-8}$, $\mathrm{pH} = 7.01$. The concentration cancels entirely — the pH of ammonium ethanoate solution is $7$ whether it is $0.001$ or $1\ \mathrm{mol\,dm^{-3}}$ (until the activity assumptions fail), and ammonium fluoride, with $K_\mathrm{a}(\mathrm{HF}) \gg K_\mathrm{b}(\mathrm{NH_3})$, is decidedly acidic by the same formula.
:::
:::
