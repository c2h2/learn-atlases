Organic chemistry has a handful of elementary steps — nucleophilic attack, loss of a leaving group, proton transfer, pericyclic rearrangement — from which every mechanism is assembled. Organometallic chemistry has its own short list, and it is shorter than you might fear. Nearly every catalytic cycle in this course, from the hydrogenation of an alkene to the polymerisation of ethene and the coupling of two aromatic rings, is a sequence of just five kinds of step: **ligand substitution**, **oxidative addition**, **reductive elimination**, **migratory insertion** and **elimination** (above all β-hydride elimination), with a sixth — **σ-bond metathesis** — taking over when a metal has no $d$ electrons to give.

This chapter defines each step, says what it does to the electron count, oxidation state and coordination number defined in [[organometallics-catalysis/organometallic-bonding#def-counts]], describes its mechanisms in words, and shows the experiments — kinetics, activation parameters, isotopic labelling, stereochemistry — that reveal which mechanism operates. The ligands involved are those of [[organometallics-catalysis/ligands-complexes]]; the kinetic tools (steady state, pre-equilibrium, Eyring analysis) are those of [[kinetics/reaction-mechanisms]] and [[kinetics/transition-state-theory]], and the substitution mechanisms of classical Werner complexes are in [[coordination-chemistry/inorganic-mechanisms]].

## The bookkeeping of elementary steps

Every elementary step changes the ligand set $\mathrm{L_\ell X_x}$ around the metal in a characteristic way, so the counting formulas predict how the counts change.

::: proposition How elementary steps change the counts {#prop-step-counts}
With $\mathrm{VE} = g + 2\ell + x - q$, $\mathrm{OS} = x + q$ and $\mathrm{CN} = \ell + x$ ([[organometallics-catalysis/organometallic-bonding#def-counts]]), the elementary steps change the counts as follows:

| step | change in ligands | ΔVE | ΔOS | ΔCN |
|---|---|---|---|---|
| association of L / dissociation of L | $\ell \to \ell \pm 1$ | $\pm 2$ | $0$ | $\pm 1$ |
| oxidative addition of A–B / reductive elimination | $x \to x \pm 2$ | $\pm 2$ | $\pm 2$ | $\pm 2$ |
| 1,1- or 1,2-migratory insertion / its reverse (elimination) | $\ell \to \ell \mp 1$ | $\mp 2$ | $0$ | $\mp 1$ |
| σ-bond metathesis | $x$ unchanged | $0$ | $0$ | $0$ |

Here "insertion" combines an L ligand (CO, alkene) and an X ligand (H, alkyl) into a single X ligand (acyl, alkyl); its reverse — deinsertion, or β-hydride elimination — splits one X into an L and an X.
:::

::: proof
Each row follows by substituting the change in $\ell$ and $x$ into the three formulas, with $q$ fixed (no step in the table changes the overall charge).
**Association of L:** $\Delta\ell = +1$, $\Delta x = 0$, so $\Delta\mathrm{VE} = 2$, $\Delta\mathrm{OS} = 0$, $\Delta\mathrm{CN} = 1$.
**Oxidative addition of A–B:** the A–B bond breaks and both A and B become X ligands of the metal, $\Delta x = +2$: $\Delta\mathrm{VE} = 2$, $\Delta\mathrm{OS} = 2$, $\Delta\mathrm{CN} = 2$. (If A–B is $\mathrm{H_2}$, the dihydrogen complex of [[organometallics-catalysis/ligands-complexes]] is the L-bound intermediate between the two: association first, then OA of the bound ligand.)
**Migratory insertion**, e.g. $\mathrm{M(CH_3)(CO)} \rightarrow \mathrm{M\{C(O)CH_3\}}$: an L (CO) and an X ($\mathrm{CH_3}$) become one X (acyl). Then $\Delta\ell = -1$, $\Delta x = 0$, giving $\Delta\mathrm{VE} = -2$, $\Delta\mathrm{OS} = 0$, $\Delta\mathrm{CN} = -1$. The same holds for alkene insertion into M–H (alkene L + hydride X → alkyl X).
**σ-bond metathesis**, $\mathrm{M{-}R + H{-}R' \rightarrow M{-}R' + H{-}R}$: one X is exchanged for another, nothing else changes. $\blacksquare$
:::

The table is the first thing to consult when you meet a proposed mechanism. An 18-electron complex cannot undergo oxidative addition directly (it would become 20-electron) — it must first lose a ligand. A $d^0$ complex cannot undergo oxidative addition at all, because it would need an oxidation state two higher than its group number allows; this is why early-metal and lanthanide alkyls react by σ-bond metathesis instead. And a migratory insertion *creates* a vacant site, which must be filled before the cycle can continue.

::: example Counting through three steps {#ex-count-steps}
Vaska's complex, $\mathrm{[IrCl(CO)(PPh_3)_2]}$, adds iodomethane to give $\mathrm{[IrCl(I)(CH_3)(CO)(PPh_3)_2]}$. Under CO pressure the methyl group could then migrate to a carbonyl to give an acyl complex. Give the counts at each stage.
::: solution
**Start:** $\mathrm{VE} = 9 + 2(3) + 1 = 16$, Ir(I), $d^8$, CN 4 (square planar).
**After oxidative addition of $\mathrm{CH_3{-}I}$:** two new X ligands ($\mathrm{CH_3}$, I): $\mathrm{VE} = 9 + 6 + 3 = 18$, Ir(III), $d^6$, CN 6 (octahedral). All three counts have risen by 2, as [[#prop-step-counts]] predicts.
**After methyl migration to CO:** $\mathrm{CH_3}$ (X) and CO (L) become acetyl (X): $\mathrm{VE} = 9 + 4 + 3 = 16$, still Ir(III), CN 5 — a vacant site has opened. **After binding the added CO:** $\mathrm{VE} = 18$, CN 6. The sequence oxidative addition → migratory insertion → ligand binding is exactly the heart of the iridium-catalysed (Cativa) and rhodium-catalysed (Monsanto) carbonylation of methanol to acetic acid.
:::
:::

## Ligand substitution

An 18-electron complex substitutes by **dissociation**: a ligand leaves to give a 16-electron intermediate, which then captures the incoming ligand. A 16-electron complex — typically square-planar $d^8$ — substitutes by **association**, the incoming ligand using the empty $p_z$ orbital ([[organometallics-catalysis/organometallic-bonding#prop-16-18]]) to form an 18-electron five-coordinate intermediate. This is Tolman's 16/18 rule in kinetic form: no 20-electron intermediates.

::: proposition Rate law for dissociative substitution {#prop-dissociative}
For the mechanism
$$
\mathrm{ML_nL'} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ML_n} + \mathrm{L'}, \qquad \mathrm{ML_n} + \mathrm{L''} \xrightarrow{\;k_2\;} \mathrm{ML_nL''},
$$
with the 16-electron intermediate $\mathrm{ML_n}$ in a steady state, the rate of substitution of L′ by L″ is $v = k_\text{obs}[\mathrm{ML_nL'}]$ with
$$
k_\text{obs} = \frac{k_1 k_2[\mathrm{L''}]}{k_{-1}[\mathrm{L'}] + k_2[\mathrm{L''}]} = \frac{k_1}{1 + \dfrac{k_{-1}[\mathrm{L'}]}{k_2[\mathrm{L''}]}}.
$$ {#eq-dissociative}
At high $[\mathrm{L''}]$ or in the absence of free L′, $k_\text{obs} \rightarrow k_1$: first order in complex and **zero order in the incoming ligand**. Added L′ **retards** the reaction, and $1/k_\text{obs}$ is linear in $[\mathrm{L'}]/[\mathrm{L''}]$ with intercept $1/k_1$ and slope $k_{-1}/(k_1k_2)$.
:::

::: proof
The steady-state condition on the intermediate is
$$
\frac{\mathrm{d}[\mathrm{ML_n}]}{\mathrm{d}t} = k_1[\mathrm{ML_nL'}] - k_{-1}[\mathrm{ML_n}][\mathrm{L'}] - k_2[\mathrm{ML_n}][\mathrm{L''}] \approx 0,
$$
so $[\mathrm{ML_n}] = k_1[\mathrm{ML_nL'}]/(k_{-1}[\mathrm{L'}] + k_2[\mathrm{L''}])$. The product forms at rate $k_2[\mathrm{ML_n}][\mathrm{L''}]$, which gives [[#eq-dissociative]] after substitution. Inverting,
$$
\frac{1}{k_\text{obs}} = \frac{1}{k_1} + \frac{k_{-1}}{k_1k_2}\cdot\frac{[\mathrm{L'}]}{[\mathrm{L''}]},
$$
the linear form. The steady-state approximation is justified because the 16-electron intermediate is very reactive ($k_{-1}$ and $k_2$ are large), so its concentration remains tiny. $\blacksquare$
:::

::: widget plot
f: 1/(1 + r*x); 1/(1 + 0.2*x)
x: 0, 5
y: 0, 1
sliders: r=5:0.5:20:0.5
labels: k_\text{obs}/k_1,\ k_{-1}/k_2 = r; k_\text{obs}/k_1,\ k_{-1}/k_2 = 0.2
caption: Retardation of dissociative substitution by the departing ligand, [[#eq-dissociative]]: $k_\text{obs}/k_1$ against the ratio $[\mathrm{L'}]/[\mathrm{L''}]$ of free leaving ligand to incoming ligand. When the intermediate strongly prefers to recapture L′ (large $r = k_{-1}/k_2$, slider) even a little added L′ slows the reaction severely; when it is unselective ($r = 0.2$) added L′ hardly matters. Catalytic chemists use exactly this effect: free triphenylphosphine slows Wilkinson hydrogenation and rhodium hydroformylation, because their active species are formed by phosphine loss.
:::

::: example Phosphine retardation {#ex-retardation}
$\mathrm{[Ni(CO)_3(PPh_3)]}$ exchanges $\mathrm{PPh_3}$ for $\mathrm{P(OEt)_3}$ by a dissociative mechanism with $k_1 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$ (illustrative value) at the temperature of the experiment, and the intermediate $\mathrm{Ni(CO)_3}$ recaptures $\mathrm{PPh_3}$ five times faster than it captures $\mathrm{P(OEt)_3}$ at equal concentration ($k_{-1}/k_2 = 5$). With $[\mathrm{P(OEt)_3}] = 0.10\ \mathrm{mol\,dm^{-3}}$, find $k_\text{obs}$ and the half-life (a) with no added $\mathrm{PPh_3}$ and (b) with $0.050\ \mathrm{mol\,dm^{-3}}$ added $\mathrm{PPh_3}$.
::: solution
(a) Without free $\mathrm{PPh_3}$ (at early times), $k_\text{obs} = k_1 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$ and $t_{1/2} = \ln 2/k_\text{obs} = 693\ \mathrm{s}$.

(b) $[\mathrm{L'}]/[\mathrm{L''}] = 0.050/0.10 = 0.50$, so by [[#eq-dissociative]]
$$
k_\text{obs} = \frac{1.0\times10^{-3}}{1 + 5 \times 0.50} = \frac{1.0\times10^{-3}}{3.5} = 2.9\times10^{-4}\ \mathrm{s^{-1}}, \qquad t_{1/2} = \frac{0.693}{2.86\times10^{-4}} = 2.4\times10^{3}\ \mathrm{s}.
$$
Adding half an equivalent of the leaving ligand slows the reaction three and a half times. A strictly associative mechanism would show no such retardation and would be first order in incoming ligand, which is how the two are told apart.
:::
:::

Activation parameters tell the same story from a different angle. A dissociative step breaks a bond and frees a molecule: $\Delta H^\ddagger$ is large (roughly the metal–ligand bond enthalpy) and $\Delta S^\ddagger$ is **positive**. An associative step makes a bond and joins two molecules: $\Delta H^\ddagger$ is smaller and $\Delta S^\ddagger$ is **negative**, often strongly so. The Eyring equation ([[kinetics/transition-state-theory]]),
$$
\ln\frac{k}{T} = \ln\frac{k_\mathrm{B}}{h} + \frac{\Delta S^\ddagger}{R} - \frac{\Delta H^\ddagger}{RT}, \qquad \ln\frac{k_\mathrm{B}}{h} = 23.760 \ \ (k_\mathrm{B}/h\ \text{in}\ \mathrm{K^{-1}\,s^{-1}}),
$$ {#eq-eyring}
extracts both from rate constants at two or more temperatures.

::: example Activation parameters and mechanism {#ex-eyring}
CO substitution in an 18-electron carbonyl has first-order rate constants $k = 1.0\times10^{-4}\ \mathrm{s^{-1}}$ at $298.15\ \mathrm{K}$ and $1.5\times10^{-3}\ \mathrm{s^{-1}}$ at $318.15\ \mathrm{K}$, independent of the incoming ligand. Find $\Delta H^\ddagger$ and $\Delta S^\ddagger$ and comment.
::: solution
Subtracting [[#eq-eyring]] at the two temperatures eliminates $\Delta S^\ddagger$:
$$
\Delta H^\ddagger = \frac{R\,\ln\!\big[(k_2/T_2)/(k_1/T_1)\big]}{1/T_1 - 1/T_2} = \frac{8.314 \times \ln\!\big[(1.5\times10^{-3}/318.15)/(1.0\times10^{-4}/298.15)\big]}{(3.3540 - 3.1432)\times10^{-3}} = 104\ \mathrm{kJ\,mol^{-1}}.
$$
Then, from the $298.15\ \mathrm{K}$ point,
$$
\Delta S^\ddagger = R\left[\ln\frac{k_1}{T_1} - 23.760\right] + \frac{\Delta H^\ddagger}{T_1} = 8.314\,(-14.908 - 23.760) + \frac{104\,220}{298.15} = +28\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
A large enthalpy of activation, comparable with an M–CO bond enthalpy, and a positive entropy of activation, together with zero order in incoming ligand, all point to rate-determining **CO dissociation**. (The values carry the uncertainty of a two-point determination; real work uses five or more temperatures.)
:::
:::

::: widget plot
f: 23.76 + s/8.314 - h*x/8.314; 23.76 - 194/8.314 - 24.8*x/8.314
x: 2.8, 3.6
y: -25, 0
sliders: h=104:40:160:1; s=28:-200:100:2
labels: \text{adjustable: } \Delta H^\ddagger = h,\ \Delta S^\ddagger = s; \text{associative OA: } 24.8\ \mathrm{kJ\,mol^{-1}},\ -194\ \mathrm{J\,K^{-1}\,mol^{-1}}
caption: Eyring plots, $\ln(k/T)$ against $10^3\,\mathrm{K}/T$, from [[#eq-eyring]]. The slope is $-\Delta H^\ddagger/R$ and the intercept at $1/T = 0$ is $23.76 + \Delta S^\ddagger/R$. The adjustable line starts at the dissociative CO substitution of [[#ex-eyring]] ($h = 104\ \mathrm{kJ\,mol^{-1}}$, $s = +28\ \mathrm{J\,K^{-1}\,mol^{-1}}$); the fixed line is the $\mathrm{S_N2}$-type oxidative addition of the exercises ($24.8\ \mathrm{kJ\,mol^{-1}}$, $-194\ \mathrm{J\,K^{-1}\,mol^{-1}}$). The two reactions can have similar rates near room temperature while differing completely in mechanism: a steep line with a high intercept means bond breaking and freedom gained, a shallow line with a low intercept means bond making and order imposed. Only the temperature dependence separates them.
:::

Substitution at 18-electron complexes can also be *associative* when a ligand can change its electron count to make room. Linear nitrosyls bend (from three to one electron, [[organometallics-catalysis/organometallic-bonding]]); η⁵-cyclopentadienyl and especially η⁵-indenyl ligands slip to η³. The **indenyl effect** is dramatic: Mark Rerek and Fred Basolo found (1983–84) that $\mathrm{[Rh(\eta^5\text{-}C_9H_7)(CO)_2]}$ substitutes CO associatively about $10^{8}$ times faster than $\mathrm{[Rh(\eta^5\text{-}C_5H_5)(CO)_2]}$, because the ring slip to η³ restores the aromaticity of the benzo ring and keeps the transition state at 18 electrons.

## Oxidative addition and reductive elimination

::: definition Oxidative addition and reductive elimination {#def-oa-re}
In an **oxidative addition** (OA) a molecule A–B adds to a metal centre with cleavage of the A–B bond and formation of two new bonds M–A and M–B: $\mathrm{L_nM + A{-}B \rightarrow L_nM(A)(B)}$. The metal's oxidation state, electron count and coordination number each rise by two ([[#prop-step-counts]]), so OA requires a metal with a vacant site (or one it can create) and with two $d$ electrons to spare, in an oxidation state that can rise by two (Rh(I)→Rh(III), Pd(0)→Pd(II), Ir(I)→Ir(III)). **Reductive elimination** (RE) is the reverse: two cis X ligands couple, the A–B bond forms and leaves, and all three counts fall by two. Typical substrates for OA are $\mathrm{H_2}$, $\mathrm{C{-}X}$ (alkyl and aryl halides, triflates), Si–H, B–H, H–X, and — with sufficiently reactive metals — C–H and even C–C bonds.
:::

Oxidative additions follow three main mechanisms, which give different stereochemistry and respond differently to solvent and substituents.

1. **Concerted (three-centre).** Non-polar substrates — $\mathrm{H_2}$, C–H, Si–H, and aryl halides at Pd(0) — first bind side-on as a σ complex, then the metal back-donates into the A–B $\sigma^*$ orbital while the A–B bonding pair donates into an empty metal orbital; the A–B bond stretches and breaks as the two M–A and M–B bonds form *together*, through a triangular transition state. The two new ligands therefore end up **cis**. Vaska's complex adds $\mathrm{H_2}$ in this way to give a *cis*-dihydride, and the dihydrogen complexes of Kubas are snapshots of the first stage.
2. **$\mathrm{S_N2}$-type.** Polar substrates with a good leaving group, such as iodomethane and benzyl bromide, react with nucleophilic metals like an $\mathrm{S_N2}$ substitution at carbon: the filled metal $d_{z^2}$ orbital (a lone pair, in effect) attacks the carbon from the back, inverting its configuration; iodide departs as an anion, giving a cationic intermediate $\mathrm{[L_nM{-}CH_3]^+\,I^-}$; and iodide then binds to the metal, often *trans* to the methyl. The reaction is second order (first in each reactant), strongly accelerated by polar solvents, has a large negative $\Delta S^\ddagger$ (a highly ordered, charge-separated transition state), and goes with **inversion** at a chiral carbon.
3. **Radical.** Some alkyl halides react by halogen-atom abstraction or single-electron transfer, giving free alkyl radicals that recombine with the metal; such reactions racemise stereocentres and are inhibited by radical traps.

The thermodynamics depends on the bonds made and broken. For dihydrogen, OA is favourable when twice the M–H bond enthalpy exceeds the H–H bond enthalpy, $436\ \mathrm{kJ\,mol^{-1}}$. Because M–H and M–C bonds are stronger for 5d than for 3d metals and stronger for electron-rich, low-valent metals with good donor ligands, OA is favoured down a group (Ir > Rh > Co), by phosphines rather than carbonyls, and by reducing the positive charge on the metal.

::: example Is oxidative addition of $\mathrm{H_2}$ downhill? {#ex-oa-thermo}
Estimate $\Delta_\mathrm{r}H$ and $\Delta_\mathrm{r}G$ at $298\ \mathrm{K}$ for $\mathrm{L_nM + H_2(g) \rightarrow L_nMH_2}$ in solution if each M–H bond enthalpy is $250\ \mathrm{kJ\,mol^{-1}}$. Take $D(\mathrm{H{-}H}) = 436\ \mathrm{kJ\,mol^{-1}}$ and assume the entropy change is dominated by the loss of gaseous $\mathrm{H_2}$, $\Delta_\mathrm{r}S \approx -S^\circ_\mathrm{m}(\mathrm{H_2, g}) = -130.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (NIST standard molar entropy).
::: solution
$\Delta_\mathrm{r}H \approx D(\mathrm{H{-}H}) - 2D(\mathrm{M{-}H}) = 436 - 500 = -64\ \mathrm{kJ\,mol^{-1}}$, and
$$
\Delta_\mathrm{r}G \approx -64\ \mathrm{kJ\,mol^{-1}} - (298.15\ \mathrm{K})(-0.1307\ \mathrm{kJ\,K^{-1}\,mol^{-1}}) = -64 + 39 = -25\ \mathrm{kJ\,mol^{-1}}.
$$
The addition is downhill, but only modestly: with M–H bonds of $230\ \mathrm{kJ\,mol^{-1}}$ it would be thermoneutral in Gibbs energy. This is why OA of $\mathrm{H_2}$ is reversible for many catalysts (a requirement for turnover — a hydride too stable would never transfer its hydrogen) and why heating, which magnifies the $-T\Delta S$ term, drives $\mathrm{H_2}$ off.
:::
:::

**Reductive elimination** is the bond-forming step that releases products from almost every catalytic cycle. It requires the two groups to be *cis*, is favoured by high oxidation states and electron-poor metals (Pd(IV) > Pd(II); Pt(IV) eliminates readily), by bulky ligands that relieve their strain in the less crowded product, and by wide bite angles of chelating diphosphines that squeeze the two groups together. Its rate depends on the groups: C–H and H–H elimination are fast, C(aryl)–C(aryl) and C–N moderately fast at Pd(II), and C(sp³)–C(sp³) slow, because a directional $sp^3$ orbital must rotate away from the metal to overlap with its partner, whereas $sp^2$ carbon and hydrogen can bond to both atoms at once in the transition state. C–H elimination is so favourable that the reverse — **C–H activation**, OA of an alkane C–H bond — was observed only in 1982, by Robert Bergman's group with photogenerated $\mathrm{Cp^*Ir(PMe_3)}$ and by William Graham's with $\mathrm{Cp^*Ir(CO)}$.

::: warning Microscopic reversibility and "the same mechanism backwards" {#warn-reversibility}
Because oxidative addition and reductive elimination are each other's reverse, everything learned about one applies to the other *on the same path*: the transition state is the same, so a concerted OA that gives cis products corresponds to a concerted RE that needs cis reactants. It is a mistake, though, to assume that a complex that undergoes OA by an $\mathrm{S_N2}$ route will undergo RE by the reverse of that route, or that OA and RE observed in different complexes are related. Microscopic reversibility connects forward and reverse steps of the same reaction under the same conditions; it says nothing about which path a different complex will choose. In catalytic cycles, OA and RE usually happen at different stages with different ligands — the RE in a cross-coupling is not the reverse of its OA.
:::

## Migratory insertion and its reverse

::: definition Migratory insertion {#def-insertion}
In a **migratory insertion**, an unsaturated ligand that is cis to an X ligand (H, alkyl, aryl) is inserted into the M–X bond. In a **1,1-insertion** both new bonds are made to the same atom of the unsaturated ligand: CO and isocyanides insert this way, $\mathrm{M(R)(CO) \rightarrow M{-}C(O)R}$. In a **1,2-insertion** the X group ends up on one atom and the metal on the next: alkenes and alkynes insert this way, $\mathrm{M(H)(CH_2{=}CH_2) \rightarrow M{-}CH_2CH_3}$. The groups must be **cis**, the step is **intramolecular**, the metal's oxidation state is unchanged, and a vacant site is created ([[#prop-step-counts]]). In a 1,2-insertion the metal and the migrating group add to the same face of the alkene (**syn** addition), through a four-centre transition state $\mathrm{M{\cdots}C{\cdots}C{\cdots}X}$.
:::

The name "migratory" records a mechanistic fact established by isotopic labelling: in most cases it is the alkyl group that *migrates* onto the carbonyl carbon, rather than the carbonyl moving into the M–C bond. The classic proof was given by Keith Noack and Fausto Calderazzo in 1967 for $\mathrm{[Mn(CH_3)(CO)_5]}$, and it is a beautiful piece of reasoning.

::: example Who migrates? The labelling experiment {#ex-noack}
The acyl complex *cis*-$\mathrm{[Mn\{C(O)CH_3\}(CO)_4(^{13}CO)]}$, with the $^{13}\mathrm{CO}$ label cis to the acetyl group, is decarbonylated (the reverse of insertion) to $\mathrm{[Mn(CH_3)(CO)_5]}$. Predict the distribution of the label in the product (a) if the reverse reaction is methyl migration (the methyl moves from the acyl carbon to a vacant site, leaving the acyl CO in place) and (b) if it is CO migration (the acyl CO moves into a vacant site and the methyl stays where the acyl was). Assume the vacancy is created by loss of any one of the four CO ligands cis to the acyl, with equal probability.
::: solution
Place the acyl group on the $+z$ axis. The four cis carbonyls lie on $\pm x$ and $\pm y$; the label is at $+x$; the trans carbonyl is at $-z$.

**Step 1 (both mechanisms):** one cis CO dissociates; each of the four is lost with probability $\tfrac14$. If the labelled CO at $+x$ is lost (probability $\tfrac14$), the product is **unlabelled** whatever happens next.

**(a) Methyl migration (reverse):** the methyl moves from the acyl carbon into the vacant site, leaving its CO at $+z$.
- vacancy at $-x$ (probability $\tfrac14$): methyl at $-x$, label at $+x$ — label ***trans*** to methyl;
- vacancy at $+y$ or $-y$ (probability $\tfrac12$): methyl at $\pm y$, label at $+x$ — label ***cis*** to methyl.

Distribution: $25\,\%$ unlabelled, $50\,\%$ *cis*, $25\,\%$ *trans* — a cis : trans ratio of **2 : 1**.

**(b) CO migration (reverse):** the acyl CO moves to the vacant site, and the methyl stays at $+z$. The label at $+x$ is then always cis to $+z$: $25\,\%$ unlabelled, $75\,\%$ *cis*, **no *trans***.

Noack and Calderazzo found the *trans*-labelled product, with cis : trans ≈ 2 : 1, as predicted by (a). By microscopic reversibility the forward insertion is also methyl migration. Infrared spectroscopy distinguished the isomers: the $^{13}\mathrm{CO}$ bands of *cis*- and *trans*-$\mathrm{[Mn(CH_3)(CO)_4(^{13}CO)]}$ lie at different wavenumbers ([[organometallics-catalysis/ligands-complexes#ex-isotope]]).
:::
:::

Migratory insertion of CO is promoted by Lewis acids that bind the acyl oxygen, by bulky ligands, and by one-electron oxidation of the metal, which makes the carbonyl carbon more electrophilic and the M–C bond more labile. Alkene insertion into M–H is usually fast and reversible; alkene insertion into M–C is the chain-growth step of polymerisation ([[organometallics-catalysis/metathesis-polymerisation]]). The reverse of 1,2-insertion into M–H is the most important decomposition reaction of transition-metal alkyls.

## β-Hydride elimination and other eliminations

::: definition β-Hydride elimination {#def-beta-h}
In **β-hydride elimination**, a hydrogen on the carbon β to the metal (two bonds away) is transferred to the metal, and the alkyl becomes a coordinated alkene: $\mathrm{L_nM{-}CH_2CH_2R \rightarrow L_nM(H)(CH_2{=}CHR)}$. It is the reverse of 1,2-insertion of an alkene into M–H. It requires (i) a **β-hydrogen**, (ii) a **vacant site cis** to the alkyl (the metal must be able to accept an extra ligand: 16 electrons or fewer, so ΔVE = +2 is possible), and (iii) a conformation in which the M–C–C–H unit is **syn-coplanar**, so that the β C–H bond can approach the metal. The step is syn: the metal and the hydrogen leave from the same face of the forming alkene.
:::

The conditions explain the "stability" puzzle of [[organometallics-catalysis/organometallic-bonding]]. Alkyls lacking β-H (methyl, neopentyl, benzyl, $\mathrm{CH_2SiMe_3}$) cannot eliminate; 18-electron alkyls with no easily lost ligand cannot provide the vacant site; metallacycles such as platinacyclopentanes cannot reach syn-coplanarity, and decompose about $10^4$ times more slowly than their open-chain analogues (as George Whitesides's group showed in the 1970s); and β-hydrogens on bridgehead carbons (norbornyl) would make a bridgehead alkene, which is too strained.

β-Hydride elimination is not always a nuisance. It is the product-forming step of the Heck reaction ([[organometallics-catalysis/cross-coupling]]) and the chain-transfer step that controls the molar mass of polyethylene. Combined with re-insertion, it lets a metal hydride "walk" along a chain, isomerising alkenes: 1-hexene is converted to an equilibrium mixture of internal hexenes by many hydride catalysts. Related eliminations remove an **α**-hydrogen (giving an alkylidene from an alkyl, common for high-valent early metals and the route to Schrock carbenes) or a β-alkyl or β-alkoxy group.

::: example Predicting a β-hydride elimination product {#ex-beta-h}
A palladium(II) alkyl formed by syn addition of $\mathrm{Pd{-}Ph}$ across (*E*)-1-phenylpropene is $\mathrm{L_nPd{-}CH(CH_3){-}CHPh_2}$, with a vacant cis site. Which β-hydrogens are available, and which alkene is formed?
::: solution
The carbon bound to Pd (Cα) carries a methyl group and a $\mathrm{CHPh_2}$ group. β-Hydrogens are on the methyl carbon (three of them) and on the $\mathrm{CHPh_2}$ carbon (one). Elimination from the methyl gives the terminal alkene $\mathrm{CH_2{=}CH{-}CHPh_2}$ (3,3-diphenylpropene); elimination from $\mathrm{CHPh_2}$ gives the conjugated, trisubstituted alkene $\mathrm{CH_3CH{=}CPh_2}$ (1,1-diphenylpropene). The benzylic C–H must rotate to be syn-coplanar with Pd–C, and the product is conjugated with two phenyl rings; the conjugated alkene is usually the major product, but because β-hydride elimination is reversible, mixtures and isomerisation are common. In the Heck reaction the stereochemistry follows from syn insertion followed by syn elimination, which usually delivers the (*E*)-alkene when there is a choice.
:::
:::

## σ-Bond metathesis

For a $d^0$ metal — Sc(III), Ti(IV), Zr(IV), the lanthanides, Ta(V) — oxidative addition is impossible, yet such complexes cleave H–H and even C–H bonds rapidly. They do so by **σ-bond metathesis**: a four-centre transition state $[\mathrm{M{\cdots}R{\cdots}H{\cdots}R'}]$ in which the M–R and H–R′ bonds break while M–R′ and R–H form, all in one step, with no change in oxidation state. In 1983 Patricia Watson showed that $\mathrm{[Cp^*_2Lu(CH_3)]}$ exchanges its methyl group with $^{13}\mathrm{CH_4}$ in solution, a reaction of methane under mild conditions without any change in oxidation state. σ-Bond metathesis is the chain-transfer step by which hydrogen controls molar mass in metallocene polymerisation, $\mathrm{M{-}polymer + H_2 \rightarrow M{-}H + H{-}polymer}$.

::: quiz
A chiral secondary alkyl bromide (*R* configuration at carbon) reacts with an electron-rich, nucleophilic Pd(0) complex in a polar solvent; the alkylpalladium(II) product has the *S* configuration at carbon (the priority order is unchanged). The rate is first order in each reactant and is not affected by radical traps. Which mechanism of oxidative addition is most consistent?
- [x] $\mathrm{S_N2}$-type, with backside attack of the metal at carbon
- [ ] concerted three-centre addition
- [ ] radical chain via halogen-atom abstraction
- [ ] σ-bond metathesis
::: solution
Inversion of configuration, second-order kinetics, a polar solvent and insensitivity to radical traps are the fingerprints of $\mathrm{S_N2}$ oxidative addition. A concerted three-centre addition would retain the configuration at carbon; a radical mechanism would racemise it and be inhibited by traps; σ-bond metathesis does not change the oxidation state and is not available to an electron-rich Pd(0).
:::
:::

## Attack on coordinated ligands

A final class of steps involves no change at the metal at all except in what it holds: external nucleophiles or electrophiles attack a coordinated ligand. Nucleophiles attack alkenes bound to electron-poor Pd(II) on the face *opposite* the metal (**anti** addition, outer sphere) — the key step of the Wacker process — whereas migratory insertion delivers a group from the metal side (**syn**, inner sphere). Coordinated arenes in $\mathrm{Cr(CO)_3}$ complexes, dienes in $\mathrm{Fe(CO)_3}$ cations and η³-allyls on palladium (the Tsuji–Trost reaction) are attacked by soft nucleophiles in the same outer-sphere way. Stereochemistry is the tool that distinguishes the two modes, and it matters: a catalytic cycle's stereochemical outcome depends on which steps are syn and which anti.

## Where this leads

The next three chapters build catalytic cycles from these steps. [[organometallics-catalysis/hydrogenation-hydroformylation]] combines ligand dissociation, OA of $\mathrm{H_2}$, alkene insertion and RE (hydrogenation) and adds CO insertion (hydroformylation). [[organometallics-catalysis/cross-coupling]] combines OA of an aryl halide, transmetallation — a substitution in which an organic group moves from a main-group metal ([[organometallics-catalysis/main-group-organometallics]]) to palladium — and RE; the Heck reaction replaces transmetallation by insertion and β-H elimination. [[organometallics-catalysis/metathesis-polymerisation]] uses [2+2] cycloadditions of metal alkylidenes and repeated insertion with β-H elimination as chain transfer. The kinetic analysis used here is the steady-state method of [[kinetics/reaction-mechanisms]].

::: history
Lauri Vaska's discovery in 1962 (with John DiLuzio) that $\mathrm{[IrCl(CO)(PPh_3)_2]}$ reversibly adds $\mathrm{O_2}$, $\mathrm{H_2}$ and HCl gave chemists the first clear examples of what was soon called oxidative addition; Jack Halpern and Jim Collman systematised the concept in the 1960s. Calderazzo and Cotton studied CO insertion in $\mathrm{[Mn(CH_3)(CO)_5]}$ in 1962, and Noack and Calderazzo's $^{13}\mathrm{CO}$ labelling experiment of 1967 established methyl migration. George Whitesides's work on platinacycles in the 1970s clarified the geometric requirements of β-hydride elimination. In 1982 Andrew Janowicz and Robert Bergman, and independently James Hoyano and William Graham, reported the oxidative addition of alkane C–H bonds to iridium, and in 1983 Patricia Watson described σ-bond metathesis of methane at lutetium. Mark Rerek and Fred Basolo quantified the indenyl effect in 1983–84.
:::

::: summary
- Five elementary steps — substitution, oxidative addition (OA), reductive elimination (RE), migratory insertion and β-hydride elimination — plus σ-bond metathesis for $d^0$ metals build nearly every organometallic mechanism.
- The counting formulas predict each step's effect: OA and RE change VE, OS and CN by ±2; insertion lowers VE and CN by 2 and creates a vacant site; σ-bond metathesis changes nothing.
- 18-electron complexes substitute dissociatively ($k_\text{obs}$ zero order in incoming ligand, retarded by free leaving ligand, $\Delta S^\ddagger > 0$); 16-electron complexes associatively ($\Delta S^\ddagger < 0$); ring slip (indenyl effect) allows associative paths at 18 electrons.
- OA is concerted (cis, retention) for $\mathrm{H_2}$, C–H and aryl halides, $\mathrm{S_N2}$-like (inversion, polar, $\Delta S^\ddagger \ll 0$) for alkyl halides, or radical; it needs a metal able to rise by two oxidation states.
- RE requires cis groups and is favoured by high oxidation states, bulk and wide bite angles; C–H and H–H eliminate fastest, $sp^3$–$sp^3$ C–C slowest.
- Migratory insertion is cis and intramolecular; labelling (Noack–Calderazzo, cis : trans 2 : 1) shows the alkyl migrates. β-Hydride elimination needs a β-H, a cis vacant site and syn-coplanarity.
- Outer-sphere attack on coordinated ligands is anti; inner-sphere insertion is syn.
:::

## Exercises

::: exercise Oxidation state after oxidative addition {level=1 check="3"}
What is the oxidation state of iridium in the product of oxidative addition of $\mathrm{H_2}$ to Vaska's complex, $\mathrm{[IrCl(CO)(PPh_3)_2]}$? (Enter the oxidation state.)
::: solution
Ir(I) in Vaska's complex; OA adds two X ligands (two hydrides), raising the oxidation state by two: **Ir(III)**, in $\mathrm{[IrH_2Cl(CO)(PPh_3)_2]}$ with the hydrides cis. VE rises from 16 to 18.
:::
:::

::: exercise After a migratory insertion {level=1 check="16"}
$\mathrm{[Mn(CH_3)(CO)_5]}$ undergoes migratory insertion of CO. What is the valence electron count of the acyl complex immediately afterwards, before any new ligand binds? (Enter the count.)
::: solution
Initially $7 + 10 + 1 = 18$. Insertion merges an L (CO) and an X ($\mathrm{CH_3}$) into one X (acyl): $\mathrm{[Mn\{C(O)CH_3\}(CO)_4]}$ has $7 + 8 + 1 = 16$ electrons, with a vacant site that an incoming CO or phosphine fills.
:::
:::

::: exercise Labelling statistics {level=1 check="0.5"}
In the Noack–Calderazzo experiment ([[#ex-noack]]), what fraction of the $\mathrm{[Mn(CH_3)(CO)_5]}$ product carries the $^{13}\mathrm{CO}$ label cis to the methyl group if the mechanism is methyl migration? (Enter the fraction.)
::: solution
Of the four equally likely vacancies, two (at $\pm y$) put the methyl cis to the label at $+x$: fraction $\tfrac12 = 0.5$. One gives *trans* ($0.25$) and one loses the label ($0.25$).
:::
:::

::: exercise Retardation by free ligand {level=2 check="0.0002"}
A dissociative substitution has $k_1 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$ and $k_{-1}/k_2 = 2.0$. Find $k_\text{obs}$ when $[\mathrm{L'}] = 0.20\ \mathrm{mol\,dm^{-3}}$ and $[\mathrm{L''}] = 0.10\ \mathrm{mol\,dm^{-3}}$. (Enter $k_\text{obs}$ in $\mathrm{s^{-1}}$.)
::: solution
$k_\text{obs} = k_1/\big(1 + (k_{-1}/k_2)[\mathrm{L'}]/[\mathrm{L''}]\big) = 1.0\times10^{-3}/(1 + 2.0 \times 2.0) = 1.0\times10^{-3}/5.0 = 2.0\times10^{-4}\ \mathrm{s^{-1}}$.
:::
:::

::: exercise An associative activation enthalpy {level=2 check="24.8"}
The second-order rate constant for oxidative addition of an alkyl halide to a Rh(I) complex is $2.0\times10^{-2}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ at $298.15\ \mathrm{K}$ and $4.0\times10^{-2}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ at $318.15\ \mathrm{K}$. Calculate $\Delta H^\ddagger$, then $\Delta S^\ddagger$ (standard state $1\ \mathrm{mol\,dm^{-3}}$), and say which mechanism the values suggest. (Enter $\Delta H^\ddagger$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta H^\ddagger = R\ln\big[(k_2/T_2)/(k_1/T_1)\big]/(1/T_1 - 1/T_2) = 8.314 \times \ln(2 \times 298.15/318.15)/(2.1082\times10^{-4}) = 8.314 \times 0.6283/2.1082\times10^{-4} = 24.8\ \mathrm{kJ\,mol^{-1}}$. Then $\Delta S^\ddagger = 8.314\,[\ln(0.020/298.15) - 23.760] + 24\,770/298.15 = 8.314\,(-9.610 - 23.760) + 83.1 = -194\ \mathrm{J\,K^{-1}\,mol^{-1}}$. A small enthalpy and a very negative entropy of activation indicate a highly ordered, polar, bimolecular transition state: the $\mathrm{S_N2}$-type oxidative addition.
:::
:::

::: exercise Which alkyls survive? {level=2}
Rank the following by expected thermal stability towards β-hydride elimination, and explain: (a) $\mathrm{[Ti(CH_2CH_3)_4]}$; (b) $\mathrm{[Ti(CH_2CMe_3)_4]}$; (c) *cis*-$\mathrm{[Pt(CH_2CH_2CH_2CH_3)_2(PPh_3)_2]}$; (d) the platinacyclopentane $\mathrm{[Pt\{(CH_2)_4\}(PPh_3)_2]}$.
::: solution
(b) is the most robust: neopentyl has no β-hydrogen (the β-carbon is quaternary), so β-H elimination is impossible, and the bulky groups also protect titanium. (d) is next: it has β-hydrogens, but in the five-membered ring the Pt–C–C–H unit cannot become syn-coplanar, so elimination is strongly retarded. (c) decomposes more readily: the open-chain butyl groups can rotate into a syn-coplanar arrangement, and a phosphine can dissociate to provide the cis vacant site (the reaction is retarded by added $\mathrm{PPh_3}$). (a) is the least stable: Ti(IV) is an 8-electron, $d^0$ centre with vacant sites in abundance and ethyl groups with β-hydrogens; it cannot be isolated at room temperature.
:::
:::

::: exercise Deriving the associative rate law {level=3}
Square-planar substitution often follows the two-term law $k_\text{obs} = k_\mathrm{s} + k_\mathrm{Y}[\mathrm{Y}]$ ([[coordination-chemistry/inorganic-mechanisms]]). For a 16-electron complex $\mathrm{ML_3X}$ reacting with Y through a five-coordinate intermediate, $\mathrm{ML_3X + Y} \underset{k_{-a}}{\overset{k_a}{\rightleftharpoons}} \mathrm{ML_3XY} \xrightarrow{k_b} \mathrm{ML_3Y + X}$, derive $k_\text{obs}$ under the steady-state approximation and show that it reduces to $k_\mathrm{Y}[\mathrm{Y}]$ at low $[\mathrm{Y}]$. What does the $k_\mathrm{s}$ term correspond to, and why does it not violate the 16/18 rule?
::: hint
Treat $\mathrm{ML_3XY}$ as the steady-state intermediate. The solvent is itself a potential ligand.
:::
::: solution
Steady state: $k_a[\mathrm{ML_3X}][\mathrm{Y}] = (k_{-a} + k_b)[\mathrm{ML_3XY}]$, so the rate $k_b[\mathrm{ML_3XY}] = \dfrac{k_ak_b[\mathrm{Y}]}{k_{-a} + k_b}[\mathrm{ML_3X}]$, i.e.
$$
k_\text{obs} = \frac{k_ak_b}{k_{-a}+k_b}[\mathrm{Y}] \equiv k_\mathrm{Y}[\mathrm{Y}],
$$
first order in Y (saturation would set in only if the intermediate accumulated, which the steady state excludes; with a pre-equilibrium of appreciable $K$ one obtains $k_\text{obs} = k_bK[\mathrm{Y}]/(1 + K[\mathrm{Y}])$, which tends to $k_\mathrm{Y}[\mathrm{Y}]$ at low $[\mathrm{Y}]$). The $k_\mathrm{s}$ term is the same associative path with a **solvent molecule** as the entering ligand: solvent attacks (via an 18-electron five-coordinate intermediate), X leaves, and the solvento complex is then rapidly substituted by Y. Since the solvent concentration is constant, the term appears independent of $[\mathrm{Y}]$, but it is associative, not dissociative: no 14-electron intermediate is involved, and every intermediate has 16 or 18 electrons, as Tolman's rule requires.
:::
:::

::: exercise Alkene isomerisation by hydride walking {level=3}
A rhodium hydride catalyst, $\mathrm{L_nRh{-}H}$, isomerises hex-1-ene into a mixture of (*E*)- and (*Z*)-hex-2-ene and hex-3-ene. When the reaction is carried out with $\mathrm{L_nRh{-}D}$, deuterium appears at C1, C2 and C3 of recovered hexenes. Propose a mechanism, describing each step in words with the change in electron count, and explain the deuterium distribution.
::: hint
Think of a 1,2-insertion followed by β-hydride elimination in the other direction, repeated.
:::
::: solution
**Step 1 (coordination):** hex-1-ene binds to a vacant site of the 16-electron hydride (VE 16 → 18). **Step 2 (1,2-insertion):** the alkene inserts into Rh–D with Rh going to C1 and D to C2 (the anti-Markovnikov sense, favoured sterically), giving a primary alkyl $\mathrm{Rh{-}CH_2CHD{-}C_4H_9}$ (VE 18 → 16); insertion in the other sense, D to C1 and Rh to C2, gives a secondary alkyl $\mathrm{Rh{-}CH(CH_2D){-}C_4H_9}$. **Step 3 (β-hydride elimination):** from the secondary alkyl, the metal can remove a hydrogen from C3 (rather than from C1, which would simply return hex-1-ene), forming coordinated hex-2-ene and $\mathrm{Rh{-}H}$ (VE 16 → 18). **Step 4 (dissociation):** hex-2-ene is released, or it re-inserts the other way (Rh to C3, H to C2) and eliminates the C4 hydrogen to give hex-3-ene. Each cycle of insertion and elimination moves the double bond one carbon along the chain ("chain walking"), and every insertion–elimination with a different hydrogen scrambles H and D: deuterium is delivered first to C2 (or C1), and after re-insertion and elimination of an H the deuterium is left in the chain while the metal carries away a protium. Recovered hex-1-ene can thus carry D at C1 or C2, and the internal alkenes at C1, C2 and C3. The thermodynamic driving force is the greater stability of internal, more substituted alkenes, and the (*E*) isomers predominate at equilibrium. All steps keep the metal at 16 or 18 electrons and in the same oxidation state.
:::
:::
