Put an oxygen, nitrogen, or sulfur into a ring and the ring's whole personality changes: benzene's even-tempered electron richness becomes pyrrole's eager nucleophilicity or pyridine's cool deficiency; an inert hydrocarbon becomes, in the hands of biology, the catalytic machinery of enzymes and, in the hands of industry, most of the pharmaceutical pipeline — a large majority of small-molecule drugs contain at least one heterocycle, and the four bases of DNA are all of them. This chapter is a guided tour of the ring families: how they are named, how aromaticity redistributes their electrons, and how those electrons decide where reactions happen.

## Naming the rings: a small vocabulary that covers a lot

::: definition The heterocycle name-set {#def-heterocycle-naming}
Three-digit vocabulary. **Saturated three- to four-membered**: epoxides (oxiranes), aziridines, thiiranes; oxetanes, azetidines — strained, reactive rings. **Saturated six-membered**: piperidine ($\mathrm{C_5H_{11}N}$), morpholine ($\mathrm{C_4H_9NO}$, oxygen opposite $\mathrm{NH}$), thiane. **Aromatic five-membered, one heteroatom**: pyrrole, furan, thiophene. **Aromatic six-membered, one nitrogen**: pyridine; two nitrogens: pyrimidine, pyridazine, pyrazine. **Fused**: indole (benzene + pyrrole), quinoline (benzene + pyridine), benzofuran. Numbering starts at the principal heteroatom (conventionally $\mathrm{O} > \mathrm{S} > \mathrm{N}$ when several differ) and gives the lowest locants; positions are Greek letters in the five-membered aromatics ($\alpha$ = 2, $\beta$ = 3). The names are old, irregular, and worth memorising — every one of them is a functional group in the literature you are about to read.
:::

## Five-membered aromatics: the heteroatom pays two electrons

::: proposition Pyrrole-type rings are π-excessive and love substitution {#prop-five-mem}
Pyrrole, furan, and thiophene each contribute the heteroatom's lone pair to complete a $6\pi$ sextet — the aromaticity order is thiophene ($\sim 120\ \mathrm{kJ\,mol^{-1}}$ resonance energy) $>$ pyrrole ($\sim 90$) $>$ furan ($\sim 70$), tracking sulfur's surprising willingness to donate its $3p$ pair and oxygen's reluctance to give up the pair it needs for its own electronegativity. Consequences: these rings are **π-excessive** — richer in $\pi$ electron density than benzene — so they undergo electrophilic aromatic substitution *easily*, far below benzene's conditions, and overwhelmingly at **C2** ($\alpha$), because the C2-attack arenium intermediate has three resonance contributors against C3's two. Pyrrole is so reactive that it nitrates with acetyl nitrate at $-10\ \mathrm{^\circ C}$, is formylated by Vilsmeier's reagent, and polymerises in strong acid; furan, the least aromatic, behaves half the time like a cyclic diene (it undergoes the Diels–Alder reaction and opens in acid); thiophene is the benzene of the trio — it survives Friedel–Crafts conditions and needs real nitration reagent. The N–H of pyrrole is weakly acidic ($\mathrm{p}K_\mathrm{a} \approx 17$–$23$ depending on scale) and its nitrogen is essentially non-basic, because the lone pair is the sextet (the aromaticity chapter's point, now load-bearing).
:::

::: example Pyrrole nitrates where benzene would not {#ex-pyrrole-nitration}
Predict the product of pyrrole with acetyl nitrate (from $\mathrm{HNO_3}$/acetic anhydride) at $-10\ \mathrm{^\circ C}$, and explain the absence of any C3 product and of any need for acid catalysis.
::: solution
2-Nitropyrrole. No catalysis is needed because pyrrole's $\pi$ density exceeds benzene's — the ring attacks the mild electrophile $\mathrm{NO_2^+}$-equivalent directly, at rates that make benzene look inert (relative rates for nitration run $10^3$–$10^5$ faster than benzene for pyrrole-type rings). C2 wins because the $\sigma$-complex for C2 attack delocalises the positive charge over three positions including nitrogen, while C3 attack has one fewer stabilised contributor; the difference is large enough that C3 products are traces. Strong acid is avoided because protonation — of the ring or of the product — destroys the sextet and the cationic rings polymerise on each other; mild electrophiles, mild conditions, is the pyrrole way.
:::
:::

::: example Furan, the diene that wants to be one {#ex-furan-diene}
Furan reacts with maleic anhydride at room temperature to give a bridged bicyclic adduct, and with HCl it opens to 1,4-dicarbonyl derivatives. Explain both from one number.
::: solution
Furan's resonance energy, $\sim 70\ \mathrm{kJ\,mol^{-1}}$, is the lowest of the trio — losing aromaticity costs it least. The Diels–Alder reaction with maleic anhydride sacrifices furan's aromaticity to make two $\sigma$ bonds and a bridged adduct (the anhydride is the dienophile; the adduct is the kinetic product, and the reaction is famously reversible on heating); with HCl, protonation at C2 gives an oxocarbenium-stabilised cation that water opens to a 1,4-dicarbonyl equivalent (after tautomerism, succinaldehyde-type products). One number — the smallest sextet bonus — predicts both: furan is an aromatic that is always one step away from being a butadiene. Thiophene, at $120\ \mathrm{kJ\,mol^{-1}}$, does neither; hydrodesulfurisation of thiophene-laden fuels is a chemistry of sulfur's affinity for metals, not of ring opening.
:::
:::

## Pyridine: benzene with a withheld nitrogen

::: proposition Pyridine is π-deficient: bad at S_EAr, proud at S_NAr {#prop-pyridine}
Pyridine's nitrogen keeps its lone pair in an in-plane $sp^2$ orbital (available, basic, $\mathrm{p}K_\mathrm{a}$ 5.2) and contributes one electron to the sextet — but its electronegativity *withdraws* $\pi$ density from the ring, making pyridine **π-deficient**, like nitrobenzene. Electrophilic substitution therefore needs brutal conditions and lands at C3 (the 3-position; "meta-like": the arenium ion for C2/C4 attack puts positive charge on nitrogen). Nucleophilic aromatic substitution, by contrast, is easy at C2 and C4, where the Meisenheimer anion puts its charge on nitrogen — the ring's own atom. The **Chichibabin reaction** ($\mathrm{NaNH_2}$, heat) aminates pyridine at C2 by addition–elimination with hydride as the leaving group; 2- and 4-halopyridines are reactive as acid chlorides towards amines and alkoxides; and the **N-oxide** turns the withdrawal around — $\mathrm{O^-}$ donates into the ring, so pyridine $N$-oxide nitrates at C4 under ordinary conditions, and the 4-substituted pyridines (the drug-like ones: the "4-pyridyl" motif) are reached by that detour. N-alkylation gives pyridinium salts, whose ring is even hungrier (and whose nicotinamide version, $\mathrm{NAD^+}$, is biology's electron-accepting workhorse).
:::

::: example Chichibabin's hydride exit {#ex-chichibabin}
Pyridine with $\mathrm{NaNH_2}$ in toluene at $100\ \mathrm{^\circ C}$, then water, gives 2-aminopyridine with evolution of hydrogen gas. Give the mechanism and say what makes the hydride departure possible.
::: solution
Amide adds to C2 (the position whose anionic intermediate puts charge on nitrogen), giving a dihydropyridide anion stabilised as an amidine-type amide; this anion expels $\mathrm{H^-}$ from C2 — normally unthinkable, but the product is the aromatic 2-aminopyridine, and rearomatising is the driving force that makes hydride a leaving group; the hydride (or the anion's proton transfer to ammonia) releases $\mathrm{H_2}$, which is why the reaction bubbles. The pattern is the aromatic-substitution chapter's $\mathrm{S_NAr}$ logic with a twist: the leaving group is hydride, and the thermodynamic payment is aromaticity restored. C4 gives the same logic (4-aminopyridine with stronger base, higher temperature); C3 is unreachable this way — the intermediate cannot put charge on nitrogen.
:::
:::

::: example The N-oxide detour {#ex-n-oxide}
Give syntheses of (a) 4-nitropyridine and (b) 2-chloropyridine from pyridine, using N-oxide chemistry where needed.
::: solution
(a) Pyridine + $\mathrm{H_2O_2}$/AcOH → pyridine $N$-oxide; nitrate ($\mathrm{HNO_3/H_2SO_4}$) → 4-nitropyridine $N$-oxide (the $\mathrm{O^-}$ end of the ylide donates to C4 — vinylogous amide behaviour); deoxygenate ($\mathrm{PCl_3}$ or $\mathrm{H_2/Pd}$) → 4-nitropyridine. Direct nitration of pyridine would need $300\ \mathrm{^\circ C}$ and give C3. (b) Pyridine + $\mathrm{POCl_3}$ (or $\mathrm{SOCl_2}$) → 2-chloropyridine (via the activated $N$-chloro/oxonium species and chloride attack at C2 — the same C2 electrophilicity that makes 2-halopyridines such good $\mathrm{S_NAr}$ substrates is installed here). The N-oxide is pyridine's protecting-and-reprogramming group: it tames the ring for electrophiles and points them at C4.
:::
:::

## Azoles, indole, and the biology layer

::: definition Azoles: two nitrogens, two personalities {#def-azole}
Five-membered rings with two or more heteroatoms: **imidazole** (1,3-diazole: one pyrrole-type $\mathrm{N{-}H}$ and one pyridine-type $\mathrm{N}$), pyrazole (1,2-), oxazole, thiazole, triazoles, tetrazole. Imidazole is amphoteric — it can donate or accept a proton on the two nitrogens — and its conjugate acid sits at $\mathrm{p}K_\mathrm{a}$ 7.0, within a whisker of physiological pH, so imidazole (in histidine's side chain) is the proton shuttle of enzyme catalysis: general acid–base catalysis at neutral pH is its job description. Deprotonated imidazole is an excellent nucleophile and ligand (the $N$-heterocyclic carbenes of organometallic chemistry descend from it), and the copper-catalysed azide–alkyne cycloaddition to a 1,2,3-triazole is the prototype click reaction, one part of the 2022 Nobel Prize in Chemistry (Sharpless, Meldal and Bertozzi; the third share is bioorthogonal chemistry, not heterocycle synthesis in general). **Indole** is benzene fused to pyrrole at the 2,3-bond: π-excessive like pyrrole, substituting at C3 (the intermediate retains the benzenoid ring), under mild conditions — tryptophan, serotonin, and the ergot alkaloids are 3-substituted indoles, and the indole $\mathrm{N{-}H}$ is non-basic for the sextet reason.
:::

::: example Imidazole at physiological pH {#ex-imidazole}
Histidine's imidazole side chain has conjugate-acid $\mathrm{p}K_\mathrm{a}$ 7.0 (raised slightly in enzyme pockets). What fraction is protonated at $\mathrm{pH}\ 7.4$, and why is exactly this number the reason histidine is conserved in active sites?
::: solution
$[\mathrm{BH^+}]/[\mathrm{B}] = 10^{7.0-7.4} = 0.40$, so $0.40/1.40 = 29\ \%$ protonated — a 71:29 mixture, the most *uncommitted* protonation state possible. A group that is half-protonated at working pH can act as acid or base with equal ease, and small environmental shifts (a substrate arriving, a pocket charge) swing the ratio either way: histidine is the only amino acid built to be an ambivalent proton donor/acceptor at pH 7, and the widget below iterates the same equation. Cysteine and lysine are locked basic at pH 7, aspartate locked acidic; only imidazole sits on the fence, and enzymes staff their active sites with fence-sitters.
:::
:::

::: widget newton
f: x/(1-x) - 0.40
x0: 0.1
x: 0, 1
caption: Newton iteration for the imidazole protonation fraction at $\mathrm{pH}\ 7.4$ with $\mathrm{p}K_\mathrm{a}$ 7.0: the function $x/(1-x) - 0.40$ encodes $[\mathrm{BH^+}]/[\mathrm{B}] = 10^{\mathrm{p}K_\mathrm{a}-\mathrm{pH}} = 0.40$, and the root $x = 0.286$ is the protonated fraction. Starting from $x_0 = 0.1$, the first step lands at $0.334$ and the second at $0.289$ — the ratio form curves upward, so Newton needs two or three visits, unlike the gentler equilibria of the earlier chapters' widgets.
:::

::: warning Aromatic is not the same as inert {#warn-heterocycle}
Three failure modes to design around. **(1)** Pyrroles and furans in strong acid: protonation destroys the sextet, and the cationic rings oligomerise — "it's aromatic, it'll survive acid" is false for π-excessive rings. **(2)** Pyridine under Friedel–Crafts or with electrophiles at high temperature: it is the nitrogen's lone pair that gets alkylated or acylated first, and the resulting pyridinium ring resists electrophilic attack even harder — always ask whether the reagent meets the ring or the nitrogen. **(3)** Epoxides and aziridines are not aromatic at all: three-membered rings with heteroatoms are strained electrophiles, opened by nucleophiles under $\mathrm{S_N2}$ rules (base: attack at the less hindered carbon; acid: at the more substituted, cation-stabilising one) — the alcohols-ethers chemistry of [[organic-1/alcohols-ethers]], wearing a heterocycle costume.
:::

::: quiz
Which ring undergoes electrophilic bromination under the mildest conditions?
- [x] pyrrole
- [ ] benzene
- [ ] pyridine
- [ ] pyridine hydrochloride
::: solution
Pyrrole: π-excessive, it reacts with mild electrophiles at C2 far below benzene's conditions. Pyridine and its salt are π-deficient (the salt more so — a positively charged ring repels electrophiles) and need drastic conditions for C3 substitution; benzene sits in between with its standard recipe.
:::
:::

::: history
The heterocycle that won a century: in 2001–02, K. Barry **Sharpless** and colleagues (with Morten **Meldal**'s independent copper discovery) attached azides and terminal alkynes through copper to give 1,2,3-triazoles quantitatively, in water, at room temperature, immune to oxygen and to almost every functional group — "click chemistry". The triazole, previously a minor heterocycle, became the staple linker of chemical biology, drug discovery, and materials science, because the reaction's reliability moved heterocycle synthesis from flasks to robots; Sharpless and Meldal shared the 2022 Nobel Prize with Carolyn **Bertozzi**, whose bioorthogonal chemistry was click's living-systems sibling. A ring whose resonance energy is a footnote became, in one paper, the most-made heterocycle on earth.
:::

## Where this leads

Heterocycles are where this course's mechanisms go to live: pyridine's $\mathrm{S_NAr}$ is [[organic-2/aromatic-substitution]]'s rule reversed, pyrrole's $\mathrm{S_EAr}$ is its rule amplified, imidazole's proton bookkeeping is [[organic-2/amines]]' basicity, and the NAD$^+$/nicotinamide redox pair is pyridinium chemistry in metabolism. Diazonium coupling built azo dyes from arylamines in [[organic-2/amines]]; the Mannich and imine condensations feed piperidines and pyridines; and the spectroscopic identification of all of this — the NMR patterns of substituted pyridines, the IR of triazoles — is the spectroscopy course's material. The aromaticity ledger from [[organic-2/aromaticity]] is the one tool that never leaves you.

::: summary
- Heterocycles are named by a small memorised set (pyrrole/furan/thiophene, pyridine/pyrimidine, piperidine/morpholine, indole/quinoline); numbering starts at the heteroatom.
- Five-membered aromatics donate the heteroatom's lone pair to the sextet: π-excessive, easy $\mathrm{S_EAr}$ at C2, aromaticity thiophene $>$ pyrrole $>$ furan — and furan's low bonus makes it a diene and an acid casualty.
- Pyridine keeps its lone pair out of the sextet: π-deficient, basic ($\mathrm{p}K_\mathrm{a}$ 5.2), C3 to electrophiles, C2/C4 to nucleophiles (Chichibabin, 2-halide substitution), and the N-oxide reprograms it to C4 electrophilic substitution.
- Azoles pair a pyrrole-type and a pyridine-type nitrogen: imidazole's near-neutral $\mathrm{p}K_\mathrm{a}$ makes it biology's proton shuttle, and the copper-catalysed triazole synthesis is the prototype click reaction of the 2022 Nobel Prize.
- Indole substitutes at C3 under mild conditions; its N–H is non-basic because the lone pair is the sextet.
- Aromatic ≠ inert: π-excessive rings die in acid, pyridines react at nitrogen before ring, and three-membered heterocycles are strained electrophiles opened by $\mathrm{S_N2}$ rules.
:::

## Exercises

::: exercise Name that ring {level=1}
Name: (a) $\mathrm{C_4H_4O}$ aromatic five-membered; (b) the six-membered saturated $\mathrm{NH}$ ring; (c) benzene fused to furan; (d) the 1,3-diazole.
::: solution
(a) Furan. (b) Piperidine. (c) Benzofuran. (d) Imidazole. (If you drew pyrazole for (d), you built the 1,2-isomer — the 1,3-diazole is imidazole, the histidine ring.)
:::
:::

::: exercise Which ring, which reaction {level=1}
Mark each pair as electrophilic substitution (EAS), nucleophilic substitution (SNAr), or neither easily: (a) pyrrole + $\mathrm{Br_2}$; (b) pyridine + $\mathrm{Br_2}$; (c) 2-chloropyridine + $\mathrm{NaOMe}$; (d) benzene + $\mathrm{NaOMe}$.
::: solution
(a) EAS, instantly at C2 (pyrrole is π-excessive). (b) Neither easily — pyridine is π-deficient; bromination needs drastic conditions and gives C3. (c) SNAr readily: the methoxide adduct puts its charge on nitrogen (2-halopyridines are the acid chlorides of heterocycles). (d) Neither: benzene has no nitrogen to stabilise the anion and no reason to accept methoxide.
:::
:::

::: exercise Basicity, again {level=1}
Piperidine ($\mathrm{p}K_\mathrm{a}$ 11.2) versus pyridine (5.2): explain the six-unit gap with the aromaticity chapter's argument.
::: solution
Piperidine's nitrogen is an ordinary $sp^3$ amine: the lone pair sits in an $sp^3$ orbital, fully available, and protonation changes nothing about the ring. Pyridine's lone pair is in an $sp^2$ orbital — held closer to the nucleus, lower in energy, less eager to bond a proton — and the ring's electronegativity withdraws from it; protonation also costs the electrostatic comfort of the aromatic ring. Hybridisation plus aromatic withdrawal, six $\mathrm{p}K_\mathrm{a}$ units of it: the same argument that separated pyrrole from cyclopentylamine, now with the sextet intact on both sides.
:::
:::

::: exercise Indole's C3 {level=2}
Indole brominates at C3 with mild reagents at low temperature. Draw (in words) the two possible $\sigma$-complexes for C2 versus C3 attack and say which one keeps the benzene ring aromatic, and why that decides.
::: solution
C3 attack: the positive charge is delocalised onto nitrogen (iminium-type contributor) *and* the five remaining carbons keep a benzenoid sextet in the fused ring — the intermediate is an aromatic-stabilised iminium. C2 attack: the charge still reaches nitrogen, but the benzenoid ring is disrupted in the key contributors. C3's intermediate is therefore much lower in energy, and C3 substitution is the rule (the tryptophan chemistry of metabolism: electrophiles — protonated flavins, Mannich iminium ions — all go to indole C3 for exactly this reason). The general five-membered rule ($\alpha$ over $\beta$) is overridden by the fused benzene's arithmetic: here $\beta$ (C3) wins because the $\alpha$-attack forfeits benzenoid aromaticity.
:::
:::

::: exercise Pyridine substitutions {level=2}
Give reagents for: (a) pyridine → 2-aminopyridine; (b) pyridine → 3-bromopyridine; (c) pyridine → 1-methylpyridinium iodide.
::: solution
(a) Chichibabin: $\mathrm{NaNH_2}$, toluene or heat, then water. (b) Direct bromination: $\mathrm{Br_2}$, high temperature (gas phase or oleum, $\sim 300\ \mathrm{^\circ C}$ class conditions) — brutal but C3-selective; the practical route is often from 3-aminopyridine via diazonium. (c) Methyl iodide, room temperature — nitrogen alkylation is fast and irreversible; the precipitated salt is the reagent (and the point: pyridine meets electrophiles at nitrogen, not at ring).
:::
:::

::: exercise Epoxide opening {level=2}
2-Methyloxirane (propylene oxide) with (a) $\mathrm{NaOMe}$ in methanol; (b) methanol with catalytic $\mathrm{H_2SO_4}$. Give the major product and the rule.
::: solution
(a) Base: $\mathrm{S_N2}$ at the less hindered carbon — methoxide attacks C1 (the $\mathrm{CH_2}$), giving 1-methoxypropan-2-ol after proton transfer. (b) Acid: the protonated epoxide's more substituted carbon bears more cationic character, so methanol attacks C2, opening to 2-methoxypropan-1-ol — methoxy on the secondary carbon, the primary alcohol left behind. The rule: basic conditions, steric control (less substituted carbon); acidic conditions, electronic control (more substituted, cation-stabilising carbon) — the same split as ether cleavage, and the reason "epoxide + alkoxide" and "epoxide + alcohol/acid" are different syntheses.
:::
:::

::: exercise Click and its arithmetic {level=3 check="28.6" hint="Protonated fraction = r/(1+r) with r = 10^(pKa - pH); the answer is a percentage"}
An imidazole drug fragment has conjugate-acid $\mathrm{p}K_\mathrm{a}$ 7.0. Compute the protonated percentage at $\mathrm{pH}\ 7.4$, and say what happens to that percentage when the fragment binds in an enzyme pocket lined with carboxylates.
::: solution
$r = [\mathrm{BH^+}]/[\mathrm{B}] = 10^{7.0-7.4} = 0.398$; protonated fraction $= 0.398/1.398 = 28.6\ \%$. Carboxylate walls stabilise the cation: the $\mathrm{p}K_\mathrm{a}$ rises (a carboxylate pair can lift imidazole's $\mathrm{p}K_\mathrm{a}$ toward 8–9), so at the same pH the protonated fraction jumps — the binding event *selects* the protonated form, and the proton that the free drug carries only $29\ \%$ of the time becomes a built-in salt bridge on binding. This is the thermodynamic trick behind histidine's enzyme prevalence: the ligand environment pays for protonation, and protonation pays for binding.
:::
:::

::: exercise Design a pyridine {level=3}
Give syntheses of (a) 2-phenoxy-5-nitropyridine and (b) 4-cyanopyridine from available pyridine starting materials, choosing the order of steps by the directing logic.
::: solution
(a) Start from 2-chloro-5-nitropyridine (commercial, or from the 2-chloro compound by nitration — the chlorine's ring is already π-deficient, and nitration of 2-chloropyridine goes C5, the C3-like position, since C2 is blocked and C4/C6 carry the nitrogen-destabilised charge in the intermediate). Then sodium phenoxide displaces the 2-chloride by $\mathrm{S_NAr}$ (charge on nitrogen in the intermediate) — substitution after nitration, because the nitro group also accelerates the $\mathrm{S_NAr}$: the two deactivations cooperate. (b) 4-Pyridyl needs the N-oxide detour: pyridine → $N$-oxide → nitrate (C4) → deoxygenate → 4-nitropyridine → reduce ($\mathrm{Fe/HCl}$) → 4-aminopyridine → diazotise, $\mathrm{CuCN}$ → 4-cyanopyridine. The amino-to-nitrile diazonium swap, first seen in the amines chapter, is the heterocycle's escape hatch from nitrogen's directing tyranny.
:::
:::
