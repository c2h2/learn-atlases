Every mechanism in this course is a story about electrons moving from where they are plentiful to where they are wanted, and two questions decide almost every story: *which way does the proton go*, and *who attacks whom*. This chapter builds the machinery that answers them. First, Brønsted acidity, quantified by $K_\mathrm{a}$ and $\mathrm{p}K_\mathrm{a}$, with one arithmetic rule — the equilibrium rule — that lets you predict the position of any proton transfer from a table of numbers. Second, the four structural factors that explain why those numbers fall where they do, so that the table becomes something you reason from rather than memorise. Third, nucleophiles and electrophiles, the two permanent roles of organic chemistry. Fourth, the curly-arrow formalism itself: a grammar with strict spelling rules, in which arrows move electron pairs, charge is conserved, and octets are never broken. Finally, reaction energy profiles, where we separate what a reaction *wants* to do (thermodynamics, $\Delta G^\circ$) from how fast it can do it (kinetics, $\Delta G^{\ddagger}$) — a distinction the p$K_\mathrm{a}$ table cannot make for you. Everything from nucleophilic substitution onwards is written in this language, so nothing here is optional.

## Brønsted acids, $K_\mathrm{a}$ and $\mathrm{p}K_\mathrm{a}$

::: definition Brønsted acids, bases and conjugate pairs {#def-broensted}
A **Brønsted acid** is a proton ($\mathrm{H^+}$) donor; a **Brønsted base** is a proton acceptor. Any acid–base reaction transfers a proton from an acid to a base, and each side of the equation is a **conjugate acid–base pair**, differing by exactly one $\mathrm{H^+}$:
$$
\mathrm{CH_3COOH + HO^- \rightleftharpoons CH_3COO^- + H_2O}
$$
reading left to right, ethanoic acid (acid) donates to hydroxide (base), and the products are the **conjugate base** of ethanoic acid (ethanoate) and the **conjugate acid** of hydroxide (water). A species that can both donate and accept a proton — water, hydrogencarbonate $\mathrm{HCO_3^-}$, ethanol — is **amphiprotic**.
:::

Acid–base reactions are equilibria, and an equilibrium has a position. The strength of an acid is therefore not a vague tendency but a measurable equilibrium constant for its reaction with water, $\mathrm{HA + H_2O \rightleftharpoons A^- + H_3O^+}$:

::: proposition The acid dissociation constant and $\mathrm{p}K_\mathrm{a}$ {#prop-ka}
$$
K_\mathrm{a} = \frac{[\mathrm{A^-}][\mathrm{H_3O^+}]}{[\mathrm{HA}]},
\qquad
\mathrm{p}K_\mathrm{a} = -\log_{10} K_\mathrm{a}.
$$
Because $\mathrm{p}K_\mathrm{a}$ is a *negative* logarithm, the **stronger** the acid, the **smaller** the $\mathrm{p}K_\mathrm{a}$ — each unit of $\mathrm{p}K_\mathrm{a}$ is a factor of ten in $K_\mathrm{a}$. Through $\Delta_\mathrm{r}G^\circ = -RT\ln K_\mathrm{a}$, one unit of $\mathrm{p}K_\mathrm{a}$ is also $2.303\,RT = 5.71\ \mathrm{kJ\,mol^{-1}}$ of standard free energy at $\mathrm{298\ K}$: ethanoic acid's $\mathrm{p}K_\mathrm{a} = 4.76$ means ionising it costs $\Delta_\mathrm{r}G^\circ = 5.71 \times 4.76 = 27.2\ \mathrm{kJ\,mol^{-1}}$. Two consequences bind the whole subject together. **A strong acid has a weak conjugate base**: the more a conjugate base wants the proton back, the less the acid wanted to give it. And **acidity is measured against water**: in water no acid stronger than $\mathrm{H_3O^+}$ ($\mathrm{p}K_\mathrm{a} = -1.7$) survives, because it simply transfers a proton to water — the *leveling effect*.
:::

The table below is the working $\mathrm{p}K_\mathrm{a}$ ladder of this course; learn its landmarks, not every digit. Values are standard tabulated data at $\mathrm{25\ ^\circ C}$ (the carbonic-acid value is the *apparent* $\mathrm{p}K_\mathrm{a}$ of aqueous $\mathrm{CO_2}$, the number that matters in practice).

| acid | $\mathrm{p}K_\mathrm{a}$ | conjugate base | acid | $\mathrm{p}K_\mathrm{a}$ | conjugate base |
|---|---|---|---|---|---|
| $\mathrm{HBr}$ | $-9$ | $\mathrm{Br^-}$ | $\mathrm{NH_4^+}$ | $9.25$ | $\mathrm{NH_3}$ |
| $\mathrm{H_3O^+}$ | $-1.7$ | $\mathrm{H_2O}$ | phenol $\mathrm{C_6H_5OH}$ | $10.0$ | $\mathrm{C_6H_5O^-}$ |
| $\mathrm{CF_3COOH}$ | $0.5$ | $\mathrm{CF_3COO^-}$ | ethanethiol $\mathrm{CH_3CH_2SH}$ | $10.5$ | $\mathrm{CH_3CH_2S^-}$ |
| $\mathrm{ClCH_2COOH}$ | $2.9$ | $\mathrm{ClCH_2COO^-}$ | $\mathrm{H_2O}$ | $15.7$ | $\mathrm{HO^-}$ |
| $\mathrm{CH_3COOH}$ | $4.76$ | $\mathrm{CH_3COO^-}$ | ethanol $\mathrm{CH_3CH_2OH}$ | $16$ | $\mathrm{CH_3CH_2O^-}$ |
| $\mathrm{H_2CO_3}$ (apparent) | $6.4$ | $\mathrm{HCO_3^-}$ | acetone (α $\mathrm{C{-}H}$) | $19.3$ | enolate |
| | | | ethyne $\mathrm{HC{\equiv}CH}$ | $25$ | $\mathrm{HC{\equiv}C^-}$ |
| | | | ammonia $\mathrm{NH_3}$ | $38$ | $\mathrm{NH_2^-}$ |
| | | | ethene $\mathrm{H_2C{=}CH_2}$ | $44$ | $\mathrm{H_2C{=}CH^-}$ |
| | | | ethane $\mathrm{CH_3CH_3}$ | $50$ | $\mathrm{CH_3CH_2^-}$ |

Read the ladder top to bottom and you read the whole reactivity map of proton transfer: everything above $\mathrm{H_3O^+}$ is destroyed by water, everything below water is deprotonated by hydroxide only if it sits under about 15.7, and the far end — $\mathrm{C{-}H}$ bonds of alkenes and alkanes — is so weakly acidic that carbanions there are reagents, not species you can make with base.

::: example The pH of a weak acid solution {#ex-ph-weak-acid}
What is the pH of $0.10\ \mathrm{mol\,dm^{-3}}$ ethanoic acid in water, given $\mathrm{p}K_\mathrm{a} = 4.76$?
::: solution
$K_\mathrm{a} = 10^{-4.76} = 1.74\times10^{-5}$. With $x = [\mathrm{H_3O^+}] = [\mathrm{CH_3COO^-}]$ and $[\mathrm{CH_3COOH}] = 0.10 - x$,
$$
K_\mathrm{a} = \frac{x^2}{0.10 - x}.
$$
Because $K_\mathrm{a}$ is small, try $x \ll 0.10$: $x \approx \sqrt{K_\mathrm{a} \times 0.10} = \sqrt{1.74\times10^{-6}} = 1.32\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, which is $1.3\,\%$ of $0.10$ — comfortably under the $5\,\%$ that justifies the approximation. Solving the quadratic exactly gives $x = 1.31\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, so
$$
\mathrm{pH} = -\log_{10}\left(1.31\times10^{-3}\right) = 2.88 .
$$
Two sanity checks worth building into your habits: a weak acid at $0.1\ \mathrm{mol\,dm^{-3}}$ should land between $\mathrm{pH}\ 2$ and $4$, and $\mathrm{pH}$ must sit *above* $\tfrac{1}{2}(\mathrm{p}K_\mathrm{a} - \log_{10} c) = 2.88$ — the formula you just derived. The same arithmetic with chloroacetic acid ($\mathrm{p}K_\mathrm{a} = 2.9$) is exercise [[#exr-ph-chloro]].
:::
:::

::: history
The two great definitions of acid were published in the same year, 1923. The Danish physical chemist Johannes **Brønsted** and the English chemist Thomas **Lowry** independently proposed the proton-transfer definition, which rescued acid–base chemistry from the water-only and hydroxide-only definitions then current; Brønsted, a student of the equilibrium tradition of Jacobus van 't Hoff, immediately saw that it made acid strength a matter of measurable equilibrium position. In the same paper series, Gilbert Newton **Lewis** proposed a broader definition — an acid accepts an electron *pair* — which covers reactions with no proton at all and becomes our language for electrophiles. The curly arrows themselves came slightly earlier and later: Robert **Robinson** drew the first electron-pair arrows in 1922, and Christopher **Ingold** systematised them through the 1920s and 1930s into the mechanistic grammar used in every organic chemistry textbook since.
:::

## The equilibrium rule: one subtraction predicts the position

::: proposition The equilibrium rule {#prop-equilibrium-rule}
For any proton transfer
$$
\mathrm{acid_1 + base_2 \rightleftharpoons base_1 + acid_2}
\qquad
K_\mathrm{eq} = 10^{\,\mathrm{p}K_\mathrm{a}(\mathrm{acid_2}) \;-\; \mathrm{p}K_\mathrm{a}(\mathrm{acid_1})},
$$
where $\mathrm{acid_1}$ is the acid on the left and $\mathrm{acid_2}$ the acid on the right. In words: **the equilibrium favours the side carrying the weaker acid** (the higher $\mathrm{p}K_\mathrm{a}$), and by a factor of ten for every unit of $\mathrm{p}K_\mathrm{a}$ difference. A difference of $3$ or more units means more than $99.9\,\%$ reaction — chemically complete; a difference near zero means a mixture.
:::

::: proof The rule from two dissociation constants {#proof-equilibrium-rule}
Write the two acid dissociations and their constants:
$$
K_\mathrm{a}(\mathrm{acid_1}) = \frac{[\mathrm{base_1}][\mathrm{H_3O^+}]}{[\mathrm{acid_1}]},
\qquad
K_\mathrm{a}(\mathrm{acid_2}) = \frac{[\mathrm{base_2}][\mathrm{H_3O^+}]}{[\mathrm{acid_2}]} .
$$
Divide the first by the second: $[\mathrm{H_3O^+}]$ cancels, and what remains is exactly the equilibrium quotient of the proton transfer,
$$
\frac{K_\mathrm{a}(\mathrm{acid_1})}{K_\mathrm{a}(\mathrm{acid_2})}
= \frac{[\mathrm{base_1}][\mathrm{acid_2}]}{[\mathrm{acid_1}][\mathrm{base_2}]}
= K_\mathrm{eq}
= 10^{-\mathrm{p}K_\mathrm{a}(\mathrm{acid_1}) + \mathrm{p}K_\mathrm{a}(\mathrm{acid_2)}} .
$$
The proof shows what the rule really is: hydronium is the common currency, and comparing $\mathrm{p}K_\mathrm{a}$ values is comparing each acid's demand for the proton against that same standard. It also shows the free-energy content: $\Delta_\mathrm{r}G^\circ = -RT \ln K_\mathrm{eq} = -2.303\,RT\left[\mathrm{p}K_\mathrm{a}(\mathrm{acid_2}) - \mathrm{p}K_\mathrm{a}(\mathrm{acid_1})\right]$, a magnitude of $5.71\ \mathrm{kJ\,mol^{-1}}$ per unit, so the $\mathrm{p}K_\mathrm{a}$ ladder is a free-energy ladder in disguise.
:::

::: example Hydroxide: which acids can it deprotonate? {#ex-hydroxide-acetate}
Use the equilibrium rule to decide, with numbers, whether aqueous hydroxide completes the deprotonation of (a) ethanoic acid, (b) phenol, (c) ethyne. The conjugate acid of $\mathrm{HO^-}$ is $\mathrm{H_2O}$, $\mathrm{p}K_\mathrm{a} = 15.7$.
::: solution
In each case the reactant acid is the substrate and the product acid is water, so $K_\mathrm{eq} = 10^{15.7 - \mathrm{p}K_\mathrm{a}(\mathrm{substrate})}$.
**(a)** Ethanoic acid: $K_\mathrm{eq} = 10^{15.7 - 4.76} = 10^{10.94} = 8.7\times10^{10}$ — a billion-to-one victory; neutralisation of a carboxylic acid by hydroxide is irreversible for practical purposes.
**(b)** Phenol: $K_\mathrm{eq} = 10^{15.7 - 10.0} = 10^{5.7} = 5.0\times10^{5}$ — complete, though less overwhelmingly; phenol dissolves in aqueous sodium hydroxide but, as we will see, not in hydrogencarbonate.
**(c)** Ethyne: $K_\mathrm{eq} = 10^{15.7 - 25} = 10^{-9.3} = 5.0\times10^{-10}$ — hydroxide fails by nine orders of magnitude. The acetylide anion is such a strong base that water destroys it instantly; making it requires a base whose conjugate acid is *weaker* than ethyne, such as $\mathrm{NH_2^-}$ — example [[#ex-choose-base]] does the arithmetic.
:::
:::

::: widget plot
f: 100/(1 + 10^(pKa - x))
x: 0, 14
y: 0, 105
sliders: pKa=4.76:-9:38:0.01
labels: \text{deprotonated}
caption: The fraction of an acid $\mathrm{HA}$ present as $\mathrm{A^-}$ in a solution of pH $x$, namely $100/(1 + 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}})$, with the $\mathrm{p}K_\mathrm{a}$ set by the slider (default ethanoic acid, $4.76$). The curve is a sigmoid centred on $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, where exactly half the acid is ionised, and it is within $1\,\%$ of fully deprotonated two units above the $\mathrm{p}K_\mathrm{a}$ — the same "two units means two powers of ten" arithmetic as the equilibrium rule. Slide to phenol ($10.0$) and watch it only $0.25\,\%$ ionised at blood pH $7.4$; slide to ethyne ($25$) and see why no aqueous pH can touch it.
:::

::: example The hydrogencarbonate test: a diagnostic from a subtraction {#ex-bicarbonate}
Dilute sodium hydrogencarbonate fizzes with ethanoic acid but not with phenol. Explain quantitatively; the product acid is carbonic acid, $\mathrm{p}K_\mathrm{a} = 6.4$ (apparent).
::: solution
Ethanoic acid: $K_\mathrm{eq} = 10^{6.4 - 4.76} = 10^{1.64} = 44$. The equilibrium lies only forty-odd-fold to the right, but the $\mathrm{CO_2}$ bubbling away pulls it the rest of the way — an open system drains the product, so effervescence is continuous. Phenol: $K_\mathrm{eq} = 10^{6.4 - 10.0} = 10^{-3.6} = 2.5\times10^{-4}$ — a thousand-fold *against* reaction, no $\mathrm{CO_2}$, no fizz. A five-second test at the bench separates carboxylic acids from phenols because their $\mathrm{p}K_\mathrm{a}$ values straddle carbonic acid's: the functional-group tests of [[organic-1/organic-structures]] are equilibrium-rule subtractions in disguise.
:::
:::

::: warning $\mathrm{p}K_\mathrm{a}$ predicts position, never speed — and conjugates go the other way {#warn-pka-rate}
Three misconceptions, each of which wrecks exam answers. **(1)** *A large $K_\mathrm{eq}$ means a fast reaction.* It does not mean anything of the kind: thermodynamics says where the equilibrium sits, kinetics says how long arrival takes. Deprotonating ethyne by hydroxide is *not* slow, it simply stops after $10^{-9}$; and some reactions with $\Delta_\mathrm{r}G^\circ < 0$ (diamond to graphite) wait geology to proceed. Rate is governed by $\Delta G^{\ddagger}$, a completely different number — the energy-profile section below is where speed lives. **(2)** *A strong acid has a strong conjugate base.* Exactly the reverse: strength runs in opposite directions across a conjugate pair, because $\mathrm{p}K_\mathrm{a}(\mathrm{acid}) + \mathrm{p}K_\mathrm{b}(\mathrm{base}) = 14$ in water. $\mathrm{HO^-}$ is a strong base because its conjugate acid, water, is a very weak one; acetate is feeble as a base precisely because ethanoic acid is comparatively generous with its proton. **(3)** *The $\mathrm{p}K_\mathrm{a}$ scale runs the "obvious" way.* It is a negative logarithm: $-9$ is strong, $50$ is desperate. The ladder is memorised by direction — down the page, weaker acids, stronger conjugate bases — not by digits.
:::

::: quiz
Which base can deprotonate ethyne ($\mathrm{p}K_\mathrm{a} = 25$) to a useful extent, and why?
- [ ] $\mathrm{HO^-}$, because hydroxide is a strong base in water.
- [x] $\mathrm{NH_2^-}$, because its conjugate acid $\mathrm{NH_3}$ ($\mathrm{p}K_\mathrm{a} = 38$) is a weaker acid than ethyne: $K_\mathrm{eq} = 10^{38-25} = 10^{13}$.
- [ ] $\mathrm{CH_3COO^-}$, because acetate is the conjugate base of a weak acid.
- [ ] Any of them — every anion is a base, and proton transfers are fast.
::: solution
The rule compares *acid with acid*: the reaction succeeds only if the product acid is weaker (higher $\mathrm{p}K_\mathrm{a}$) than the starting acid. Hydroxide gives water ($15.7 < 25$, fails); acetate gives ethanoic acid ($4.76 \ll 25$, fails by $2\times10^{20}$); amide gives ammonia ($38 > 25$, works by $10^{13}$). Speed (option 4) is irrelevant to position — see warning [[#warn-pka-rate]].
:::
:::

## Why the numbers fall where they do: atom, resonance, induction, orbital

::: proposition The four explanatory factors {#prop-four-factors}
Acidity increases when the conjugate base is stabilised. Four effects stabilise anions, in decreasing order of typical size: **(A) the atom** — down a column of the periodic table, larger size spreads the charge over more volume and acidity rises steeply ($\mathrm{CH_3CH_2SH}$ $10.5$ vs $\mathrm{CH_3CH_2OH}$ $16$); across a row, electronegativity dominates and acidity rises with it ($\mathrm{CH_3CH_3}$ $50$ $<$ $\mathrm{NH_3}$ $38$ $<$ $\mathrm{H_2O}$ $15.7$). **(R) resonance** — delocalising the charge over several atoms beats localising it ($\mathrm{CH_3COO^-}$ from $4.76$ vs $\mathrm{CH_3CH_2O^-}$ from $16$; phenoxide from $10.0$). **(I) induction** — electronegative atoms pull charge through $\sigma$ bonds, an effect that dies with distance (ethanoic $4.76$, chloroethanoic $2.9$, and three fluorines carry trifluoroethanoic to $0.5$). **(O) orbital** — the more s character the lone pair occupies, the closer it is held to the nucleus and the more stable the anion: $sp$ ($50\,\%$ s) $25$ $<$ $sp^2$ ($33\,\%$) $44$ $<$ $sp^3$ ($25\,\%$) $50$.
:::

The ordering of the factors is itself a fact: when atom and resonance disagree, atom wins. Ethanethiol ($\mathrm{p}K_\mathrm{a} = 10.5$) is a hundred thousand times more acidic than ethanol ($16$) even though the ethanethiolate anion has no resonance to enjoy — sulfur's larger volume stabilises the lone negative charge far better than oxygen's smaller one, and size beats everything else when you move *down* a column. That is why thiols are the soft, reactive nucleophiles of later chapters while alcohols sit quietly until activated.

Resonance explains the two most important acidity jumps in organic chemistry. Ethanoate spreads its charge over two equivalent oxygens — both $\mathrm{C{-}O}$ bonds identical, both carbons' shared custody of the extra electrons — while ethoxide holds its charge alone on one oxygen: $4.76$ versus $16$, a factor of $10^{11}$. Phenoxide delocalises into the ring but never equivalently (the charge lands on carbons and on only one oxygen at a time), and phenol's $10.0$ sits exactly between the two extremes: resonance, but imperfect resonance.

Induction is weaker and distance-sensitive. Chloroethanoic acid ($2.9$) is sixty times stronger than ethanoic because the electronegative chlorine drags electron density along the $\sigma$ framework, dispersing the carboxylate charge; the effect halves by one more bond — 3-chlorobutanoic acid sits near $4.0$ and 4-chlorobutanoic near $4.5$, against butanoic's $4.8$ — and trifluoroethanoic acid ($0.5$) shows the additive pull of three fluorines. The fluoro series runs even further: fluoroethanoic acid is about $2.6$, below chloro's $2.9$, tracking fluorine's greater electronegativity.

Finally the orbital factor, which is the only one that operates on pure $\mathrm{C{-}H}$ acidity and therefore the only one standing between you and the hydrocarbons. An $sp$ hybrid orbital has $50\,\%$ s character, so its electrons spend more time near the nucleus and are lower in energy: ethyne ($25$) is $10^{19}$ times more acidic than ethene ($44$), and ethene $10^{6}$ times more acidic than ethane ($50$). No base in ordinary use reaches $\mathrm{p}K_\mathrm{a} \approx 44$; the $sp$ carbon acid at $25$ is the bottom rung that chemistry can actually climb.

::: example Ranking by mechanism, not by memory {#ex-rank-factors}
Rank trifluoroethanoic acid, ethanoic acid, phenol, ethanethiol, ethanol and ethyne in order of increasing acidity, assigning each to its dominant factor.
::: solution
Ethane-like $\mathrm{C{-}H}$ is off-scale, so start at the bottom: **ethyne** ($25$, orbital factor alone) $<$ **ethanol** ($16$, atom factor: oxygen, charge localised) $<$ **ethanethiol** ($10.5$, atom factor down the column: sulfur beats oxygen) $<$ **phenol** ($10.0$, resonance into the ring, imperfect) $<$ **ethanoic acid** ($4.76$, resonance over two *equivalent* oxygens) $<$ **trifluoroethanoic acid** ($0.5$, resonance plus three-fluorine induction). Notice that the ranking is not one effect sorted neatly: phenol and ethanethiol are within a factor of three of each other because different factors — resonance versus atom size — happen to land near the same place. The factors predict *orders of magnitude*; only the table resolves near-ties.
:::
:::

::: example Choosing a base to make a carbanion {#ex-choose-base}
You want to convert acetone ($\mathrm{p}K_\mathrm{a} = 19.3$ at the α $\mathrm{C{-}H}$) into its enolate as completely as possible. Evaluate hydroxide, ethoxide and amide with the equilibrium rule.
::: solution
Each base's conjugate acid: water $15.7$, ethanol $16$, ammonia $38$.
$$
\mathrm{HO^-}:\ K_\mathrm{eq} = 10^{15.7 - 19.3} = 10^{-3.6} = 2.5\times10^{-4};
\qquad
\mathrm{CH_3CH_2O^-}:\ K_\mathrm{eq} = 10^{16 - 19.3} = 5\times10^{-4};
\qquad
\mathrm{NH_2^-}:\ K_\mathrm{eq} = 10^{38 - 19.3} = 10^{18.7} = 5\times10^{18}.
$$
Hydroxide and ethoxide leave the ketone more than $99.9\,\%$ protonated — which is not useless (enolates at steady $0.03\,\%$ concentration drive the carbonyl chemistry of the second course) but is not *preparation*. Amide wins by eighteen orders of magnitude, the classic choice; the rule tells you in one subtraction what a bottle label never could.
:::
:::

## Nucleophiles and electrophiles: the two permanent roles

::: definition Nucleophiles and electrophiles {#def-nuc-elec}
A **nucleophile** ("nucleus-loving") is an electron-pair donor — a **Lewis base** — and attacks an atom to make a new bond with the pair it carries. An **electrophile** ("electron-loving") is an electron-pair acceptor — a **Lewis acid**. Nucleophiles are anions or neutral species with lone pairs or $\pi$ bonds ($\mathrm{HO^-}$, $\mathrm{CN^-}$, $\mathrm{NH_3}$, $\mathrm{H_2O}$, $\mathrm{Br^-}$, the $\pi$ bond of an alkene); electrophiles are cations or neutral atoms bearing a partial or full positive charge, an incomplete octet, or a leaving group ($\mathrm{H^+}$, carbocations, the carbon of $\mathrm{C{=}O}$, the carbon of $\mathrm{CH_3Br}$, $\mathrm{AlCl_3}$, $\mathrm{BF_3}$). Every curly arrow in this course runs from nucleophile to electrophile: from where electrons are, to where they are needed.
:::

Basicity and nucleophilicity are cousins, not twins, and the distinction is the preview of the next chapter. **Basicity is thermodynamic**: how far proton transfer goes, measured by the $\mathrm{p}K_\mathrm{a}$ of the conjugate acid. **Nucleophilicity is kinetic**: how fast a species attacks an electrophilic *carbon*, measured by rate constants. Across a row of the periodic table the two track each other ($\mathrm{NH_2^-} > \mathrm{HO^-} > \mathrm{F^-}$ for both), because the same electron richness that grabs protons grabs carbons. Down a column in protic solvents they diverge: $\mathrm{I^-}$ is a weak base but an excellent nucleophile, because a large soft anion sheds its solvent cage easily and polarises readily on the way to carbon. And steric bulk separates them brutally: *tert*-butoxide $\mathrm{(CH_3)_3CO^-}$ is a stronger base than ethoxide but a wretched nucleophile, because a proton is accessible and a carbon is not — the fact that decides whole reaction outcomes in [[organic-1/elimination]].

## Curly arrows: the grammar of mechanism

::: algorithm Drawing curly arrows {#alg-curly-arrows}
**(1)** Arrows start at an **electron source** — a lone pair or a bond (never at an atom, never at a positive charge) — and point to an **electron destination**: an atom (where the pair will sit as a new lone pair) or between two atoms (where it will become a new bond). **(2)** A curly arrow moves an **electron pair**, not a single electron; single-electron (fishhook) arrows are deferred to [[organic-1/radical-reactions]]. **(3)** Conserve charge: the total charge of the drawn species is the same before and after the arrows. **(4)** Respect the octet: no second-row atom (C, N, O, F) may end with more than eight electrons — if a lone pair attacks with an octet already full, another bond must leave in the same step. **(5)** Equilibria get **harpoons** (two half-arrows, forward longer if products are favoured); a single $\mathrm{H^+}$ transfer is usually drawn as two arrows — source to proton, bond back to its atom.
:::

Worked in words, the grammar reads like a sentence with fixed syntax. Hydroxide plus ethanoic acid: *the lone pair on the hydroxide oxygen attacks the proton of ethanoic acid; the electrons of the $\mathrm{O{-}H}$ bond fall back onto the oxygen*, giving water and ethanoate — two arrows, charge $-1$ on both sides, no octet broken. The reverse, ethanoate plus hydronium: *a lone pair on one ethanoate oxygen attacks a proton of $\mathrm{H_3O^+}$; the $\mathrm{O{-}H}$ bond electrons fall back onto the oxygen of water*. The equilibrium rule then says which harpoon is longer: $K_\mathrm{eq} = 10^{15.7-4.76} \gg 1$, so the forward arrow is the long one.

::: example A full mechanism in words and arrows {#ex-arrow-mechanism}
Sodium amide in liquid ammonia deprotonates ethyne. Describe the mechanism with curly arrows and check every bookkeeping rule.
::: solution
One step, two arrows. *The lone pair on the nitrogen of $\mathrm{NH_2^-}$ attacks the proton of ethyne; the electrons of the $\mathrm{C{-}H}$ bond fall back onto the $sp$ carbon*, giving ethyne anion ($\mathrm{HC{\equiv}C^-}$, the acetylide) and ammonia. Bookkeeping: rule 1 — both arrows start at electron sources (a lone pair, a bond) and end at a proton and a carbon; rule 2 — both are pairs; rule 3 — charge is $-1$ before (on N) and $-1$ after (on C), and the sodium counter-ion is a spectator written nowhere; rule 4 — carbon keeps its octet throughout (it loses a bond and gains a lone pair); rule 5 — the equilibrium constant is $10^{38-25} = 10^{13}$, so in honest drawing the forward harpoon is much the longer. Acetylides made this way are the nucleophiles that build carbon–carbon bonds in synthesis — the first place this chapter's acid–base chemistry becomes construction.
:::
:::

::: warning Arrows chase electrons, never protons {#warn-arrow-start}
The most common beginner's arrow is drawn backwards — from the atom that *loses* things to the atom that *gains* them, as if atoms were the movers. Atoms do move in reactions, but curly arrows track only electrons, and electrons live in lone pairs and bonds. Three rules catch every bad arrow: an arrow's tail must touch a lone pair or a bond; an arrow's head tells you exactly where two electrons arrive, so count the electrons at the destination (an oxygen that receives a pair while already carrying three bonds and a lone pair now has ten electrons — impossible, so a bond must leave); and the charges must balance across the step. If your arrow starts at "$\mathrm{H^+}$", it is not a curly arrow, it is a wish.
:::

## Energy profiles: how reactions cross the landscape

::: definition Reaction coordinate, transition state, intermediate {#def-energy-profile}
A **reaction energy profile** plots the free energy of the system against the **reaction coordinate** — a composite coordinate running from reactants, over the barrier, to products. A **transition state** (activated complex, marked $\ddagger$) is the energy *maximum* at the top of a barrier: not a species, never isolable, the geometry through which every reactive trajectory must pass; its height above the starting material is the **activation free energy** $\Delta G^{\ddagger}$, which sets the rate. An **intermediate** is a genuine *minimum* between two maxima: a real species with a finite lifetime, sitting in a well deep enough to be (sometimes) caught. The overall free-energy change $\Delta G^\circ$ is the difference between the two end points and sets the equilibrium, $K_\mathrm{eq} = e^{-\Delta G^\circ/RT}$; for a one-step reaction, $\Delta G^{\ddagger}_{\mathrm{f}} - \Delta G^{\ddagger}_{\mathrm{r}} = \Delta G^\circ$ exactly.
:::

The distinction the definition enforces is the one warning [[#warn-pka-rate]] demanded: $\Delta G^\circ$ and $\Delta G^{\ddagger}$ are independent numbers. A strongly exergonic proton transfer can be slow if the barrier is high, and a thermoneutral reaction can be lightning-fast if it is low. Kinetics and thermodynamics are two different questions — *how fast* and *how far* — and a profile answers both at once.

::: proposition The Hammond postulate and the honesty of catalysts {#prop-hammond}
**Hammond's postulate:** a transition state resembles whichever stable species (reactant or product) it is closer to in energy. An **exergonic** step therefore has an **early**, reactant-like transition state; an **endergonic** step has a **late**, product-like one — which is why the endergonic direction of a proton transfer is the one whose barrier *feels* the product's instability. A **catalyst** provides an alternative pathway with lower $\Delta G^{\ddagger}$ for both directions by exactly the same amount, leaving $\Delta G^\circ$, $K_\mathrm{eq}$ and every $\mathrm{p}K_\mathrm{a}$ in this lesson untouched: catalysts make reactions faster, never more favourable.
:::

::: example Reading numbers off a profile {#ex-profile-numbers}
A one-step reaction at $\mathrm{298\ K}$ has $\Delta G^{\ddagger}_{\mathrm{f}} = 50\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G^\circ = -20\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta G^{\ddagger}_{\mathrm{r}}$, $K_\mathrm{eq}$, and the rate ratio if a catalyst lowers the forward barrier to $38\ \mathrm{kJ\,mol^{-1}}$.
::: solution
$\Delta G^{\ddagger}_{\mathrm{r}} = \Delta G^{\ddagger}_{\mathrm{f}} - \Delta G^\circ = 50 - (-20) = 70\ \mathrm{kJ\,mol^{-1}}$: the reverse reaction climbs the barrier *and* the thermodynamic hill.
$$
K_\mathrm{eq} = e^{-\Delta G^\circ/RT} = e^{20000/2478.8} = e^{8.07} = 3.2\times10^{3},
\qquad
\frac{k_\mathrm{cat}}{k_\mathrm{uncat}} = e^{(50-38)\times10^{3}/2478.8} = e^{4.84} = 1.3\times10^{2}.
$$
Twelve and a half $\mathrm{kJ\,mol^{-1}}$ buys a hundredfold in rate — remember the exchange rate $RT\ln 10 = 5.71\ \mathrm{kJ\,mol^{-1}}$ per factor of ten, the same constant that prices the $\mathrm{p}K_\mathrm{a}$ scale. By Hammond, the exergonic forward step has an early, reactant-like transition state, and the catalyst must lower the reverse barrier to $70 - 12 = 58\ \mathrm{kJ\,mol^{-1}}$ as well: both directions, the same amount, always.
:::
:::

::: widget newton
f: x^2 + 10^(-4.76)*x - 10^(-4.76)*0.10
x0: 0.001
x: 0, 0.005
caption: Newton's method solving the exact weak-acid equation $x^2 + K_\mathrm{a} x - K_\mathrm{a} c = 0$ for $x = [\mathrm{H_3O^+}]$ in $0.10\ \mathrm{mol\,dm^{-3}}$ ethanoic acid: the root is $x = 1.31\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, pH $2.88$ — the example's approximation $\sqrt{K_\mathrm{a} c}$ was right to three figures. The same machine solves problems with no closed form at all: polyprotic carbonic acid, buffers mixed from real amounts, or the pH at which exactly $99\,\%$ of an acid is deprotonated. Equilibrium arithmetic is only arithmetic; the approximations are conveniences, and Newton is always there to check them.
:::

## Where this leads

This lesson is the grammar chapter, and every following chapter writes sentences with it. [[organic-1/nucleophilic-substitution]] is the equilibrium rule and the arrow grammar applied to carbon instead of hydrogen: nucleophile, electrophile, leaving group, and two competing mechanisms whose rates turn on $\Delta G^{\ddagger}$, not on $\Delta G^\circ$. [[organic-1/elimination]] adds the choice between attacking and deprotonating — base strength versus nucleophilicity, and the *anti* geometry inherited from [[organic-1/conformations]]. The $\pi$ bonds introduced here as nucleophiles become electrophile-hunters in [[organic-1/alkenes-alkynes]], the fishhook arrows we deferred belong to [[organic-1/radical-reactions]], and the quantitative bridge between $\Delta G^{\ddagger}$ and rate constants is built in [[kinetics/transition-state-theory]]. The Lewis-structure and electronegativity machinery assumed throughout is in [[bonding-structure/covalent-lewis]].

::: summary
- A Brønsted acid donates $\mathrm{H^+}$; strength is the equilibrium constant $K_\mathrm{a}$ of transfer to water, and $\mathrm{p}K_\mathrm{a} = -\log_{10} K_\mathrm{a}$ runs *backwards*: smaller means stronger, one unit $= 5.71\ \mathrm{kJ\,mol^{-1}}$.
- The equilibrium rule: $K_\mathrm{eq} = 10^{\mathrm{p}K_\mathrm{a}(\mathrm{product\ acid}) - \mathrm{p}K_\mathrm{a}(\mathrm{reactant\ acid})}$; equilibrium favours the side with the weaker acid, and $|\Delta\mathrm{p}K_\mathrm{a}| \ge 3$ means complete.
- A strong acid has a weak conjugate base; the $\mathrm{p}K_\mathrm{a}$ ladder is a free-energy ladder, and it predicts position, never rate.
- Four factors explain the ladder: atom size down a column (thiols $10.5$ beat alcohols $16$), resonance (carboxylate $4.76$, phenoxide $10.0$), induction (chloro $2.9$, trifluoro $0.5$, dying with distance), and orbital s character ($sp$ $25$ $<$ $sp^2$ $44$ $<$ $sp^3$ $50$).
- Nucleophiles are Lewis bases (electron-pair donors), electrophiles are Lewis acids; nucleophilicity is kinetic, basicity thermodynamic, and bulky strong bases make poor nucleophiles.
- Curly arrows start at lone pairs or bonds, move electron pairs, conserve charge, and never exceed an octet; harpoons show equilibria, fishhooks wait for the radical chapter.
- Energy profiles separate $\Delta G^{\ddagger}$ (rate) from $\Delta G^\circ$ (position); transition states are maxima, intermediates are minima; Hammond's postulate ties transition-state structure to which side is nearer in energy; catalysts lower both barriers equally.
:::

## Exercises

::: exercise From $\mathrm{p}K_\mathrm{a}$ to $K_\mathrm{a}$ {#exr-ka-tfa level=1 check="0.32"}
Trifluoroethanoic acid has $\mathrm{p}K_\mathrm{a} = 0.5$. What is its $K_\mathrm{a}$? (Enter the equilibrium constant.)
::: solution
$K_\mathrm{a} = 10^{-0.5} = 0.32$. A $\mathrm{p}K_\mathrm{a}$ below zero would mean $K_\mathrm{a} > 1$; at $0.5$ the acid is strong but not fully ionised at ordinary concentrations.
:::
:::

::: exercise One subtraction {#exr-keq-phenol level=1 check="500000"}
Compute $K_\mathrm{eq}$ for phenol $+\ \mathrm{HO^-} \rightarrow$ phenoxide $+\ \mathrm{H_2O}$ ($\mathrm{p}K_\mathrm{a}$: phenol $10.0$, water $15.7$). (Enter the equilibrium constant.)
::: solution
$K_\mathrm{eq} = 10^{15.7 - 10.0} = 10^{5.7} = 5.0\times10^{5}$: complete deprotonation, phenol dissolves in aqueous base.
:::
:::

::: exercise Fraction deprotonated {#exr-fraction level=1 check="90.9"}
What percentage of phenol ($\mathrm{p}K_\mathrm{a} = 10.0$) is deprotonated at $\mathrm{pH} = 11.0$? (Enter the percentage.)
::: solution
Fraction $= 100/(1 + 10^{10.0 - 11.0}) = 100/1.1 = 90.9\,\%$. One unit above the $\mathrm{p}K_\mathrm{a}$ is a $10:1$ ratio of base to acid — the widget's curve at $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + 1$.
:::
:::

::: exercise pH of a stronger weak acid {#exr-ph-chloro level=2 check="2.13"}
Find the pH of $0.050\ \mathrm{mol\,dm^{-3}}$ chloroethanoic acid ($\mathrm{p}K_\mathrm{a} = 2.9$). (Enter the pH.)
::: solution
$K_\mathrm{a} = 10^{-2.9} = 1.26\times10^{-3}$. The approximation $x = \sqrt{K_\mathrm{a} c} = 7.9\times10^{-3}$ is $16\,\%$ of $c$ — too large, so solve the quadratic $x^2 + K_\mathrm{a} x - K_\mathrm{a} c = 0$: $x = 7.33\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ and $\mathrm{pH} = 2.13$. Stronger weak acids punish the shortcut; the newton widget solves the same quadratic.
:::
:::

::: exercise Enolate formation by hydroxide {#exr-keq-acetone level=2 check="0.00025"}
Compute $K_\mathrm{eq}$ for acetone $+\ \mathrm{HO^-} \rightleftharpoons$ enolate $+\ \mathrm{H_2O}$ ($\mathrm{p}K_\mathrm{a}$: acetone $19.3$, water $15.7$). (Enter the equilibrium constant.)
::: solution
$K_\mathrm{eq} = 10^{15.7 - 19.3} = 10^{-3.6} = 2.5\times10^{-4}$: hydroxide leaves only about $0.03\,\%$ of the ketone as enolate — enough to catalyse, not enough to prepare.
:::
:::

::: exercise Ratio at a given pH {#exr-ratio level=2 check="0.01"}
A solution contains phenol ($\mathrm{p}K_\mathrm{a} = 10.0$) buffered at $\mathrm{pH} = 8.0$. What is the ratio $[\mathrm{C_6H_5O^-}]/[\mathrm{C_6H_5OH}]$? (Enter the ratio.)
::: solution
From $K_\mathrm{a} = [\mathrm{A^-}][\mathrm{H_3O^+}]/[\mathrm{HA}]$: ratio $= 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}} = 10^{-2} = 0.01$. Two units below the $\mathrm{p}K_\mathrm{a}$, $99\,\%$ is protonated — which is why extracting a phenol into aqueous base requires pushing the pH up near 12.
:::
:::

::: exercise The rule, and Henderson–Hasselbalch, derived {#exr-derive level=3}
Derive the equilibrium rule from the two $K_\mathrm{a}$ expressions as in proof [[#proof-equilibrium-rule]], then derive the Henderson–Hasselbalch equation $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}\!\big([\mathrm{A^-}]/[\mathrm{HA}]\big)$ from a single $K_\mathrm{a}$ expression, and use it to find the pH of a buffer made from $0.10\ \mathrm{mol\,dm^{-3}}$ ethanoic acid and $0.010\ \mathrm{mol\,dm^{-3}}$ sodium ethanoate.
::: solution
Rearranging $K_\mathrm{a} = [\mathrm{A^-}][\mathrm{H_3O^+}]/[\mathrm{HA}]$ gives $[\mathrm{H_3O^+}] = K_\mathrm{a}[\mathrm{HA}]/[\mathrm{A^-}]$; take $-\log_{10}$ of both sides: $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}([\mathrm{A^-}]/[\mathrm{HA}])$. The buffer: $\mathrm{pH} = 4.76 + \log_{10}(0.010/0.10) = 4.76 - 1 = 3.76$. Note the structure: Henderson–Hasselbalch is the equilibrium rule applied to the acid's own conjugate pair, and it is exact whenever the equilibrium concentrations are used — the "approximation" is only in assuming they equal the amounts you mixed. A buffer resists acid because added $\mathrm{H_3O^+}$ is consumed by $\mathrm{A^-}$ (the equilibrium rule: $10^{4.76-(-1.7)} \approx 3\times10^{6}$ in favour of ethanoic acid), and resists base because added $\mathrm{HO^-}$ is consumed by $\mathrm{HA}$ ($10^{10.94}$).
:::
:::

::: exercise A profile, a catalyst and a choice of base {#exr-profile level=3}
Two bases $\mathrm{B_1}$ and $\mathrm{B_2}$ attack the same electrophile. $\mathrm{B_1}$'s conjugate acid has $\mathrm{p}K_\mathrm{a} = 11$, $\mathrm{B_2}$'s has $\mathrm{p}K_\mathrm{a} = 17$; both proton transfers are exergonic by more than $10\ \mathrm{p}K_\mathrm{a}$ units. The product-forming steps have $\Delta G^{\ddagger}_1 = 45\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G^{\ddagger}_2 = 56\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298\ K}$. (a) Which proton transfer has the larger $K_\mathrm{eq}$ against a common acid of $\mathrm{p}K_\mathrm{a} = 5$? (b) Which base reacts faster with the electrophile, and by what factor? (c) A catalyst halves both barriers' *excess* over the uncatalysed path — state what happens to $K_\mathrm{eq}$ of every step. (d) Where does Hammond place the transition state of the faster step?
::: solution
(a) In $\mathrm{B + HA \rightarrow BH^+ + A^-}$ the reactant acid is the common acid ($\mathrm{p}K_\mathrm{a} = 5$) and the product acids are $\mathrm{B_1H^+}$ ($11$) and $\mathrm{B_2H^+}$ ($17$): $K_\mathrm{eq} = 10^{11-5} = 10^{6}$ versus $10^{17-5} = 10^{12}$. $\mathrm{B_2}$, the stronger base, wins thermodynamically. (b) Rate is set by $\Delta G^{\ddagger}$ alone: $\mathrm{B_1}$, by $e^{(56-45)\times10^{3}/2478.8} = e^{4.44} = 85$-fold. The classic decoupling: the weaker base reacts faster — basicity (position) and nucleophilicity (rate) disagree, exactly as the preview promised. (c) Nothing: a catalyst lowers forward and reverse barriers by equal amounts, so $\Delta G^\circ$ and $K_\mathrm{eq}$ of every step are unchanged. (d) The step is exergonic (proton transfer by $10^{6}$; product-forming step likewise downhill), so by Hammond its transition state is early and reactant-like — its energy, and hence the rate, barely feels the product's stability.
:::
:::
